/* eslint-disable no-unused-vars -- ported verbatim from the HyperFrames compositions, helpers included */
// Ported from the HyperFrames project at ~/.hyperframes-studio/Copy of website animation kuroshio/ ("Say it, get it").
// Each scene's CSS is scoped to its own root id, ids carry the scene's prefix (sa-, sr-, si-, sg-, sw-), and queries stay inside the root.
// The word flights use fixed offsets measured from the Figtree layout: change a sentence or a size and they must be measured again.
import { gsap } from "@/lib/motion";

export const CSS = `@font-face { font-family: "Figtree KP"; src: url("/demos/figtree.woff2") format("woff2"); font-weight: 300 900; }
/* say-ask */
#say-ask {
  --ground: #26251F; --ink: #F2F1EC; --fg: #1d1c17; --soft: #6a685f; --line: #e6e5e1; --hl: #eef2fa;
  --ok: #1a6b47; --ok-bg: #e7f2ec; --warn: #8a5a00; --warn-bg: #fbf1e0; --blue: #094cb2;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#say-ask svg.i { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; flex: none; }
/* The input bar */
#say-ask .bar { position: absolute; left: 210px; top: 470px; width: 1200px; height: 140px; z-index: 2; }
#say-ask .barbg { position: absolute; inset: 0; border-radius: 70px; background: #fff; box-shadow: 0 40px 100px -40px rgba(0,0,0,.7); }
#say-ask .words { position: absolute; left: 64px; top: 0; height: 140px; display: flex; align-items: center; font-size: 48px; line-height: 1.2; font-weight: 500; white-space: pre; }
#say-ask .w { display: block; white-space: pre; transform-origin: 0 0; }
#say-ask .caret { display: block; width: 4px; height: 58px; margin-left: 2px; background: var(--blue); }
/* Tool card shell */
#say-ask .tool { position: absolute; left: 255px; width: 1110px; background: #fff; overflow: hidden; transform-origin: 50% 50%; }
#say-ask .head { display: flex; align-items: baseline; justify-content: space-between; height: 104px; padding: 34px 38px 0; border-bottom: 1px solid var(--line); }
#say-ask .title { font-size: 30px; font-weight: 650; line-height: 1.2; white-space: pre; display: flex; }
#say-ask .title span { display: block; white-space: pre; }
#say-ask .meta { font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-ask .r { position: relative; height: 118px; display: flex; align-items: center; justify-content: space-between; padding: 0 38px; border-bottom: 1px solid var(--line); background: #fff; }
#say-ask .r:last-child { border-bottom: 0; }
#say-ask .r b { display: block; font-size: 28px; font-weight: 650; }
#say-ask .r span.m { display: block; margin-top: 4px; font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-ask .st { display: inline-flex; align-items: center; gap: 7px; font-size: 25px; font-weight: 600; }
#say-ask .st svg { width: 26px; height: 26px; }
#say-ask .st.ok { color: var(--ok); }
#say-ask .st.warn { color: var(--warn); }
#say-ask .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; font-size: 24px; font-weight: 650; }
#say-ask .chip.ok { background: var(--ok-bg); color: var(--ok); }
#say-ask .chip.warn { background: var(--warn-bg); color: var(--warn); }
#say-ask .chip svg { width: 22px; height: 22px; }
/* say-requests */
#say-requests {
  --ground: #26251F; --ink: #F2F1EC; --fg: #1d1c17; --soft: #6a685f; --line: #e6e5e1; --hl: #eef2fa;
  --ok: #1a6b47; --ok-bg: #e7f2ec; --warn: #8a5a00; --warn-bg: #fbf1e0; --blue: #094cb2;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#say-requests svg.i { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; flex: none; }
/* The input bar */
#say-requests .bar { position: absolute; left: 210px; top: 470px; width: 1200px; height: 140px; z-index: 2; }
#say-requests .barbg { position: absolute; inset: 0; border-radius: 70px; background: #fff; box-shadow: 0 40px 100px -40px rgba(0,0,0,.7); }
#say-requests .words { position: absolute; left: 64px; top: 0; height: 140px; display: flex; align-items: center; font-size: 48px; line-height: 1.2; font-weight: 500; white-space: pre; }
#say-requests .w { display: block; white-space: pre; transform-origin: 0 0; }
#say-requests .caret { display: block; width: 4px; height: 58px; margin-left: 2px; background: var(--blue); }
/* Tool card shell */
#say-requests .tool { position: absolute; left: 255px; width: 1110px; background: #fff; overflow: hidden; transform-origin: 50% 50%; }
#say-requests .head { display: flex; align-items: baseline; justify-content: space-between; height: 104px; padding: 34px 38px 0; border-bottom: 1px solid var(--line); }
#say-requests .title { font-size: 30px; font-weight: 650; line-height: 1.2; white-space: pre; display: flex; }
#say-requests .title span { display: block; white-space: pre; }
#say-requests .meta { font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-requests .r { position: relative; height: 118px; display: flex; align-items: center; justify-content: space-between; padding: 0 38px; border-bottom: 1px solid var(--line); background: #fff; }
#say-requests .r:last-child { border-bottom: 0; }
#say-requests .r b { display: block; font-size: 28px; font-weight: 650; }
#say-requests .r span.m { display: block; margin-top: 4px; font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-requests .st { display: inline-flex; align-items: center; gap: 7px; font-size: 25px; font-weight: 600; }
#say-requests .st svg { width: 26px; height: 26px; }
#say-requests .st.ok { color: var(--ok); }
#say-requests .st.warn { color: var(--warn); }
#say-requests .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; font-size: 24px; font-weight: 650; }
#say-requests .chip.ok { background: var(--ok-bg); color: var(--ok); }
#say-requests .chip.warn { background: var(--warn-bg); color: var(--warn); }
#say-requests .chip svg { width: 22px; height: 22px; }
#say-requests .act { display: grid; justify-items: end; align-items: center; }
#say-requests .act > * { grid-area: 1 / 1; }
#sr-approve { padding: 13px 24px; border-radius: 7px; background: var(--blue); color: #fff; font-size: 25px; font-weight: 650; }
/* say-inspect */
#say-inspect {
  --ground: #26251F; --ink: #F2F1EC; --fg: #1d1c17; --soft: #6a685f; --line: #e6e5e1; --hl: #eef2fa;
  --ok: #1a6b47; --ok-bg: #e7f2ec; --warn: #8a5a00; --warn-bg: #fbf1e0; --blue: #094cb2;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#say-inspect svg.i { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; flex: none; }
/* The input bar */
#say-inspect .bar { position: absolute; left: 210px; top: 470px; width: 1200px; height: 140px; z-index: 2; }
#say-inspect .barbg { position: absolute; inset: 0; border-radius: 70px; background: #fff; box-shadow: 0 40px 100px -40px rgba(0,0,0,.7); }
#say-inspect .words { position: absolute; left: 64px; top: 0; height: 140px; display: flex; align-items: center; font-size: 48px; line-height: 1.2; font-weight: 500; white-space: pre; }
#say-inspect .w { display: block; white-space: pre; transform-origin: 0 0; }
#say-inspect .caret { display: block; width: 4px; height: 58px; margin-left: 2px; background: var(--blue); }
/* Tool card shell */
#say-inspect .tool { position: absolute; left: 255px; width: 1110px; background: #fff; overflow: hidden; transform-origin: 50% 50%; }
#say-inspect .head { display: flex; align-items: baseline; justify-content: space-between; height: 104px; padding: 34px 38px 0; border-bottom: 1px solid var(--line); }
#say-inspect .title { font-size: 30px; font-weight: 650; line-height: 1.2; white-space: pre; display: flex; }
#say-inspect .title span { display: block; white-space: pre; }
#say-inspect .meta { font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-inspect .r { position: relative; height: 118px; display: flex; align-items: center; justify-content: space-between; padding: 0 38px; border-bottom: 1px solid var(--line); background: #fff; }
#say-inspect .r:last-child { border-bottom: 0; }
#say-inspect .r b { display: block; font-size: 28px; font-weight: 650; }
#say-inspect .r span.m { display: block; margin-top: 4px; font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-inspect .st { display: inline-flex; align-items: center; gap: 7px; font-size: 25px; font-weight: 600; }
#say-inspect .st svg { width: 26px; height: 26px; }
#say-inspect .st.ok { color: var(--ok); }
#say-inspect .st.warn { color: var(--warn); }
#say-inspect .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; font-size: 24px; font-weight: 650; }
#say-inspect .chip.ok { background: var(--ok-bg); color: var(--ok); }
#say-inspect .chip.warn { background: var(--warn-bg); color: var(--warn); }
#say-inspect .chip svg { width: 22px; height: 22px; }
#say-inspect .fl { height: 96px; display: flex; align-items: center; padding: 0 38px; }
#say-inspect .fl b { display: block; font-size: 28px; font-weight: 650; }
#say-inspect .fl span.m { display: block; margin-top: 4px; font-size: 25px; color: var(--soft); }
#say-inspect .cks { padding: 0 38px 20px 38px; border-bottom: 1px solid var(--line); }
#say-inspect .ck { height: 62px; display: flex; align-items: center; gap: 18px; font-size: 26px; }
#say-inspect .box { width: 36px; height: 36px; border-radius: 8px; border: 2px solid #c9c7c0; display: grid; place-items: center; color: #fff; }
#say-inspect .box svg { width: 24px; height: 24px; }
#say-inspect .r { height: 96px; }
/* say-register */
#say-register {
  --ground: #26251F; --ink: #F2F1EC; --fg: #1d1c17; --soft: #6a685f; --line: #e6e5e1; --hl: #eef2fa;
  --ok: #1a6b47; --ok-bg: #e7f2ec; --warn: #8a5a00; --warn-bg: #fbf1e0; --blue: #094cb2;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#say-register svg.i { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; flex: none; }
/* The input bar */
#say-register .bar { position: absolute; left: 210px; top: 470px; width: 1200px; height: 140px; z-index: 2; }
#say-register .barbg { position: absolute; inset: 0; border-radius: 70px; background: #fff; box-shadow: 0 40px 100px -40px rgba(0,0,0,.7); }
#say-register .words { position: absolute; left: 64px; top: 0; height: 140px; display: flex; align-items: center; font-size: 48px; line-height: 1.2; font-weight: 500; white-space: pre; }
#say-register .w { display: block; white-space: pre; transform-origin: 0 0; }
#say-register .caret { display: block; width: 4px; height: 58px; margin-left: 2px; background: var(--blue); }
/* Tool card shell */
#say-register .tool { position: absolute; left: 255px; width: 1110px; background: #fff; overflow: hidden; transform-origin: 50% 50%; }
#say-register .head { display: flex; align-items: baseline; justify-content: space-between; height: 104px; padding: 34px 38px 0; border-bottom: 1px solid var(--line); }
#say-register .title { font-size: 30px; font-weight: 650; line-height: 1.2; white-space: pre; display: flex; }
#say-register .title span { display: block; white-space: pre; }
#say-register .meta { font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-register .r { position: relative; height: 118px; display: flex; align-items: center; justify-content: space-between; padding: 0 38px; border-bottom: 1px solid var(--line); background: #fff; }
#say-register .r:last-child { border-bottom: 0; }
#say-register .r b { display: block; font-size: 28px; font-weight: 650; }
#say-register .r span.m { display: block; margin-top: 4px; font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-register .st { display: inline-flex; align-items: center; gap: 7px; font-size: 25px; font-weight: 600; }
#say-register .st svg { width: 26px; height: 26px; }
#say-register .st.ok { color: var(--ok); }
#say-register .st.warn { color: var(--warn); }
#say-register .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; font-size: 24px; font-weight: 650; }
#say-register .chip.ok { background: var(--ok-bg); color: var(--ok); }
#say-register .chip.warn { background: var(--warn-bg); color: var(--warn); }
#say-register .chip svg { width: 22px; height: 22px; }
#say-register .tr { height: 96px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 0.8fr; align-items: center; padding: 0 38px; border-bottom: 1px solid var(--line); font-size: 26px; background: #fff; }
#say-register .tr:last-child { border-bottom: 0; }
#say-register .tr b { font-weight: 650; }
#say-register .tr.th { height: 70px; font-size: 22px; font-weight: 650; color: var(--soft); letter-spacing: .04em; text-transform: uppercase; }
#say-register .tab { position: absolute; left: 650px; top: 430px; width: 320px; height: 220px; background: #fff; border-radius: 10px; box-shadow: 0 30px 70px -30px rgba(0,0,0,.7); overflow: hidden; }
#say-register .tab .tn { height: 52px; display: flex; align-items: center; padding: 0 16px; background: #eaf3ec; border-bottom: 1px solid var(--line); font-size: 22px; font-weight: 650; white-space: nowrap; overflow: hidden; }
#say-register .tab i { display: block; height: 22px; margin: 16px 16px 0; border-radius: 4px; background: linear-gradient(90deg, #e6e5e1 0 38%, transparent 38% 42%, #efeeea 42% 70%, transparent 70% 74%, #efeeea 74% 100%); }
/* say-wall */
#say-wall {
  --ground: #26251F; --ink: #F2F1EC; --fg: #1d1c17; --soft: #6a685f; --line: #e6e5e1; --hl: #eef2fa;
  --ok: #1a6b47; --ok-bg: #e7f2ec; --warn: #8a5a00; --warn-bg: #fbf1e0; --blue: #094cb2;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#say-wall svg.i { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; flex: none; }
/* The input bar */
#say-wall .bar { position: absolute; left: 210px; top: 470px; width: 1200px; height: 140px; z-index: 2; }
#say-wall .barbg { position: absolute; inset: 0; border-radius: 70px; background: #fff; box-shadow: 0 40px 100px -40px rgba(0,0,0,.7); }
#say-wall .words { position: absolute; left: 64px; top: 0; height: 140px; display: flex; align-items: center; font-size: 48px; line-height: 1.2; font-weight: 500; white-space: pre; }
#say-wall .w { display: block; white-space: pre; transform-origin: 0 0; }
#say-wall .caret { display: block; width: 4px; height: 58px; margin-left: 2px; background: var(--blue); }
/* Tool card shell */
#say-wall .tool { position: absolute; left: 255px; width: 1110px; background: #fff; overflow: hidden; transform-origin: 50% 50%; }
#say-wall .head { display: flex; align-items: baseline; justify-content: space-between; height: 104px; padding: 34px 38px 0; border-bottom: 1px solid var(--line); }
#say-wall .title { font-size: 30px; font-weight: 650; line-height: 1.2; white-space: pre; display: flex; }
#say-wall .title span { display: block; white-space: pre; }
#say-wall .meta { font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-wall .r { position: relative; height: 118px; display: flex; align-items: center; justify-content: space-between; padding: 0 38px; border-bottom: 1px solid var(--line); background: #fff; }
#say-wall .r:last-child { border-bottom: 0; }
#say-wall .r b { display: block; font-size: 28px; font-weight: 650; }
#say-wall .r span.m { display: block; margin-top: 4px; font-size: 25px; color: var(--soft); font-variant-numeric: tabular-nums; }
#say-wall .st { display: inline-flex; align-items: center; gap: 7px; font-size: 25px; font-weight: 600; }
#say-wall .st svg { width: 26px; height: 26px; }
#say-wall .st.ok { color: var(--ok); }
#say-wall .st.warn { color: var(--warn); }
#say-wall .chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; font-size: 24px; font-weight: 650; }
#say-wall .chip.ok { background: var(--ok-bg); color: var(--ok); }
#say-wall .chip.warn { background: var(--warn-bg); color: var(--warn); }
#say-wall .chip svg { width: 22px; height: 22px; }
#say-wall .card { position: absolute; top: 330px; width: 440px; background: #fff; transform-origin: 50% 50%; }
#say-wall .card .ch { padding: 22px 26px 16px; border-bottom: 1px solid var(--line); font-size: 28px; font-weight: 650; }
#say-wall .card .ch span { display: block; margin-top: 2px; font-size: 22px; font-weight: 500; color: var(--soft); }
#say-wall .card .cr { height: 66px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 26px; border-bottom: 1px solid var(--line); font-size: 24px; font-weight: 600; white-space: nowrap; }
#say-wall .card .cr:last-child { border-bottom: 0; }
#say-wall .card .st, #say-wall .card .chip { font-size: 22px; }
#say-wall .card .chip { padding: 4px 12px; }
#sw-line { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font-size: 52px; font-weight: 700; letter-spacing: -0.02em; color: var(--ink); }
#sw-line span { display: inline-block; }`;

export const MARKUP = `<div id="say-ask">
  <div class="bar" id="sa-bar">
      <div class="barbg" id="sa-bg"></div>
      <div class="words" id="sa-words"><span class="w" id="sa-w0"></span><span class="w" id="sa-w1"></span><span class="w" id="sa-w2"></span><span class="w" id="sa-w3"></span><span class="w" id="sa-w4"></span><span class="w" id="sa-w5"></span><span class="w" id="sa-w6"></span><span class="caret" id="sa-caret"></span></div>
    </div>
</div>
<div id="say-requests">
  <div class="bar" id="sr-bar">
      <div class="barbg" id="sr-bg"></div>
      <div class="words" id="sr-words"><span class="w" id="sr-w0">Our </span><span class="w" id="sr-w1">purchase </span><span class="w" id="sr-w2">requests </span><span class="w" id="sr-w3">get </span><span class="w" id="sr-w4">lost </span><span class="w" id="sr-w5">in </span><span class="w" id="sr-w6">WhatsApp.</span><span class="caret" id="sr-caret"></span></div>
    </div>
  <div class="tool" id="sr-tool" style="top:252px">
      <div class="head"><div class="title"><span id="sr-t0">Purchase </span><span id="sr-t1">requests</span></div><span class="meta" id="sr-meta"><span id="sr-wait">1</span> waiting · this week AED 16,140</span></div>
      <div class="r sr-row" id="sr-new" style="background:var(--hl)">
        <div><b>Hydraulic hoses, 12</b><span class="m">PR-1043 · Ravi, Yard 2 · AED 4,860</span></div>
        <div class="act"><div id="sr-approve">Approve</div><span class="st ok" id="sr-done"><svg class="i" id="sr-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Approved</span></div>
      </div>
      <div class="r sr-row"><div><b>Bearing kit, Press 3</b><span class="m">PR-1042 · Anas, Plant · AED 1,120</span></div><span class="st ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Approved</span></div><div class="r sr-row"><div><b>Safety harnesses, 20</b><span class="m">PR-1041 · Joel, Yard 1 · AED 9,400</span></div><span class="st warn">Returned</span></div><div class="r sr-row"><div><b>Welding rods, 40 kg</b><span class="m">PR-1040 · Ravi, Yard 2 · AED 760</span></div><span class="st ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Approved</span></div>
    </div>
</div>
<div id="say-inspect">
  <div class="bar" id="si-bar">
      <div class="barbg" id="si-bg"></div>
      <div class="words" id="si-words"><span class="w" id="si-w0"></span><span class="w" id="si-w1"></span><span class="w" id="si-w2"></span><span class="w" id="si-w3"></span><span class="w" id="si-w4"></span><span class="w" id="si-w5"></span><span class="caret" id="si-caret"></span></div>
    </div>
  <div class="tool" id="si-tool" style="top:179px">
      <div class="head"><div class="title"><span id="si-t0">Forklift </span><span id="si-t1">inspections</span></div><span class="meta" id="si-meta">3 forklifts · today</span></div>
      <div class="fl si-row"><div><b>Forklift FL-07</b><span class="m">Pre-use check · <span id="si-count">0</span> of 5 done</span></div></div>
      <div class="cks si-row"><div class="ck si-ck"><span class="box" id="si-box0"><svg class="i" id="si-tick0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>Forks and chains</div><div class="ck si-ck"><span class="box" id="si-box1"><svg class="i" id="si-tick1" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>Hydraulics</div><div class="ck si-ck"><span class="box" id="si-box2"><svg class="i" id="si-tick2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>Brakes</div><div class="ck si-ck"><span class="box" id="si-box3"><svg class="i" id="si-tick3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>Lights and horn</div><div class="ck si-ck"><span class="box" id="si-box4"><svg class="i" id="si-tick4" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>Seat belt</div></div>
      <div class="r si-row"><div><b>Forklift FL-09</b><span class="m">Yard 1 · last checked yesterday</span></div><span class="chip warn">Due today</span></div>
      <div class="r si-row"><div><b>Forklift FL-04</b><span class="m">Yard 2 · checked 07:10</span></div><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Passed</span></div>
    </div>
</div>
<div id="say-register">
  <div class="bar" id="sg-bar">
      <div class="barbg" id="sg-bg"></div>
      <div class="words" id="sg-words"><span class="w" id="sg-w0"></span><span class="w" id="sg-w1"></span><span class="w" id="sg-w2"></span><span class="w" id="sg-w3"></span><span class="w" id="sg-w4"></span><span class="w" id="sg-w5"></span><span class="caret" id="sg-caret"></span></div>
    </div>
  <div class="tool" id="sg-tool" style="top:261px">
      <div class="head"><div class="title"><span id="sg-t0">Equipment </span><span id="sg-t1">register</span></div><span class="meta" id="sg-meta">4 assets · one list</span></div>
      <div class="tr th" id="sg-th"><span>Asset</span><span>Location</span><span>Next service</span><span>Status</span></div>
      <div class="tr sg-row"><b>Compressor C-2</b><span>Yard 2</span><span>14 Nov</span><span><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>OK</span></span></div><div class="tr sg-row"><b>Generator G-1</b><span>Plant room</span><span>03 Nov</span><span><span class="chip warn">Due</span></span></div><div class="tr sg-row"><b>Crane CR-3</b><span>Yard 1</span><span>28 Nov</span><span><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>OK</span></span></div><div class="tr sg-row"><b>Pump P-11</b><span>Press 3</span><span>19 Nov</span><span><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>OK</span></span></div>
    </div>
  <div id="sg-tabs"><div class="tab" id="sg-tab0"><div class="tn">Assets_2024.xlsx</div><i></i><i></i><i></i><i></i></div><div class="tab" id="sg-tab1"><div class="tn">Service log</div><i></i><i></i><i></i><i></i></div><div class="tab" id="sg-tab2"><div class="tn">Yard 2 list</div><i></i><i></i><i></i><i></i></div><div class="tab" id="sg-tab3"><div class="tn">Copy of register FINAL</div><i></i><i></i><i></i><i></i></div><div class="tab" id="sg-tab4"><div class="tn">Ahmed's sheet</div><i></i><i></i><i></i><i></i></div></div>
</div>
<div id="say-wall">
  <div id="sw-cards"><div class="card sw-card" id="sw-card0" style="left:100px"><div class="ch">Purchase requests<span>0 waiting · AED 16,140</span></div><div class="cr"><span>Hydraulic hoses, 12</span><span class="st ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Approved</span></div><div class="cr"><span>Bearing kit, Press 3</span><span class="st ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Approved</span></div><div class="cr"><span>Safety harnesses, 20</span><span class="st warn">Returned</span></div></div><div class="card sw-card" id="sw-card1" style="left:590px"><div class="ch">Forklift inspections<span>3 forklifts · today</span></div><div class="cr"><span>Forklift FL-07</span><span class="st ok">5 of 5 done</span></div><div class="cr"><span>Forklift FL-09</span><span class="chip warn">Due today</span></div><div class="cr"><span>Forklift FL-04</span><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Passed</span></div></div><div class="card sw-card" id="sw-card2" style="left:1080px"><div class="ch">Equipment register<span>4 assets · one list</span></div><div class="cr"><span>Compressor C-2</span><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>OK</span></div><div class="cr"><span>Generator G-1</span><span class="chip warn">Due</span></div><div class="cr"><span>Crane CR-3</span><span class="chip ok"><svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>OK</span></div></div></div>
  <div id="sw-line"><span class="lw">Tell</span> <span class="lw">us</span> <span class="lw">what</span> <span class="lw">you</span> <span class="lw">need.</span></div>
  <div class="bar" id="sw-bar">
      <div class="barbg" id="sw-bg"></div>
      <div class="words" id="sw-words"><span class="w" id="sw-w0"></span><span class="caret" id="sw-caret"></span></div>
    </div>
</div>`;

function sceneAsk(root) {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => root.querySelector(s);
  // Flies a word from the bar onto the label it becomes; the offsets are fixed, measured from the Figtree layout.
  const fly = (w, t, at, dur, dx, dy, s) => {
    tl.to(w, { x: dx, y: dy, rotation: 0, scale: s, duration: dur, ease: 'power3.inOut', immediateRender: false }, at);
    tl.to(w, { opacity: 0, duration: 0.08, ease: 'none' }, at + dur);
    tl.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none', immediateRender: false }, at + dur);
  };
  // Types the sentence into the bar's words, char by char, on one clock.
  const type = (prefix, words, at, dur) => {
    const full = words.map((w, i) => w + (i < words.length - 1 ? ' ' : ''));
    const total = full.reduce((n, w) => n + w.length, 0);
    const c = { n: 0 };
    tl.fromTo(c, { n: 0 }, { n: total, duration: dur, ease: 'none', onUpdate: () => {
      let left = Math.round(c.n);
      full.forEach((w, i) => { const k = Math.max(0, Math.min(w.length, left)); $('#' + prefix + '-w' + i).textContent = w.slice(0, k); left -= w.length; });
    } }, at);
  };

  // Rises in through a light blur (KP@11.20), then types at a steady rate.
  tl.fromTo('#sa-bar', { y: 8, filter: 'blur(1.5px)' }, { y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'expo.out' }, 0);
  type('sa', ['Our', 'purchase', 'requests', 'get', 'lost', 'in', 'WhatsApp.'], 0.3, 1.28);
  tl.set({}, {}, 1.6);
  return tl;
}

function sceneRequests(root) {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => root.querySelector(s);
  // Flies a word from the bar onto the label it becomes; the offsets are fixed, measured from the Figtree layout.
  const fly = (w, t, at, dur, dx, dy, s) => {
    tl.to(w, { x: dx, y: dy, rotation: 0, scale: s, duration: dur, ease: 'power3.inOut', immediateRender: false }, at);
    tl.to(w, { opacity: 0, duration: 0.08, ease: 'none' }, at + dur);
    tl.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none', immediateRender: false }, at + dur);
  };
  // Types the sentence into the bar's words, char by char, on one clock.
  const type = (prefix, words, at, dur) => {
    const full = words.map((w, i) => w + (i < words.length - 1 ? ' ' : ''));
    const total = full.reduce((n, w) => n + w.length, 0);
    const c = { n: 0 };
    tl.fromTo(c, { n: 0 }, { n: total, duration: dur, ease: 'none', onUpdate: () => {
      let left = Math.round(c.n);
      full.forEach((w, i) => { const k = Math.max(0, Math.min(w.length, left)); $('#' + prefix + '-w' + i).textContent = w.slice(0, k); left -= w.length; });
    } }, at);
  };

  // The words lift off the bar and scatter; the bar falls away beneath them.
  tl.to('#sr-w0', { x: -40, y: -150, rotation: -6, duration: 0.4, ease: 'power2.out' }, 0.00);
  tl.to('#sr-w1', { x: -10, y: -210, rotation: 3, duration: 0.4, ease: 'power2.out' }, 0.03);
  tl.to('#sr-w2', { x: 30, y: -190, rotation: -2, duration: 0.4, ease: 'power2.out' }, 0.06);
  tl.to('#sr-w3', { x: 10, y: 150, rotation: 5, duration: 0.4, ease: 'power2.out' }, 0.09);
  tl.to('#sr-w4', { x: 40, y: 190, rotation: -4, duration: 0.4, ease: 'power2.out' }, 0.12);
  tl.to('#sr-w5', { x: 60, y: 140, rotation: 7, duration: 0.4, ease: 'power2.out' }, 0.15);
  tl.to('#sr-w6', { x: 90, y: -170, rotation: -5, duration: 0.4, ease: 'power2.out' }, 0.18);
  tl.to('#sr-bg', { scale: 0.96, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.05);
  tl.to('#sr-caret', { opacity: 0, duration: 0.1, ease: 'none' }, 0);
  // The list frame appears; "purchase" and "requests" become its title; the rest fades.
  tl.set(['#sr-t0', '#sr-t1', '#sr-done'], { opacity: 0 }, 0);
  tl.fromTo('#sr-tool', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, 0.15);
  tl.fromTo('#sr-meta', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0.85);
  fly($('#sr-w1'), $('#sr-t0'), 0.4, 0.5, -74, -225, 0.625);
  fly($('#sr-w2'), $('#sr-t1'), 0.45, 0.5, -151, -225, 0.625);
  tl.to(['#sr-w0', '#sr-w3', '#sr-w4', '#sr-w5', '#sr-w6'], { opacity: 0, duration: 0.2, ease: 'power1.in', stagger: 0.02 }, 0.1);
  // Rows stagger in from y 40.
  tl.fromTo('.sr-row', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.08 }, 0.75);
  // Approve flips to Approved, the check pops (KP@12.65); nothing waiting any more.
  tl.fromTo('#sr-approve', { scale: 1 }, { scale: 0.92, duration: 0.1, ease: 'power2.in', yoyo: true, repeat: 1 }, 1.5);
  tl.to('#sr-approve', { opacity: 0, duration: 0.12, ease: 'power2.in' }, 1.7);
  tl.to('#sr-done', { opacity: 1, duration: 0.12, ease: 'power2.out' }, 1.78);
  tl.fromTo('#sr-check', { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.6)', immediateRender: false }, 1.78);
  tl.to('#sr-new', { backgroundColor: '#ffffff', duration: 0.5, ease: 'power1.inOut' }, 1.78);
  const w = { v: 1 };
  tl.fromTo(w, { v: 1 }, { v: 0, duration: 0.01, ease: 'none', onUpdate: () => { $('#sr-wait').textContent = w.v < 0.5 ? '0' : '1'; } }, 1.85);
  // Shrinks to its card in the left third and is filed away (KP@13.40).
  tl.to('#sr-tool', { x: -490, y: -45, scale: 0.4, duration: 0.55, ease: 'power3.in' }, 2.25);
  tl.to('#sr-tool', { opacity: 0, duration: 0.15, ease: 'power1.in' }, 2.65);
  tl.set({}, {}, 2.8);
  return tl;
}

function sceneInspect(root) {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => root.querySelector(s);
  // Flies a word from the bar onto the label it becomes; the offsets are fixed, measured from the Figtree layout.
  const fly = (w, t, at, dur, dx, dy, s) => {
    tl.to(w, { x: dx, y: dy, rotation: 0, scale: s, duration: dur, ease: 'power3.inOut', immediateRender: false }, at);
    tl.to(w, { opacity: 0, duration: 0.08, ease: 'none' }, at + dur);
    tl.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none', immediateRender: false }, at + dur);
  };
  // Types the sentence into the bar's words, char by char, on one clock.
  const type = (prefix, words, at, dur) => {
    const full = words.map((w, i) => w + (i < words.length - 1 ? ' ' : ''));
    const total = full.reduce((n, w) => n + w.length, 0);
    const c = { n: 0 };
    tl.fromTo(c, { n: 0 }, { n: total, duration: dur, ease: 'none', onUpdate: () => {
      let left = Math.round(c.n);
      full.forEach((w, i) => { const k = Math.max(0, Math.min(w.length, left)); $('#' + prefix + '-w' + i).textContent = w.slice(0, k); left -= w.length; });
    } }, at);
  };

  // The bar returns and types faster.
  tl.fromTo('#si-bar', { scale: 0.92, opacity: 0.45, filter: 'blur(3px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: 'expo.out' }, 0);
  type('si', ['We', 'track', 'forklift', 'inspections', 'on', 'paper.'], 0.22, 0.7);
  // Same build, shorter.
  tl.to('#si-w0', { x: -60, y: -160, rotation: -5, duration: 0.4, ease: 'power2.out' }, 0.95);
  tl.to('#si-w1', { x: -20, y: 170, rotation: 4, duration: 0.4, ease: 'power2.out' }, 0.98);
  tl.to('#si-w2', { x: 0, y: -200, rotation: 2, duration: 0.4, ease: 'power2.out' }, 1.01);
  tl.to('#si-w3', { x: 20, y: -180, rotation: -3, duration: 0.4, ease: 'power2.out' }, 1.04);
  tl.to('#si-w4', { x: 50, y: 160, rotation: 6, duration: 0.4, ease: 'power2.out' }, 1.07);
  tl.to('#si-w5', { x: 80, y: 190, rotation: -6, duration: 0.4, ease: 'power2.out' }, 1.10);
  tl.to('#si-bg', { scale: 0.96, opacity: 0, duration: 0.25, ease: 'power2.in' }, 1.0);
  tl.to('#si-caret', { opacity: 0, duration: 0.1, ease: 'none' }, 0.95);
  tl.set(['#si-t0', '#si-t1'], { opacity: 0 }, 0);
  tl.fromTo('#si-tool', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 1.2);
  tl.fromTo('#si-meta', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' }, 1.5);
  fly($('#si-w2'), $('#si-t0'), 1.2, 0.4, -185, -298, 0.625);
  fly($('#si-w3'), $('#si-t1'), 1.24, 0.4, -236, -298, 0.625);
  tl.to(['#si-w0', '#si-w1', '#si-w4', '#si-w5'], { opacity: 0, duration: 0.2, ease: 'power1.in', stagger: 0.02 }, 1.0);
  tl.fromTo('.si-row', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.06 }, 1.4);
  // The five checks tick in turn with a small pop.
  const n = { v: 0 };
  tl.fromTo(n, { v: 0 }, { v: 5, duration: 0.6, ease: 'none', onUpdate: () => { $('#si-count').textContent = Math.min(5, Math.floor(n.v + 0.001)); } }, 1.73);
  for (let i = 0; i < 5; i++) {
    tl.fromTo('#si-box' + i, { backgroundColor: '#ffffff', borderColor: '#c9c7c0', scale: 1 }, { backgroundColor: '#094cb2', borderColor: '#094cb2', scale: 1.15, duration: 0.08, ease: 'power2.out', immediateRender: false }, 1.72 + i * 0.12);
    tl.to('#si-box' + i, { scale: 1, duration: 0.12, ease: 'power2.out' }, 1.8 + i * 0.12);
    tl.fromTo('#si-tick' + i, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(2.6)', immediateRender: false }, 1.72 + i * 0.12);
  }
  tl.set(['[id^="si-tick"]'], { scale: 0 }, 0);
  // Shrinks to its card in the centre third and is filed away (KP@13.40).
  tl.to('#si-tool', { x: 0, y: -45, scale: 0.4, duration: 0.55, ease: 'power3.in' }, 2.45);
  tl.to('#si-tool', { opacity: 0, duration: 0.15, ease: 'power1.in' }, 2.85);
  tl.set({}, {}, 3.0);
  return tl;
}

function sceneRegister(root) {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => root.querySelector(s);
  // Flies a word from the bar onto the label it becomes; the offsets are fixed, measured from the Figtree layout.
  const fly = (w, t, at, dur, dx, dy, s) => {
    tl.to(w, { x: dx, y: dy, rotation: 0, scale: s, duration: dur, ease: 'power3.inOut', immediateRender: false }, at);
    tl.to(w, { opacity: 0, duration: 0.08, ease: 'none' }, at + dur);
    tl.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none', immediateRender: false }, at + dur);
  };
  // Types the sentence into the bar's words, char by char, on one clock.
  const type = (prefix, words, at, dur) => {
    const full = words.map((w, i) => w + (i < words.length - 1 ? ' ' : ''));
    const total = full.reduce((n, w) => n + w.length, 0);
    const c = { n: 0 };
    tl.fromTo(c, { n: 0 }, { n: total, duration: dur, ease: 'none', onUpdate: () => {
      let left = Math.round(c.n);
      full.forEach((w, i) => { const k = Math.max(0, Math.min(w.length, left)); $('#' + prefix + '-w' + i).textContent = w.slice(0, k); left -= w.length; });
    } }, at);
  };

  // Types fastest.
  tl.fromTo('#sg-bar', { scale: 0.92, opacity: 0.45, filter: 'blur(3px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.25, ease: 'expo.out' }, 0);
  type('sg', ['Five', 'spreadsheets', 'for', 'one', 'equipment', 'register.'], 0.15, 0.5);
  tl.to('#sg-w0', { x: -50, y: 170, rotation: -5, duration: 0.4, ease: 'power2.out' }, 0.66);
  tl.to('#sg-w1', { x: -20, y: -190, rotation: 3, duration: 0.4, ease: 'power2.out' }, 0.69);
  tl.to('#sg-w2', { x: 0, y: 160, rotation: -4, duration: 0.4, ease: 'power2.out' }, 0.72);
  tl.to('#sg-w3', { x: 30, y: 180, rotation: 5, duration: 0.4, ease: 'power2.out' }, 0.75);
  tl.to('#sg-w4', { x: 40, y: -200, rotation: -2, duration: 0.4, ease: 'power2.out' }, 0.78);
  tl.to('#sg-w5', { x: 70, y: -170, rotation: 4, duration: 0.4, ease: 'power2.out' }, 0.81);
  tl.to('#sg-bg', { scale: 0.96, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.68);
  tl.to('#sg-caret', { opacity: 0, duration: 0.1, ease: 'none' }, 0.66);
  // Five sheet tabs fan out from the bar.
  tl.fromTo('#sg-tab0', { x: 0, y: 40, rotation: 0, scale: 0.4, opacity: 0 }, { x: -520, y: -40, rotation: -9, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.74);
  tl.fromTo('#sg-tab1', { x: 0, y: 40, rotation: 0, scale: 0.4, opacity: 0 }, { x: -260, y: -70, rotation: -4, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.78);
  tl.fromTo('#sg-tab2', { x: 0, y: 40, rotation: 0, scale: 0.4, opacity: 0 }, { x: 0, y: -80, rotation: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.82);
  tl.fromTo('#sg-tab3', { x: 0, y: 40, rotation: 0, scale: 0.4, opacity: 0 }, { x: 260, y: -70, rotation: 4, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.86);
  tl.fromTo('#sg-tab4', { x: 0, y: 40, rotation: 0, scale: 0.4, opacity: 0 }, { x: 520, y: -40, rotation: 9, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0.90);
  // Their rows converge on one table.
  tl.to('[id^="sg-tab"]', { x: 0, y: 40, rotation: 0, scale: 0.6, opacity: 0, duration: 0.4, ease: 'power3.inOut', stagger: 0.03 }, 1.08);
  tl.set(['#sg-t0', '#sg-t1'], { opacity: 0 }, 0);
  tl.fromTo('#sg-tool', { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 1.1);
  tl.fromTo(['#sg-meta', '#sg-th'], { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' }, 1.3);
  fly($('#sg-w4'), $('#sg-t0'), 1.0, 0.4, -550, -216, 0.625);
  fly($('#sg-w5'), $('#sg-t1'), 1.04, 0.4, -639, -216, 0.625);
  tl.to(['#sg-w0', '#sg-w1', '#sg-w2', '#sg-w3'], { opacity: 0, duration: 0.2, ease: 'power1.in', stagger: 0.02 }, 0.66);
  tl.fromTo('.sg-row', { opacity: 0, x: (i) => [-360, 360, -360, 360][i] }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.inOut', stagger: 0.04 }, 1.12);
  // Shrinks to its card in the right third and is filed away (KP@13.40).
  tl.to('#sg-tool', { x: 490, y: -45, scale: 0.4, duration: 0.55, ease: 'power3.in' }, 2.45);
  tl.to('#sg-tool', { opacity: 0, duration: 0.15, ease: 'power1.in' }, 2.85);
  tl.set({}, {}, 3.0);
  return tl;
}

function sceneWall(root) {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => root.querySelector(s);
  // Flies a word from the bar onto the label it becomes; the offsets are fixed, measured from the Figtree layout.
  const fly = (w, t, at, dur, dx, dy, s) => {
    tl.to(w, { x: dx, y: dy, rotation: 0, scale: s, duration: dur, ease: 'power3.inOut', immediateRender: false }, at);
    tl.to(w, { opacity: 0, duration: 0.08, ease: 'none' }, at + dur);
    tl.fromTo(t, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none', immediateRender: false }, at + dur);
  };
  // Types the sentence into the bar's words, char by char, on one clock.
  const type = (prefix, words, at, dur) => {
    const full = words.map((w, i) => w + (i < words.length - 1 ? ' ' : ''));
    const total = full.reduce((n, w) => n + w.length, 0);
    const c = { n: 0 };
    tl.fromTo(c, { n: 0 }, { n: total, duration: dur, ease: 'none', onUpdate: () => {
      let left = Math.round(c.n);
      full.forEach((w, i) => { const k = Math.max(0, Math.min(w.length, left)); $('#' + prefix + '-w' + i).textContent = w.slice(0, k); left -= w.length; });
    } }, at);
  };

  // The three tools settle side by side with a slight stagger.
  tl.fromTo('.sw-card', { opacity: 0.45, y: 40, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out', stagger: 0.1 }, 0);
  tl.fromTo('#sw-line .lw', { opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.13, ease: 'none', stagger: 0.067 }, 0.5);
  // Holds, then the cards pull together and fold into the empty bar (KP@13.40 in reverse).
  tl.to('#sw-line', { opacity: 0, duration: 0.2, ease: 'power1.in' }, 2.2);
  tl.to('#sw-card0', { x: 490, y: 45, scale: 0.15, opacity: 0, duration: 0.55, ease: 'power3.in' }, 2.2);
  tl.to('#sw-card1', { x: 0, y: 45, scale: 0.15, opacity: 0, duration: 0.55, ease: 'power3.in' }, 2.24);
  tl.to('#sw-card2', { x: -490, y: 45, scale: 0.15, opacity: 0, duration: 0.55, ease: 'power3.in' }, 2.28);
  tl.fromTo('#sw-bar', { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, y: 8, duration: 0.5, ease: 'expo.out' }, 2.6);
  // The empty bar and its caret: frame one again. The caret blinks once.
  tl.set('#sw-caret', { opacity: 0 }, 3.15);
  tl.set('#sw-caret', { opacity: 1 }, 3.4);
  tl.set({}, {}, 3.6);
  return tl;
}

/** Each scene's root id, its timeline builder, and where it sits in the 14 s loop (seconds). */
export const SCENES = [
  { id: "say-ask", build: sceneAsk, start: 0, duration: 1.6 },
  { id: "say-requests", build: sceneRequests, start: 1.6, duration: 2.8 },
  { id: "say-inspect", build: sceneInspect, start: 4.4, duration: 3.0 },
  { id: "say-register", build: sceneRegister, start: 7.4, duration: 3.0 },
  { id: "say-wall", build: sceneWall, start: 10.4, duration: 3.6 },
];
