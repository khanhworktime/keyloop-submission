---
phase: 3
title: "Implement MSW API Contracts and Telemetry"
status: completed
priority: P1
effort: "1d"
dependencies: [2]
---

# Phase 3: Implement MSW API Contracts and Telemetry

## Overview

Expose stable MSW contracts with parse-first inputs, realistic delay,
correlation IDs, and payload-safe lifecycle telemetry.

## Context Links

- `../../src/lib/api-client.ts`
- `../../src/mocks/browser.ts`
- `../../docs/decisions/0008-submission-solution-architecture.md`

## API Contract

| Method | Path | Result |
| --- | --- | --- |
| GET | `/api/overview` | `{ data: OverviewView }` |
| GET | `/api/inventory` | `{ data: UnitListItem[], meta, facets }` |
| GET | `/api/inventory/:unitId` | `{ data: InventoryUnitDetail }` |
| POST | `/api/inventory/:unitId/actions` | `201 { data: { unit, activity } }` |
| GET | `/api/activity` | `{ data: ActivityListItem[], meta, facets }` |

Inventory query: `page,pageSize,search,make,model,age,sortBy,sortDirection`.
Activity query: `page,pageSize,unit,search,eventType,actor,from,to`, where
`unit` is the human-readable Stock Number selected by the global Unit filter.
Errors: `{ error: { code, message, fieldErrors? }, correlationId }` with
400/404/422/500 semantics. Every response echoes `x-correlation-id`.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/lib/api-client.ts`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/browser.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/lib/api-contracts.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/api-parsers.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/handlers.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/mock-telemetry.ts`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/mocks/handlers.test.ts`.

## Implementation Steps

1. Define DTOs and shared error codes; keep persistence entities internal.
2. Add Axios interceptor that preserves or creates a UUID correlation header.
3. Parse path/query/body unknowns. Defaults: page 1, size 10; sizes 10/25/50;
   search max 100; note max 500; valid ISO range with `from <= to`.
4. Create dependency-injected handlers with a zero-delay test policy and
   250–650ms browser policy.
5. Register handlers in the existing worker and lifecycle telemetry around all
   mocked requests.
6. Log only timestamp, level, correlation ID, method, pathname, duration,
   status, and message; never query values, VIN, note, or body.
7. Test happy paths, filters, malformed input, 404/422/500, and telemetry.

## Success Criteria

- [x] UI-facing calls cross HTTP; repository imports remain under `src/mocks/`.
- [x] Exactly-90 action returns 422; 91+ returns Unit plus one event.
- [x] Filters run before pagination and totals/facets remain correct.
- [x] Response and telemetry share one correlation ID.
- [x] `npx vitest run src/mocks/handlers.test.ts` passes.

## Risks and Security

Implement lifecycle listeners against installed MSW types. Keep business rules
in domain/repository. Bound input sizes; correlation is diagnostics, not auth.

## Next Steps

Phase 4 creates cached client consumers.
