---
phase: 10
title: "Validate Tests Accessibility and Build"
status: completed
priority: P1
effort: "1d"
dependencies: [6, 7, 8, 9]
---

# Phase 10: Validate Tests Accessibility and Build

## Overview

Prove domain rules, HTTP contracts, cache behavior, responsive workflows,
accessibility, and production compilation before any completion claim.

## Test Matrix

| Layer | Required proof |
| --- | --- |
| Unit | 89/90/91 aging, parsers, filters, paging, atomic repository command |
| Integration | MSW envelopes/errors/telemetry and Query invalidation |
| Component | Four route states, grid/card parity, form and dialog keyboard behavior |
| E2E | filter Unit, save aging action, reload, find exactly one Activity event |
| Accessibility | axe on all routes/viewports plus manual keyboard/focus/reflow checks |

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/tests/e2e/inventory-manager-loop.spec.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/tests/e2e/accessibility.spec.ts`.
- Modify: focused `*.test.ts`/`*.test.tsx` files from Phases 2–9 only when gaps appear.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/playwright.config.ts` only for evidence stability.

## Implementation Steps

1. Run all unit/component/MSW tests with coverage; fix root causes, never weaken
   assertions or fake persistence.
2. E2E: clear state, filter make/model/age, open a 91+ Unit, save action+note,
   observe toast, reload detail, open global Activity, apply filters, and assert
   one matching event. Also prove exactly-90 action is unavailable/rejected.
3. Run desktop/tablet/mobile projects. Assert no essential horizontal overflow,
   44px/48px targets, visible focus, back/forward filter state, and error retry.
4. Run axe against `/`, `/inventory`, one Unit, and `/activity` in desktop and
   mobile. Manually verify dialog containment/restoration and 200% reflow.
5. Search for persistence boundary/Enterprise violations and telemetry payload
   leaks. Run lint, complete `validate`, and whitespace checks.

## Success Criteria

- [x] `npm run test:coverage` passes with domain/repository/handler coverage.
- [x] `npm run test:e2e` passes in configured Chromium projects.
- [x] `npm run lint` and `npm run validate` pass from a clean state.
- [x] `git diff --check` passes.
- [x] `rg -n "localStorage|sessionStorage" src/features src/routes src/components` is empty.
- [x] `rg -n "ag-grid-enterprise|Zone|Slot|EventSource|WebSocket" src` has no scoped violation.

## Risks and Security

Date fixtures and persisted browser state can make E2E flaky. Freeze clock where
appropriate, clear state per test, and use role/URL assertions rather than sleeps.
Do not mark a proof column from static design evidence.

## Next Steps

Only a green evidence set may proceed to Phase 11 completion records.
