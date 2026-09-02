# GrackleDocs Accessibility Dashboard

A React dashboard for reviewing accessibility (a11y) issues found in digital documents and web content, filtering/searching them, inspecting issue details, and tracking remediation progress. Built with Vite, React 19, TypeScript, and Tailwind CSS v4.

## Quick-start

### Running the dev build
```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173`

### Running the production build
```bash
npm install
npm run build
npm run preview
```

Navigate to `http://localhost:4173`

## Stack

- **Vite + React 19 + TypeScript** — app tooling and UI
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin, no postcss config needed) — styling, with
  design tokens defined in [src/index.css](src/index.css) under `@theme`
- **recharts** — trend chart of issues over time
- **lucide-react** — icons
- **Mock API** ([src/api/mockApi.ts](src/api/mockApi.ts)) — simulates async fetch with
  loading/empty/error states over local mock data, no backend required

## Prerequisites

- Node.js 20+ and npm

## Install

```bash
npm install
```

This also runs `husky` (via the `prepare` script) to set up git hooks — see
[Git hooks](#git-hooks) below.

## Run the app

```bash
npm run dev
```

Opens the Vite dev server (default `http://localhost:5173`). The dashboard page
([src/pages/DashboardPage.tsx](src/pages/DashboardPage.tsx)) includes a "Demo data controls" bar
at the bottom for manually switching between default/empty/error fetch modes to QA those states.

Other useful scripts:

```bash
npm run build      # type-check (tsc -b) and build a production bundle
npm run preview    # preview the production build locally
npm run lint       # run ESLint
```

## Using the dashboard

- **Review issues** — the issue table lists each accessibility violation with severity
  (critical/serious/moderate/minor) and remediation status (not started/in progress/testing/
  completed), plus a summary header and trend chart of issues over time.
- **Find/narrow down issues** — use the filters bar to search and filter by severity, status,
  or other criteria.
- **Inspect an issue** — click a row to open the detail drawer with full context (description,
  affected element, WCAG reference, etc.).
- **Track remediation** — update an issue's status from the detail drawer or table to reflect
  its progress through the remediation workflow.

## Testing

### Unit / component tests (Jest)

```bash
npm run test          # run once
```

### End-to-end tests (Playwright)

```bash
npm run test:e2e
```

> **Note:** `@playwright/test` is pinned to `1.48.0` because newer Playwright browser builds aren't supported on macOS 13 (Ventura). If you're on a newer OS/CI, consider bumping the version and dropping the pin.

### Git hooks

A pre-commit hook (`.husky/pre-commit`) runs `npm run lint && npm test` (unit tests only — e2e tests are excluded since they need a browser and are slower).

## Current limitation (due to time constraint)
- Application is not fully keyboard accessible (keyboard focus is lost) due usage of div tags, rather than proper HTML syntax
- Page speed load is rather slow, will need to optimize page layout to reduce component and function nesting.
- Will need to incorporate hydration techniques to reduce overall page loading speed.
- My Mac is running an on older Mac OS causing the playwright/test package to be limited to 1.48.0


## Current website metrics
- Google Lighthouse accessibility score: 93 (A few colour contrast violations)
- Google Lighthouse performance score: 18 (Page speed index was long [6s], largest contentful paint [11.3s])
- 4 accessibility violations found with Axe DevTools Chrome extension (1 regarding aria hidden and 3 regarding colour contrast on the demo controls at the bottom)