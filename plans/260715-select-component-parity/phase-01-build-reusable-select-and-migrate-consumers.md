---
phase: 1
title: "Build reusable select and migrate consumers"
status: completed
priority: P1
effort: "4h"
dependencies: []
---

# Phase 1: Build Reusable Select and Migrate Consumers

## Overview

Build a single Base UI-backed `SelectField`, replace all six current select
controls, and prove behavior with focused unit tests plus manual visual review.

## Key Insights

- Five native selects exist: Inventory Make, Model, and page size; Activity
  event type and actor.
- Proposed action already uses Base UI Select, but owns a separate trigger,
  popup, option, icon, and layering recipe.
- Every consumer is controlled. The shared component should emit a string or
  `null`; consumers retain domain casts, numeric conversion, URL resets, and
  form validation.

## Requirements

- API: `label`, `value`, `options`, `onValueChange`, and optional `id`,
  `placeholder`, `emptyOptionLabel`, `disabled`, `invalid`, description id,
  trigger class, and popup class. Keep options `{ value, label }` strings.
- Empty choices (`All makes`, `All models`, `All events`, `Anyone`) map through
  one private sentinel inside the primitive and emit `null`; the sentinel must
  never reach consumer state or URLs.
- Visual: 44px minimum trigger/options, 48px where the consumer already uses a
  frequent drawer control, Precision border/radius/colors, right chevron,
  anchored full-trigger-width popup, selected indicator, highlighted option,
  visible focus, and z-index above drawers.
- Accessibility: programmatic label, combobox/listbox/option semantics,
  selected state, disabled state, keyboard open/navigation/typeahead/selection,
  Escape close, focus return, and screen-reader-friendly value/placeholder.
- Preserve Make/Model fallback values absent from current facets, page-size
  number conversion, Activity draft/apply/reset behavior, and proposed-action
  validation/mutation behavior.

## Architecture

```text
feature value (string | number | domain union | undefined)
  -> consumer adapter (string | null)
  -> shared SelectField (Base UI behavior + Precision visuals)
  -> consumer adapter (null/parse/cast)
  -> existing URL, pagination, drawer, or mutation state
```

Base UI remains the only interaction engine. The shared component owns labels,
trigger, portal/positioner, popup, list, options, indicator, icon, and styling.

## Related Code Files

| Action | File | Purpose |
| --- | --- | --- |
| Create | `src/components/ui/select-field.tsx` | Reusable controlled Base UI Select and shared visual contract. |
| Modify | `src/components/ui/index.ts` | Export `SelectField` and option/prop types. |
| Modify | `src/features/inventory/components/inventory-filters.tsx` | Replace Make and Model native selects; retain missing-facet fallback options and URL updates. |
| Modify | `src/features/inventory/components/inventory-pagination.tsx` | Replace page-size select; parse selected string to number. |
| Modify | `src/features/activity/components/activity-filter-drawer.tsx` | Replace Event type and Actor selects; retain draft/apply/reset behavior. |
| Modify | `src/features/inventory-unit/inventory-action-drawer.tsx` | Remove local Base UI Select/import/icon markup; use shared field and retain typed action state. |
| Create | `src/components/ui/select-field.test.tsx` | Focused primitive interaction/accessibility tests. |
| Modify | `src/features/inventory/components/inventory-filters.test.tsx` | Cover Make selection, clear option, and existing URL-state callback shape. |
| Create | `src/features/inventory/components/inventory-pagination.test.tsx` | Cover page-size number conversion. |
| Create | `src/features/activity/components/activity-filter-drawer.test.tsx` | Cover event/actor draft selection and apply payload. |
| Modify | `src/features/inventory-unit/inventory-action-drawer.test.tsx` | Cover action selection through the shared control and unchanged mutation payload. |
| Modify | `tests/e2e/inventory-manager-journey.spec.ts` | Compatibility-only: replace native `selectOption` interaction with combobox/option clicks; add no visual assertions. |

## Implementation Steps

1. Implement `SelectField` under `src/components/ui/` using Base UI Select.
   Centralize the screenshot-aligned trigger, popup, option, selected indicator,
   chevron, focus, disabled/invalid, portal, and drawer-safe layering styles.
2. Add a private empty-value translation. Keep the public controlled API
   `string | null`; never expose the sentinel. Ensure current values absent from
   fresh option lists can be supplied as a fallback option by consumers.
3. Export the primitive. Replace Make/Model and page-size native selects,
   preserving `updateInventorySearch`, page reset behavior, and number parsing.
4. Replace Activity Event type/Actor controls and the local Proposed action
   composition. Remove obsolete Base UI Select and chevron imports/constants
   only when no longer used. Preserve drawer state, validation, and submit flow.
5. Add focused unit proof: accessible name and roles; mouse and keyboard
   selection; empty/null translation; disabled/invalid state; consumer-specific
   Make clear, numeric page size, Activity apply payload, and action mutation.
6. Update the existing manager-journey interaction only so the suite remains
   compatible with the custom Make control. Do not add or run visual E2E proof
   for this speed-focused pass.
7. Run the focused Vitest files and TypeScript project check, then complete the
   agreed manual checklist below. Playwright and full release validation remain
   outside this fast UI workflow.

## Focused Automated Validation

```bash
npx vitest run \
  src/components/ui/select-field.test.tsx \
  src/features/inventory/components/inventory-filters.test.tsx \
  src/features/inventory/components/inventory-pagination.test.tsx \
  src/features/activity/components/activity-filter-drawer.test.tsx \
  src/features/inventory-unit/inventory-action-drawer.test.tsx
npx tsc -b --pretty false
```

## Manual Visual Checklist

- [x] Desktop Inventory: Make/Model closed and open states match supplied control
  height, border, radius, text, chevron, popup width, option spacing, selected
  indicator, and highlight; popup does not clip the filter card.
- [x] Tablet/mobile Inventory: triggers remain within the two-column filter grid,
  options meet touch targets, popup stays inside viewport, no page overflow.
- [x] Pagination: compact trigger aligns with result/page controls and opens above
  nearby boundaries when space requires.
- [x] Proposed action drawer: 48px trigger and popup match the supplied screenshot;
  popup layers above backdrop/drawer, selected action is obvious, and focus ring
  remains visible.
- [x] Activity drawer: Event type/Actor controls align with search/date fields and
  popup safely within the sheet on desktop and mobile.
- [x] Keyboard: Tab to each trigger; Space/Enter opens; arrows/typeahead navigate;
  Enter selects; Escape closes; focus returns to trigger.
- [x] Screen reader spot check: label, current value/placeholder, expanded state,
  option count, and selected option are announced.

## Todo List

- [x] Build and export the shared `SelectField`.
- [x] Migrate all six select instances and remove local/native compositions.
- [x] Add focused primitive and consumer unit tests.
- [x] Update the one stale E2E interaction without adding visual coverage.
- [x] Run focused checks and complete the manual visual checklist.

## Success Criteria

- [x] `rg '<select|@base-ui/react/select' src/features` finds no consumer-owned
  native or Base UI select implementation.
- [x] All controls preserve their labels, values, clear/default behavior, and
  current state transitions.
- [x] Shared component passes manual keyboard, focus, disabled/invalid, and
  accessible-role/name checks; pointer and nullable behavior are unit-tested.
- [x] Inventory, pagination, Activity, and action focused unit tests pass.
- [x] Focused Vitest and TypeScript checks pass; the manual checklist records
  desktop/tablet/mobile and drawer parity against the supplied screenshots.
  Playwright and full release validation were intentionally omitted under the
  agreed fast UI workflow.

## Risk Assessment

| Risk | Mitigation |
| --- | --- |
| Empty defaults leak a sentinel into URLs | Translate only inside `SelectField`; assert emitted `null`. |
| Page size remains a string | Parse in `InventoryPagination`; unit-test numeric callback. |
| Popup appears behind a Drawer | Centralize portal z-index above drawer content and manually verify both drawers. |
| Existing E2E uses native `selectOption` | Update only that interaction to use accessible combobox/option roles. |
| Popup width/position overflows narrow screens | Anchor to trigger, cap to viewport, enable collision handling, and check mobile manually. |

## Security Considerations

No new trust boundary. Option labels remain React text; do not introduce HTML
injection, network calls, storage, telemetry, or domain validation changes.

## Next Steps

Complete. Focused automated evidence and user-approved manual visual/interaction
checks are recorded; no broader form-system redesign is required.

## Evidence

- [Focused tester report](../reports/tester-2026-07-15-select-component-parity.md):
  5/5 Vitest files, 8/8 tests, and the TypeScript project check passed.
- User approved the complete manual visual and interaction checklist on
  2026-07-15.

## Unresolved Questions

None.
