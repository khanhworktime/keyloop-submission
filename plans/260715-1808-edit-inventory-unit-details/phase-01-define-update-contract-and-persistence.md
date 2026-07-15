---
phase: 1
title: "Define update contract and persistence"
status: pending
effort: "3h"
---

# Phase 1: Define Update Contract and Persistence

## Overview

Extend the existing Inventory Unit model and repository with one atomic edit command.

## Requirements

- Add optional `zoneSlot?: string` to `InventoryUnit`; V1 snapshots without it remain valid.
- Add `unit-updated` to `ACTIVITY_EVENT_TYPES`.
- Add `UpdateInventoryUnitCommand` containing `unitId`, `vin`, `stockNumber`,
  `inventoryStatus`, optional `zoneSlot`, and optional `actor`; return
  `UpdateInventoryUnitResult` with refreshed detail and optional created Activity.
- Trim VIN/stock/zone values. VIN and Stock No. are required; use existing limits
  (VIN 64, Stock No. 40) and an 80-character Zone/Slot maximum. Empty Zone/Slot
  normalizes to absent. Status must be `available`, `reserved`, or `sold`.
- Enforce VIN and Stock No. uniqueness against other units, case-insensitively.
- Compare normalized editable fields. If none changed, return current detail,
  perform no storage write, and create no Activity.
- For a real change, clone once, update once, append exactly one `unit-updated`
  Activity in the same snapshot, then call `setItem` once. Actor is `Manager`;
  title/note or detail lists changed field labels without exposing old values.
- A Zone/Slot change is descriptive inventory metadata, not a movement event.
- Do not edit arrival date; `daysInStock` and `isAging` remain derived and unchanged.

## Related Files

- `src/domain/inventory-types.ts`
- `src/domain/inventory-repository.ts`
- `src/mocks/persistence/inventory-state-parser.ts`
- `src/mocks/persistence/local-storage-inventory-repository.ts`
- `src/mocks/data/inventory-seed.ts`

## Implementation Steps

1. Add the optional field, update command/result, event type, and repository method.
2. Make the V1 parser accept bounded optional `zoneSlot` and the new Activity type.
3. Implement normalized validation, uniqueness excluding the current unit, diffing,
   no-op handling, and atomic Unit + Activity persistence.
4. Seed `North · N-04` on the existing demonstration unit and preserve legacy reads.

## Success Criteria

- [ ] Legacy V1 state parses without `zoneSlot`.
- [ ] Invalid/duplicate edits write nothing.
- [ ] Real edits use one write and append one accurate `unit-updated` Activity.
- [ ] No-op edits use no write and append no Activity.
- [ ] Aging values do not depend on lifecycle status or Zone/Slot.

## Risks

- Case-only duplicates: compare normalized lowercase values while preserving display casing.
- Partial persistence: mutate a clone and serialize only after every check succeeds.
- Scope drift: store one optional string only; add no placement relationships or operations.
