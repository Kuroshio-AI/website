# Kuroshio AI

Kuroshio AI is a Vite-powered React site.

## Local development

```sh
bun install
bun run dev
```

The contact form reads these Vite variables at build time:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

For local work, put their values in an untracked `.env.local` file. Never commit credential values.

## Vercel deployment

Connect the repository to Vercel and set `main` as the Production Branch. Pushes to `main` create Production deployments; other branches and pull requests create Preview deployments.

Add all three `VITE_EMAILJS_*` variables in Vercel Project Settings → Environment Variables for both Production and Preview. Because Vite inlines them during the build, redeploy after changing a value.

The Vercel build command is `bun run build`, and the generated site is in `dist`.

## Verification

```sh
bun run lint
bun run build
```
