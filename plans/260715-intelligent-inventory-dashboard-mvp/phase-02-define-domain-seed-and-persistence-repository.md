---
phase: 2
title: "Define Domain Seed and Persistence Repository"
status: completed
priority: P1
effort: "1d"
dependencies: [1]
---

# Phase 2: Define Domain Seed and Persistence Repository

## Overview

Define normalized entities, deterministic seed data, derived aging, and the
only concrete browser persistence adapter.

## Context Links

- `../../docs/product/inventory-dashboard.md`
- `../../docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`
- `../../docs/decisions/0010-supply-inventory-mvp-scope.md`

## Requirements and Architecture

- Vehicle Master owns make/model/variant/type. Unit owns VIN, stock number,
  arrival date, status, and `latestAction`. Activity owns timestamped evidence.
- Derive UTC calendar `daysInStock`; `> 90` is aging. Never persist derived age.
- Persist one `PersistedInventoryStateV1` at `keyloop.inventory-state.v1`.
- Missing state seeds once; malformed state returns a typed error, not reset.
- `recordAction` rejects missing/non-aging Units and note length over 500.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/domain/inventory-types.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/domain/aging-stock.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/domain/inventory-repository.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/data/inventory-seed.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/persistence/local-storage-inventory-repository.ts`.
- Create: matching `*.test.ts` files beside aging and repository modules.

## Implementation Steps

1. Define typed IDs, entities, action/activity unions, filters, paged results,
   repository errors, and the versioned state envelope.
2. Implement age with injected clock and seed Units at 89, 90, and 91+ days.
3. Seed normalized Masters/Units/Activity; omit Zone/Slot fields entirely.
4. Implement joined Overview, Inventory, Unit, and Activity queries with search,
   filters, sort, facets, and page bounds.
5. Implement action save: read once, validate, clone, update Unit, append one
   event, serialize, and call `setItem` exactly once.
6. Test corruption, missing references, quota failure, composed filters,
   pagination, age boundaries, and single-write atomicity.

## Success Criteria

- [x] UI and feature clients contain no Storage access.
- [x] Exactly 90 is non-aging; 91 is aging.
- [x] Successful save writes one snapshot containing both changes.
- [x] Failed `setItem` preserves the previous snapshot.
- [x] `npx vitest run src/domain src/mocks/persistence` passes.

## Risks and Security

Normalize dates to UTC and inject time. Parse stored JSON as unknown; validate
schema and lengths. Store no credentials or unnecessary personal data.

## Next Steps

Phase 3 exposes the repository through HTTP.
