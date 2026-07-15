---
phase: 3
title: "Validate and document"
status: in_progress
effort: "2h"
---

# Phase 3: Validate and Document

## Focused Tests

- `src/domain/aging-stock.test.ts`: status × 90/91-day boundary table; date math unchanged.
- `src/mocks/persistence/local-storage-inventory-repository.test.ts`: Overview
  counts/queue, aging/not-aging filters/facets, and rejected actions for old reserved/sold units.
- `src/mocks/handlers.test.ts`: lifecycle-ineligible action returns `UNIT_NOT_AGING`.
- `src/features/inventory-unit/inventory-unit-page.test.tsx`: reserved/sold detail
  shows age/status, no Aging label, lifecycle-aware decision copy, and no action trigger.
- `src/features/inventory/components/inventory-mobile-cards.test.tsx` and
  `inventory-selected-unit.test.tsx`: old reserved/sold units receive no aging styling/copy.
- Update Overview component fixtures only where they encode the old rule.

```bash
npx vitest run \
  src/domain/aging-stock.test.ts \
  src/mocks/persistence/local-storage-inventory-repository.test.ts \
  src/mocks/handlers.test.ts \
  src/features/inventory-unit/inventory-unit-page.test.tsx \
  src/features/inventory/components/inventory-mobile-cards.test.tsx \
  src/features/inventory/components/inventory-selected-unit.test.tsx
npx tsc -b --pretty false
```

## Documentation

1. Update `docs/product/inventory-dashboard.md`: aging requires `available` and
   `daysInStock > 90`; replace the current “aging reserved unit” example.
2. Update `docs/ARCHITECTURE.md`: derived `isAging` includes lifecycle eligibility.
3. Add/update the story packet and Harness proof row when implementation begins;
   do not mark proof complete before tests pass.

## Manual Review

- Compare available/reserved/sold Units older than 90 days across Overview,
  Inventory, and Unit detail.
- Confirm only available is highlighted/actionable, while all three retain the same age value.
- Confirm exactly 90 days is not aging for every status.

## Success Criteria

- [x] Focused Vitest passes: 8 files, 42 tests.
- [x] TypeScript passes without diagnostics.
- [x] Product, architecture, tests, and UI wording state the same rule.
- [ ] User manual review confirms available/reserved/sold presentation.
