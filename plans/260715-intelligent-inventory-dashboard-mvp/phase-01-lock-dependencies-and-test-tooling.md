---
phase: 1
title: "Lock Dependencies and Test Tooling"
status: completed
priority: P1
effort: "0.5d"
dependencies: []
---

# Phase 1: Lock Dependencies and Test Tooling

## Overview

Lock runtime and proof tooling before feature work.

## Context Links

- `../../package.json`
- `../../docs/decisions/0008-submission-solution-architecture.md`
- `../../docs/decisions/0009-ag-grid-responsive-data-surface.md`

## Requirements and Architecture

- Add matching `ag-grid-community`/`ag-grid-react`; never install Enterprise.
- Add Tailwind CSS 4 through the Vite plugin, self-hosted Fontsource families,
  and the official `@base-ui/react` package for Select, Combobox, and Drawer.
- Animate UI remains a selective source registry, not a monolithic dependency;
  copied components must use Precision tokens instead of upstream styling.
- Add Vitest/jsdom/Testing Library, Playwright Chromium, coverage, and axe.
- Vitest uses `msw/node`; browser tests use the existing development worker.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/package.json`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/package-lock.json`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/tsconfig.node.json`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/vitest.config.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/playwright.config.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/test/setup-tests.ts`.

## Implementation Steps

1. Run `scripts/bootstrap-harness.sh`, then
   `scripts/bin/harness-cli query matrix --active --summary`. Reuse recorded
   intake 37 and US-001; do not create duplicate intake/story rows.
2. Install matching AG Grid Community packages, `@base-ui/react`, Tailwind CSS
   4 with `@tailwindcss/vite`, and the two approved Fontsource families; commit
   resolved lock versions without unrelated upgrades.
3. Install Vitest, V8 coverage, jsdom, Testing Library, user-event, jest-dom,
   Playwright Test, and axe Playwright.
4. Add `test`, `test:coverage`, `test:e2e`, and `validate` scripts. `validate`
   runs lint, unit/integration, browser proof, then the production bundle.
5. Configure deterministic jsdom tests and desktop/tablet/mobile Chromium
   projects with Vite web-server reuse and trace-on-first-retry.
6. Configure the submission's MSW worker to run in development and production
   preview; Node tests use `msw/node`. There is no production backend fallback.
7. Run dependency audit, baseline lint, test discovery, and bundle verification.

## Success Criteria

- [x] `npm ls ag-grid-community ag-grid-react` shows matching versions.
- [x] `npm ls ag-grid-enterprise` shows no Enterprise dependency.
- [x] `npx vitest run --passWithNoTests` succeeds.
- [x] `npx playwright test --list` discovers all three viewport projects.
- [x] `npm run lint && npm run validate` succeeds at this phase's baseline.

## Risks and Security

Lock installed APIs because current dependencies use `latest`. Triage reachable
`npm audit` findings; never suppress failures just to make the gate green.

## Next Steps

Phase 2 defines the data and persistence contract.
