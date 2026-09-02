# Kuroshio AI — website

See `AGENTS.md` for package manager, shadcn/ui, and general project conventions.

## Browser verification — always use agent-browser

Whenever you need to **see** the site — verification, screenshots, visual
inspection, interaction testing, responsive or reduced-motion checks — use the
`agent-browser` skill (`/Users/shn/.agents/skills/agent-browser/SKILL.md`) and
its `agent-browser` CLI.

Do **not** reach for the built-in Claude Browser pane
(`mcp__Claude_Browser__*`) for verification. Its pane is frequently hidden, and
a hidden pane reports `document.visibilityState === "hidden"`, which stops
`requestAnimationFrame`. That silently freezes the GSAP ticker and the Remotion
player, so animated content screenshots as a blank page and input actions time
out. `agent-browser` drives a real Playwright browser that paints correctly
either way.

```bash
agent-browser set viewport 1440 900
agent-browser open http://localhost:<port>
agent-browser wait 2500
agent-browser screenshot out.png
agent-browser set media dark reduced-motion   # accessibility pass
agent-browser close                           # frees the headless shells
```

Notes:

- Always `agent-browser close` when you are done. The Playwright headless
  shells stay resident and burn CPU otherwise.
- Hash routing: after `agent-browser open '<url>#/page'`, the browser may
  restore the previous scroll position. `eval "window.scrollTo(0,0)"` before
  screenshotting.
- `html { scroll-behavior: smooth }` fights programmatic scrolling. Set
  `document.documentElement.style.scrollBehavior = 'auto'` first.

## Contact form

The contact form posts through EmailJS and reads three `VITE_EMAILJS_*` vars.
Vite inlines them at **build** time, so they must exist in the build
environment. When any is missing the form fails closed — the visitor gets a
generic error and the lead is dropped with no server-side trace. After
changing build config, submit the form once and confirm the success message.

## Dev server

Port 5173 is usually taken by OrbStack on this machine. `vite.config.js` reads
`PORT`, and `.claude/launch.json` has `autoPort: true`, so let the harness pick
a free port rather than hardcoding one.
