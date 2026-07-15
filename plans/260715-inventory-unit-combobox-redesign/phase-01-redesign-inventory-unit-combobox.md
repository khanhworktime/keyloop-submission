---
phase: 1
title: "Redesign inventory unit combobox"
status: completed
priority: P1
effort: "2h"
dependencies: []
---

# Phase 1: Redesign Inventory Unit Combobox

## Overview

Recompose the Activity selector from the official Base UI multiple Combobox demo
and carry multiple stock-number selection through URL, API, and repository filters.

## Key Insights

- Search indexes `stockNumber`, `vin`, and `label`; controlled values and callbacks
  now use arrays of selected stock numbers.
- Current rows spend the left column on selection. The redesign reserves 40px
  for future imagery/fallback, moves selection to a fixed right column, and
  gives the middle identity column all remaining width.
- No image field exists. Render a neutral fallback inside a stable slot; do not
  add speculative domain or component image data in this task.

## Requirements

- Row grid: `40px minmax(0, 1fr) auto`; compact vertical padding; minimum 48px
  pointer target; fixed nonshrinking avatar and selected-indicator columns.
- Avatar: exactly 40x40, rounded, neutral Precision surface, decorative fallback
  derived from existing identity or icon. The wrapper must accept a future image
  child without changing row dimensions.
- Identity: first line prioritizes stock number and model label; second line is
  muted VIN. Apply `min-width: 0`, no-wrap, overflow hidden, and ellipsis so
  long values never widen the popup or overlap the indicator.
- Selection: `Combobox.ItemIndicator` sits at the right edge and remains
  screen-reader-compatible through Base UI selected semantics.
- Preserve `matchesUnit`, `items`, controlled `value`, `onValueChange`, equality,
  string label/value adapters, empty state, clear button, trigger, portal, search
  filtering, typeahead, arrow navigation, Enter selection, and Escape behavior.

## Architecture

```text
ActivityFacets units -> Base UI multiple value + removable chips
                     -> option row [40px fallback | clipped identity | indicator]
                     -> URL/API repeated `units` -> repository OR filter
```

No reusable avatar system or image field is introduced. The existing Activity
filter contract changes from singular `unit` to plural `units` with legacy input support.

## Related Code Files

| Action | File | Purpose |
| --- | --- | --- |
| Modify | `src/features/activity/components/activity-unit-combobox.tsx` | Recompose option rows and add the local 40px fallback slot. |
| Create | `src/features/activity/components/activity-unit-combobox.test.tsx` | Focused search, value, keyboard, clear, selection, and structural overflow contract. |
| Modify | `src/features/activity/activity-filter-state.ts` | Parse and emit multiple URL values. |
| Modify | `src/domain/inventory-types.ts` | Define plural Activity unit filters. |
| Modify | `src/features/shared/inventory-api.ts` | Serialize arrays as repeated query parameters. |
| Modify | `src/mocks/api/activity-query-parser.ts` | Parse plural values and legacy singular values. |
| Modify | `src/mocks/persistence/inventory-query-helpers.ts` | OR-filter activity for selected stock numbers. |
| Modify | `src/features/activity/components/activity-page.tsx` | Connect multi-select state to Activity results. |

## Implementation Steps

1. Enable `Combobox.Root multiple`, render selected values as removable Base UI
   chips, and retain the existing searchable identity helpers.
2. Change `Combobox.Item` to a three-column grid. Render the 40px fallback first,
   a `min-w-0` identity block second, and `ItemIndicator` last.
3. Format the primary line as stock number plus model label and the secondary
   line as VIN. Add truncation/no-wrap rules at the row and text levels; cap the
   popup to viewport/anchor width without changing current positioning behavior.
4. Carry selected stock-number arrays through route state, repeated API query
   parameters, parsing, and repository OR filtering while accepting legacy `unit`.
5. Run focused component/filter/parser/repository tests and TypeScript. Manually
   compare default, highlighted, selected, long-value, and empty states.

## Focused Validation

```bash
npx vitest run src/features/activity/components/activity-unit-combobox.test.tsx src/features/activity/activity-filter-state.test.ts src/mocks/api/api-parsers.test.ts src/mocks/persistence/local-storage-inventory-repository.test.ts
npx tsc -b --pretty false
```

## Manual Visual Checklist

- Desktop: popup aligns to trigger; rows are compact; 40px fallback slots form a
  clean vertical rail; stock/model hierarchy and muted VIN match the reference.
- Selected/highlighted: right indicator is visible and never displaces identity;
  highlight, focus ring, and text contrast use existing Precision tokens.
- Long data: stock, model, and VIN truncate independently; no row wrapping,
  popup widening, horizontal scroll, clipping, or indicator collision.
- Mobile: popup remains inside viewport, rows retain at least 48px hit area, and
  clear/trigger buttons remain usable.
- Empty search: existing message remains legible and aligned.

## Todo List

- [x] Build compact three-column option rows and 40px fallback slot.
- [x] Add hierarchy, truncation, and right selected indicator.
- [x] Adopt Base UI multiple chips and visually icon-only controls.
- [x] Carry `units` arrays through URL/API/repository filtering with legacy parsing.
- [x] Run 24 focused tests and TypeScript validation.
- [x] Obtain manual desktop/mobile visual approval.

## Success Criteria

- [x] Every option has a stable 40x40 fallback slot ready for a future image.
- [x] Stock/model are primary, VIN secondary, indicator right; long content does
  not wrap or overflow at desktop or mobile widths.
- [x] Search by stock/model/VIN, multiple controlled values, clear, pointer
  selection, and Base UI keyboard semantics remain intact.
- [x] Focused Vitest and TypeScript pass; manual checklist is approved.

## Risk Assessment

| Risk | Mitigation |
| --- | --- |
| Truncation hides identity | Preserve full accessible item label and searchable source values; truncate only visual spans. |
| Fallback invents product data | Use a decorative neutral fallback from existing fields; add no persisted/image property. |
| Indicator changes selection semantics | Keep `Combobox.ItemIndicator` inside the same item; only move its grid column. |
| Popup overflows narrow viewport | Keep anchor alignment, add viewport-safe max width, and manually verify mobile. |

## Security Considerations

None. Existing unit strings remain React-rendered text; no HTML injection, URL,
network, storage, telemetry, or domain change.

## Next Steps

Implement as one focused component patch. Defer real images until the domain
provides an accepted image source and fallback policy.
