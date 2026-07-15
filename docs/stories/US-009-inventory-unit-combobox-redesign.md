# US-009 Inventory Unit Combobox Redesign

## Status

implemented

## Lane

normal

## Product Contract

The Activity inventory-unit selector supports true multiple selection and
presents searchable vehicle identities as compact rows with a stable avatar slot.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`

## Acceptance Criteria

- [x] Every option reserves a fixed avatar area that can later host a vehicle
  image without changing row alignment.
- [x] Stock number and vehicle label share the primary row; VIN is secondary
  and long values truncate instead of wrapping into vertical columns.
- [x] Selected and keyboard-highlighted states are clear without moving row
  content, and the selected indicator sits at the trailing edge.
- [x] Search, clear, multiple-selection callback, labels, touch targets, and Base UI
  combobox keyboard semantics remain intact.
- [x] Selected units render as a separate chip group below the search input;
  desktop selection remains draft-only until `Apply filter` is activated.
- [x] Popup width and content stay within the mobile viewport.

## Design Notes

- UI surface: Activity advanced-filter Inventory unit combobox.
- Composition follows the official Base UI multiple Tailwind Combobox demo.
- Search, clear, and trigger icons remain semantic controls but have no visual
  button treatment.
- Activity URL/API state uses `units: string[]`; repeated `units` parameters are
  OR-filtered, while the legacy singular `unit` parameter remains accepted.
- Avatar uses a deterministic text fallback until a real image field exists.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | 24 focused tests pass across component, URL state, API parser, and repository. |
| Integration | Not claimed; no browser-to-API integration run under the fast UI workflow. |
| E2E | Not rerun under the agreed fast UI workflow. |
| Platform | User manually approved the completed Activity UI on 2026-07-15. |
| Release | Full validation deferred. |

## Harness Delta

Manual visual approval recorded through Harness intervention #25.

## Evidence

- User supplied the current broken-wrap screenshot on 2026-07-15.
- User supplied popover spacing evidence on 2026-07-15; popup and list top
  padding were explicitly reset so the first option begins immediately.
- User supplied selector hierarchy evidence on 2026-07-15; chips were moved
  outside the input and desktop filtering gained an explicit Apply step.
- User corrected the interaction to true multiple selection and identified the
  official Base UI multiple Tailwind demo as source composition.
- `npx vitest run` focused set: 4 files, 24 tests passed.
- `npx tsc -b --pretty false`: passed with no diagnostics.
- Final code review: CLEAN.
- Explicit Apply proof: 2 focused files, 3 tests passed; TypeScript passed.
- User confirmed the Activity UI is okay and requested ticket closure on 2026-07-15.
- Harness completion proof passed: 2 focused files, 3 tests; US-009 closed.

## Unresolved Questions

None.
