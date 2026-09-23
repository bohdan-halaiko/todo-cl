# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page todo list (add / toggle / inline edit / delete) built on the Vite + React + TypeScript template. All UI lives in one component, `src/App.tsx`; there is no router, state library, backend, or persistence — todos live in `useState` and are lost on reload.

## Commands

```bash
npm run dev          # dev server (Vite picks the next free port if 5173 is taken)
npm run build        # tsc -b && vite build  → dist/, assets at /assets/...
npm run build:pages  # same, but --base=/todo-cl/ — what CI runs for GitHub Pages
npm run lint         # oxlint
npm run preview      # serve the last dist/ build (root base — pair with build, not build:pages)
```

There is no test setup (no runner, no test files). `npm run build` is the type check — `tsc -b` runs as its first half; run it alone with `npx tsc -b`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs lint + `build:pages` and publishes `dist/` to GitHub Pages at https://bohdan-halaiko.github.io/todo-cl/.

The `/todo-cl/` base path is passed explicitly by the `build:pages` script, **not** inferred inside `vite.config.ts` — so a plain `npm run build` always produces a root-relative bundle. If you upload `dist/` to Pages by hand, use `build:pages` or every asset 404s.

`concurrency.cancel-in-progress` is deliberately `false`: cancelling a run mid-`deploy-pages` can leave the Pages deployment stuck.

## Styling

No CSS framework. `src/index.css` defines the theme as custom properties on `:root` with a `prefers-color-scheme: dark` override block; `src/App.css` consumes them (`--accent`, `--accent-text`, `--accent-bg`, `--accent-border`, `--border`, `--text`, `--text-h`, `--bg`). Any new color belongs in both blocks of `index.css` as a token — check contrast in the dark palette, where `--accent` is light and needs the dark `--accent-text` on top of it. `.todo-icon-button` is the shared style for all the small square icon buttons in a row.

## Conventions worth keeping

- `@types/react` 19 deprecates `FormEvent`; use `SyntheticEvent`, `ChangeEvent`, or `KeyboardEvent` instead.
- Todo ids come from `crypto.randomUUID()`; state updates use functional updaters and immutable `map`/`filter`.
- UI strings are Ukrainian, including `aria-label`s.
