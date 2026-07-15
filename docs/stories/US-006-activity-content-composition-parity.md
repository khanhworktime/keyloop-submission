# US-006 Activity Content Composition Parity

## Status

implemented

## Lane

normal

## Product Contract

Align the desktop Activity content composition with the supplied reference:
compact global framing, an immediately adjacent filter rail and operational
event feed, while preserving URL-backed filters, pagination, activity evidence,
and Inventory Unit navigation.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`
- `design/v0.3-responsive-screens/screens/activity.html`

## Acceptance Criteria

- [x] The desktop page uses `Activity`, `Operational activity`, and the supplied
  global activity subtitle rather than the oversized alternate framing.
- [x] The header-to-content spacing, two-column rail/feed composition, card
  borders, and event density match the supplied desktop reference.
- [x] The existing search, unit filter, advanced filter drawer, pagination,
  live result count, and Unit links retain their current behavior.
- [x] Tablet and mobile retain their intentional responsive compositions with
  no overflow or accessibility regression.
- [x] Browser proof compares the running Activity route at desktop, tablet, and
  mobile viewports against the accepted reference hierarchy.

## Design Notes

- Commands: no new product command.
- Queries: preserve Activity URL search state.
- API: no contract change.
- Tables: no data-model change.
- Domain rules: preserve activity event meaning and persisted manager actions.
- UI surfaces: Activity page header, filter rail, feed header, event rows.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Component expectations cover the corrected global framing. |
| Integration | Existing Activity query/filter behavior remains green. |
| E2E | Playwright verifies reference text, composition, event density, filters, and links. |
| Platform | Chromium desktop, tablet, and mobile viewports with axe/overflow checks. |
| Release | `npm run validate` passes; React diagnostics introduce no new in-scope issue. |

## Harness Delta

No Harness policy change expected. This is a bounded visual correction to an
existing responsive Activity implementation.

## Evidence

- User reference: supplied `codex-clipboard-0e55b98e-8932-41aa-9657-43a9ea0cf753.png`.
- Current-state capture: `/private/tmp/activity-current.png`.
- [Investigation report](../../plans/reports/debugger-2026-07-15-activity-content-composition-parity.md)
  identifies the reference hierarchy, 282px rail, 72px desktop date column,
  32px event marker, and preserved URL/filter/Unit-link contracts.
- Final `npm run validate` passed: lint passed, 59 unit tests passed, the
  production build passed, and 31 active Playwright E2E tests passed with 11
  intentional viewport/project-gated skips.
- Targeted component and Playwright checks passed for the Activity framing,
  dense desktop composition, filter drawer/search behavior, pagination, and
  Unit navigation. Visual checks at desktop 1440×1000 and mobile 390×844
  confirmed the accepted hierarchy and no clipping or horizontal overflow.
- React Doctor's documented `socket/low-supply-chain-score` warning for
  `iconsax-reactjs@0.0.8` remains pre-existing and out of scope for this
  dependency-neutral story; see the
  [prior validation classification](../../plans/reports/tester-2026-07-15-responsive-ui-activity-parity.md).

## Unresolved Questions

None.
