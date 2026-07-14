---
date: 2026-07-13
scope: phase-1-frontend-initialization
status: passed-with-warning
---

# Test Report — 2026-07-13 — Phase 1 frontend initialization

## Summary

Phase 1 acceptance checks passed. The app compiles and production-builds; the expected client dependencies, router/query bootstrap, generated MSW worker, and no-UI-storage constraint are present.

## Test Results Overview

- `npm run lint`: PASS (ESLint exit 0)
- `npm run build`: PASS (`tsc -b && vite build`, exit 0)
- Automated tests: none configured in `package.json`; not applicable to this initialization-only phase.
- Browser smoke: not run. The available in-app browser target was unavailable. Static inspection plus a successful production compilation covered the requested bootstrap checks.

## Build Status

- Build: PASS
- Dependencies: lockfile resolves React 19.2.7, TanStack Query 5.101.2, TanStack Router 1.170.17, Axios 1.18.1, and MSW 2.15.0.
- Warning: Vite reports a 701.82 kB minified JavaScript chunk (245.50 kB gzip), above its 500 kB advisory limit. Not a Phase 1 blocker.

## Requirement Findings

- Router/application bootstrap: PASS. `src/main.tsx` starts the development worker before rendering, then composes `QueryClientProvider` and `RouterProvider`; `src/router.tsx` registers a root route plus `/` route; the root shell exposes a labelled `<main>` and heading.
- MSW: PASS. `src/mocks/browser.ts` uses `setupWorker()`, `src/mocks/start-mock-worker.ts` guards startup to development and memoizes it for Strict Mode, and `public/mockServiceWorker.js` exists as the generated MSW 2.15.0 worker asset.
- API foundation: PASS. `src/lib/api-client.ts` creates the Axios client. No mock domain state or handlers were added, consistent with Phase 1 deferral.
- Direct UI Local Storage access: PASS. Repository search found no `localStorage` or `sessionStorage` references under `src/`.

## Recommendations

1. Before shipping feature-rich routes, use lazy loading if the Vite size advisory remains relevant.
2. Add a browser smoke test once a browser automation target is available; no Phase 1 defect was indicated by static checks or build proof.

## Unresolved Questions

- None.
