---
phase: 1
title: "Centralize lifecycle-aware aging"
status: complete
effort: "2h"
---

# Phase 1: Centralize Lifecycle-aware Aging

## Overview

Make the domain helper the single authority for both age threshold and lifecycle eligibility.

## Implementation Steps

1. Update `isAgingStock` in `src/domain/aging-stock.ts` to accept
   `InventoryStatus` and return true only for `available` with `daysInStock > 90`.
   Keep `daysInStock(arrivalDate, now)` unchanged.
2. Replace `age > 90` in `src/mocks/persistence/inventory-query-helpers.ts`
   with the domain helper when deriving each `UnitListItem.isAging`.
3. Pass lifecycle status into the same helper from
   `src/mocks/persistence/local-storage-inventory-repository.ts` before allowing
   `recordAction`; use lifecycle-aware error copy.
4. Search for remaining threshold-only `isAging` derivations and remove duplication.

## Success Criteria

- [x] One predicate owns aging eligibility.
- [x] Available 91 days is true; available 90, reserved 91+, and sold 91+ are false.
- [x] `daysInStock` remains identical for every lifecycle status.
- [x] Aging-only actions reject old reserved/sold units without writing.

## Risks

- Divergent predicates: prohibit direct `daysInStock > 90` outside the helper.
- Conflating age and aging: retain numeric age in DTOs and sorting for every status.
