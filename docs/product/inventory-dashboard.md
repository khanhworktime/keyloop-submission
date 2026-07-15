# Intelligent Inventory Dashboard

## Status

Accepted product contract for the first buildout.

## Source Material

Derived on 2026-07-13 from the user-provided system-design document at
`/Users/kristdev/Documents/Obsidian Vault/Interviews/Key Loop/System Design/System Design Document.md`.
That document is input material; this file is the current, scoped product
contract.

## Product Goal

Give a dealership manager a responsive overview of vehicle inventory, make
long-held vehicles conspicuous, and preserve the proposed action for each
aging vehicle.

The approved MVP scope is recorded in
`docs/decisions/0010-supply-inventory-mvp-scope.md`.

## Delivery Boundary

The implementation target is the **Submission Solution**, not the document's
Full-stack Solution.

- Build a Vite + React browser application.
- Use MSW HTTP handlers as the application's API boundary and preserve stable
  request/response contracts behind that boundary.
- Persist mutable mock-domain state and activity history in browser Local
  Storage; use seed fixtures for the initial inventory.
- Use React Query for server-state caching and invalidation after mutations.
- Simulate API latency and record mock request telemetry with a correlation ID.

The following are explicitly out of scope for this submission: a real backend
or BFF, PostgreSQL, Redis/BullMQ, SSE, real authentication/RBAC, dealer feeds,
CDN integration, and production observability vendors. Their descriptions in
the input document remain scale-up reference material only.

## Core Behaviors

### Inventory browsing

- A manager can see a paginated, filterable inventory list.
- Filters include make, model, and vehicle age. Shared keyword search matches
  Inventory Unit name, Stock No., VIN, and Vehicle Master name/ID while
  remaining compatible with the mock API boundary.
- Global Inventory search opens from desktop primary navigation, the
  tablet/mobile header, or Command/Ctrl + K, reuses the same keyword contract,
  and navigates directly to a selected Unit.
- Each row provides enough identifying and inventory-age information to decide
  whether attention is required.

### Vehicle master and inventory units

- A Vehicle Master is the reusable definition of a vehicle, including make,
  model, variant, and type.
- An Inventory Unit is a VIN-specific stock record that references one Vehicle
  Master and owns inventory state such as VIN, stock number, arrival date,
  lifecycle status, an optional Zone/Slot label, and action.
- The Vehicle Master relationship supports filtering and record identity
  without duplicating shared specification data. A dedicated Master library is
  an optional supporting/admin surface, not part of the core submission flow.

### Bounded placement label and deferred location module

- A manager may edit one optional plain-text Zone/Slot label with the other
  Inventory Unit identity fields. It is display context only.
- Locations, Zone capacity, Slot occupancy, unassigned-unit management,
  assignment, and movement remain explicitly deferred beyond the submission MVP.

### Aging stock

- `daysInStock` is calculated from a vehicle's inventory-arrival date using the
  current client date.
- A vehicle is aging when its lifecycle status is `available` and
  `daysInStock > 90`; exactly 90 days is not aging.
- **Inventory age** means the derived `daysInStock` value plus an aging signal
  when the strict threshold is met.
- **Inventory status** means the persisted lifecycle value `available`,
  `reserved`, or `sold`; aging never replaces or renames this status.
- Reserved and sold units retain their numeric age for context and sorting but
  never display an aging signal or contribute to aging review workflows.
- Inventory surfaces show age and lifecycle as separate facts; lifecycle status
  does not replace the numeric age.
- Aging inventory contributes to dashboard summary data.

### Dashboard

- Dashboard data summarizes the current persisted inventory, including total
  inventory and aging-stock counts.
- Dashboard and inventory must refetch after a successful action that changes
  persisted vehicle state.
- For this bounded submission, “real-time” means current React Query state plus
  explicit invalidation/refetch behavior. SSE and multi-user synchronization
  remain out of scope.

### Manager actions and history

- A manager can record a status or proposed action for an available aging vehicle, such
  as `Price Reduction Planned`, with an optional note.
- Saving an action persists both the latest vehicle action and a timestamped
  activity-history entry.
- A successful save provides immediate feedback through the accessible Base UI
  toast pattern and exposes the resulting history in a timeline or equivalent
  activity view.
- Editing VIN, Stock No., lifecycle status, or Zone/Slot adds one `Unit update`
  Activity listing the fields that changed. Submitting identical values does
  not create an Activity event.

## Data Ownership

The active mock domain owns the canonical browser-side representation of
Vehicle Masters, Inventory Units, actions, and activity records. UI components
consume API-shaped responses and must not manipulate Local Storage directly.
Zones and Slots are reserved for the deferred placement module.
The optional `zoneSlot` Unit label does not model either entity.

## Quality Expectations

- Loading, empty, and error states are visible because handlers simulate
  realistic latency and failures can be surfaced.
- Each mock request carries a client-generated correlation ID; handler
  lifecycle logs connect the request, simulated duration, and response.
- Logging must not contain credentials or unnecessary personal data.

## Deferred Decisions

- Exact route and response-envelope naming.
- Whether saved user preferences are required in this submission.
- Seed-data shape, image licensing/source, and reset behavior.
- Exact component behavior and responsive breakpoints within the selected
  Precision design system.
- Location hierarchy, Zone/Slot capacity, assignment, and movement workflows.
