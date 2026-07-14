# Responsive screen map

Version: `v0.3`
Status: first core-loop review

Scope classification was updated by the approved `v0.5` handoff. The v0.3
prototype sources remain unchanged; `v0.5` is normative for MVP implementation.

| # | Family | v0.5 scope | Route intent | Manager decision | Desktop / tablet | Mobile |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Dashboard | Core | `/` | What needs attention now? | Exception-led overview and working queue | Two urgent signals and next record |
| 2 | Inventory | Core | `/inventory` | Which physical unit needs action? | AG Grid Community table + external filters + detail rail | Urgency-ordered fast-check cards |
| 3 | Inventory Unit | Core contextual route | `/inventory/:unitId` | What should happen to this VIN-specific unit? | Master, inventory, action, and history context | Summary first; action in bottom sheet |
| 4 | Vehicle Masters | Supporting | Optional admin route | Which reusable definition should a unit reference? | AG Grid library with unit counts | Searchable compact master cards |
| 5 | Vehicle Master | Supporting | Optional admin route | Is shared make/model/variant/type data correct? | Shared specifications and linked units | Essential specification and linked-unit count |
| 6 | Locations | Deferred | Future module | Where is capacity constrained? | Archived design evidence | Archived design evidence |
| 7 | Zone / Slot | Deferred | Future module | Which Slot can receive this unit? | Archived design evidence | Archived design evidence |
| 8 | Activity | Core | `/activity` | Was the proposed action recorded? | Filterable chronological audit surface | Record-grouped recent events |

## Shared entity contract

- Vehicle Master owns reusable make, model, variant, and type.
- Inventory Unit owns VIN, stock number, arrival date, status, and proposed action.
- `daysInStock > 90` is aging. Exactly 90 days is not aging.
- One saved manager decision updates the Unit and appends one Activity entry.
- Zone and Slot ownership remains a future-module contract, not MVP behavior.

## Core review loop

1. Dashboard exposes `12 aging units` as a decision, not a decorative metric.
2. Inventory opens with the `Needs attention` filter and selects `STK-2048`.
3. Unit detail preserves `VM-014`, VIN, `North · N-04`, and `128 days`.
4. Recording `Price Reduction Planned` produces success feedback.
5. Activity exposes the matching timestamped event and optional manager note.

Primary navigation is Overview, Inventory, and Activity. Families 4–5 remain
supporting data evidence. Families 6–7 are deliberately deferred to a future
module; their archived destinations do not create MVP implementation scope.
