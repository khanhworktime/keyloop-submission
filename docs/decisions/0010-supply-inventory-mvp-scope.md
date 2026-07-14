# 0010 Supply Inventory MVP Scope

Date: 2026-07-14

## Status

Accepted

## Context

The design exploration mapped Inventory, Vehicle Master, Locations, Zone, Slot,
and Activity capabilities. The submitted Keyloop task is narrower: a real-time
inventory overview, filterable vehicle stock, prominent identification of units
held longer than 90 days, and a persisted proposed action for each aging unit.

Promoting dealership placement management into the same delivery would increase
routes, mutations, persistence rules, API contracts, and proof without improving
coverage of the three requested outcomes.

## Decision

Freeze the submission MVP around the core journey:

`Overview → Inventory → Inventory Unit action → Activity`

Primary navigation is Overview, Inventory, and Activity. Vehicle Master remains
the normalized source of make, model, variant, and type, with its library/detail
treated as optional supporting administration.

Defer Locations, Zone capacity, Slot occupancy, assignment, movement,
unassigned-unit management, their API contracts, persistence, and validation
to a future module. Read-only Zone/Slot labels in archived fixtures do not
create implementation scope.

This decision narrows the delivery follow-up in decision 0008. It does not
change the Vite/React, MSW, Local Storage, React Query, or AG Grid decisions.

## Alternatives Considered

1. Implement all eight mapped screen families. Rejected: it dilutes the Supply
   Inventory task and adds unrequested placement operations.
2. Remove Vehicle Master entirely. Rejected: make/model/variant/type remain a
   useful normalized identity boundary for Inventory filtering and display.
3. Keep Locations visible in primary navigation but disable actions. Rejected:
   it implies accepted scope and creates a dead-end core experience.

## Consequences

Positive:

- The demo directly proves the three requested outcomes.
- Production implementation and E2E proof stay bounded to one manager loop.
- Vehicle identity remains normalized without making Master Data the product's
  main workflow.

Tradeoffs:

- Existing v0.4 Locations and Zone/Slot prototypes become archived future
  design evidence rather than production requirements.
- A later placement module must define its own routes, data contracts,
  concurrency rules, persistence, and validation.

## Follow-Up

- Implement the v0.5 handoff contract before promoting design to v1.0.
- Record Locations and Zone/Slot as a separate future initiative when accepted.
