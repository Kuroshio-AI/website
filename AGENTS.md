# Agent Instructions

## Package Manager

- Use Bun for JavaScript package management and scripts.
- Prefer `bun install` over `npm install`.
- Prefer `bun run <script>` over `npm run <script>`.
- Prefer `bun add <package>` and `bun add -d <package>` over npm equivalents.
- Do not add or refresh `package-lock.json`; use `bun.lock` when dependencies are installed with Bun.

## shadcn/ui CLI

- shadcn/ui is initialized for this Vite app with `components.json`.
- Use Bun: `bunx shadcn@latest add button`, `bunx shadcn@latest view button`, `bunx shadcn@latest docs button`, and `bunx shadcn@latest info`.
- Preview risky changes with `bunx shadcn@latest add dialog --dry-run --diff`.
- Generated UI primitives go under `src/components/ui`; put composed product components outside that folder.
- When implementing Stitch designs, use shadcn/ui primitives wherever they fit before writing custom UI from scratch.

## React Bits MCP

- React Bits is available through the shadcn MCP server, not a separate project package.
- `components.json` includes the `@react-bits` registry: `https://reactbits.dev/r/{name}.json`.
- Use the shadcn MCP tools or CLI to browse, search, and install React Bits items, for example `bunx shadcn@latest add @react-bits/Dither-JS-TW`.
- Prefer the JavaScript variants for this project unless TypeScript is introduced.

## Frontend Design Work

- When implementing or improving frontend UI, use the `$frontend-design` skill:
  `C:\Users\Administrator\.agents\skills\frontend-design\SKILL.md`
- Apply it for React components, pages, app screens, HTML/CSS layouts, visual polish, styling, and design-heavy frontend changes.
- Build usable product surfaces directly rather than placeholder landing pages unless a landing page is explicitly requested.
- Keep UI decisions intentional, domain-specific, accessible, responsive, and consistent with the existing app structure.

## Website Checking

- Whenever checking, testing, inspecting, screenshotting, or interacting with a website or local web app, use the `$agent-browser` skill:
  `C:\Users\Administrator\.agents\skills\agent-browser\SKILL.md`
- Prefer `agent-browser` commands for navigation, snapshots, screenshots, form interactions, and responsive checks.

## Stitch Skills Available

Use Stitch skills when the task involves Stitch designs, design systems, generated screens, or converting designs to code.

### Stitch Build

- `stitch-build:react:components` - Convert Stitch designs into modular Vite and React components.
- `stitch-build:remotion` - Generate Remotion walkthrough videos from Stitch projects.
- `stitch-build:shadcn-ui` - Integrate and build with shadcn/ui components.

### Stitch Design

- `stitch-design:stitch::code-to-design` - Move existing frontend code into Stitch.
- `stitch-design:stitch::extract-design-md` - Extract a design system from frontend source code.
- `stitch-design:stitch::extract-static-html` - Capture self-contained static HTML from a built app or component.
- `stitch-design:stitch::generate-design` - Generate, edit, or create variants of Stitch screens.
- `stitch-design:stitch::manage-design-system` - Create, update, retrieve, and apply Stitch design systems.
- `stitch-design:stitch::upload-to-stitch` - Upload local visual assets or HTML pages to Stitch.

### Stitch Utilities

- `stitch-utilities:design-md` - Synthesize semantic Stitch design system files.
- `stitch-utilities:enhance-prompt` - Improve prompts for Stitch screen generation.
- `stitch-utilities:stitch-loop` - Run iterative Stitch website generation workflows.
- `stitch-utilities:taste-design` - Produce premium DESIGN.md specs for Stitch.

### Other Stitch Skill

- `stitch::generate-design` - Generate new screens from text prompts or images, edit screens, and create variants.

## Local Project Notes

- This repository is a Vite React project.
- Keep changes scoped and verify with Bun commands where possible, for example `bun run build` and `bun run lint`.
