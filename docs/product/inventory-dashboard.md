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
- Filters include make, model, and vehicle age; keyword search and pagination
  must remain compatible with the mock API boundary.
- Each row provides enough identifying and inventory-age information to decide
  whether attention is required.

### Vehicle master and inventory units

- A Vehicle Master is the reusable definition of a vehicle, including make,
  model, variant, and type.
- An Inventory Unit is a VIN-specific stock record that references one Vehicle
  Master and owns inventory state such as arrival date, status, and action.
- The Vehicle Master relationship supports filtering and record identity
  without duplicating shared specification data. A dedicated Master library is
  an optional supporting/admin surface, not part of the core submission flow.

### Deferred location and placement module

- Locations, Zone capacity, Slot occupancy, unassigned-unit management,
  assignment, and movement are explicitly deferred beyond the submission MVP.
- Legacy fixture labels may show read-only Zone/Slot context, but they do not
  create an accepted route, mutation, persistence, API, or proof requirement.

### Aging stock

- `daysInStock` is calculated from a vehicle's inventory-arrival date using the
  current client date.
- A vehicle is aging when `daysInStock > 90`; exactly 90 days is not aging.
- Aging status is shown prominently in inventory and contributes to dashboard
  summary data.

### Dashboard

- Dashboard data summarizes the current persisted inventory, including total
  inventory and aging-stock counts.
- Dashboard and inventory must refetch after a successful action that changes
  persisted vehicle state.
- For this bounded submission, “real-time” means current React Query state plus
  explicit invalidation/refetch behavior. SSE and multi-user synchronization
  remain out of scope.

### Manager actions and history

- A manager can record a status or proposed action for an aging vehicle, such
  as `Price Reduction Planned`, with an optional note.
- Saving an action persists both the latest vehicle action and a timestamped
  activity-history entry.
- A successful save provides immediate user feedback (toast) and exposes the
  resulting history in a timeline or equivalent activity view.

## Data Ownership

The active mock domain owns the canonical browser-side representation of
Vehicle Masters, Inventory Units, actions, and activity records. UI components
consume API-shaped responses and must not manipulate Local Storage directly.
Zones and Slots are reserved for the deferred placement module.

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
- Locations, Zone/Slot capacity and placement, associated mock API contracts,
  persistence, and validation proof.
