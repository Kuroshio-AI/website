// Ported from the HyperFrames project at ~/.hyperframes-studio/Copy of KTrack Website Mini Demo/.
// Every id is prefixed kp-, each scene's CSS is scoped to its own root, and queries stay inside it.
import { gsap } from "@/lib/motion";

export const CSS = `@font-face { font-family: "Figtree KP"; src: url("/demos/figtree.woff2") format("woff2"); font-weight: 300 900; }
/* plant */
#kp-plant {
  --ground: #26251F; --kblue: #0450C8; --fg: #1d293d; --muted: #68778d; --border: #d4d9e1;
  --ok: #00bc7d; --primary: #094cb2;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif;
}
#kp-p-cam { position: absolute; left: 0; top: 0; width: 1620px; height: 1080px; transform-origin: 300px 135px; }
#kp-p-photo { position: absolute; left: 0; top: 0; width: 1620px; height: 1080px; object-fit: cover; }
#kp-p-leaders { position: absolute; left: 0; top: 0; width: 1620px; height: 1080px; overflow: visible; }
#kp-p-leaders line { stroke: #ffffff; stroke-width: 3; stroke-linecap: round; }
#kp-plant .p-pin { position: absolute; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 50%; background: var(--kblue); border: 4px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.35); }
#kp-plant .p-tag { position: absolute; width: 300px; padding: 16px 20px 14px; background: #fff; border-radius: 14px; border: 1px solid var(--border); box-shadow: 0 6px 18px rgba(0,0,0,.28); color: var(--fg); }
#kp-plant .p-head { display: flex; align-items: center; gap: 8px; font-size: 22px; font-weight: 700; line-height: 1.1; }
#kp-plant .p-head svg { width: 20px; height: 20px; color: var(--kblue); flex: none; }
#kp-plant .p-val { position: relative; height: 50px; margin-top: 8px; overflow: hidden; }
#kp-plant .p-num { position: absolute; left: 0; top: 0; font-size: 42px; line-height: 50px; font-weight: 750; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
#kp-plant .p-num small { font-size: 24px; font-weight: 600; color: var(--muted); margin-left: 6px; letter-spacing: 0; }
#kp-plant .p-meta { position: relative; display: flex; align-items: center; gap: 6px; margin-top: 4px; height: 24px; font-size: 18px; color: var(--muted); font-weight: 500; overflow: hidden; }
#kp-plant .p-meta svg { width: 17px; height: 17px; color: var(--ok); flex: none; }
#kp-plant .p-ts { position: relative; display: inline-block; width: 78px; height: 24px; }
#kp-plant .p-ts span { position: absolute; left: 0; top: 0; line-height: 24px; font-variant-numeric: tabular-nums; }
#kp-plant .p-bar { margin-top: 10px; height: 5px; border-radius: 99px; background: #eef1f5; overflow: hidden; }
#kp-plant .p-bar i { display: block; width: 100%; height: 100%; background: var(--kblue); transform-origin: 0 50%; transform: scaleX(0); }
#kp-p-wash { position: absolute; inset: 0; background: var(--ground); opacity: 0; }
/* energy */
#kp-energy {
  --ground: #26251F; --kblue: #0450C8; --primary: #094cb2; --fg: #1d293d; --muted: #68778d;
  --border: #d4d9e1; --panel-muted: #f4f6f9; --ok: #00bc7d; --ok-bg: #e0f6ef;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#kp-energy svg.i { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
#kp-e-app { position: absolute; left: 60px; top: 60px; width: 1500px; height: 960px; background: #fff; border-radius: 18px; overflow: hidden; transform-origin: 590px 380px; }
#kp-e-bar { position: absolute; left: 0; top: 0; right: 0; height: 76px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 36px; gap: 14px; }
#kp-e-k { width: 44px; height: 44px; border-radius: 10px; background: var(--primary); color: #fff; font-weight: 800; font-size: 24px; display: grid; place-items: center; }
#kp-e-bar b { display: block; font-size: 21px; font-weight: 750; line-height: 1.1; }
#kp-e-bar span { display: block; font-size: 16px; color: var(--muted); font-weight: 500; }
#kp-e-nav { margin-left: auto; display: flex; gap: 30px; font-size: 19px; font-weight: 600; color: var(--muted); }
#kp-e-nav .on { color: var(--primary); }
#kp-e-page { position: absolute; left: 0; top: 77px; width: 1500px; height: 883px; transform-origin: 750px 330px; }
#kp-e-back { position: absolute; left: 56px; top: 34px; display: flex; align-items: center; gap: 8px; font-size: 19px; font-weight: 600; color: var(--primary); }
#kp-e-back svg { width: 20px; height: 20px; }
#kp-e-eyebrow { position: absolute; left: 56px; top: 82px; font-size: 17px; font-weight: 650; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); }
#kp-e-h1 { position: absolute; left: 54px; top: 106px; font-size: 62px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.1; }
#kp-e-detail { position: absolute; left: 56px; top: 182px; font-size: 20px; color: var(--muted); font-weight: 500; }
#kp-e-meter { position: absolute; right: 56px; top: 132px; display: flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 600; }
#kp-e-meter svg { width: 22px; height: 22px; color: var(--ok); }
#kp-e-meter em { font-style: normal; color: var(--muted); font-weight: 500; margin-left: 8px; }
#kp-e-ps { position: absolute; left: 56px; top: 244px; font-size: 25px; font-weight: 650; }
#kp-e-kpis { position: absolute; left: 56px; top: 290px; width: 1388px; height: 168px; border: 1px solid var(--border); border-radius: 14px; display: flex; }
#kp-energy .e-kpi { position: relative; flex: 1; padding: 24px 30px; border-left: 1px solid var(--border); }
#kp-energy .e-kpi:first-child { border-left: 0; }
#kp-energy .e-lab { display: flex; align-items: center; gap: 9px; font-size: 19px; font-weight: 500; color: var(--muted); }
#kp-energy .e-lab svg { width: 21px; height: 21px; color: var(--primary); }
#kp-energy .e-kpi.ok .e-lab svg { color: var(--ok); }
#kp-energy .e-fig { margin-top: 12px; font-size: 48px; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; line-height: 1.05; }
#kp-energy .e-n { display: inline-block; text-align: right; }
#kp-e-kwh { width: 2.75em; } #kp-e-aed { width: 3.3em; } #kp-e-share { width: 2.2em; }
#kp-energy .e-fig small { font-size: 26px; font-weight: 600; color: var(--muted); margin-left: 6px; letter-spacing: 0; }
#kp-energy .e-note { margin-top: 8px; font-size: 16px; color: var(--muted); }
#kp-e-ring { position: absolute; left: 518px; top: 290px; width: 463px; height: 168px; border: 3px solid var(--kblue); border-radius: 14px; opacity: 0; }
#kp-e-chart { position: absolute; left: 56px; top: 488px; width: 1388px; height: 368px; border: 1px solid var(--border); border-radius: 14px; }
#kp-e-ct { position: absolute; left: 30px; top: 22px; font-size: 23px; font-weight: 650; }
#kp-e-cn { position: absolute; left: 30px; top: 56px; font-size: 17px; color: var(--muted); }
#kp-e-legend { position: absolute; right: 30px; top: 28px; display: flex; gap: 26px; font-size: 17px; color: var(--muted); align-items: center; }
#kp-e-legend i { display: inline-block; width: 22px; height: 12px; border-radius: 3px; background: #e6edfb; margin-right: 8px; vertical-align: -1px; }
#kp-e-legend i.fc { height: 0; border-top: 3px dashed #9fb3d1; background: none; border-radius: 0; vertical-align: 3px; }
#kp-e-svg { position: absolute; left: 0; top: 0; width: 1388px; height: 368px; overflow: visible; }
#kp-e-svg text { font-family: "Figtree KP", system-ui, sans-serif; font-size: 15px; fill: #68778d; }
/* alert */
#kp-alert {
  --ground: #26251F; --kblue: #0450C8; --primary: #094cb2; --fg: #1d293d; --muted: #68778d; --border: #d4d9e1;
  --ok: #00bc7d; --ok-bg: #e0f6ef; --warn: #da763c; --warn-bg: #fff3e8; --warn-bd: #fde2cf; --crit: #d36039; --crit-bg: #fee8e7;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#kp-alert svg.i { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
#kp-a-app { position: absolute; left: 60px; top: 60px; width: 1500px; height: 960px; background: #fff; border-radius: 18px; overflow: hidden; }
#kp-a-bar { position: absolute; left: 0; top: 0; right: 0; height: 76px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 36px; gap: 14px; }
#kp-a-k { width: 44px; height: 44px; border-radius: 10px; background: var(--primary); color: #fff; font-weight: 800; font-size: 24px; display: grid; place-items: center; }
#kp-a-bar b { display: block; font-size: 21px; font-weight: 750; line-height: 1.1; }
#kp-a-bar span { display: block; font-size: 16px; color: var(--muted); font-weight: 500; }
#kp-a-nav { margin-left: auto; display: flex; gap: 30px; font-size: 19px; font-weight: 600; color: var(--muted); }
#kp-a-nav .on { color: var(--primary); }

#kp-a-trend { position: absolute; left: 44px; top: 112px; width: 800px; height: 800px; }
#kp-a-tt { position: absolute; left: 0; top: 0; display: flex; align-items: center; gap: 10px; font-size: 30px; font-weight: 750; letter-spacing: -0.02em; }
#kp-a-tt svg { width: 28px; height: 28px; color: var(--primary); }
#kp-a-ts { position: absolute; left: 0; top: 46px; font-size: 19px; color: var(--muted); }
#kp-a-svg { position: absolute; left: 0; top: 100px; width: 800px; height: 640px; overflow: visible; }
#kp-a-svg text { font-family: "Figtree KP", system-ui, sans-serif; font-size: 16px; fill: #68778d; }
#kp-a-tag { position: absolute; left: 520px; top: 150px; padding: 10px 16px; border-radius: 10px; background: var(--warn-bg); border: 1px solid var(--warn-bd); color: var(--warn); font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px; white-space: nowrap; }
#kp-a-tag svg { width: 20px; height: 20px; }
#kp-a-since { position: absolute; left: 400px; top: 560px; font-size: 17px; font-weight: 600; color: var(--warn); white-space: nowrap; }

#kp-a-sheet { position: absolute; left: 870px; top: 77px; width: 630px; height: 883px; border-left: 1px solid var(--border); background: #fff; box-shadow: -14px 0 30px rgba(29,41,61,.08); }
#kp-a-sheet > * { position: absolute; }
#kp-a-eyebrow { left: 32px; top: 28px; font-size: 18px; font-weight: 650; color: var(--primary); }
#kp-a-eyebrow em { font-style: normal; color: var(--muted); font-weight: 500; margin-left: 6px; }
#kp-a-h3 { left: 32px; top: 60px; font-size: 38px; font-weight: 800; letter-spacing: -0.03em; }
#kp-a-type { left: 32px; top: 110px; font-size: 19px; color: var(--muted); }
#kp-a-pill { right: 32px; top: 70px; display: flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 99px; background: var(--warn-bg); border: 1px solid var(--warn-bd); color: var(--warn); font-size: 17px; font-weight: 650; }
#kp-a-pill svg { width: 19px; height: 19px; }
#kp-a-btn { left: 32px; top: 152px; height: 54px; padding: 0 22px; border-radius: 10px; background: var(--primary); color: #fff; display: flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 650; }
#kp-a-btn svg { width: 20px; height: 20px; }
#kp-alert .a-card { left: 32px; width: 566px; border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; }
#kp-alert .a-lab { display: flex; align-items: center; gap: 7px; font-size: 15px; font-weight: 650; color: var(--muted); }
#kp-alert .a-lab svg { width: 16px; height: 16px; }
#kp-a-trig { top: 232px; height: 290px; }
#kp-a-trig .h { margin-top: 12px; display: flex; align-items: center; gap: 10px; font-size: 21px; font-weight: 700; }
#kp-a-trig .h i { font-style: normal; padding: 3px 10px; border-radius: 99px; background: var(--warn-bg); border: 1px solid var(--warn-bd); color: var(--warn); font-size: 14px; font-weight: 650; }
#kp-a-read { margin-top: 8px; font-size: 40px; font-weight: 750; color: var(--warn); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
#kp-a-read small { font-size: .55em; font-weight: 600; margin-left: 6px; }
#kp-a-sum { font-size: 16px; color: var(--muted); }
#kp-a-track { position: relative; margin-top: 18px; height: 12px; display: flex; gap: 3px; }
#kp-a-track b { height: 12px; border-radius: 4px; }
#kp-a-mark { position: absolute; left: 0; top: -5px; width: 22px; height: 22px; margin-left: -11px; border-radius: 50%; background: #fff; border: 4px solid var(--warn); box-shadow: 0 0 0 4px rgba(218,118,60,.2); }
#kp-a-ticks { position: relative; height: 22px; margin-top: 6px; font-size: 14px; color: var(--muted); font-variant-numeric: tabular-nums; }
#kp-a-ticks span { position: absolute; top: 0; transform: translateX(-50%); }
#kp-a-leg { margin-top: 4px; display: flex; gap: 18px; font-size: 14px; color: var(--muted); }
#kp-a-leg i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 6px; }
#kp-a-prose { left: 32px; top: 542px; width: 566px; font-size: 19px; line-height: 1.55; color: var(--muted); }
#kp-a-prose b { color: var(--fg); font-weight: 650; }
#kp-a-rec { top: 650px; height: 128px; border-left: 3px solid var(--primary) !important; }
#kp-a-rec p { margin: 10px 0 0; font-size: 19px; line-height: 1.45; color: var(--fg); font-weight: 500; }

#kp-a-cursor { position: absolute; left: 0; top: 0; width: 40px; height: 40px; filter: drop-shadow(0 3px 5px rgba(0,0,0,.35)); }
/* logbook */
#kp-logbook {
  --ground: #26251F; --kblue: #0450C8; --primary: #094cb2; --fg: #1d293d; --muted: #68778d; --border: #d4d9e1; --soft: #f4f6f9;
  --ok: #00bc7d; --ok-bg: #e0f6ef; --ok-bd: #a7e8d1; --warn: #da763c; --warn-bg: #fff3e8; --warn-bd: #fde2cf;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#kp-logbook svg.i { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
#kp-l-app { position: absolute; left: 60px; top: 60px; width: 1500px; height: 960px; background: #fff; border-radius: 18px; overflow: hidden; transform-origin: 50% 50%; }
#kp-l-bar { position: absolute; left: 0; top: 0; right: 0; height: 76px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 36px; gap: 14px; background: #fff; z-index: 2; }
#kp-l-k { width: 44px; height: 44px; border-radius: 10px; background: var(--primary); color: #fff; font-weight: 800; font-size: 24px; display: grid; place-items: center; }
#kp-l-bar b { display: block; font-size: 21px; font-weight: 750; line-height: 1.1; }
#kp-l-bar span { display: block; font-size: 16px; color: var(--muted); font-weight: 500; }
#kp-l-nav { margin-left: auto; display: flex; gap: 30px; font-size: 19px; font-weight: 600; color: var(--muted); }
#kp-l-nav .on { color: var(--primary); }
#kp-l-page { position: absolute; left: 0; top: 77px; width: 1500px; height: 883px; }
#kp-l-h { position: absolute; left: 56px; top: 36px; font-size: 44px; font-weight: 800; letter-spacing: -0.03em; }
#kp-l-sub { position: absolute; left: 58px; top: 98px; font-size: 20px; color: var(--muted); }

#kp-logbook .l-card { position: absolute; left: 56px; width: 1388px; border: 1px solid var(--border); border-radius: 12px; padding: 22px 28px; background: #fff; }
#kp-logbook .l-badges { display: flex; align-items: center; gap: 10px; }
#kp-logbook .l-b { display: inline-flex; align-items: center; gap: 7px; padding: 5px 12px; border-radius: 8px; font-size: 16px; font-weight: 650; background: var(--soft); color: var(--fg); }
#kp-logbook .l-b svg { width: 16px; height: 16px; }
#kp-logbook .l-b.pri { background: rgba(9,76,178,.1); color: var(--primary); }
#kp-logbook .l-meta { margin-top: 12px; display: flex; gap: 22px; font-size: 17px; color: var(--muted); }
#kp-logbook .l-meta span { display: inline-flex; align-items: center; gap: 7px; }
#kp-logbook .l-meta svg { width: 17px; height: 17px; }
#kp-logbook .l-issue { margin-top: 12px; font-size: 21px; font-weight: 550; }
#kp-logbook .l-status { position: absolute; right: 28px; top: 22px; display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 99px; font-size: 16px; font-weight: 650; border: 1px solid; }
#kp-logbook .l-status svg { width: 17px; height: 17px; }
#kp-logbook .l-status.ok { background: var(--ok-bg); color: var(--ok); border-color: var(--ok-bd); }
#kp-logbook .l-status.warn { background: var(--warn-bg); color: var(--warn); border-color: var(--warn-bd); }
#kp-logbook .l-old { height: 150px; }
#kp-logbook .l-old .l-issue { color: var(--fg); font-weight: 500; }

#kp-l-new { top: 160px; height: 380px; clip-path: inset(0 0 186px 0 round 12px); z-index: 1; }
#kp-l-hl { position: absolute; inset: 0; border-radius: 12px; background: #f0f5ff; border-left: 5px solid var(--kblue); }
#kp-l-new > :not(#kp-l-hl):not(.l-status) { position: relative; }
#kp-l-more { margin-top: 12px; font-size: 17px; font-weight: 650; color: var(--primary); }
#kp-l-det { margin-top: 18px; display: grid; gap: 12px; }
#kp-l-link { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 10px; background: var(--warn-bg); border: 1px solid var(--warn-bd); color: var(--fg); font-size: 18px; }
#kp-l-link svg { width: 19px; height: 19px; color: var(--warn); }
#kp-l-act { font-size: 18px; color: var(--fg); }
#kp-l-act b { font-weight: 650; }
#kp-l-fu { font-size: 17px; color: var(--muted); }
#kp-l-edge { position: absolute; left: 56px; top: 0; width: 1390px; height: 1px; background: var(--border); z-index: 1; }
/* carbon */
#kp-carbon {
  --ground: #26251F; --kblue: #0450C8; --primary: #094cb2; --fg: #1d293d; --muted: #68778d; --border: #d4d9e1;
  --ok: #00bc7d; --ok-bg: #e0f6ef;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: "Figtree KP", system-ui, sans-serif; color: var(--fg);
}
#kp-carbon svg.i { fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
#kp-c-cam { position: absolute; left: 0; top: 0; width: 1620px; height: 1080px; transform-origin: 440px 300px; opacity: 0; }
#kp-c-photo { position: absolute; left: 0; top: 0; width: 1620px; height: 1080px; object-fit: cover; }
#kp-c-app { position: absolute; left: 60px; top: 60px; width: 1500px; height: 960px; background: #fff; border-radius: 18px; overflow: hidden; transform-origin: 50% 50%; }
#kp-c-bar { position: absolute; left: 0; top: 0; right: 0; height: 76px; border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 36px; gap: 14px; background: #fff; z-index: 2; }
#kp-c-k { width: 44px; height: 44px; border-radius: 10px; background: var(--primary); color: #fff; font-weight: 800; font-size: 24px; display: grid; place-items: center; }
#kp-c-bar b { display: block; font-size: 21px; font-weight: 750; line-height: 1.1; }
#kp-c-bar span { display: block; font-size: 16px; color: var(--muted); font-weight: 500; }
#kp-c-nav { margin-left: auto; display: flex; gap: 30px; font-size: 19px; font-weight: 600; color: var(--muted); }
#kp-c-nav .on { color: var(--primary); }
#kp-c-page { position: absolute; left: 0; top: 77px; width: 1500px; height: 883px; transform-origin: 1270px 400px; }
#kp-c-eyebrow { position: absolute; left: 56px; top: 40px; font-size: 17px; font-weight: 650; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); }
#kp-c-h1 { position: absolute; left: 54px; top: 64px; font-size: 62px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.1; }
#kp-c-detail { position: absolute; left: 56px; top: 140px; font-size: 20px; color: var(--muted); font-weight: 500; }
#kp-c-ps { position: absolute; left: 56px; top: 250px; font-size: 25px; font-weight: 650; }
#kp-c-kpis { position: absolute; left: 56px; top: 296px; width: 1388px; height: 210px; border: 1px solid var(--border); border-radius: 14px; display: flex; }
#kp-carbon .c-kpi { position: relative; flex: 1; padding: 26px 28px; border-left: 1px solid var(--border); }
#kp-carbon .c-kpi:first-child { border-left: 0; }
#kp-carbon .c-lab { display: flex; align-items: center; gap: 9px; font-size: 19px; font-weight: 500; color: var(--muted); }
#kp-carbon .c-lab svg { width: 21px; height: 21px; color: var(--primary); }
#kp-carbon .c-kpi.ok .c-lab svg { color: var(--ok); }
#kp-carbon .c-fig { margin-top: 14px; font-size: 46px; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; line-height: 1.05; white-space: nowrap; }
#kp-carbon .c-fig small { font-size: 24px; font-weight: 600; color: var(--muted); margin-left: 6px; letter-spacing: 0; }
#kp-carbon .c-note { margin-top: 10px; font-size: 16px; color: var(--muted); }
#kp-c-carbon .c-lab { color: var(--fg); font-weight: 650; }
#kp-c-ring { position: absolute; left: 1097px; top: 296px; width: 347px; height: 210px; border: 3px solid var(--kblue); border-radius: 14px; }
#kp-c-trend { position: absolute; left: 56px; top: 540px; width: 1388px; height: 300px; border: 1px solid var(--border); border-radius: 14px; }
#kp-c-trend .t { position: absolute; left: 30px; top: 22px; font-size: 23px; font-weight: 650; }
#kp-c-trend .n { position: absolute; left: 30px; top: 56px; font-size: 17px; color: var(--muted); }
#kp-c-bars { position: absolute; left: 30px; right: 30px; bottom: 28px; height: 170px; display: flex; align-items: flex-end; gap: 14px; }
#kp-c-bars i { flex: 1; background: #cfe9df; border-radius: 6px 6px 0 0; transform-origin: 50% 100%; }
#kp-c-bars i.today { background: var(--ok); }`;

export const MARKUP = `<div id="kp-plant">
  <div id="kp-p-cam">
    <img id="kp-p-photo" src="/kuroshio/chiller-plant.jpg" alt="Chiller plant room">
    <svg id="kp-p-leaders" viewBox="0 0 1620 1080">
      <line id="kp-p-ln-1" x1="300" y1="212" x2="440" y2="300"/>
      <line id="kp-p-ln-2" x1="710" y1="262" x2="870" y2="320"/>
      <line id="kp-p-ln-3" x1="1170" y1="292" x2="1045" y2="330"/>
      <line id="kp-p-ln-4" x1="1223" y1="545" x2="1140" y2="545"/>
    </svg>
    <div class="p-pin" id="kp-p-pin-1" style="left:440px; top:300px"></div>
    <div class="p-pin" id="kp-p-pin-2" style="left:870px; top:320px"></div>
    <div class="p-pin" id="kp-p-pin-3" style="left:1045px; top:330px"></div>
    <div class="p-pin" id="kp-p-pin-4" style="left:1140px; top:545px"></div>

    <div class="p-tag" id="kp-p-tag-1" style="left:150px; top:60px">
      <div class="p-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg><span>Chiller 1</span></div>
      <div class="p-val"><div class="p-num p-old">48.22<small>A</small></div><div class="p-num p-new">48.61<small>A</small></div></div>
      <div class="p-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Current ·<span class="p-ts"><span class="p-old">10:16:00</span><span class="p-new">10:16:40</span></span></div>
      <div class="p-bar"><i></i></div>
    </div>
    <div class="p-tag" id="kp-p-tag-2" style="left:560px; top:110px">
      <div class="p-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg><span>Chiller 2</span></div>
      <div class="p-val"><div class="p-num p-old">51.06<small>A</small></div><div class="p-num p-new">50.87<small>A</small></div></div>
      <div class="p-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Current ·<span class="p-ts"><span class="p-old">10:16:00</span><span class="p-new">10:16:40</span></span></div>
      <div class="p-bar"><i></i></div>
    </div>
    <div class="p-tag" id="kp-p-tag-3" style="left:1020px; top:140px">
      <div class="p-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg><span>Chiller 3</span></div>
      <div class="p-val"><div class="p-num p-old">46.39<small>A</small></div><div class="p-num p-new">46.75<small>A</small></div></div>
      <div class="p-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Current ·<span class="p-ts"><span class="p-old">10:16:00</span><span class="p-new">10:16:40</span></span></div>
      <div class="p-bar"><i></i></div>
    </div>
    <div class="p-tag" id="kp-p-tag-4" style="left:1223px; top:470px">
      <div class="p-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg><span>Cooling Pump SKU</span></div>
      <div class="p-val"><div class="p-num p-old">12.84<small>A</small></div><div class="p-num p-new">12.91<small>A</small></div></div>
      <div class="p-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Current ·<span class="p-ts"><span class="p-old">10:16:00</span><span class="p-new">10:16:40</span></span></div>
      <div class="p-bar"><i></i></div>
    </div>
  </div>
  <div id="kp-p-wash"></div>
</div>
<div id="kp-energy">
  <div id="kp-e-app">
    <div id="kp-e-bar">
      <div id="kp-e-k" data-brand-mark>K</div>
      <div><b>KuroshioAI</b><span>Operations Portal</span></div>
      <div id="kp-e-nav"><span>Machines</span><span>Alerts</span><span>Logbook</span><span class="on">EnergyIQ</span></div>
    </div>
    <div id="kp-e-page">
      <div id="kp-e-back"><svg class="i" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>EnergyIQ overview</div>
      <div id="kp-e-eyebrow">Machine energy</div>
      <div id="kp-e-h1">Chiller 1</div>
      <div id="kp-e-detail">Today so far · Asia/Dubai</div>
      <div id="kp-e-meter"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Meter online<em>Last reading 10:16:40</em></div>
      <div id="kp-e-ps">Period summary</div>
      <div id="kp-e-kpis">
        <div class="e-kpi">
          <div class="e-lab"><svg class="i" viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>Consumption</div>
          <div class="e-fig"><span class="e-n" id="kp-e-kwh">412.6</span><small>kWh</small></div>
          <div class="e-note">Today so far</div>
        </div>
        <div class="e-kpi ok">
          <div class="e-lab"><svg class="i" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>Energy charge</div>
          <div class="e-fig"><small style="margin:0 8px 0 0">AED</small><span class="e-n" id="kp-e-aed">156.79</span></div>
          <div class="e-note">Energy charges only, not the full bill</div>
        </div>
        <div class="e-kpi">
          <div class="e-lab"><svg class="i" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>Share of site</div>
          <div class="e-fig"><span class="e-n" id="kp-e-share">32.1</span><small>%</small></div>
          <div class="e-note">Of the site's consumption</div>
        </div>
      </div>
      <div id="kp-e-ring"></div>
      <div id="kp-e-chart">
        <div id="kp-e-ct">Consumption</div>
        <div id="kp-e-cn">kWh per hour · zone</div>
        <div id="kp-e-legend"><span><i></i>Typical range</span><span><i class="fc"></i>Forecast</span></div>
        <svg id="kp-e-svg" viewBox="0 0 1388 368">
          <path id="kp-e-band" fill="#e6edfb" d=""/>
          <line x1="70" y1="330" x2="1350" y2="330" stroke="#d4d9e1" stroke-width="1.5"/>
          <path id="kp-e-fc" fill="none" stroke="#9fb3d1" stroke-width="3" stroke-dasharray="9 8" d=""/>
          <path id="kp-e-line" fill="none" stroke="#094cb2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d=""/>
          <circle id="kp-e-dot" r="8" fill="#094cb2" stroke="#fff" stroke-width="3"/>
          <text x="70" y="356">00:00</text><text x="390" y="356">06:00</text><text x="710" y="356">12:00</text><text x="1030" y="356">18:00</text><text x="1300" y="356">24:00</text>
        </svg>
      </div>
    </div>
  </div>
</div>
<div id="kp-alert">
  <div id="kp-a-app">
    <div id="kp-a-bar">
      <div id="kp-a-k">K</div>
      <div><b>KuroshioAI</b><span>Operations Portal</span></div>
      <div id="kp-a-nav"><span>Machines</span><span class="on">Alerts</span><span>Logbook</span><span>EnergyIQ</span></div>
    </div>

    <div id="kp-a-trend">
      <div id="kp-a-tt"><svg class="i" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>Vibration · m/s²</div>
      <div id="kp-a-ts">Chiller 1 · Daily average · last 6 weeks</div>
      <svg id="kp-a-svg" viewBox="0 0 800 640">
        <rect id="kp-a-zone" x="60" y="40" width="720" height="0" fill="#fff3e8"/>
        <line x1="60" y1="560" x2="780" y2="560" stroke="#d4d9e1" stroke-width="1.5"/>
        <line id="kp-a-wh" x1="60" y1="0" x2="780" y2="0" stroke="#da763c" stroke-width="2.5" stroke-dasharray="10 8"/>
        <text id="kp-a-whl" x="66" y="0">Warning high 5.0</text>
        <text x="20" y="565" text-anchor="middle">2</text><text id="kp-a-y4" x="20" y="0" text-anchor="middle">4</text><text id="kp-a-y6" x="20" y="0" text-anchor="middle">6</text>
        <path id="kp-a-line" fill="none" stroke="#094cb2" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d=""/>
        <circle id="kp-a-dot" r="10" fill="#da763c" stroke="#fff" stroke-width="4"/>
        <text x="60" y="600">Jun 9</text><text x="290" y="600">Jun 23</text><text x="520" y="600">Jul 7</text><text x="780" y="600" text-anchor="end">Jul 21</text>
      </svg>
      <div id="kp-a-since">Rising since Jul 3</div>
      <div id="kp-a-tag"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Early bearing wear</div>
    </div>

    <div id="kp-a-sheet">
      <div id="kp-a-eyebrow">Alert explanation<em>#702</em></div>
      <div id="kp-a-h3">Chiller 1</div>
      <div id="kp-a-type">Chiller</div>
      <div id="kp-a-pill"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Medium severity</div>
      <div id="kp-a-btn"><svg class="i" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Log repair</div>
      <div class="a-card" id="kp-a-trig">
        <div class="a-lab"><svg class="i" viewBox="0 0 24 24"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>Trigger</div>
        <div class="h">Vibration<i>Warning</i></div>
        <div id="kp-a-read"><span id="kp-a-rv">5.78</span><small>m/s²</small></div>
        <div id="kp-a-sum">0.78 m/s² over warning high</div>
        <div id="kp-a-track"><b style="flex:50; background:#a7e8d1"></b><b style="flex:20; background:#fde2cf"></b><b style="flex:30; background:#efb29a"></b><div id="kp-a-mark"></div></div>
        <div id="kp-a-ticks"><span style="left:0%">0</span><span style="left:50%">5.0</span><span style="left:70%">7.0</span><span style="left:100%">10</span></div>
        <div id="kp-a-leg"><span><i style="background:#00bc7d"></i>Normal</span><span><i style="background:#da763c"></i>Warning</span><span><i style="background:#d36039"></i>Critical</span></div>
      </div>
      <div id="kp-a-prose">Vibration has climbed for <b>18 days</b>, a pattern consistent with early bearing wear, weeks before it would fail.</div>
      <div class="a-card" id="kp-a-rec">
        <div class="a-lab"><svg class="i" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Recommendation</div>
        <p>Schedule a predictive maintenance check if the condition continues.</p>
      </div>
    </div>
  </div>
  <svg id="kp-a-cursor" viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15.5 L12.5 22.5 L15.5 21 L12 14 L19 14 Z" fill="#1d293d" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>
</div>
<div id="kp-logbook">
  <div id="kp-l-app">
    <div id="kp-l-bar">
      <div id="kp-l-k">K</div>
      <div><b>KuroshioAI</b><span>Operations Portal</span></div>
      <div id="kp-l-nav"><span>Machines</span><span>Alerts</span><span class="on">Logbook</span><span>EnergyIQ</span></div>
    </div>
    <div id="kp-l-page">
      <div id="kp-l-h">Maintenance records</div>
      <div id="kp-l-sub">Chiller 1 · Digital logbook</div>

      <div class="l-card l-old" id="kp-l-old-1" style="top:160px">
        <div class="l-badges"><span class="l-b pri"><svg class="i" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Service record</span><span class="l-b">Inspection</span></div>
        <div class="l-meta"><span><svg class="i" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Maintenance technician</span><span><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Jun 30, 2026, 09:40</span></div>
        <div class="l-issue">Quarterly condition check, no issues found.</div>
        <div class="l-status ok"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Running - normal</div>
      </div>
      <div class="l-card l-old" id="kp-l-old-2" style="top:326px">
        <div class="l-badges"><span class="l-b pri"><svg class="i" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Service record</span><span class="l-b">Repair</span></div>
        <div class="l-meta"><span><svg class="i" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Maintenance technician</span><span><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>May 12, 2026, 14:05</span></div>
        <div class="l-issue">Condenser fan belt replaced.</div>
        <div class="l-status ok"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>Running - normal</div>
      </div>

      <div class="l-card" id="kp-l-new">
        <div id="kp-l-hl"></div>
        <div class="l-badges"><span class="l-b pri"><svg class="i" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>Service record</span><span class="l-b">Repair</span><span class="l-b pri" id="kp-l-wo">WO-104</span></div>
        <div class="l-meta"><span><svg class="i" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Plant manager</span><span><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Jul 21, 2026, 10:17</span></div>
        <div class="l-issue">Medium severity alert for vibration, triggered Jul 21, 2026, 10:12.</div>
        <div id="kp-l-more">View details</div>
        <div id="kp-l-det">
          <div id="kp-l-link"><svg class="i" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>Linked alert 702 · medium · vibration · Triggered Jul 21, 2026</div>
          <div id="kp-l-act"><b>Recommended action — confirm or replace:</b> Schedule a predictive maintenance check if the condition continues.</div>
          <div id="kp-l-fu">No follow-up set</div>
        </div>
        <div class="l-status warn" style="z-index:1"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Open issue</div>
      </div>
      <div id="kp-l-edge"></div>
    </div>
  </div>
</div>
<div id="kp-carbon">
  <div id="kp-c-cam"><img id="kp-c-photo" src="/kuroshio/chiller-plant.jpg" alt="Chiller plant room"></div>
  <div id="kp-c-app">
    <div id="kp-c-bar">
      <div id="kp-c-k">K</div>
      <div><b>KuroshioAI</b><span>Operations Portal</span></div>
      <div id="kp-c-nav"><span>Machines</span><span>Alerts</span><span>Logbook</span><span class="on">EnergyIQ</span></div>
    </div>
    <div id="kp-c-page">
      <div id="kp-c-eyebrow">Machine energy</div>
      <div id="kp-c-h1">Chiller 1</div>
      <div id="kp-c-detail">Today so far · Asia/Dubai</div>
      <div id="kp-c-ps">Period summary</div>
      <div id="kp-c-kpis">
        <div class="c-kpi">
          <div class="c-lab"><svg class="i" viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>Consumption</div>
          <div class="c-fig">412.6<small>kWh</small></div>
          <div class="c-note">Today so far</div>
        </div>
        <div class="c-kpi ok">
          <div class="c-lab"><svg class="i" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>Energy charge</div>
          <div class="c-fig"><small style="margin:0 8px 0 0">AED</small>156.79</div>
          <div class="c-note">Energy charges only, not the full bill</div>
        </div>
        <div class="c-kpi">
          <div class="c-lab"><svg class="i" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>Share of site</div>
          <div class="c-fig">32.1<small>%</small></div>
          <div class="c-note">Of the site's consumption</div>
        </div>
        <div class="c-kpi ok" id="kp-c-carbon">
          <div class="c-lab"><svg class="i" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>Carbon</div>
          <div class="c-fig"><span id="kp-c-co2" style="display:inline-block; width:2.75em; text-align:right">165.0</span><small>kg CO₂e</small></div>
          <div class="c-note">Estimated from metered energy</div>
        </div>
      </div>
      <div id="kp-c-ring"></div>
      <div id="kp-c-trend">
        <div class="t">Carbon</div>
        <div class="n">kg CO₂e per day · last 14 days</div>
        <div id="kp-c-bars"><i style="height:62%"></i><i style="height:58%"></i><i style="height:66%"></i><i style="height:71%"></i><i style="height:64%"></i><i style="height:49%"></i><i style="height:47%"></i><i style="height:63%"></i><i style="height:68%"></i><i style="height:70%"></i><i style="height:66%"></i><i style="height:52%"></i><i style="height:50%"></i><i class="today" style="height:44%"></i></div>
      </div>
    </div>
  </div>
</div>`;

function scenePlant(root) {
  return (() => {
    const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];
    const tl = gsap.timeline({ paused: true });
    const TICK = 2.15;   // the 40-second sample lands here: every reading rolls to its next value

    // Opens on the panel's photo exactly, then the camera drifts while the tags pin on.
    tl.fromTo('#kp-p-cam', { x: 0, y: 0 }, { x: -26, y: -10, duration: 2.7, ease: 'sine.inOut' }, 0);

    [1, 2, 3, 4].forEach((n, i) => {
      const at = 0.3 + i * 0.17;
      const ln = q('#kp-p-ln-' + n), len = Math.hypot(ln.x2.baseVal.value - ln.x1.baseVal.value, ln.y2.baseVal.value - ln.y1.baseVal.value);
      tl.fromTo('#kp-p-pin-' + n, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)' }, at);
      tl.fromTo(ln, { attr: { 'stroke-dasharray': len, 'stroke-dashoffset': len } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.3, ease: 'power2.out' }, at + 0.1);
      tl.fromTo('#kp-p-tag-' + n, { opacity: 0, y: 16, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, at + 0.2);
      // The meter's 40 s cycle: the bar fills, the sample lands, the bar starts again.
      const bar = q('#kp-p-tag-' + n + ' .p-bar i');
      tl.fromTo(bar, { scaleX: 0.1 + i * 0.12 }, { scaleX: 1, duration: TICK - (at + 0.2), ease: 'none' }, at + 0.2);
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 0.55, duration: 4.2 - TICK, ease: 'none', immediateRender: false }, TICK);
      const old = qa('#kp-p-tag-' + n + ' .p-old'), nu = qa('#kp-p-tag-' + n + ' .p-new');
      tl.set(nu, { yPercent: 100 }, 0);
      tl.fromTo(old, { yPercent: 0 }, { yPercent: -100, duration: 0.4, ease: 'power3.inOut', immediateRender: false }, TICK + i * 0.05);
      tl.fromTo(nu, { yPercent: 100 }, { yPercent: 0, duration: 0.4, ease: 'power3.inOut', immediateRender: false }, TICK + i * 0.05);
    });

    // Push into Chiller 1's tag: ease-in, cutting at peak speed into its EnergyIQ page.
    tl.to('#kp-p-cam', { x: 510, y: 405, scale: 6, duration: 1.5, ease: 'power3.in' }, 2.7);
    tl.to('#kp-p-tag-1', { filter: 'blur(5px)', duration: 0.35, ease: 'power2.in' }, 3.85);
    tl.fromTo('#kp-p-wash', { opacity: 0 }, { opacity: 0.85, duration: 0.3, ease: 'power2.in' }, 3.9);
    tl.set({}, {}, 4.2);
    return tl;
  })();
}

function sceneEnergy(root) {
  return (() => {
    const q = s => root.querySelector(s);
    // Hourly kWh for Chiller 1 today (actual to 10:00, forecast after); fixed numbers, no randomness.
    const actual = [14.2, 13.6, 13.1, 12.9, 13.4, 15.8, 19.6, 23.4, 25.1, 26.3, 26.9];
    const forecast = [26.9, 27.6, 28.1, 28.4, 28.0, 27.2, 25.9, 24.1, 21.8, 19.4, 17.2, 15.9, 15.0, 14.6];
    const lo = [12, 11.5, 11, 11, 11.5, 13, 16, 19, 21, 22, 22.5, 23, 23.5, 23.5, 23, 22.5, 21.5, 20, 18, 16.5, 15, 14, 13, 12.5, 12];
    const hi = lo.map((v, i) => v + 5 + Math.sin(i / 4) * 0.8);
    const X = i => 70 + i * (1280 / 24), Y = v => 330 - v / 32 * 240;
    const pts = a => a.map((v, i) => [X(i), Y(v)]);
    const path = p => 'M' + p.map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join(' L');
    q('#kp-e-line').setAttribute('d', path(pts(actual)));
    q('#kp-e-fc').setAttribute('d', path(forecast.map((v, i) => [X(i + 10), Y(v)])));
    const top = lo.map((v, i) => [X(i), Y(hi[i])]), bot = lo.map((v, i) => [X(i), Y(v)]).reverse();
    q('#kp-e-band').setAttribute('d', path(top.concat(bot)) + ' Z');
    const lineLen = q('#kp-e-line').getTotalLength ? q('#kp-e-line').getTotalLength() : 900;

    const tl = gsap.timeline({ paused: true });
    // Carries the push from the photo: the page arrives from close up and settles.
    tl.fromTo('#kp-e-app', { scale: 1.7, opacity: 0.35, filter: 'blur(14px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out' }, 0);
    tl.fromTo('#kp-e-page > *', { y: 22 }, { y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.03 }, 0.1);

    // Cost per machine counts up as the meter's readings add up.
    const n = { kwh: 0, aed: 0, share: 0 };
    tl.fromTo(n, { kwh: 0, aed: 0, share: 0 }, {
      kwh: 412.6, aed: 156.79, share: 32.1, duration: 1.8, ease: 'power2.out',
      onUpdate: () => { q('#kp-e-kwh').textContent = n.kwh.toFixed(1); q('#kp-e-aed').textContent = n.aed.toFixed(2); q('#kp-e-share').textContent = n.share.toFixed(1); }
    }, 0.25);

    tl.fromTo('#kp-e-line', { attr: { 'stroke-dasharray': lineLen, 'stroke-dashoffset': lineLen } }, { attr: { 'stroke-dashoffset': 0 }, duration: 1.7, ease: 'power2.inOut' }, 0.5);
    tl.fromTo('#kp-e-fc', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 2.0);
    const dot = { p: 0 };
    tl.fromTo(dot, { p: 0 }, { p: 1, duration: 1.7, ease: 'power2.inOut', onUpdate: () => {
      const pt = q('#kp-e-line').getPointAtLength(dot.p * lineLen); q('#kp-e-dot').setAttribute('cx', pt.x); q('#kp-e-dot').setAttribute('cy', pt.y);
    } }, 0.5);

    // The camera leans in on the cost tile, then whips off to the left.
    tl.fromTo('#kp-e-ring', { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, 1.3);
    tl.fromTo('#kp-e-page', { scale: 1, x: 0, y: 0 }, { scale: 1.2, x: 0, y: 20, duration: 1.75, ease: 'power2.inOut' }, 1.25);
    tl.to('#kp-e-app', { x: -1750, filter: 'blur(10px)', duration: 0.4, ease: 'power3.in' }, 3.0);
    tl.set({}, {}, 3.4);
    return tl;
  })();
}

function sceneAlert(root) {
  return (() => {
    const q = s => root.querySelector(s);
    // 42 daily averages: steady near 3.2 m/s², then from Jul 3 bending up to 5.78 on Jul 21.
    const days = [];
    for (let d = 0; d < 42; d++) {
      const base = 3.2 + 0.12 * Math.sin(d * 1.7) + 0.06 * Math.cos(d * 3.1);
      const t = Math.max(0, d - 23) / 18;
      days.push(d === 41 ? 5.78 : base + 2.55 * Math.pow(t, 1.8));
    }
    const X = d => 60 + d * (720 / 41), Y = v => 560 - (v - 2) / 5 * 520;
    q('#kp-a-line').setAttribute('d', 'M' + days.map((v, d) => X(d).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' L'));
    const wy = Y(5);
    q('#kp-a-wh').setAttribute('y1', wy); q('#kp-a-wh').setAttribute('y2', wy);
    q('#kp-a-whl').setAttribute('y', wy - 10);
    q('#kp-a-zone').setAttribute('y', 40); q('#kp-a-zone').setAttribute('height', wy - 40);
    q('#kp-a-y4').setAttribute('y', Y(4) + 5); q('#kp-a-y6').setAttribute('y', Y(6) + 5);
    const line = q('#kp-a-line'), len = line.getTotalLength();

    const tl = gsap.timeline({ paused: true });
    // Enters from the right as the cost page whips off to the left.
    tl.fromTo('#kp-a-app', { x: 1150, filter: 'blur(10px)' }, { x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out' }, 0);

    // The trend draws flat, then bends upward through warning high.
    tl.fromTo(line, { attr: { 'stroke-dasharray': len, 'stroke-dashoffset': len } }, { attr: { 'stroke-dashoffset': 0 }, duration: 1.3, ease: 'power1.inOut' }, 0.3);
    const dot = { p: 0 };
    tl.fromTo(dot, { p: 0 }, { p: 1, duration: 1.3, ease: 'power1.inOut', onUpdate: () => {
      const pt = line.getPointAtLength(dot.p * len); q('#kp-a-dot').setAttribute('cx', pt.x); q('#kp-a-dot').setAttribute('cy', pt.y);
    } }, 0.3);
    tl.fromTo('#kp-a-zone', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 1.2);
    tl.fromTo('#kp-a-since', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 1.0);
    tl.fromTo('#kp-a-dot', { scale: 1 }, { scale: 1.5, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 1.6);
    tl.fromTo('#kp-a-tag', { opacity: 0, y: 14, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 1.6);

    // The explanation sheet slides in with the reading and its place on the range.
    tl.fromTo('#kp-a-sheet', { x: 640 }, { x: 0, duration: 0.6, ease: 'expo.out' }, 1.25);
    tl.fromTo('#kp-a-sheet > *', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 }, 1.35);
    tl.fromTo('#kp-a-mark', { x: 0 }, { x: 304, duration: 0.8, ease: 'power3.out' }, 1.7);
    const rv = { v: 0 };
    tl.fromTo(rv, { v: 3.2 }, { v: 5.78, duration: 0.8, ease: 'power3.out', onUpdate: () => { q('#kp-a-rv').textContent = rv.v.toFixed(2); } }, 1.7);

    // One action: the person clicks Log repair.
    tl.fromTo('#kp-a-cursor', { x: 1500, y: 1020 }, { x: 1112, y: 312, duration: 0.6, ease: 'power3.out' }, 2.15);
    tl.to('#kp-a-btn', { backgroundColor: '#06367f', duration: 0.08, ease: 'power2.in' }, 2.8);
    tl.to('#kp-a-btn', { backgroundColor: '#0450C8', duration: 0.2, ease: 'power2.out' }, 2.88);

    // Lifts away; the logbook rises in beneath.
    tl.to(['#kp-a-app', '#kp-a-cursor'], { y: -1250, filter: 'blur(10px)', duration: 0.4, ease: 'power3.in' }, 3.2);
    tl.set({}, {}, 3.6);
    return tl;
  })();
}

// Selector strings here are scoped by the gsap.context SceneLoop runs this in.
// eslint-disable-next-line no-unused-vars
function sceneLogbook(root) {
  return (() => {
    const tl = gsap.timeline({ paused: true });
    // Rises in beneath the alert as it lifts away.
    tl.fromTo('#kp-l-app', { y: 760, filter: 'blur(10px)' }, { y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'expo.out' }, 0);

    // Older records make room; the new entry lands on top, highlighted.
    tl.fromTo(['#kp-l-old-1', '#kp-l-old-2'], { y: 0 }, { y: 210, duration: 0.45, ease: 'power3.inOut' }, 0.4);
    tl.fromTo('#kp-l-new', { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.62);
    tl.fromTo('#kp-l-edge', { opacity: 0, y: 160 + 194 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0.85);

    // Details open: the linked alert and the recommended action carried over from it.
    tl.fromTo('#kp-l-new', { clipPath: 'inset(0px 0px 186px 0px round 12px)' }, { clipPath: 'inset(0px 0px 0px 0px round 12px)', duration: 0.45, ease: 'power3.inOut' }, 1.1);
    tl.to('#kp-l-edge', { y: 160 + 380, duration: 0.45, ease: 'power3.inOut' }, 1.1);
    tl.to(['#kp-l-old-1', '#kp-l-old-2'], { y: 395, duration: 0.45, ease: 'power3.inOut' }, 1.1);
    tl.set('#kp-l-edge', { opacity: 0 }, 1.56);
    tl.fromTo('#kp-l-det > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.07 }, 1.2);
    tl.fromTo('#kp-l-wo', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.6)' }, 1.45);
    tl.fromTo('#kp-l-hl', { opacity: 1 }, { opacity: 0.35, duration: 0.7, ease: 'power1.inOut' }, 1.5);
    tl.fromTo('#kp-l-page', { y: 0 }, { y: -36, duration: 1.0, ease: 'sine.inOut' }, 1.3);

    // Pulls back and away into the next view.
    tl.to('#kp-l-app', { scale: 0.55, opacity: 0, filter: 'blur(8px)', duration: 0.4, ease: 'power3.in' }, 2.2);
    tl.set({}, {}, 2.6);
    return tl;
  })();
}

function sceneCarbon(root) {
  return (() => {
    const q = s => root.querySelector(s);
    const tl = gsap.timeline({ paused: true });
    // Arrives as the logbook pulls back: the same machine's EnergyIQ summary, now with its carbon.
    tl.fromTo('#kp-c-app', { scale: 1.45, opacity: 0.35, filter: 'blur(10px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'expo.out' }, 0);
    tl.fromTo('#kp-c-bars i', { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: 'power3.out', stagger: 0.03 }, 0.2);
    const n = { v: 0 };
    tl.fromTo(n, { v: 0 }, { v: 165.0, duration: 1.1, ease: 'power2.out', onUpdate: () => { q('#kp-c-co2').textContent = n.v.toFixed(1); } }, 0.25);
    tl.fromTo('#kp-c-ring', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, 0.35);
    // The camera settles on the carbon tile.
    tl.fromTo('#kp-c-page', { scale: 1 }, { scale: 1.3, duration: 1.15, ease: 'power2.inOut' }, 0.35);

    // Loop home: the page shrinks back into Chiller 1 as the plant photo returns to its opening frame.
    tl.to('#kp-c-app', { x: -370, y: -240, scale: 0.12, duration: 0.4, ease: 'power3.in' }, 1.45);
    tl.to('#kp-c-app', { opacity: 0, duration: 0.2, ease: 'power1.in' }, 1.62);
    tl.fromTo('#kp-c-cam', { opacity: 0, scale: 3.2 }, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 1.76);
    tl.to('#kp-c-cam', { scale: 1, duration: 1.0, ease: 'expo.out' }, 1.76);
    tl.set({}, {}, 2.8);
    return tl;
  })();
}

/** Each scene's root id, its timeline builder, and where it sits in the loop (seconds). */
export const SCENES = [
  { id: "kp-plant", build: scenePlant, start: 0, duration: 4.2 },
  { id: "kp-energy", build: sceneEnergy, start: 4.2, duration: 3.4 },
  { id: "kp-alert", build: sceneAlert, start: 7.6, duration: 3.6 },
  { id: "kp-logbook", build: sceneLogbook, start: 11.2, duration: 2.6 },
  { id: "kp-carbon", build: sceneCarbon, start: 13.8, duration: 2.8 },
];
