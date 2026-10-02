# Icoziv web

The interactive Icoziv badge builder, built with Next.js App Router and exported as a static site for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The production build is written to `out/`. On GitHub Actions, Next.js automatically uses `/icoziv` as the Pages base path.

## Structure

- `app/` — routes, metadata and global visual system
- `components/icon-builder/` — builder features and dialogs
- `components/ui/` — reusable UI primitives
- `hooks/` — theme and icon catalog state
- `lib/` — badge URL and catalog utilities
- `types/` — shared domain types
