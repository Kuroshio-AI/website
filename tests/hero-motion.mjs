// Run against a running Vite server: bun tests/hero-motion.mjs [url]
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import process from "node:process";

const url = process.argv[2] ?? "http://127.0.0.1:5173";
const session = `hero-motion-${process.pid}`;
const target = [60, 3, 4, 12, 0];
const initial = [0, 0, 0, 0, 9];
function browser(...args) {
  const result = JSON.parse(execFileSync("agent-browser", ["--session", session, "--json", ...args], { encoding: "utf8" }));
  assert.equal(result.success, true, result.error);
  return result.data;
}

async function sampleHero(scrollToStats = false) {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await document.fonts.ready;
  location.hash = "#/about";
  await wait(150);
  location.hash = "#/";
  while (!document.querySelector("[data-hero-strip]")) await wait(10);
  const read = () => ({
    values: [...document.querySelectorAll("[data-count]")].map((el) => Number(el.textContent)),
    widths: [...document.querySelectorAll("[data-count]")].map((el) => el.getBoundingClientRect().width),
    chars: [...document.querySelectorAll("h1 div")].filter((el) => !el.children.length).map((el) => Number(getComputedStyle(el).opacity)),
  });
  await wait(240);
  const before = read();
  // Exercise the same re-split triggered by a late webfont load.
  document.fonts.dispatchEvent(new Event("loadingdone"));
  const after = read();
  const samples = [after];
  for (let i = 0; i < 25; i++) {
    await wait(100);
    samples.push(read());
  }
  const offscreen = [...document.querySelectorAll("[data-count]")]
    .map((el, index) => ({ index, top: el.getBoundingClientRect().top }))
    .filter(({ top }) => top >= innerHeight).map(({ index }) => index);
  if (scrollToStats) {
    document.querySelector("[data-hero-strip]").scrollIntoView({ behavior: "instant", block: "center" });
    await wait(2400);
  }
  return {
    before, after, samples, offscreen, final: read(),
    labels: [...document.querySelectorAll("[data-hero-strip] .sr-only")].map((el) => el.textContent),
    visible: [...document.querySelectorAll("[data-hero-strip] dt > [aria-hidden]")].map((el) => el.textContent),
    overflow: document.documentElement.scrollWidth > innerWidth,
  };
}

try {
  browser("set", "viewport", "1440", "1000");
  browser("open", url);
  const desktop = browser("eval", `(${sampleHero})()`).result;
  assert(desktop.before.chars.some((opacity) => opacity < 1), "Headline must animate on remount");
  assert.deepEqual(desktop.after.chars, desktop.before.chars, "Font re-splitting must preserve animation progress");
  assert.deepEqual(desktop.final.values, target);
  assert(desktop.final.chars.every((opacity) => opacity === 1));
  for (let i = 0; i < target.length; i++) {
    const values = desktop.samples.map((sample) => sample.values[i]);
    assert(new Set(values).size > 1, `Counter ${i} must animate`);
    assert(values.every((value, index) => !index || (target[i] === 0 ? value <= values[index - 1] : value >= values[index - 1])), "Count whole numbers monotonically");
    assert(desktop.samples.every((sample) => sample.widths[i] === desktop.after.widths[i]), "Reserve the final number width");
  }
  assert.deepEqual(desktop.labels, ["60s", "3–4h", "12d", "0"]);
  assert.deepEqual(desktop.visible, desktop.labels, "Keep units and range punctuation intact");

  browser("set", "viewport", "390", "600");
  const mobile = browser("eval", `(${sampleHero})(true)`).result;
  assert(mobile.offscreen.length > 0, "Exercise counters below the mobile viewport");
  for (const i of mobile.offscreen) assert.equal(mobile.samples.at(-1).values[i], initial[i], "Wait until visible before counting");
  assert.deepEqual(mobile.final.values, target);
  assert.equal(mobile.overflow, false);

  browser("set", "media", "light", "reduced-motion");
  const reduced = browser("eval", `(${sampleHero})()`).result;
  assert.deepEqual(reduced.before.values, target);
  assert.equal(reduced.before.chars.length, 0, "Reduced motion must not split the headline");
  assert(reduced.samples.every((sample) => JSON.stringify(sample.values) === JSON.stringify(target)));
  console.log("PASS: headline re-split, whole-number counts, stable widths, mobile viewport triggers, reduced motion");
} finally {
  browser("close");
}
