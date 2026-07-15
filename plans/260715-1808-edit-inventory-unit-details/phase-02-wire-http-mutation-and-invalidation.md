---
phase: 2
title: "Wire HTTP mutation and invalidation"
status: pending
effort: "2h"
---

# Phase 2: Wire HTTP Mutation and Invalidation

## Overview

Expose the repository command through the current typed HTTP and query seams.

## Requirements

- Add typed `UpdateInventoryUnitRequest/Response` contracts.
- Add a strict body parser accepting only `vin`, `stockNumber`, `inventoryStatus`,
  and optional `zoneSlot`, returning field errors for shape, required, length,
  and enum failures.
- Add `PATCH /api/inventory/:unitId`; pass handler actor `Manager` to the repository.
- Map missing Unit to 404, duplicate VIN/stock to 409 with field errors, validation
  failures to 400/422 consistently, and storage/corrupt-state failures to 500.
- Add typed Axios `updateInventoryUnit` and `useUpdateInventoryUnitMutation`.
- After success—including a no-op response—invalidate `overviewKeys.all`,
  `inventoryKeys.all`, the exact Unit key, and `activityKeys.all`. Invalidate none on failure.

## Related Files

- `src/lib/api-contracts.ts`
- `src/mocks/api/inventory-unit-update-body-parser.ts`
- `src/mocks/handlers.ts`
- `src/features/shared/inventory-api.ts`
- `src/features/inventory/inventory-queries.ts`

## Implementation Steps

1. Define request/response DTOs and the strict parser.
2. Register the PATCH handler and stable error mapping.
3. Add the Axios function and mutation hook with all four invalidation families.

## Success Criteria

- [ ] PATCH reaches the repository through typed boundaries.
- [ ] Field and conflict errors survive Axios normalization for the form.
- [ ] Success invalidates Overview, Inventory, exact Unit, and Activity queries.
- [ ] Failed saves leave cache and persistence unchanged.

## Security Considerations

Render and log no request values. Telemetry remains method/path/status/correlation only.
