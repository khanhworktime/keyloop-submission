# US-008 Select Component Parity

## Status

implemented

## Lane

normal

## Product Contract

All single-choice form controls use one accessible, branded select component
instead of browser-default or surface-specific implementations.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`

## Acceptance Criteria

- [x] Inventory Make and Model controls match the approved custom trigger and
  popup pattern, including a visible selected-item check.
- [x] Pagination, Activity advanced filters, and Proposed action use the same
  shared select component.
- [x] Labels, expanded/selected states, keyboard navigation, Escape dismissal,
  and focus treatment remain accessible.
- [x] Existing filter, pagination, and action values continue to reach their
  current callbacks without changing URL or domain semantics.
- [x] Trigger and option rows retain at least a 44px interaction target on
  desktop and mobile.

## Design Notes

- Commands: no change.
- Queries: no change.
- API: no change.
- Tables: no change.
- Domain rules: no change.
- UI surfaces: Inventory filters, Inventory pagination, Activity advanced
  filters, and Inventory Unit action drawer.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Focused component tests prove selection callbacks and displayed values. |
| Integration | Existing URL and mutation contracts remain unchanged. |
| E2E | Not rerun for this visual pass; existing journey selector is updated for the custom listbox. |
| Platform | User manually checks desktop/mobile popup placement and visual parity. |
| Release | Full validation deferred by the agreed fast UI workflow. |

## Harness Delta

Manual visual approval is recorded below.

## Evidence

- User supplied Inventory-filter and Proposed-action reference screenshots on
  2026-07-15.
- [Focused tester report](../../plans/reports/tester-2026-07-15-select-component-parity.md):
  focused Vitest validation passed 5 files and 8/8 tests.
- `npx tsc -b --pretty false` passed with no diagnostics.
- [Code-review report](../../plans/reports/code-reviewer-2026-07-15-select-component-parity.md):
  no source correctness defect; all six consumers use the shared component,
  adapters remain intact, 44px targets are retained, and portal layering clears
  both drawer layers.
- Manual feedback consolidated `Avery/Every Manager` and `Krist Manager` into
  one `Manager` actor while preserving `Inventory Feed` and `Inventory System`.
  A legacy Local Storage regression test passed with 12 repository assertions.
- Playwright and the full release validation were intentionally not run under
  the agreed fast UI workflow.
- User manually approved desktop/mobile visual parity, keyboard navigation,
  Escape dismissal and focus return, popup placement, and drawer layering on
  2026-07-15.

## Unresolved Questions

None.
