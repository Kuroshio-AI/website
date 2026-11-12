// Ported from the HyperFrames project at ~/.hyperframes-studio/KTrack Website Mini Demo/.
// Every id is prefixed kt-, each scene's CSS is scoped to its own root, and queries stay inside it.
import { gsap } from "@/lib/motion";

export const CSS = `@font-face { font-family: "Figtree KT"; src: url("/demos/figtree.woff2") format("woff2"); font-weight: 300 900; }
/* form */
#kt-form {
  --bg-top: #2D2C26;      /* ground gradient, top-left */
  --bg: #26251F;          /* ground: the site's dark panel */
  --bg-corner: #302F29;   /* bottom-right glow */
  --plane: #2A2923;       /* faint inset plane */
  --plane-edge: #36352E;  /* plane edge */
  --white: #FFFFFF;       /* thumb, ticks */
  --wash: #26251F;        /* exit wash */
  --ink: #F2F1EC;         /* primary text, typed date */
  --ink-strong: #FFFFFF;  /* reviewer, button labels, chevron */
  --ink-2: #E4E2DA;       /* input label */
  --ink-soft: #D6D4CC;    /* slider count */
  --muted: #A9A79E;       /* secondary labels */
  --muted-2: #9C9A91;     /* input hint */
  --faint: #8A887F;       /* Valid for / Reviewer / item line */
  --dot: #CFCDC4;         /* dotted underline */
  --accent: #7FA6F4;      /* percent */
  --caret: #5B8DF0;       /* caret */
  --accent-mid: #8DB0F6;  /* "Due" */
  --gain: #4ADE80;        /* days valid, passed, plus signs */
  --track-a: #0450C8;     /* track gradient left: Kuroshio blue */
  --track-b: #2F6BDA;     /* track gradient right */
  --shadow: #000000;      /* thumb shadow */
  --field: #FFFFFF;       /* input fill (13% alpha) */
  --line: #4C4A42;        /* input outline */
  --line-2: #4C4A42;      /* button outline */
  --edge-a: #3A3932; --edge-b: #45443C; --edge-c: #55534B;
  --font-ui: "Figtree KT", system-ui, sans-serif;
  position: absolute; inset: 0; overflow: hidden; background: var(--bg);
}
#kt-form .layer { position: absolute; left: 0; top: 0; width: 1280px; height: 720px; }
#kt-form .full { position: absolute; inset: 0; }
#kt-form .abs { position: absolute; }
#kt-form .fx { --blur: 0; filter: blur(calc(var(--blur) * 1px)); }

#kt-bg { background: linear-gradient(170deg, var(--bg-top) 0%, var(--bg) 50%, var(--bg) 100%); }
#kt-bg-corner { background: radial-gradient(780px 360px at 100% 100%, var(--bg-corner), color-mix(in srgb, var(--bg-corner) 0%, transparent)); }
/* the Moment's 1280x720 stage, scaled to the 1600-wide panel and centred */
#kt-stage { position: absolute; left: 0; top: 118px; width: 1280px; height: 720px; transform: scale(1.25); transform-origin: 0 0;
  font-family: var(--font-ui); letter-spacing: -0.3px; color: var(--ink); white-space: nowrap; }
#kt-plane { left: 9px; top: 10px; width: 1262px; height: 700px; border-radius: 30px; background: var(--plane); border: 2px solid var(--plane-edge); opacity: 0; }

/* slider (inside the zoom-out camera) */
#kt-camera { transform-origin: 640px 359px; }
#kt-limit-label { left: 392px; top: 192px; font-size: 30px; line-height: 36px; font-weight: 500; color: var(--muted); }
#kt-limit-value { left: 580px; top: 192px; font-size: 34px; line-height: 40.8px; font-weight: 600; }
#kt-limit-dots { left: 580px; top: 233px; width: 104px; height: 3.5px;
  background: radial-gradient(circle, var(--dot) 1.6px, transparent 1.9px) 0 0 / 8.2px 3.5px repeat-x; }
#kt-limit-change { left: 700px; top: 195px; font-size: 27px; line-height: 32.4px; font-weight: 500; color: var(--muted); }
#kt-amount { left: 274px; top: 284px; font-size: 34px; line-height: 40.8px; font-weight: 600; color: var(--ink-soft); }
#kt-percent { right: 286px; top: 284px; font-size: 34px; line-height: 40.8px; font-weight: 800; color: var(--accent); }
/* checklist: the last four items tick as the count climbs */
#kt-form .chk { height: 40px; display: flex; align-items: center; gap: 14px; font-size: 29px; line-height: 40px; font-weight: 500; color: var(--faint); }
#kt-form .chk .box { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--line); display: grid; place-items: center; flex: none; }
#kt-form .chk .box svg { width: 20px; height: 20px; opacity: 0; }
#kt-form .chk.done { color: var(--ink); }
#kt-form .chk.done .box { background: var(--gain); border-color: var(--gain); }
#kt-form .chk.done .box svg { opacity: 1; }

#kt-track { border-radius: 44px; overflow: hidden; background: var(--edge-b); }
/* a full-width pill slid in from the left: its round cap wraps the handle, and only its transform changes per frame */
#kt-fill { position: absolute; inset: 0; border-radius: inherit; will-change: transform;
  background: linear-gradient(90deg, var(--track-a), var(--track-b)); }
#kt-track-details { --l: 0.016; --r: 0.984; clip-path: inset(0 calc(100% - var(--r) * 100%) 0 calc(var(--l) * 100%)); }
#kt-form .tick { border-radius: 50%; background: var(--white); opacity: 0.22; }
#kt-thumb { --sy: 3; --sb: 6; border-radius: 50%; background: var(--white);
  box-shadow: 0 calc(var(--sy) * 1px) calc(var(--sb) * 1px) color-mix(in srgb, var(--shadow) 45%, transparent); }

/* issue form (one card camera) */
#kt-card { transform-origin: 0 0; }
#kt-logo { left: 276px; top: 171px; width: 84px; height: 84px; border-radius: 10px; object-fit: contain; opacity: 0; }
#kt-form .head { opacity: 0; }
#kt-token { left: 383px; top: 173px; font-size: 34px; line-height: 40.8px; font-weight: 600; }
#kt-oi { left: 383px; top: 221px; font-size: 26px; line-height: 31.2px; font-weight: 500; color: var(--faint); }
#kt-market-price { right: 270px; top: 173px; font-size: 32px; line-height: 38.4px; font-weight: 600; }
#kt-market-change { right: 270px; top: 220px; font-size: 26px; line-height: 31.2px; font-weight: 600; color: var(--gain); }
#kt-field { --blur: 3; --p: 0; left: 263px; top: 294px; width: 749px; height: 131px; border-radius: 25px; opacity: 0;
  border: 1.5px solid var(--line); background: color-mix(in srgb, var(--field) 4%, transparent);
  clip-path: inset(0 calc((1 - var(--p)) * 50%) 0 calc((1 - var(--p)) * 50%)); }
#kt-input-label { left: 306px; top: 325px; font-size: 28px; line-height: 33.6px; font-weight: 600; color: var(--ink-2); opacity: 0; }
#kt-input-hint { left: 306px; top: 368px; font-size: 24px; line-height: 28.8px; font-weight: 500; color: var(--muted-2); opacity: 0; }
#kt-form .btn { top: 484px; height: 67px; border: 2px solid var(--line-2); border-radius: 17px; opacity: 0;
  display: flex; align-items: center; justify-content: center; font-size: 30px; line-height: 36px; font-weight: 700; color: var(--ink-strong); }
#kt-form .btn .plus { color: var(--gain); }
#kt-line { left: 693px; top: 334px; width: 0; height: 49px; }  /* caret x; date and Due hang off it */
#kt-caret { left: 0; top: 0; width: 2.5px; height: 49px; border-radius: 1.25px; background: var(--caret); }
#kt-mid { left: 14px; top: 10.5px; font-size: 28px; line-height: 33.6px; font-weight: 800; color: var(--accent-mid); opacity: 0; }
#kt-typed { right: 14.5px; top: 5px; font-size: 36.7px; line-height: 44.04px; font-weight: 600; opacity: 0; transform: scaleY(0.94); transform-origin: 0 0; }

/* exit */
#kt-wash { background: var(--wash); opacity: 0; }
#kt-wash-bottom { background: linear-gradient(180deg, transparent 55%, var(--wash) 100%); opacity: 0; }
#kt-edge { left: 521px; top: 530px; width: 240px; height: 190px; clip-path: polygon(50px 0, 190px 0, 240px 190px, 0 190px); visibility: hidden;
  background: linear-gradient(180deg, color-mix(in srgb, var(--edge-a) 0%, transparent), color-mix(in srgb, var(--edge-b) 53%, transparent) 55%, var(--edge-c)); }
#kt-edge-copy { left: 20px; top: 68px; width: 200px; font-size: 43px; line-height: 51.6px; font-weight: 700; color: var(--white); transform: rotate(-90deg); }
/* certificate */
#kt-cert {
  --ground: #26251F;      /* the site's dark panel */
  --paper: #FFFFFF;       /* certificate card */
  --ink: #1E1D19;         /* values, title */
  --muted: #6B6A64;       /* labels */
  --rule: #E6E5E0;        /* tab bar rule */
  --tab: #EAF0FB;         /* active tab fill */
  --blue: #0B4DB8;        /* active tab text */
  --valid: #DCFCE7;       /* Issued pill fill (KTrack status-valid) */
  --valid-ink: #166534;   /* Issued pill text */
  --font-ui: "Figtree KT", system-ui, sans-serif;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: var(--font-ui); color: var(--ink);
}
#kt-cert-card { position: absolute; left: 210px; top: 330px; width: 1180px; height: 478px; background: var(--paper); transform-origin: 1037px 238px; }
#kt-cert-tabs { position: absolute; left: 0; top: 0; width: 1180px; height: 92px; border-bottom: 2px solid var(--rule); }
#kt-cert-tab-1 { position: absolute; left: 13px; top: 13px; height: 66px; padding: 0 25px; display: flex; align-items: center;
  background: var(--tab); color: var(--blue); border-radius: 6px; font-size: 27px; font-weight: 500; }
#kt-cert-tab-2 { position: absolute; left: 230px; top: 13px; height: 66px; display: flex; align-items: center; font-size: 27px; font-weight: 500; }
#kt-cert-body { position: absolute; left: 43px; top: 136px; width: 820px; }
#kt-cert-no { font-size: 26px; line-height: 32px; color: var(--muted); }
#kt-cert-title-row { display: flex; align-items: center; gap: 22px; margin-top: 6px; }
#kt-cert-title { font-size: 35px; line-height: 44px; font-weight: 600; }
#kt-cert-issued { height: 44px; padding: 0 16px 0 12px; border-radius: 20px; background: var(--valid); color: var(--valid-ink);
  display: flex; align-items: center; gap: 8px; font-size: 26px; font-weight: 700; opacity: 0; }
#kt-cert-grid { display: grid; grid-template-columns: 445px 380px; row-gap: 20px; margin-top: 30px; }
#kt-cert .lbl { font-size: 26px; line-height: 32px; color: var(--muted); }
#kt-cert .val { font-size: 27px; line-height: 36px; font-weight: 500; margin-top: 4px; }
#kt-cert-next-val { display: inline-block; padding: 0 8px; margin-left: -8px; border-radius: 6px; background: color-mix(in srgb, var(--tab) 0%, transparent); }
#kt-cert-qr { position: absolute; left: 935px; top: 136px; width: 204px; height: 204px; clip-path: inset(0 0 0 0); }
/* verify */
#kt-verify {
  --ground: #26251F; --phone: #111110; --screen: #1A1A18; --paper: #FFFFFF; --ink: #18181B; --muted: #52525B; --border: #E4E4E7;
  --valid: #DCFCE7; --valid-ink: #166534; --scan: #4ADE80;
  --font-ui: "Figtree KT", system-ui, sans-serif;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: var(--font-ui); color: var(--ink);
}
#kt-v-phone { position: absolute; left: 540px; top: 48px; width: 520px; height: 1040px; border-radius: 64px; background: var(--phone);
  box-shadow: 0 0 0 3px #3A3933, 0 40px 80px rgba(0,0,0,.45); transform-origin: 260px 420px; }
#kt-v-screen { position: absolute; left: 16px; top: 16px; width: 488px; height: 1008px; border-radius: 50px; overflow: hidden; background: var(--screen); }
#kt-v-cam-label { position: absolute; left: 0; width: 488px; top: 690px; text-align: center; color: #E7E5DE; font-size: 30px; font-weight: 600; }
#kt-v-cam-sub { position: absolute; left: 0; width: 488px; top: 736px; text-align: center; color: #9A988F; font-size: 24px; font-weight: 500; }
#kt-v-plate { position: absolute; left: 94px; top: 254px; width: 300px; height: 300px; background: var(--paper); border-radius: 14px; padding: 30px; }
#kt-v-plate svg { width: 240px; height: 240px; display: block; }
#kt-v-frame { position: absolute; left: 64px; top: 224px; width: 360px; height: 360px; border: 4px solid rgba(255,255,255,.9); border-radius: 28px;
}
#kt-v-line { position: absolute; left: 80px; top: 240px; width: 328px; height: 4px; border-radius: 2px; background: var(--scan); box-shadow: 0 0 18px 4px rgba(74,222,128,.55); opacity: 0; }
#kt-v-page { position: absolute; left: 0; top: 0; width: 488px; height: 1008px; background: var(--paper); }
#kt-v-band { background: var(--valid); color: var(--valid-ink); padding: 92px 30px 40px; text-align: center; }
#kt-v-eyebrow { font-size: 20px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
#kt-v-badge { width: 128px; height: 128px; margin: 30px auto 0; border-radius: 50%; background: var(--valid-ink); color: var(--valid); display: grid; place-items: center; }
#kt-v-title { margin-top: 24px; font-size: 50px; line-height: 1; font-weight: 800; text-transform: uppercase; letter-spacing: .01em; }
#kt-v-detail { margin-top: 14px; font-size: 24px; font-weight: 500; }
#kt-v-body { background: var(--paper); margin: 0; padding: 30px 30px 34px; }
#kt-verify .v-lbl { font-size: 18px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); }
#kt-verify .v-val { margin-top: 6px; font-size: 26px; font-weight: 700; }
#kt-v-no { font-size: 32px; font-weight: 800; margin-top: 6px; }
#kt-v-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 24px; padding-top: 24px; border-top: 2px solid var(--border); }
#kt-v-asset { grid-column: span 2; }
/* register */
#kt-register {
  --ground: #26251F; --app: #F4F4F5; --card: #FFFFFF; --ink: #18181B; --muted: #52525B; --border: #E4E4E7; --blue: #0B4DB8; --tab: #EAF0FB;
  --valid: #DCFCE7; --valid-ink: #166534; --due: #FEF3C7; --due-ink: #92400E; --overdue: #FEE2E2; --overdue-ink: #991B1B;
  --font-ui: "Figtree KT", system-ui, sans-serif;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: var(--font-ui); color: var(--ink);
}
#kt-r-app { position: absolute; left: 60px; top: 73px; width: 1480px; height: 990px; background: var(--app); border-radius: 18px; overflow: hidden; }
#kt-r-head { position: absolute; left: 56px; top: 46px; }
#kt-r-eyebrow { font-size: 22px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
#kt-r-title { margin-top: 8px; font-size: 56px; line-height: 1.05; font-weight: 700; letter-spacing: -0.01em; }
#kt-r-tiles { position: absolute; left: 56px; top: 200px; width: 1368px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
#kt-register .r-tile { background: var(--card); border: 2px solid var(--border); border-radius: 14px; padding: 22px 26px 24px; }
#kt-register .t-lbl { font-size: 21px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); }
#kt-register .t-num { margin-top: 8px; font-size: 72px; line-height: 1; font-weight: 700; font-variant-numeric: tabular-nums; }
#kt-register .t-sub { margin-top: 8px; font-size: 22px; color: var(--muted); }
#kt-register .r-tile.due .t-num { color: var(--due-ink); }
#kt-register .r-tile.overdue .t-num { color: var(--overdue-ink); }
#kt-r-table { position: absolute; left: 56px; top: 440px; width: 1368px; height: 496px; background: var(--card); border: 2px solid var(--border); border-radius: 14px; overflow: hidden; }
#kt-r-cols { position: absolute; left: 0; top: 0; width: 100%; height: 64px; border-bottom: 2px solid var(--border); }
#kt-r-rows { position: absolute; left: 0; top: 64px; width: 100%; height: 432px; overflow: hidden; }
#kt-register .r-row, #kt-r-cols { display: grid; grid-template-columns: 290px 400px 250px 210px 1fr; align-items: center; padding: 0 30px; }
#kt-register .r-row { position: absolute; left: 0; width: 100%; height: 86px; border-bottom: 2px solid var(--border); font-size: 26px; }
#kt-r-cols div { font-size: 19px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); }
#kt-register .c1 { font-weight: 700; font-variant-numeric: tabular-nums; }
#kt-register .c3, #kt-register .c4 { color: var(--muted); }
#kt-register .pill { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 22px; font-weight: 700; white-space: nowrap; }
#kt-register .pill.valid { background: var(--valid); color: var(--valid-ink); }
#kt-register .pill.due { background: var(--due); color: var(--due-ink); }
#kt-register .pill.overdue { background: var(--overdue); color: var(--overdue-ink); }
#kt-r-hl { position: absolute; left: 0; top: 0; width: 100%; height: 86px; background: var(--tab); opacity: 0; }
/* remind */
#kt-remind {
  --ground: #26251F; --phone: #111110; --screen: #1F2A3A; --card: #FFFFFF; --ink: #18181B; --muted: #52525B;
  --wa: #25D366; --mail: #0B4DB8; --due: #FEF3C7; --due-ink: #92400E; --sky: #E7ECF4;
  --font-ui: "Figtree KT", system-ui, sans-serif;
  position: absolute; inset: 0; overflow: hidden; background: var(--ground); font-family: var(--font-ui); color: var(--ink);
}
#kt-m-phone { position: absolute; left: 540px; top: 48px; width: 520px; height: 1040px; border-radius: 64px; background: var(--phone);
  box-shadow: 0 0 0 3px #3A3933, 0 40px 80px rgba(0,0,0,.45); }
#kt-m-screen { position: absolute; left: 16px; top: 16px; width: 488px; height: 1008px; border-radius: 50px; overflow: hidden; background: var(--screen); }
#kt-m-time { position: absolute; left: 0; width: 488px; top: 120px; text-align: center; color: var(--sky); font-size: 120px; line-height: 1; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
#kt-m-date { position: absolute; left: 0; width: 488px; top: 86px; text-align: center; color: var(--sky); font-size: 26px; font-weight: 600; }
#kt-m-stack { position: absolute; left: 16px; top: 300px; width: 456px; display: flex; flex-direction: column; gap: 16px; }
#kt-remind .n { background: var(--card); border-radius: 28px; padding: 24px 26px 26px; }
#kt-remind .n-head { display: flex; align-items: center; gap: 12px; font-size: 24px; font-weight: 600; color: var(--muted); }
#kt-remind .n-app { width: 40px; height: 40px; border-radius: 9px; display: grid; place-items: center; color: #fff; flex: none; }
#kt-remind .n-app svg { width: 24px; height: 24px; }
#kt-remind .n-when { margin-left: auto; font-weight: 500; }
#kt-remind .n-title { margin-top: 14px; font-size: 32px; line-height: 38px; font-weight: 700; white-space: normal; }
#kt-remind .n-body { margin-top: 6px; font-size: 27px; line-height: 34px; color: var(--muted); white-space: normal; }
#kt-remind .n-pill { display: inline-block; margin-top: 12px; padding: 4px 14px; border-radius: 999px; background: var(--due); color: var(--due-ink); font-size: 24px; font-weight: 700; }
#kt-m-log { position: absolute; left: 0; width: 488px; top: 930px; text-align: center; color: #9AA6B8; font-size: 24px; font-weight: 600; }`;

export const MARKUP = `<div id="kt-form">
  <div id="kt-bg" class="full"></div>
  <div id="kt-bg-corner" class="full"></div>
  <div id="kt-stage">
    <div id="kt-plane" class="abs"></div>

    <div id="kt-camera" class="layer">
      <div id="kt-words" class="layer fx">
        <div id="kt-limit-label" class="abs">Proof load</div>
        <div id="kt-limit-value" class="abs">2.04 t</div>
        <div id="kt-limit-dots" class="abs"></div>
        <div id="kt-limit-change" class="abs">(125% of SWL)</div>
        <div id="kt-amount" class="abs in-l">Checklist 8 / 12</div>
        <div id="kt-percent" class="abs in-r">69%</div>
        <div id="kt-chk-1" class="abs chk in-l" style="left:274px;top:418px"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#1B1A16" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Hook and safety latch</span></div>
        <div id="kt-chk-2" class="abs chk in-r" style="left:660px;top:418px"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#1B1A16" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Load chain wear</span></div>
        <div id="kt-chk-3" class="abs chk in-l" style="left:274px;top:478px"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#1B1A16" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Brake holds the load</span></div>
        <div id="kt-chk-4" class="abs chk in-r" style="left:660px;top:478px"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#1B1A16" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Proof load test</span></div>
      </div>
    </div>

    <div id="kt-slider" class="layer">
      <div id="kt-track" class="abs"><div id="kt-fill"></div></div>
      <div id="kt-track-details" class="layer">
        <div class="tick abs"></div><div class="tick abs"></div><div class="tick abs"></div><div class="tick abs"></div>
        <div id="kt-thumb" class="abs"></div>
      </div>
    </div>

    <div id="kt-card" class="layer">
      <div id="kt-header" class="layer">
        <img id="kt-logo" data-brand-mark class="abs fx" src="/demos/kee-safety.png" alt="" />
        <div id="kt-token" class="abs head fx">LE-0412</div>
        <div id="kt-oi" class="abs head fx">5 t Chain Block · Rig 17</div>
        <div id="kt-market-price" class="abs head fx">14 Oct 2026</div>
        <div id="kt-market-change" class="abs head fx">All checks passed</div>
      </div>
      <div id="kt-field" class="abs fx"></div>
      <div id="kt-input-label" class="abs fx">Next examination</div>
      <div id="kt-input-hint" class="abs fx">6 months after test</div>
      <div id="kt-buttons" class="layer">
        <div class="btn abs fx" style="left:263px;width:174px"><span class="plus">+</span><span>3 mo</span></div>
        <div class="btn abs fx" style="left:456px;width:172px"><span class="plus">+</span><span>6 mo</span></div>
        <div class="btn abs fx" style="left:647px;width:173px"><span class="plus">+</span><span>12 mo</span></div>
        <div class="btn abs fx" style="left:839px;width:173px"><span class="plus">+</span><span>24 mo</span></div>
      </div>
      <div id="kt-line" class="abs">
        <div id="kt-caret" class="abs"></div>
        <div id="kt-mid" class="abs fx">Due</div>
        <div id="kt-typed" class="abs fx">14 Apr 2027</div>
      </div>
    </div>

    <div id="kt-edge" class="abs"><div id="kt-edge-copy" class="abs">Issue</div></div>
  </div>
  <div id="kt-wash" class="full"></div>
  <div id="kt-wash-bottom" class="full"></div>
</div>
<div id="kt-cert">
  <div id="kt-cert-card">
    <div id="kt-cert-tabs">
      <div id="kt-cert-tab-1">Certificate</div>
      <div id="kt-cert-tab-2">QR check on site</div>
    </div>
    <div id="kt-cert-body">
      <div id="kt-cert-no">Certificate LE-2026-00412 · sample</div>
      <div id="kt-cert-title-row">
        <div id="kt-cert-title">Report of Thorough Examination</div>
        <div id="kt-cert-issued"><svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>Issued</div>
      </div>
      <div id="kt-cert-grid">
        <div><div class="lbl">Item</div><div class="val">LE-0412 · 5 t Chain Block</div></div>
        <div><div class="lbl">Location</div><div class="val">Rig 17</div></div>
        <div><div class="lbl">Inspected</div><div class="val">14 Oct 2026</div></div>
        <div><div class="lbl">Next examination</div><div class="val"><span id="kt-cert-next-val">14 Apr 2027</span></div></div>
      </div>
    </div>
    <svg id="kt-cert-qr" viewBox="0 0 25 25" shape-rendering="crispEdges"><path fill="#1E1D19" d="M0 0h1v1h-1zM0 1h1v1h-1zM0 2h1v1h-1zM0 3h1v1h-1zM0 4h1v1h-1zM0 5h1v1h-1zM0 6h1v1h-1zM1 0h1v1h-1zM1 6h1v1h-1zM2 0h1v1h-1zM2 2h1v1h-1zM2 3h1v1h-1zM2 4h1v1h-1zM2 6h1v1h-1zM3 0h1v1h-1zM3 2h1v1h-1zM3 3h1v1h-1zM3 4h1v1h-1zM3 6h1v1h-1zM4 0h1v1h-1zM4 2h1v1h-1zM4 3h1v1h-1zM4 4h1v1h-1zM4 6h1v1h-1zM5 0h1v1h-1zM5 6h1v1h-1zM6 0h1v1h-1zM6 1h1v1h-1zM6 2h1v1h-1zM6 3h1v1h-1zM6 4h1v1h-1zM6 5h1v1h-1zM6 6h1v1h-1zM18 0h1v1h-1zM18 1h1v1h-1zM18 2h1v1h-1zM18 3h1v1h-1zM18 4h1v1h-1zM18 5h1v1h-1zM18 6h1v1h-1zM19 0h1v1h-1zM19 6h1v1h-1zM20 0h1v1h-1zM20 2h1v1h-1zM20 3h1v1h-1zM20 4h1v1h-1zM20 6h1v1h-1zM21 0h1v1h-1zM21 2h1v1h-1zM21 3h1v1h-1zM21 4h1v1h-1zM21 6h1v1h-1zM22 0h1v1h-1zM22 2h1v1h-1zM22 3h1v1h-1zM22 4h1v1h-1zM22 6h1v1h-1zM23 0h1v1h-1zM23 6h1v1h-1zM24 0h1v1h-1zM24 1h1v1h-1zM24 2h1v1h-1zM24 3h1v1h-1zM24 4h1v1h-1zM24 5h1v1h-1zM24 6h1v1h-1zM0 18h1v1h-1zM0 19h1v1h-1zM0 20h1v1h-1zM0 21h1v1h-1zM0 22h1v1h-1zM0 23h1v1h-1zM0 24h1v1h-1zM1 18h1v1h-1zM1 24h1v1h-1zM2 18h1v1h-1zM2 20h1v1h-1zM2 21h1v1h-1zM2 22h1v1h-1zM2 24h1v1h-1zM3 18h1v1h-1zM3 20h1v1h-1zM3 21h1v1h-1zM3 22h1v1h-1zM3 24h1v1h-1zM4 18h1v1h-1zM4 20h1v1h-1zM4 21h1v1h-1zM4 22h1v1h-1zM4 24h1v1h-1zM5 18h1v1h-1zM5 24h1v1h-1zM6 18h1v1h-1zM6 19h1v1h-1zM6 20h1v1h-1zM6 21h1v1h-1zM6 22h1v1h-1zM6 23h1v1h-1zM6 24h1v1h-1zM0 9h1v1h-1zM0 16h1v1h-1zM1 9h1v1h-1zM1 10h1v1h-1zM1 12h1v1h-1zM1 13h1v1h-1zM1 14h1v1h-1zM1 15h1v1h-1zM2 11h1v1h-1zM2 13h1v1h-1zM2 14h1v1h-1zM2 16h1v1h-1zM3 9h1v1h-1zM3 10h1v1h-1zM4 8h1v1h-1zM4 9h1v1h-1zM4 10h1v1h-1zM4 12h1v1h-1zM4 13h1v1h-1zM4 15h1v1h-1zM5 9h1v1h-1zM5 10h1v1h-1zM5 12h1v1h-1zM5 13h1v1h-1zM5 16h1v1h-1zM6 10h1v1h-1zM6 12h1v1h-1zM6 13h1v1h-1zM6 16h1v1h-1zM7 8h1v1h-1zM7 9h1v1h-1zM7 10h1v1h-1zM7 12h1v1h-1zM7 13h1v1h-1zM8 1h1v1h-1zM8 2h1v1h-1zM8 3h1v1h-1zM8 6h1v1h-1zM8 7h1v1h-1zM8 9h1v1h-1zM8 10h1v1h-1zM8 13h1v1h-1zM8 14h1v1h-1zM8 16h1v1h-1zM8 17h1v1h-1zM8 19h1v1h-1zM8 21h1v1h-1zM8 24h1v1h-1zM9 0h1v1h-1zM9 2h1v1h-1zM9 3h1v1h-1zM9 4h1v1h-1zM9 6h1v1h-1zM9 7h1v1h-1zM9 8h1v1h-1zM9 9h1v1h-1zM9 11h1v1h-1zM9 17h1v1h-1zM9 18h1v1h-1zM9 19h1v1h-1zM9 20h1v1h-1zM10 2h1v1h-1zM10 5h1v1h-1zM10 6h1v1h-1zM10 10h1v1h-1zM10 11h1v1h-1zM10 12h1v1h-1zM10 13h1v1h-1zM10 14h1v1h-1zM10 17h1v1h-1zM10 19h1v1h-1zM10 20h1v1h-1zM11 0h1v1h-1zM11 2h1v1h-1zM11 4h1v1h-1zM11 5h1v1h-1zM11 7h1v1h-1zM11 9h1v1h-1zM11 10h1v1h-1zM11 12h1v1h-1zM11 15h1v1h-1zM11 17h1v1h-1zM11 20h1v1h-1zM11 24h1v1h-1zM12 1h1v1h-1zM12 2h1v1h-1zM12 5h1v1h-1zM12 7h1v1h-1zM12 8h1v1h-1zM12 9h1v1h-1zM12 10h1v1h-1zM12 14h1v1h-1zM12 15h1v1h-1zM12 17h1v1h-1zM12 18h1v1h-1zM12 19h1v1h-1zM12 20h1v1h-1zM12 23h1v1h-1zM13 0h1v1h-1zM13 2h1v1h-1zM13 4h1v1h-1zM13 5h1v1h-1zM13 6h1v1h-1zM13 8h1v1h-1zM13 10h1v1h-1zM13 11h1v1h-1zM13 12h1v1h-1zM13 13h1v1h-1zM13 14h1v1h-1zM13 15h1v1h-1zM13 17h1v1h-1zM13 18h1v1h-1zM13 19h1v1h-1zM13 20h1v1h-1zM13 21h1v1h-1zM14 1h1v1h-1zM14 2h1v1h-1zM14 5h1v1h-1zM14 6h1v1h-1zM14 9h1v1h-1zM14 10h1v1h-1zM14 11h1v1h-1zM14 12h1v1h-1zM14 13h1v1h-1zM14 20h1v1h-1zM15 4h1v1h-1zM15 6h1v1h-1zM15 12h1v1h-1zM15 14h1v1h-1zM15 16h1v1h-1zM15 18h1v1h-1zM15 21h1v1h-1zM15 22h1v1h-1zM15 23h1v1h-1zM16 0h1v1h-1zM16 1h1v1h-1zM16 2h1v1h-1zM16 3h1v1h-1zM16 7h1v1h-1zM16 11h1v1h-1zM16 14h1v1h-1zM16 15h1v1h-1zM16 16h1v1h-1zM16 17h1v1h-1zM16 18h1v1h-1zM16 19h1v1h-1zM17 12h1v1h-1zM17 13h1v1h-1zM17 14h1v1h-1zM17 17h1v1h-1zM17 18h1v1h-1zM17 23h1v1h-1zM17 24h1v1h-1zM18 8h1v1h-1zM18 11h1v1h-1zM18 13h1v1h-1zM18 14h1v1h-1zM18 15h1v1h-1zM18 18h1v1h-1zM18 19h1v1h-1zM18 20h1v1h-1zM18 23h1v1h-1zM18 24h1v1h-1zM19 8h1v1h-1zM19 10h1v1h-1zM19 13h1v1h-1zM20 8h1v1h-1zM20 9h1v1h-1zM20 14h1v1h-1zM20 16h1v1h-1zM20 19h1v1h-1zM20 22h1v1h-1zM20 24h1v1h-1zM21 8h1v1h-1zM21 9h1v1h-1zM21 12h1v1h-1zM21 16h1v1h-1zM21 17h1v1h-1zM21 18h1v1h-1zM21 19h1v1h-1zM21 21h1v1h-1zM21 22h1v1h-1zM21 23h1v1h-1zM22 12h1v1h-1zM22 14h1v1h-1zM22 15h1v1h-1zM22 16h1v1h-1zM22 18h1v1h-1zM22 19h1v1h-1zM22 20h1v1h-1zM22 21h1v1h-1zM23 8h1v1h-1zM23 10h1v1h-1zM23 11h1v1h-1zM23 12h1v1h-1zM23 14h1v1h-1zM23 19h1v1h-1zM23 20h1v1h-1zM23 21h1v1h-1zM23 22h1v1h-1zM23 23h1v1h-1zM23 24h1v1h-1zM24 9h1v1h-1zM24 10h1v1h-1zM24 11h1v1h-1zM24 13h1v1h-1zM24 14h1v1h-1zM24 15h1v1h-1zM24 18h1v1h-1zM24 19h1v1h-1zM24 21h1v1h-1zM24 22h1v1h-1z"/></svg>
  </div>
</div>
<div id="kt-verify">
  <div id="kt-v-phone">
    <div id="kt-v-screen">
      <div id="kt-v-cam" style="position:absolute;left:0;top:0;width:488px;height:1008px">
        <div id="kt-v-plate"><svg viewBox="0 0 25 25" shape-rendering="crispEdges"><path fill="#1E1D19" d="M0 0h1v1h-1zM0 1h1v1h-1zM0 2h1v1h-1zM0 3h1v1h-1zM0 4h1v1h-1zM0 5h1v1h-1zM0 6h1v1h-1zM1 0h1v1h-1zM1 6h1v1h-1zM2 0h1v1h-1zM2 2h1v1h-1zM2 3h1v1h-1zM2 4h1v1h-1zM2 6h1v1h-1zM3 0h1v1h-1zM3 2h1v1h-1zM3 3h1v1h-1zM3 4h1v1h-1zM3 6h1v1h-1zM4 0h1v1h-1zM4 2h1v1h-1zM4 3h1v1h-1zM4 4h1v1h-1zM4 6h1v1h-1zM5 0h1v1h-1zM5 6h1v1h-1zM6 0h1v1h-1zM6 1h1v1h-1zM6 2h1v1h-1zM6 3h1v1h-1zM6 4h1v1h-1zM6 5h1v1h-1zM6 6h1v1h-1zM18 0h1v1h-1zM18 1h1v1h-1zM18 2h1v1h-1zM18 3h1v1h-1zM18 4h1v1h-1zM18 5h1v1h-1zM18 6h1v1h-1zM19 0h1v1h-1zM19 6h1v1h-1zM20 0h1v1h-1zM20 2h1v1h-1zM20 3h1v1h-1zM20 4h1v1h-1zM20 6h1v1h-1zM21 0h1v1h-1zM21 2h1v1h-1zM21 3h1v1h-1zM21 4h1v1h-1zM21 6h1v1h-1zM22 0h1v1h-1zM22 2h1v1h-1zM22 3h1v1h-1zM22 4h1v1h-1zM22 6h1v1h-1zM23 0h1v1h-1zM23 6h1v1h-1zM24 0h1v1h-1zM24 1h1v1h-1zM24 2h1v1h-1zM24 3h1v1h-1zM24 4h1v1h-1zM24 5h1v1h-1zM24 6h1v1h-1zM0 18h1v1h-1zM0 19h1v1h-1zM0 20h1v1h-1zM0 21h1v1h-1zM0 22h1v1h-1zM0 23h1v1h-1zM0 24h1v1h-1zM1 18h1v1h-1zM1 24h1v1h-1zM2 18h1v1h-1zM2 20h1v1h-1zM2 21h1v1h-1zM2 22h1v1h-1zM2 24h1v1h-1zM3 18h1v1h-1zM3 20h1v1h-1zM3 21h1v1h-1zM3 22h1v1h-1zM3 24h1v1h-1zM4 18h1v1h-1zM4 20h1v1h-1zM4 21h1v1h-1zM4 22h1v1h-1zM4 24h1v1h-1zM5 18h1v1h-1zM5 24h1v1h-1zM6 18h1v1h-1zM6 19h1v1h-1zM6 20h1v1h-1zM6 21h1v1h-1zM6 22h1v1h-1zM6 23h1v1h-1zM6 24h1v1h-1zM0 9h1v1h-1zM0 16h1v1h-1zM1 9h1v1h-1zM1 10h1v1h-1zM1 12h1v1h-1zM1 13h1v1h-1zM1 14h1v1h-1zM1 15h1v1h-1zM2 11h1v1h-1zM2 13h1v1h-1zM2 14h1v1h-1zM2 16h1v1h-1zM3 9h1v1h-1zM3 10h1v1h-1zM4 8h1v1h-1zM4 9h1v1h-1zM4 10h1v1h-1zM4 12h1v1h-1zM4 13h1v1h-1zM4 15h1v1h-1zM5 9h1v1h-1zM5 10h1v1h-1zM5 12h1v1h-1zM5 13h1v1h-1zM5 16h1v1h-1zM6 10h1v1h-1zM6 12h1v1h-1zM6 13h1v1h-1zM6 16h1v1h-1zM7 8h1v1h-1zM7 9h1v1h-1zM7 10h1v1h-1zM7 12h1v1h-1zM7 13h1v1h-1zM8 1h1v1h-1zM8 2h1v1h-1zM8 3h1v1h-1zM8 6h1v1h-1zM8 7h1v1h-1zM8 9h1v1h-1zM8 10h1v1h-1zM8 13h1v1h-1zM8 14h1v1h-1zM8 16h1v1h-1zM8 17h1v1h-1zM8 19h1v1h-1zM8 21h1v1h-1zM8 24h1v1h-1zM9 0h1v1h-1zM9 2h1v1h-1zM9 3h1v1h-1zM9 4h1v1h-1zM9 6h1v1h-1zM9 7h1v1h-1zM9 8h1v1h-1zM9 9h1v1h-1zM9 11h1v1h-1zM9 17h1v1h-1zM9 18h1v1h-1zM9 19h1v1h-1zM9 20h1v1h-1zM10 2h1v1h-1zM10 5h1v1h-1zM10 6h1v1h-1zM10 10h1v1h-1zM10 11h1v1h-1zM10 12h1v1h-1zM10 13h1v1h-1zM10 14h1v1h-1zM10 17h1v1h-1zM10 19h1v1h-1zM10 20h1v1h-1zM11 0h1v1h-1zM11 2h1v1h-1zM11 4h1v1h-1zM11 5h1v1h-1zM11 7h1v1h-1zM11 9h1v1h-1zM11 10h1v1h-1zM11 12h1v1h-1zM11 15h1v1h-1zM11 17h1v1h-1zM11 20h1v1h-1zM11 24h1v1h-1zM12 1h1v1h-1zM12 2h1v1h-1zM12 5h1v1h-1zM12 7h1v1h-1zM12 8h1v1h-1zM12 9h1v1h-1zM12 10h1v1h-1zM12 14h1v1h-1zM12 15h1v1h-1zM12 17h1v1h-1zM12 18h1v1h-1zM12 19h1v1h-1zM12 20h1v1h-1zM12 23h1v1h-1zM13 0h1v1h-1zM13 2h1v1h-1zM13 4h1v1h-1zM13 5h1v1h-1zM13 6h1v1h-1zM13 8h1v1h-1zM13 10h1v1h-1zM13 11h1v1h-1zM13 12h1v1h-1zM13 13h1v1h-1zM13 14h1v1h-1zM13 15h1v1h-1zM13 17h1v1h-1zM13 18h1v1h-1zM13 19h1v1h-1zM13 20h1v1h-1zM13 21h1v1h-1zM14 1h1v1h-1zM14 2h1v1h-1zM14 5h1v1h-1zM14 6h1v1h-1zM14 9h1v1h-1zM14 10h1v1h-1zM14 11h1v1h-1zM14 12h1v1h-1zM14 13h1v1h-1zM14 20h1v1h-1zM15 4h1v1h-1zM15 6h1v1h-1zM15 12h1v1h-1zM15 14h1v1h-1zM15 16h1v1h-1zM15 18h1v1h-1zM15 21h1v1h-1zM15 22h1v1h-1zM15 23h1v1h-1zM16 0h1v1h-1zM16 1h1v1h-1zM16 2h1v1h-1zM16 3h1v1h-1zM16 7h1v1h-1zM16 11h1v1h-1zM16 14h1v1h-1zM16 15h1v1h-1zM16 16h1v1h-1zM16 17h1v1h-1zM16 18h1v1h-1zM16 19h1v1h-1zM17 12h1v1h-1zM17 13h1v1h-1zM17 14h1v1h-1zM17 17h1v1h-1zM17 18h1v1h-1zM17 23h1v1h-1zM17 24h1v1h-1zM18 8h1v1h-1zM18 11h1v1h-1zM18 13h1v1h-1zM18 14h1v1h-1zM18 15h1v1h-1zM18 18h1v1h-1zM18 19h1v1h-1zM18 20h1v1h-1zM18 23h1v1h-1zM18 24h1v1h-1zM19 8h1v1h-1zM19 10h1v1h-1zM19 13h1v1h-1zM20 8h1v1h-1zM20 9h1v1h-1zM20 14h1v1h-1zM20 16h1v1h-1zM20 19h1v1h-1zM20 22h1v1h-1zM20 24h1v1h-1zM21 8h1v1h-1zM21 9h1v1h-1zM21 12h1v1h-1zM21 16h1v1h-1zM21 17h1v1h-1zM21 18h1v1h-1zM21 19h1v1h-1zM21 21h1v1h-1zM21 22h1v1h-1zM21 23h1v1h-1zM22 12h1v1h-1zM22 14h1v1h-1zM22 15h1v1h-1zM22 16h1v1h-1zM22 18h1v1h-1zM22 19h1v1h-1zM22 20h1v1h-1zM22 21h1v1h-1zM23 8h1v1h-1zM23 10h1v1h-1zM23 11h1v1h-1zM23 12h1v1h-1zM23 14h1v1h-1zM23 19h1v1h-1zM23 20h1v1h-1zM23 21h1v1h-1zM23 22h1v1h-1zM23 23h1v1h-1zM23 24h1v1h-1zM24 9h1v1h-1zM24 10h1v1h-1zM24 11h1v1h-1zM24 13h1v1h-1zM24 14h1v1h-1zM24 15h1v1h-1zM24 18h1v1h-1zM24 19h1v1h-1zM24 21h1v1h-1zM24 22h1v1h-1z"/></svg></div>
        <div id="kt-v-frame"></div>
        <div id="kt-v-line"></div>
        <div id="kt-v-cam-label">Scan to verify</div>
        <div id="kt-v-cam-sub">Point the camera at the certificate</div>
      </div>
      <div id="kt-v-page">
        <div id="kt-v-band">
          <div id="kt-v-eyebrow">Kee Safety · KTrack</div>
          <div id="kt-v-badge"><svg viewBox="0 0 24 24" width="60" height="60"><path d="M12 2.5l8 3v6.2c0 4.9-3.4 8.6-8 9.8-4.6-1.2-8-4.9-8-9.8V5.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.3 12.2l2.6 2.6 5-5.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          <div id="kt-v-title">Valid certificate</div>
          <div id="kt-v-detail">This certificate is current.</div>
        </div>
        <div id="kt-v-body">
          <div class="v-lbl">Certificate number</div>
          <div id="kt-v-no">LE-2026-00412</div>
          <div id="kt-v-grid">
            <div id="kt-v-asset"><div class="v-lbl">Asset</div><div class="v-val">LE-0412 · 5 t Chain Block</div></div>
            <div><div class="v-lbl">Issued</div><div class="v-val">14 Oct 2026</div></div>
            <div><div class="v-lbl">Expires</div><div class="v-val">14 Apr 2027</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div id="kt-register">
  <div id="kt-r-app">
    <div id="kt-r-head"><div id="kt-r-eyebrow">KTrack · Certificates</div><div id="kt-r-title">Certificate register</div></div>
    <div id="kt-r-tiles">
      <div class="r-tile "><div class="t-lbl">Due in 30 days</div><div class="t-num" id="kt-r-num-0" data-to="18">18</div><div class="t-sub">active obligations</div></div>
      <div class="r-tile due"><div class="t-lbl">Due in 7 days</div><div class="t-num" id="kt-r-num-1" data-to="6">6</div><div class="t-sub">across all clients</div></div>
      <div class="r-tile due"><div class="t-lbl">Due today</div><div class="t-num" id="kt-r-num-2" data-to="2">2</div><div class="t-sub">action today</div></div>
      <div class="r-tile overdue"><div class="t-lbl">Overdue</div><div class="t-num" id="kt-r-num-3" data-to="3">3</div><div class="t-sub">needs action</div></div>
    </div>
    <div id="kt-r-table">
      <div id="kt-r-cols"><div>Certificate</div><div>Asset</div><div>Site</div><div>Expires</div><div>Status</div></div>
      <div id="kt-r-rows">
        <div id="kt-r-hl"></div>
      <div id="kt-r-row-0" class="r-row r-new" style="top:0px"><div class="c1">LE-2026-00412</div><div class="c2">LE-0412 · 5 t Chain Block</div><div class="c3">Rig 17</div><div class="c4">14 Apr 2027</div><div class="c5"><span class="pill valid">Valid</span></div></div>
      <div id="kt-r-row-1" class="r-row" style="top:86px"><div class="c1">LB-2025-00076</div><div class="c2">LB-0076 · Lifting beam</div><div class="c3">Hadeed Marine</div><div class="c4">14 Oct 2026</div><div class="c5"><span class="pill due">Due today</span></div></div>
      <div id="kt-r-row-2" class="r-row" style="top:172px"><div class="c1">PE-2025-00061</div><div class="c2">PE-0061 · Pad eye</div><div class="c3">Najm Drilling</div><div class="c4">21 Oct 2026</div><div class="c5"><span class="pill due">Due in 7 days</span></div></div>
      <div id="kt-r-row-3" class="r-row" style="top:258px"><div class="c1">CR-2026-00031</div><div class="c2">CR-0031 · Crane hook</div><div class="c3">Sabkha Energy</div><div class="c4">3 Mar 2027</div><div class="c5"><span class="pill valid">Valid</span></div></div>
      <div id="kt-r-row-4" class="r-row" style="top:344px"><div class="c1">HP-2025-00220</div><div class="c2">HP-0220 · Chain hoist</div><div class="c3">Sabkha Energy</div><div class="c4">9 Oct 2026</div><div class="c5"><span class="pill overdue">Overdue</span></div></div>
      </div>
    </div>
  </div>
</div>
<div id="kt-remind">
  <div id="kt-m-phone">
    <div id="kt-m-screen">
      <div id="kt-m-date">Wednesday 14 October</div>
      <div id="kt-m-time">08:00</div>
      <div id="kt-m-stack">
        <div class="n" id="kt-m-wa">
          <div class="n-head"><span class="n-app" style="background:var(--wa)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 19.5l1.3-3.8A8 8 0 1 1 8.6 19z"/></svg></span>WhatsApp · KTrack<span class="n-when">now</span></div>
          <div class="n-title">LB-0076 Lifting beam is due today</div>
          <div class="n-body">Hadeed Marine. Certificate expires today.</div>
          <span class="n-pill">Due today</span>
        </div>
        <div class="n" id="kt-m-mail">
          <div class="n-head"><span class="n-app" style="background:var(--mail)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg></span>Email · KTrack<span class="n-when">now</span></div>
          <div class="n-title">6 certificates due this week</div>
          <div class="n-body">2 today, 1 overdue. Open the register.</div>
        </div>
      </div>
      <div id="kt-m-log">Every alert is logged in KTrack</div>
    </div>
  </div>
</div>`;

function sceneForm(root) {
  // Ported from M923 (fill in the form). Counters and typing are the slots; everything else is the Moment's measured motion.
  const PARAMS = {
    limitFrom: 2.04, limitTo: 6.25,          // proof load, tonnes, 2 dp
    amountFrom: 8, amountTo: 12,             // checklist items answered
    amountUnit: ' / 12',
    percentFrom: 69, percentTo: 100,         // checklist complete, integer
    typeFrames: [151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171], // frame each next character of the date shows; last = all
  };
  const HOLD = 0.25; // stretch: the typed date holds this much longer before the exit (REMIX.md stretch point)
  const FPS = 60, STEP = 0.004;
  const CURVE = {
    f:      [0, 1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 47, 48, 49, 50],
    money:  [0, .015155, .031518, .049068, .067693, .087353, .10801, .129546, .151953, .248654, .353673, .462888, .572174, .677375, .774438, .859204, .927548, .975348, .995233, .998481, .999926, 1],
    amount: [0, .016239, .033713, .052483, .072367, .093306, .115299, .138226, .162027, .264431, .37497, .489034, .602013, .709267, .806279, .888407, .951073, .989606, .99994, 1, 1, 1],
    percent:[0, 0, .0323, .0645, .0645, .0968, .0968, .129, .1613, .2903, .4516, .6129, .7419, .8387, .9032, .9355, .9677, .9677, 1, 1, 1, 1],
  };

  const $ = s => root.querySelector(s);
  const $$ = s => [...root.querySelectorAll(s)];
  const tl = gsap.timeline({ paused: true });

  function kf(targets, prop, keys) {
    const el = typeof targets === 'string' ? $$(targets) : targets;
    tl.set(el, { [prop]: keys[0][1] }, 0);
    for (let i = 1; i < keys.length; i++) {
      const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
      if (t1 - t0 < 1e-6) tl.set(el, { [prop]: v1 }, t1 - STEP);
      else tl.fromTo(el, { [prop]: v0 }, { [prop]: v1, duration: t1 - t0, ease: 'none', immediateRender: false }, t0);
    }
  }
  const lerpCurve = (ys, f) => {
    const F = CURVE.f; if (f >= F[F.length - 1]) return ys[ys.length - 1];
    let i = 0; while (F[i + 1] <= f) i++;
    return ys[i] + (ys[i + 1] - ys[i]) * (f - F[i]) / (F[i + 1] - F[i]);
  };
  const tonnes = v => v.toFixed(2) + ' t';
  const typedEl = $('#kt-typed'), typedFull = Array.from(typedEl.textContent);
  function renderText(t) {
    const f = Math.round(t * FPS);
    const fc = Math.min(f, 50);
    const m = lerpCurve(CURVE.money, fc), a = lerpCurve(CURVE.amount, fc), p = lerpCurve(CURVE.percent, fc);
    $('#kt-limit-value').textContent = tonnes(PARAMS.limitFrom + (PARAMS.limitTo - PARAMS.limitFrom) * m);
    const count = Math.round(PARAMS.amountFrom + (PARAMS.amountTo - PARAMS.amountFrom) * a);
    $$('.chk').forEach((el, i) => el.classList.toggle('done', count >= PARAMS.amountTo - 3 + i)); // items 9..12 tick as the count reaches them
    $('#kt-amount').textContent = 'Checklist ' + count + PARAMS.amountUnit;
    // The bar samples the smooth checklist curve at the exact time, not the whole-percent label curve, so it glides.
    progress = (PARAMS.percentFrom + (PARAMS.percentTo - PARAMS.percentFrom) * lerpCurve(CURVE.amount, Math.min(t * FPS, 50))) / 100;
    $('#kt-percent').textContent = Math.round(PARAMS.percentFrom + (PARAMS.percentTo - PARAMS.percentFrom) * p) + '%';
    const k = PARAMS.typeFrames.filter(x => x <= f).length, last = PARAMS.typeFrames.length;
    typedEl.textContent = (k >= last ? typedFull : typedFull.slice(0, k)).join('');
  }
  // The blue fills to the checklist percentage and the handle rides its edge, so bar, handle and label agree.
  const track = $('#kt-track'), fill = $('#kt-fill'), thumb = $('#kt-thumb');
  const px = (el, prop) => parseFloat(el.style[prop]) || 0;
  let progress = PARAMS.percentFrom / 100;
  tl.eventCallback('onUpdate', () => {
    const left = px(track, 'left'), width = px(track, 'width'), inset = px(track, 'height') / 2;
    const centre = Math.min(left + width - inset, Math.max(left + inset, left + progress * width));
    fill.style.transform = `translateX(${centre - left + inset - width}px)`;
    thumb.style.left = centre - px(thumb, 'width') / 2 + 'px';
  });
  const clock = { t: 0 };
  tl.to(clock, { t: 3.5, duration: 3.5, ease: 'none', onUpdate: () => renderText(clock.t) }, 0);
  renderText(0);

  // 0.00–1.33 · zoom-out while the counters climb and the handle slides
  tl.addLabel('s01-zoom-out', 0);
  kf('#kt-camera', 'scale', [[0, 1.691], [.067, 1.413], [.133, 1.29], [.2, 1.213], [.267, 1.161], [.333, 1.123], [.4, 1.093], [.6, 1.036], [1, .962], [1.267, .929]]);
  kf('#kt-track', 'left', [[0, 21], [.067, 123], [.133, 168], [.2, 196], [.267, 215], [.333, 229], [.4, 240], [.467, 248], [.533, 255], [.6, 261], [.667, 266], [.8, 274], [.833, 278], [1, 302], [1.067, 317], [1.133, 335], [1.2, 361], [1.267, 402], [1.283, 418], [1.3, 437], [1.317, 465], [1.333, 505], [1.35, 549], [1.367, 578], [1.383, 597], [1.4, 610], [1.417, 621], [1.433, 629], [1.45, 636], [1.467, 642], [1.517, 657], [1.667, 693]]);
  kf('#kt-track', 'top', [[0, 315], [.067, 321], [.133, 325], [.2, 327], [.467, 331], [.533, 331], [.6, 332], [.833, 332], [1, 333], [1.6, 333], [1.667, 334]]);
  kf('#kt-track', 'width', [[0, 1238], [.067, 1034], [.133, 944], [.2, 888], [.267, 850], [.333, 822], [.4, 800], [.467, 784], [.533, 770], [.6, 758], [.733, 740], [.8, 732], [.833, 724], [1, 681], [1.067, 655], [1.133, 623], [1.2, 573], [1.267, 496], [1.283, 468], [1.3, 430], [1.317, 376], [1.333, 298], [1.35, 211], [1.367, 155], [1.383, 120], [1.4, 96], [1.417, 77], [1.433, 63], [1.45, 51], [1.467, 43], [1.483, 34], [1.517, 22], [1.55, 14], [1.583, 8], [1.6, 6], [1.667, 2.5]]);
  kf('#kt-track', 'height', [[0, 88], [.067, 75], [.133, 67], [.267, 61], [.4, 57], [.533, 55], [.6, 53], [.733, 53], [1, 50], [1.6, 50], [1.667, 49]]);
  kf('#kt-track', 'borderRadius', [[0, 44], [.067, 37.5], [.133, 33.5], [.267, 30.5], [.4, 28.5], [.6, 26.5], [.733, 26.5], [1, 25], [1.45, 25], [1.467, 21.5], [1.483, 17], [1.517, 11], [1.55, 7], [1.6, 3], [1.667, 1.25]]);
  const TICK_X = [
    [[0, 108.1], [.067, 195.747], [.133, 234.415], [.2, 258.475], [.267, 274.802], [.333, 286.832], [.4, 296.284], [.467, 303.158], [.533, 309.173], [.6, 314.329], [.8, 325.5], [.833, 328.937], [1, 337.53], [1.267, 347.842]],
    [[0, 375.318], [.067, 418.933], [.133, 438.175], [.2, 450.148], [.267, 458.272], [.333, 464.258], [.4, 468.962], [.467, 472.383], [.6, 477.941], [.8, 483.5], [.833, 485.21], [1, 489.486], [1.267, 494.617]],
    [[0, 642.537], [.333, 641.684], [1.65, 641.393]],
    [[0, 911.447], [.067, 866.717], [.133, 846.984], [.2, 834.705], [.267, 826.373], [.333, 820.234], [.4, 815.41], [.467, 811.902], [.6, 806.201], [.8, 800.5], [.833, 798.746], [1, 794.361], [1.267, 789.098]],
  ];
  $$('.tick').forEach((el, i) => kf(el, 'left', TICK_X[i]));
  kf('.tick', 'top', [[0, 348.007], [.067, 349.818], [.133, 350.617], [.333, 351.701], [1, 352.749], [1.65, 352.962]]);
  const TICK_D = [[0, 21.986], [.067, 18.363], [.133, 16.765], [.333, 14.598], [1, 12.503], [1.65, 12.077]];
  kf('.tick', 'width', TICK_D); kf('.tick', 'height', TICK_D);
  kf('#kt-track-details', '--l', [[0, .016], [.067, .096], [.133, .131], [.267, .168], [.467, .194], [.8, .214], [1, .236], [1.133, .262], [1.2, .282], [1.267, .314], [1.3, .341], [1.317, .363], [1.35, .429], [1.367, .452], [1.4, .477], [1.467, .502], [1.667, .541]]);
  kf('#kt-track-details', '--r', [[0, .984], [.067, .904], [.133, .869], [.2, .847], [.4, .812], [.8, .786], [1, .768], [1.133, .748], [1.2, .73], [1.283, .692], [1.317, .657], [1.35, .594], [1.367, .573], [1.4, .552], [1.45, .537], [1.517, .53], [1.583, .532], [1.667, .543]]);
  kf('#kt-thumb', 'left', [[0, 713], [.067, 727.5], [.2, 762.5], [.267, 781.5], [.333, 799.5], [.4, 816], [.467, 831.5], [.6, 860.5], [.667, 872.5], [.733, 884], [.833, 900.083], [1, 922.5], [1.067, 930.5], [1.1, 928.5], [1.167, 920.5]]);
  kf('#kt-thumb', 'top', [[0, 323], [.067, 328.5], [.133, 331], [.333, 334.5], [.733, 337], [1.167, 337.5]]);
  const THUMB_D = [[0, 72], [.067, 61], [.133, 56], [.2, 53], [.333, 49], [.6, 45], [.667, 45], [.733, 44], [1.167, 43]];
  kf('#kt-thumb', 'width', THUMB_D); kf('#kt-thumb', 'height', THUMB_D);
  kf('#kt-thumb', '--sb', [[0, 6], [.8, 4]]); kf('#kt-thumb', '--sy', [[0, 3], [.8, 2]]);

  // 0.83–1.32 · words fade and are drawn inward while the track narrows
  tl.addLabel('s01-fade', .833);
  kf('#kt-words', 'opacity', [[.833, 1], [.933, .86], [1, .7], [1.067, .5], [1.133, .35], [1.2, .18], [1.267, .03], [1.317, 0]]);
  kf('#kt-words', '--blur', [[0, .3], [.933, .3], [1.2, 1], [1.317, 2]]);
  kf('.in-l', 'x', [[.833, 0], [1, 7], [1.133, 26], [1.267, 64]]);
  kf('.in-r', 'x', [[.833, 0], [1, -7], [1.133, -26], [1.267, -64]]);
  tl.set($('#kt-thumb'), { visibility: 'hidden' }, 71 / FPS - STEP);
  tl.set($('#kt-camera'), { visibility: 'hidden' }, 80 / FPS - STEP);

  // 1.33–1.67 · track collapses into the caret
  tl.addLabel('s01-collapse', 1.333);
  tl.set($('#kt-slider'), { visibility: 'hidden' }, 100 / FPS - STEP);
  tl.set($('#kt-line'), { visibility: 'hidden' }, 0);
  tl.set($('#kt-line'), { visibility: 'visible' }, 100 / FPS - STEP);
  kf('#kt-plane', 'opacity', [[1, 0], [1.467, .25], [2.4, .25], [3 + HOLD, .1], [3.283 + HOLD, 0]]);

  // 1.43–2.48 · the issue form grows around the drifting caret
  tl.addLabel('s01-layout', 1.433);
  kf('#kt-header', 'y', [[1.433, 18], [1.6, 12], [1.733, 3], [1.867, 0]]);
  kf('#kt-logo', 'opacity', [[1.533, 0], [1.55, .021], [1.567, .05], [1.583, .089], [1.6, .143], [1.617, .218], [1.633, .308], [1.65, .38], [1.683, .541], [1.717, .725], [1.733, .78], [1.8, .9], [1.867, .999], [2.6, .999], [2.6, .5]]);
  kf('.head', 'opacity', [[1.433, 0], [1.533, .15], [1.6, .32], [1.667, .56], [1.733, .78], [1.8, .9], [1.867, .999], [2.6, .999], [2.6, .5]]);
  kf('#kt-buttons', 'y', [[1.5, 20], [1.667, 11], [1.8, 2], [2.2, 0]]);
  kf('.btn', 'opacity', [[1.5, 0], [1.6, .12], [1.667, .35], [1.8, .72], [2, 1], [2.6, 1], [2.6, .4]]);
  kf('#kt-field', 'opacity', [[1.65, 0], [1.733, .3], [1.833, .6], [2, .85], [2.2, 1]]);
  kf('#kt-field', '--p', [[1.65, 0], [1.733, .15], [1.833, .4], [1.933, .65], [2.067, .94], [2.133, 1]]);
  kf('#kt-field', '--blur', [[1.717, 3], [2, 1], [2.267, .2], [2.6, .2], [2.6, .65]]);
  kf('#kt-input-label', 'opacity', [[1.833, 0], [1.933, .35], [2, .6], [2.2, 1], [2.6, 1], [2.6, .45]]);
  kf('#kt-input-label', '--blur', [[1.833, 2], [2.2, 0], [2.6, 0], [2.6, .8]]);
  kf('#kt-input-hint', 'opacity', [[1.967, 0], [2.033, .08], [2.05, .173], [2.067, .274], [2.083, .383], [2.117, .583], [2.133, .693], [2.167, .933], [2.2, 1], [2.6, 1], [2.6, .45]]);
  kf('#kt-input-hint', '--blur', [[1.967, 1.273], [2.2, 0], [2.6, 0], [2.6, .8]]);
  kf('#kt-line', 'left', [[1.667, 693], [1.733, 718], [1.8, 752], [1.867, 773], [1.933, 784], [2, 790], [2.2, 801], [2.4, 805], [2.483, 806]]);
  kf('#kt-mid', 'opacity', [[1.717, 0], [1.717, .08], [1.733, .3], [1.8, .7], [1.933, .95], [2.083, 1]]);
  kf('#kt-mid', '--blur', [[1.717, 4], [1.8, 1.3], [2, .4], [2.2, 0]]);
  kf('#kt-typed', 'opacity', [[1.8, 0], [1.817, .08], [1.867, .35], [2, .8], [2.2, 1]]);
  kf('#kt-typed', '--blur', [[1.8, 4], [1.933, 1.5], [2.083, 0]]);
  ['#kt-logo', '.head'].forEach(s => kf(s, '--blur', [[2.6, 0], [2.6, .8]]));
  kf('.btn', '--blur', [[2.6, 0], [2.6, 1]]);

  // 2.48–2.87 · typing the date (renderText) + one-frame camera step at 2.60
  tl.addLabel('s01-typing', 2.483);
  tl.addLabel('s01-zoom-step', 2.6);
  kf('#kt-card', 'scale', [[2.6, 1], [2.6, 2.46]]);
  kf('#kt-card', 'x', [[2.6, 0], [2.6, -1060], [3.283 + HOLD, -1029.25]]);

  // 3.18–3.50 · the form accelerates up under a dark wash (cut mid-exit to the certificate)
  tl.addLabel('s01-exit', 2.933 + HOLD);
  const H = HOLD;
  kf('#kt-card', 'y', [[2.6, 0], [2.6, -523.64], [2.933 + H, -523.64], [2.983 + H, -524.64], [3.05 + H, -534.64], [3.117 + H, -556.64], [3.183 + H, -598.64], [3.25 + H, -665.64], [3.267 + H, -687.64]]);
  kf('#kt-wash', 'opacity', [[2.933 + H, 0], [3 + H, .015], [3.067 + H, .065], [3.133 + H, .16], [3.2 + H, .3], [3.267 + H, .49], [3.283 + H, .54]]);
  kf('#kt-wash-bottom', 'opacity', [[2.933 + H, 0], [2.933 + H, .05], [3 + H, .3], [3.067 + H, .55], [3.133 + H, .8], [3.2 + H, .95], [3.283 + H, 1]]);
  tl.set($('#kt-edge'), { visibility: 'visible' }, 197 / FPS + H - STEP);
  tl.addLabel('end', 3.5);
  // REMIX: the website opens on this checklist, so the Moment's first 0.83 s play slower (still moving,
  // never held) until every item is ticked; everything after runs at the Moment's own speed, CHECK_EXTRA later.
  const CHECK_EXTRA = 2;
  const film = gsap.timeline({ paused: true });
  film.fromTo(tl, { time: 0 }, { time: .833, duration: .833 + CHECK_EXTRA, ease: 'none', immediateRender: false }, 0);
  film.fromTo(tl, { time: .833 }, { time: 3.5, duration: 3.5 - .833, ease: 'none', immediateRender: false }, .833 + CHECK_EXTRA);
  return film;
}

function sceneCertificate(root) {
  return (() => {
    const q = s => root.querySelector(s);
    const tl = gsap.timeline({ paused: true });
    // Continues the form's upward exit: the card arrives already moving and decelerates hard, then holds dead still.
    tl.fromTo(q('#kt-cert-card'), { y: 640 }, { y: 0, duration: 0.8, ease: 'expo.out' }, 0);
    tl.fromTo(q('#kt-cert-next-val'), { backgroundColor: 'rgba(234,240,251,1)' }, { backgroundColor: 'rgba(234,240,251,0)', duration: 0.9, ease: 'power2.inOut' }, 1.5);
    tl.fromTo(q('#kt-cert-qr'), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.45, ease: 'power3.out' }, 0.6);
    tl.fromTo(q('#kt-cert-issued'), { opacity: 0, y: 6, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, 0.95);
    // Push into the QR: it becomes the code the phone scans next.
    tl.fromTo(q('#kt-cert-card'), { scale: 1 }, { scale: 3.4, duration: 0.55, ease: 'power3.in', immediateRender: false }, 1.95);
    tl.set({}, {}, 2.5);
    return tl;
  })();
}

function sceneVerify(root) {
  return (() => {
    const q = s => root.querySelector(s);
    const tl = gsap.timeline({ paused: true });
    // Pull back out of the certificate's QR: the code arrives huge and lands in the phone's viewfinder.
    tl.fromTo(q('#kt-v-phone'), { scale: 2.6 }, { scale: 1, duration: 0.75, ease: 'expo.out' }, 0);
    tl.fromTo(q('#kt-v-frame'), { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, 0.3);
    tl.fromTo([q('#kt-v-cam-label'), q('#kt-v-cam-sub')], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, 0.35);
    // Scan line sweeps the code once, top to bottom.
    tl.fromTo(q('#kt-v-line'), { opacity: 0, y: 0 }, { opacity: 1, duration: 0.08 }, 0.55);
    tl.fromTo(q('#kt-v-line'), { y: 0 }, { y: 324, duration: 0.6, ease: 'power1.inOut', immediateRender: false }, 0.55);
    tl.to(q('#kt-v-line'), { opacity: 0, duration: 0.1 }, 1.12);
    // The verify page rises over the camera the moment the scan completes.
    tl.fromTo(q('#kt-v-page'), { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'expo.out' }, 1.2);
    tl.fromTo(q('#kt-v-cam'), { y: 0 }, { y: -1008, duration: 0.55, ease: 'expo.out' }, 1.2);
    tl.set(q('#kt-v-cam'), { autoAlpha: 0 }, 1.75);
    tl.fromTo(q('#kt-v-badge'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, 1.45);
    tl.fromTo([q('#kt-v-title'), q('#kt-v-detail')], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.07 }, 1.55);
    // Leaves left, mid-move, as the register comes in from the right.
    tl.fromTo(q('#kt-v-phone'), { x: 0 }, { x: -1200, duration: 0.45, ease: 'power3.in', immediateRender: false }, 2.75);
    tl.set({}, {}, 3.2);
    return tl;
  })();
}

function sceneRegister(root) {
  return (() => {
    const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];
    const tl = gsap.timeline({ paused: true });
    // Enters from the right, still moving, as the phone leaves left.
    tl.fromTo(q('#kt-r-app'), { x: 1300 }, { x: 0, duration: 0.8, ease: 'expo.out' }, 0);
    // Deadline counters climb once and land.
    qa('#kt-r-tiles .t-num').forEach((el, i) => {
      const to = +el.dataset.to, c = { v: 0 };
      tl.fromTo(c, { v: 0 }, { v: to, duration: 0.9, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(c.v); }, onStart: () => { el.textContent = 0; } }, 0.35 + i * 0.06);
    });
    // The new certificate drops in at the top; the older rows make room.
    const older = qa('#kt-r-rows .r-row:not(.r-new)');
    tl.fromTo(older, { y: -86 }, { y: 0, duration: 0.6, ease: 'power3.inOut' }, 1.45);
    tl.fromTo(q('.r-new'), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.75);
    tl.fromTo(q('#kt-r-hl'), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 1.75);
    tl.to(q('#kt-r-hl'), { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 3.2);
    // Leaves left as the owner's phone comes in with the alerts.
    tl.to(q('#kt-r-app'), { x: -1600, duration: 0.45, ease: 'power3.in' }, 4.05);
    tl.set({}, {}, 4.5);
    return tl;
  })();
}

function sceneRemind(root) {
  const q = s => root.querySelector(s);
  const tl = gsap.timeline({ paused: true });
  // Arrives from the right, still moving, as the register leaves left.
  tl.fromTo(q('#kt-m-phone'), { x: 1200 }, { x: 0, duration: 0.8, ease: 'expo.out' }, 0);
  // The owner's alerts land one after the other, newest on top of the lock screen.
  tl.fromTo(q('#kt-m-wa'), { opacity: 0, y: -40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.75);
  tl.fromTo(q('#kt-m-mail'), { opacity: 0, y: -40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 1.45);
  tl.fromTo(q('#kt-m-log'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 2.05);
  // Fades to the ground so the loop restarts on a clean panel.
  tl.to(q('#kt-m-phone'), { opacity: 0, duration: 0.4, ease: 'power2.in' }, 3.6);
  tl.set({}, {}, 4);
  return tl;
}

/** Each scene's root id, its timeline builder, and where it sits in the loop (seconds). */
export const SCENES = [
  { id: "kt-form", build: sceneForm, start: 0, duration: 5.5 },
  { id: "kt-cert", build: sceneCertificate, start: 5.5, duration: 2.5 },
  { id: "kt-verify", build: sceneVerify, start: 8, duration: 3.2 },
  { id: "kt-register", build: sceneRegister, start: 11.2, duration: 4.5 },
  { id: "kt-remind", build: sceneRemind, start: 15.7, duration: 4 },
];
