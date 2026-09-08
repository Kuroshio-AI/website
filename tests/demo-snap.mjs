// Run against a running Vite server: bun tests/demo-snap.mjs [url]
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import process from "node:process";

const url = process.argv[2] ?? "http://localhost:5174";
const session = `demo-snap-${process.pid}`;
function browser(...args) {
  const result = JSON.parse(execFileSync("agent-browser", ["--session", session, "--json", ...args], { encoding: "utf8" }));
  assert.equal(result.success, true, result.error);
  return result.data;
}
function evaluate(code) {
  return browser("eval", code).result;
}
function near(actual, expected, message) {
  assert(Math.abs(actual - expected) < 2, `${message}: got ${actual}, expected ${expected}`);
}
function settle() {
  return evaluate("new Promise(resolve => setTimeout(() => resolve(scrollY), 1900))");
}
async function prepare(offset = -500) {
  await document.fonts.ready;
  const demo = document.querySelector("#walkthrough");
  const top = document.querySelector("header").offsetHeight + 16;
  const target = scrollY + demo.getBoundingClientRect().top - top;
  // Begin a fresh pass beyond even the widest capture range.
  window.scrollTo({ top: target + 800, behavior: "instant" });
  await new Promise((resolve) => setTimeout(resolve, 500));
  window.scrollTo({ top: target + offset, behavior: "instant" });
  await new Promise((resolve) => setTimeout(resolve, 500));
  window.demoScrollSamples = [];
  window.addEventListener("wheel", () => {
    const start = performance.now();
    const record = (now) => {
      window.demoScrollSamples.push({ ms: now - start, y: scrollY });
      if (now - start < 1800) requestAnimationFrame(record);
    };
    requestAnimationFrame(record);
  }, { capture: true, once: true });
  return target;
}

try {
  browser("set", "viewport", "1440", "1000");
  browser("open", url);
  browser("wait", "--fn", '!!document.querySelector(".demo-player")');
  for (const direction of [1, -1]) {
    const target = evaluate(`(${prepare})(${-direction * 700})`);
    browser("mouse", "wheel", String(direction * 300));
    near(settle(), target, "Align the whole demo below the header from either direction");
    const samples = evaluate("window.demoScrollSamples");
    const landing = samples.find(({ y }) => Math.abs(y - target) < 2);
    assert(landing?.ms < 1100, "Complete a 400px pull beyond the gesture before the old snap would even start");
    browser("mouse", "wheel", String(direction * 40));
    near(settle(), Math.round(target) + direction * 40, "A small gesture must leave the snap freely");
    for (let visit = 0; visit < 2; visit++) {
      browser("mouse", "wheel", String(direction * (visit === 0 ? 260 : 300)));
      near(settle(), Math.round(target) + direction * 300, "Keep scrolling away without being pulled back");
      browser("mouse", "wheel", String(-direction * 100));
      near(settle(), target, "Snap on every return, even without leaving the capture range");
    }
  }

  for (const [width, height] of [[1280, 720], [1366, 768], [1440, 700], [1440, 900], [1920, 1080]]) {
    browser("set", "viewport", String(width), String(height));
    const target = evaluate(`(${prepare})()`);
    browser("mouse", "wheel", "300");
    near(settle(), target, "Snap the section heading below the header");
    assert(evaluate(`(() => {
      const demo = document.querySelector('#walkthrough').getBoundingClientRect();
      const header = document.querySelector('header').getBoundingClientRect();
      const caption = document.querySelector('.demo-player figcaption').getBoundingClientRect();
      return demo.top >= header.bottom + 15 && caption.bottom <= innerHeight - 16;
    })()`), "Heading, player, chapters and caption must fit in one viewport");
    if (width === 1366) {
      assert(evaluate("document.querySelector('.demo-stage').getBoundingClientRect().width >= 1000"),
        "Give the demo at least 1000px of width on a 1366px laptop");
    }
  }
  browser("set", "viewport", "1440", "1000");

  let target = evaluate(`(${prepare})(-800)`);
  browser("mouse", "wheel", "150");
  near(settle(), Math.round(target - 800) + 150, "No snap outside the viewport-based capture range");
  target = evaluate(`(${prepare})()`);
  browser("mouse", "wheel", "550");
  near(settle(), target, "Catch a faster approach before it glides past the demo");
  target = evaluate(`(${prepare})(-700)`);
  evaluate(`(async () => {
    // Trackpads keep emitting wheel events through their momentum tail.
    for (let i = 0; i < 20; i++) {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 50, bubbles: true, cancelable: true }));
      await new Promise(resolve => setTimeout(resolve, 60));
    }
  })()`);
  near(settle(), target, "Catch a continuous gesture even when momentum carries it past the target");
  target = evaluate(`(${prepare})(80)`);
  browser("mouse", "wheel", "120");
  near(settle(), Math.round(target + 80) + 120, "Do not pull a departing gesture backwards");

  for (const input of ["wheel", "keyboard"]) {
    const target = evaluate(`(${prepare})()`);
    browser("mouse", "wheel", "300");
    // Moving beyond the wheel's requested destination proves the snap is underway.
    browser("wait", "--fn", `scrollY > ${target - 200} && scrollY < ${target - 20}`);
    if (input === "wheel") {
      // Capture at the actual input, since the snap moves between CLI calls.
      evaluate('window.addEventListener("wheel", () => { window.demoInterruptY = scrollY; }, { capture: true, once: true })');
      browser("mouse", "wheel", "-160");
      near(settle(), evaluate("window.demoInterruptY") - 160, "Wheel input must interrupt and reverse the snap");
    } else {
      browser("press", "Escape");
      const stopped = evaluate("scrollY");
      near(settle(), stopped, "Keyboard input must stop the snap immediately");
    }
  }

  // A late layout change must move the snap target without a viewport resize.
  evaluate('document.querySelector("#walkthrough").style.marginTop = "160px"');
  target = evaluate(`(${prepare})()`);
  browser("mouse", "wheel", "300");
  near(settle(), target, "Recalculate the target after layout changes");

  for (const [width, height] of [[1440, 560], [390, 844]]) {
    browser("set", "viewport", String(width), String(height));
    target = evaluate(`(${prepare})()`);
    browser("mouse", "wheel", "300");
    near(settle(), Math.round(target - 500) + 300, "No snap on short screens or mobile");
  }
  browser("set", "viewport", "1440", "1000");
  browser("set", "media", "light", "reduced-motion");
  target = evaluate(`(${prepare})()`);
  browser("mouse", "wheel", "300");
  near(settle(), Math.round(target - 500) + 300, "Respect reduced motion");
  assert.deepEqual(browser("errors").errors, []);
  console.log("PASS: demo alignment, free exit, interruption, layout changes, viewport limits and reduced motion");
} finally {
  browser("close");
}
