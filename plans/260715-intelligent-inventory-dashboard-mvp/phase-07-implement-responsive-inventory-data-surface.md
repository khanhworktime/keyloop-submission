---
phase: 7
title: "Implement Responsive Inventory Data Surface"
status: completed
priority: P1
effort: "1.5d"
dependencies: [5]
---

# Phase 7: Implement Responsive Inventory Data Surface

## Overview

Deliver one Inventory query/view model as Community AG Grid on desktop/tablet
and fast-check cards on mobile.

## Context Links

- `../../docs/decisions/0009-ag-grid-responsive-data-surface.md`
- `../../design/v0.3-responsive-screens/screens/inventory.html`
- `../../design/v0.5-design-handoff/scope.md`

## Requirements and Architecture

- Filters: search, make, model, age; sorting and pagination cross the API.
- URL search is canonical so reload/back/forward preserve state.
- Desktop/tablet import Community modules only and use a Quartz Precision theme.
- Mobile uses cards from the exact same `UnitListItem` response and controls.
- States: loading, empty, error/retry, selected, and aging; no page overflow.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-page.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-filters.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-grid.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-mobile-cards.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-pagination.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-page.test.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/inventory-route.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css`.

## Implementation Steps

1. Map typed route search to API filters and reset page when filters change.
2. Add accessible search/select filters, active chips, clear action, result live
   announcement, and app-owned pagination.
3. Configure Community grid columns for identity, Master, age, status, action,
   keyboard row selection, and detail navigation; map sort changes to URL/API.
4. Render mobile cards below the agreed breakpoint; preserve filters, selected
   meaning, result count, page, and Unit links.
5. Test filter composition, no-results recovery, page bounds, sort, breakpoint
   surface, row/card parity, and absence of Enterprise imports.

## Success Criteria

- [x] Make/model/age/search compose through the HTTP contract.
- [x] Grid and cards expose identical Unit/result semantics.
- [x] Aging has label/shape/text, not color alone.
- [x] `rg -n "ag-grid-enterprise|MasterDetail|serverSideRowModel" src` is empty.
- [x] `npx vitest run src/features/inventory` passes.

## Risks and Security

Avoid two independent filter states and double pagination. Do not render raw
stored data; only parsed API DTOs enter cells/cards.

## Next Steps

Phase 8 adds Unit detail and the state-changing action loop.
