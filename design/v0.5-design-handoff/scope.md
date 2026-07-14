# v0.5 Normative Scope

This file is the implementation scope for the Supply Inventory submission. It
overrides broader discoverability in the v0.3 and v0.4 prototype galleries.

## Core delivery

| Capability | Route intent | Acceptance boundary |
| --- | --- | --- |
| Overview | `/` | Current inventory summary and prominent aging-stock signal |
| Inventory | `/inventory` | Filter all units by make, model, and age; open one unit |
| Inventory Unit | `/inventory/:unitId` | Inspect identity and age; persist a proposed action and note |
| Activity | `/activity` | Verify timestamped persisted action evidence across inventory |

Primary navigation is exactly **Overview / Inventory / Activity**. Inventory
Unit detail is contextual, not a fourth navigation destination.

## Supporting data

| Capability | Required now | Boundary |
| --- | --- | --- |
| Vehicle Master entity | Yes | Normalizes make, model, variant, and type for Inventory Units |
| Master reference on a Unit | Yes | Keeps shared definition distinct from VIN-specific state |
| Vehicle Master library/detail UI | Optional supporting surface | Must not block or expand the core submission journey |
| Vehicle image | Asset pending | An honest placeholder is acceptable until source and licence are approved |

## Deferred module

The following are explicitly outside MVP implementation and proof:

- Locations navigation and route.
- Zone capacity and unassigned-unit queue.
- Slot map, occupancy, availability, selection, and assignment.
- Moving a unit between Slots or deriving Zone from a saved Slot.
- Location mutation API contracts and persistence.
- Zone/Slot unit, integration, E2E, or platform proof.

Zone/Slot labels already visible in legacy fixture screens may remain as
read-only context. They must not be interpreted as an accepted management API
or workflow.

## Core behavior rules

- `daysInStock` is derived from arrival date and the current client date.
- `daysInStock > 90` means aging; exactly 90 does not.
- A successful action save updates the Inventory Unit and appends one Activity
  entry with timestamp and optional manager note.
- Overview, Inventory, Inventory Unit, and Activity refetch or invalidate their
  affected queries after a successful mutation.
- “Real-time” in the bounded submission means current cached data plus explicit
  invalidation/refetch behavior; it does not claim SSE or multi-user sync.

## Quality gate

- Desktop and tablet use AG Grid Community for the Inventory table.
- Mobile uses a task-specific card list backed by the same query/view model.
- Loading, empty, error, validation, busy, success, and recovery states are
  visible and accessible.
- Minor visual overflow in the archived prototype is not a blocker unless it
  hides essential content, blocks a required action, or breaks core navigation.
