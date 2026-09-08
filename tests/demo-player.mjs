// Run against Vite: bun tests/demo-player.mjs http://127.0.0.1:5173
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import process from "node:process";

const url = process.argv[2] ?? "http://127.0.0.1:5173";
const session = `demo-player-${process.pid}`;
const chapters = ["Energy costs", "Failure warnings", "Maintenance history"];
function browser(...args) {
  const result = JSON.parse(execFileSync("agent-browser", ["--session", session, "--json", ...args], { encoding: "utf8", timeout: 20000 }));
  assert.equal(result.success, true, result.error);
  return result.data;
}
const read = (expression) => browser("eval", expression).result;
const click = (name) => browser("find", "role", "button", "click", "--name", name, "--exact");
const waitFor = (expression) => read(`(async () => {
  const deadline = Date.now() + 12000;
  while (!(${expression})) {
    if (Date.now() > deadline) throw new Error("Timed out: " + ${JSON.stringify(expression)});
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return true;
})()`);
const progress = () => read('document.querySelector(".demo-stage > div:last-child").style.transform');
const paused = () => read('!!document.querySelector("[aria-label=\\"Resume demo\\"]")');

try {
  browser("set", "viewport", "1440", "1100");
  browser("open", url);
  waitFor('!!document.querySelector("[aria-label=\\"Play demo\\"]")');
  const initial = progress();
  browser("wait", "600");
  assert.equal(progress(), initial, "Do not autoplay below the viewport");
  assert.equal(read('document.querySelector(".demo-stage").textContent.includes("AED 16.50")'), true, "Show value before play");
  browser("find", "role", "link", "click", "--name", "Watch the walkthrough", "--exact");
  waitFor('!!document.querySelector("[aria-label=\\"Pause demo\\"]")');
  assert.equal(read("location.hash"), "#/#walkthrough");
  assert.equal(read('!!document.querySelector("h1") && !!document.querySelector("#walkthrough")'), true);
  assert.deepEqual(read('[...document.querySelectorAll("[aria-label=\\"Demo chapters\\"] button")].map(el => el.textContent)'), chapters);
  waitFor('document.querySelector(".demo-stage > div:last-child").style.transform !== "scaleX(0)"');
  browser("wait", "750");
  const drawing = read('Number(document.querySelector("#kw-clip rect").getAttribute("width"))');
  browser("wait", "750");
  assert(read('Number(document.querySelector("#kw-clip rect").getAttribute("width"))') > drawing, "Restore the progressive chart drawing");
  click("Pause demo");
  const stopped = progress();
  browser("wait", "400");
  assert.equal(progress(), stopped, "Pause holds the frame");
  read('document.querySelector("footer").scrollIntoView({behavior:"instant"})');
  browser("wait", "200");
  read('document.querySelector(".demo-player").scrollIntoView({behavior:"instant",block:"center"})');
  browser("wait", "400");
  assert(paused(), "Manual pause survives leaving and re-entering");
  assert.equal(progress(), stopped, "Scrolling must not override a manual pause");
  browser("focus", '[aria-label="Resume demo"]');
  browser("press", "Enter");
  waitFor('!!document.querySelector("[aria-label=\\"Pause demo\\"]")');

  if (read("document.fullscreenEnabled")) {
    click("Full screen");
    assert.equal(read('!!document.fullscreenElement?.querySelector("[aria-label=\\"Pause demo\\"]")'), true, "Fullscreen includes playback controls");
    click("Pause demo");
    assert(paused());
    click("Exit full screen");
    assert.equal(read("document.fullscreenElement"), null);
  }

  for (const chapter of chapters) {
    click(chapter);
    assert.equal(read('document.querySelector("[aria-current=\\"step\\"]").textContent'), chapter);
    assert.equal(read('document.querySelector(".demo-stage").textContent.includes("Extrusion Line 02")'), true);
    if (chapter === "Failure warnings") {
      const score = () => read(`Number(document.querySelector('svg[viewBox="0 0 400 340"] text').textContent)`);
      browser("wait", "1800");
      const healthy = score();
      browser("wait", "2500");
      assert(score() < healthy, "The health gauge must decline as the warning develops");
    }
    if (chapter === "Maintenance history") {
      assert.equal(read('document.querySelector(".demo-stage").textContent.includes("Replaced drive-end bearing")'), false, "The note starts empty before it types in");
    }
  }
  waitFor('!!document.querySelector("[aria-label=\\"Replay demo\\"]")');
  const final = progress();
  assert.equal(final, "scaleX(1)");
  assert.equal(read('document.querySelector(".demo-stage").textContent.includes("Replaced drive-end bearing")'), true, "The logbook entry types in");
  assert.equal(read('document.querySelector(".demo-stage").textContent.includes("back within baseline")'), true);
  browser("wait", "400");
  assert.equal(progress(), final, "End holds the final result; no loop");
  read('document.querySelector("footer").scrollIntoView({behavior:"instant"})');
  browser("wait", "200");
  read('document.querySelector(".demo-player").scrollIntoView({behavior:"instant",block:"center"})');
  browser("wait", "400");
  assert.equal(progress(), final, "Re-entry must not replay a finished demo");
  click("Replay demo");
  assert.equal(read('document.querySelector("[aria-current=\\"step\\"]").textContent'), chapters[0]);
  waitFor('document.querySelector(".demo-stage > div:last-child").style.transform !== "scaleX(0)"');
  browser("wait", "200");
  read('document.querySelector("footer").scrollIntoView({behavior:"instant"})');
  waitFor('!!document.querySelector("[aria-label=\\"Resume demo\\"]")');
  read('document.querySelector(".demo-player").scrollIntoView({behavior:"instant",block:"center"})');
  waitFor('!!document.querySelector("[aria-label=\\"Pause demo\\"]")');
  const resumed = progress();
  browser("wait", "400");
  assert.notEqual(progress(), resumed, "Re-entry resumes an automatically paused demo");

  for (const width of [820, 390, 320]) {
    browser("set", "viewport", String(width), "844");
    for (const chapter of chapters) {
      click(chapter);
      if (width === 390 && chapter === "Maintenance history") {
        waitFor('document.querySelector(".demo-stage").textContent.includes("Bearing replaced. Signal back within baseline.")');
        browser("wait", "800");
        assert(read(`(() => {
          const saved = [...document.querySelectorAll('.demo-stage span')].find(el => el.textContent === 'Entry saved');
          let opacity = 1;
          for (let el = saved; el; el = el.parentElement) opacity *= Number(getComputedStyle(el).opacity);
          const box = saved.getBoundingClientRect();
          const clear = [...document.querySelectorAll('.demo-stage button')].every(el => {
            const c = el.getBoundingClientRect();
            return c.right < box.left || c.left > box.right || c.bottom < box.top || c.top > box.bottom;
          });
          return opacity > 0.99 && clear;
        })()`), "No floating control may cover the animated saved status");
      }
      click("Pause demo");
      assert.equal(read("document.documentElement.scrollWidth > innerWidth"), false, "No mobile horizontal overflow");
      const ratio = read('(()=>{const r=document.querySelector(".demo-stage").getBoundingClientRect();return r.width/r.height})()');
      assert(Math.abs(ratio - 0.8) < 0.01, "Mobile uses a portrait composition, not shrunken desktop");
    }
  }

  browser("set", "media", "light", "reduced-motion");
  browser("open", `${url}/#walkthrough`);
  browser("reload");
  waitFor('!!document.querySelector("[aria-label=\\"Play demo\\"]")');
  browser("wait", "400");
  assert.equal(progress(), "scaleX(0)", "Reduced motion also waits for manual play");
  assert(read('document.querySelector("#walkthrough").getBoundingClientRect().top >= 0'), "Deep-link section remains visible");
  browser("open", `${url}/#/about`);
  waitFor('!document.querySelector("#walkthrough")');
  browser("back");
  waitFor('!!document.querySelector("#walkthrough")');
  browser("open", `${url}/#/platform`);
  browser("find", "role", "link", "click", "--name", "Explore Architecture", "--exact");
  assert.equal(read("location.hash"), "#/platform#architecture");
  browser("reload");
  waitFor('!!document.querySelector("#architecture")');
  assert.equal(read('!!document.querySelector("#walkthrough")'), false, "Section reload retains its page");
  browser("open", `${url}/#/not-a-page`);
  waitFor('document.body.textContent.includes("404")');

  // Reject the lazy module to exercise the real, actionable error boundary.
  browser("network", "route", "**/PlatformDemo*", "--abort");
  browser("open", `${url}/#/#walkthrough`);
  browser("reload");
  waitFor('!!document.querySelector("[role=\\"alert\\"]")');
  assert.equal(read('!![...document.querySelectorAll("button")].find(el => el.textContent === "Reload demo")'), true);
  assert.equal(read('!!document.querySelector("[aria-label=\\"Play demo\\"]")'), false);
  browser("network", "unroute");
  click("Reload demo");
  waitFor('!!document.querySelector("[aria-label=\\"Play demo\\"]")');
  console.log("PASS: chart drawing, health gauge, typed logbook, entry link, playback, chapters, keyboard, fullscreen, replay, mobile, reduced motion, failure/retry");
} finally {
  browser("close");
}
