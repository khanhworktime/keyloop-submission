# US-003 Production UI Visual Parity

## Status

implemented

## Lane

normal

## Product Contract

Align the running React dashboard with the approved Precision design handoff
without changing routes, data behavior, persistence, or the core manager flow.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `design/v0.5-design-handoff/`
- `design/v0.3-responsive-screens/`
- `design/v0.1-d-precision-guideline/brand-guideline.md`

## Acceptance Criteria

- [x] Desktop uses the approved floating navigation rail, canvas spacing, working
  surfaces, and contextual hierarchy without page-level horizontal overflow.
- [x] Canvas, cards, data surfaces, semantic states, and controls use the approved
  Precision colors, borders, radii, and typography.
- [x] Tablet and mobile intentionally adapt navigation, content density, card
  layout, and touch targets instead of shrinking the desktop composition.
- [x] Overview, Inventory, Inventory Unit, and Activity retain their implemented
  behavior, accessibility states, and manager journey.
- [x] Visual review covers representative desktop, tablet, and mobile viewports;
  lint, tests, build, and E2E checks pass.

## Design Notes

- Commands: no new domain command.
- Queries: no query contract change.
- API: no API change.
- Tables: no data-model change.
- Domain rules: preserve strict aging rule and action persistence.
- UI surfaces: application shell, page canvas, cards, AG Grid, filters,
  contextual panels, activity feed, and responsive navigation.

## Validation

| Layer | Result |
| --- | --- |
| Unit | PASS — Vitest 58/58. |
| Integration | PASS — query, MSW, and persistence tests included in Vitest. |
| E2E | PASS — Playwright 25 passed, 5 intended viewport-gated skips. |
| Platform | Not applicable; browser-only submission. |
| Release | PASS — lint and production build complete; chunk-size advisory is non-blocking. |

## Harness Delta

No Harness policy change expected. This story adds explicit visual-parity proof
for an already implemented product flow.

## Evidence

- The authoritative design audit report approved the implemented shell,
  production surfaces, responsive behavior, and Precision styling.
- The tester report confirmed behavioral, responsive, and accessibility
  regression coverage, including the responsive sticky-sidebar assertion.
- Final `npm run validate`: lint passed; Vitest passed 58/58; production build
  passed with one non-blocking chunk-size warning; Playwright passed 25 tests
  with 5 intentional project/surface skips.
- Manual review covered 12 views: Overview, Inventory, Inventory Unit, and
  Activity at desktop, tablet, and mobile widths, with no blocking mismatch.
- Mobile branding now uses `public/keyloop-mobile-logo.jpeg`.
- `plans/reports/researcher-2026-07-15-design-vs-implementation-audit.md`
- `plans/reports/tester-2026-07-15-production-ui-visual-parity.md`
- `plans/reports/code-reviewer-2026-07-15-production-ui-visual-parity.md`

## Unresolved Questions

None.
