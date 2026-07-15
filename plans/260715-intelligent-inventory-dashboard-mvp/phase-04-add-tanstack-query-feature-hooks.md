---
phase: 4
title: "Add TanStack Query Feature Hooks"
status: completed
priority: P1
effort: "0.5d"
dependencies: [3]
---

# Phase 4: Add TanStack Query Feature Hooks

## Overview

Create typed Axios functions and TanStack Query hooks as the only UI data seam.

## Requirements and Architecture

- Keys: `overview`, `inventory(filters)`, `unit(id)`, `activity(filters)`.
- URL serialization omits empty filters and is deterministic for cache reuse.
- Action success invalidates all four key families; failure preserves cache.
- Axios errors map to one presentation-safe `ApiError` with correlation ID.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/lib/api-error.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/shared/query-keys.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/overview/overview-queries.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/inventory-queries.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/activity-queries.ts`.
- Create: matching query-hook tests beside each feature.

## Implementation Steps

1. Implement typed GET/POST functions against Phase 3 DTOs.
2. Centralize keys, filter serialization, and API error normalization.
3. Add Overview, Inventory, Unit, Activity queries and action mutation.
4. On action success, await invalidation for Overview, Inventory prefix, the
   exact Unit, and Activity prefix before exposing completion feedback.
5. Test key stability, parameters, disabled Unit query, success invalidation,
   and failure behavior with an isolated Query Client.

## Success Criteria

- [x] No component imports Axios, MSW, repository, or Storage.
- [x] Each query exposes loading/error/refetch state.
- [x] Mutation invalidation contract is test-proven.
- [x] `npx vitest run src/features --testNamePattern="query|mutation"` passes.

## Risks and Security

Avoid cache keys containing mutable objects or action notes. User-facing errors
may show correlation ID but not raw response bodies.

## Next Steps

Phase 5 mounts hooks into the route shell.
