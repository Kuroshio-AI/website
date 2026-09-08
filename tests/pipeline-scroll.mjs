// Run against a running Vite server: bun tests/pipeline-scroll.mjs [url]
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import process from "node:process";

const url = process.argv[2] ?? "http://localhost:5174";
const session = `pipeline-scroll-${process.pid}`;
function browser(...args) {
  const result = JSON.parse(execFileSync("agent-browser", ["--session", session, "--json", ...args], { encoding: "utf8" }));
  assert.equal(result.success, true, result.error);
  return result.data;
}

async function measure(extraHeight = 0) {
  await document.fonts.ready;
  const { ScrollTrigger } = await import("/src/lib/motion.js");
  document.querySelector("#walkthrough").style.marginBottom = `${extraHeight}px`;
  await new Promise((resolve) => setTimeout(resolve, 700));
  const pin = ScrollTrigger.getAll().find((trigger) => trigger.pin);
  return {
    count: ScrollTrigger.getAll().filter((trigger) => trigger.pin).length,
    start: pin.start,
    actual: pin.spacer.getBoundingClientRect().top + scrollY,
  };
}

async function recordEntry(direction) {
  const { ScrollTrigger } = await import("/src/lib/motion.js");
  const pin = ScrollTrigger.getAll().find((trigger) => trigger.pin);
  const actual = pin.spacer.getBoundingClientRect().top + scrollY;
  window.scrollTo({ top: actual - direction * 100, behavior: "instant" });
  await new Promise((resolve) => setTimeout(resolve, 300));
  window.pipelineSamples = [];
  window.pipelineRecording = true;
  const until = performance.now() + 1600;
  function sample() {
    window.pipelineSamples.push({
      actual: pin.pin.getBoundingClientRect().top,
      expected: Math.max(0, actual - scrollY),
      fixed: getComputedStyle(pin.pin).position === "fixed",
    });
    if (performance.now() < until) requestAnimationFrame(sample);
    else window.pipelineRecording = false;
  }
  requestAnimationFrame(sample);
}

try {
  browser("set", "viewport", "1440", "1000");
  browser("open", url);
  browser("wait", "--fn", '!!document.querySelector(".demo-player")');
  for (const height of [0, 240, 0]) {
    const layout = browser("eval", `(${measure})(${height})`).result;
    assert.equal(layout.count, 1, "Exactly one desktop pipeline pin");
    assert(Math.abs(layout.start - layout.actual) < 2,
      `Pin must follow async layout changes: start=${layout.start}, actual=${layout.actual}`);
  }
  for (const direction of [1, -1]) {
    browser("eval", `(${recordEntry})(${direction})`);
    browser("mouse", "wheel", String(direction * 240));
    browser("wait", "--fn", "!window.pipelineRecording");
    const samples = browser("eval", "window.pipelineSamples").result;
    assert(samples.some((sample) => sample.fixed) && samples.some((sample) => !sample.fixed), "Cross the pin boundary");
    const error = Math.max(...samples.map((sample) => Math.abs(sample.actual - sample.expected)));
    assert(error < 3, `Pipeline must enter/leave the pin continuously (error=${error}px)`);
  }
  assert.deepEqual(browser("errors").errors, []);
  console.log("PASS: async layout changes and continuous Lenis pin entry/exit");
} finally {
  browser("close");
}
