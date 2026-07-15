# Architecture

## System Boundary

The Intelligent Inventory Dashboard is a browser-only React application. It
ships with an MSW API and a Local Storage-backed repository so the full manager
journey is executable without a production server.

```text
React route
  -> feature component
  -> TanStack Query hook
  -> typed Axios client
  -> MSW HTTP handler
  -> inventory repository
  -> versioned Local Storage state
```

The browser API and storage adapter are submission infrastructure. They do not
represent a deployed backend, shared database, authenticated user, or
multi-user synchronization model.

## Runtime Composition

`src/main.tsx` starts the MSW worker, then mounts React with the shared Query
Client and TanStack Router. If the worker cannot start, the application still
renders and query surfaces expose recoverable request errors.

| Boundary | Main ownership | Responsibilities |
| --- | --- | --- |
| Routes | `src/routes/`, `src/router.tsx` | Route tree, path/search parsing, route composition |
| Application shell | `src/components/app-shell/` | Navigation, landmarks, responsive shell |
| Feature UI | `src/features/*/components/` | Overview, Inventory, Unit action, Activity presentation |
| Query/application seam | `src/features/*/*-queries.ts`, `src/features/shared/` | Cache keys, HTTP calls, mutation invalidation, safe errors |
| HTTP boundary | `src/lib/`, `src/mocks/handlers.ts`, `src/mocks/api/` | DTOs, correlation IDs, input parsing, response envelopes |
| Persistence | `src/mocks/persistence/` | Queries, joins, schema parsing, atomic action write |
| Domain | `src/domain/` | Entities, repository contract, aging/date rules |
| Seed data | `src/mocks/data/` | Deterministic normalized starting state |

Dependencies point inward: feature components do not import Axios, MSW, or
browser storage. The concrete Local Storage adapter is constructed only by the
mock-browser boundary.

## Routes and Navigation

| Route | Feature |
| --- | --- |
| `/` | Overview totals and aging priority queue |
| `/inventory` | URL-backed inventory filtering, sorting, selection, and pagination |
| `/inventory/$unitId` | Unit facts, recent activity, and proposed-action mutation |
| `/activity` | Global Activity feed and URL-backed filters |

Primary route destinations are exactly Overview, Inventory, and Activity.
Inventory Unit is reached from inventory context. Unknown and deferred routes
render the application not-found state. The application shell also owns a
non-route Search command: desktop exposes it in primary navigation, while the
compact header exposes it beside Notifications. Its Base UI command palette
reuses `GET /api/inventory?search=...` and navigates selected results to the
existing Inventory Unit route; it does not introduce a new API or route.

Inventory and Activity search parameters are parsed before entering feature
components. Canonical navigation uses replacement when correcting default or
invalid paging/filter state, preserving usable Back navigation.

Inventory page and command-palette keyword searches share the repository index
for the derived Inventory Unit name, Stock No., VIN, and Vehicle Master name/ID.

## Domain Model

The persisted `PersistedInventoryStateV1` envelope contains:

- `vehicleMasters`: reusable make, model, variant, and type identity.
- `inventoryUnits`: VIN, stock number, arrival date, status, optional Zone/Slot
  label, and latest action.
- `activities`: timestamped arrival, status, and manager-action evidence.

Inventory Units reference Vehicle Masters by ID. Master fields are not copied
into Unit persistence. `daysInStock` and `isAging` are derived at query time;
derived age is never stored. Aging is strictly
`inventoryStatus === 'available' && daysInStock > 90`.

## HTTP Contract

| Method | Path | Result |
| --- | --- | --- |
| `GET` | `/api/overview` | Current totals and oldest aging Units |
| `GET` | `/api/inventory` | Filtered, sorted, paginated Units and facets |
| `GET` | `/api/inventory/:unitId` | One Unit joined to Master and Activity data |
| `PATCH` | `/api/inventory/:unitId` | Validated editable Unit identity and status update |
| `POST` | `/api/inventory/:unitId/actions` | Updated Unit plus the new Activity item |
| `GET` | `/api/activity` | Filtered, paginated global Activity and facets |

Success responses use typed `{ data }` envelopes. Errors use a stable error
object with a correlation ID and optional field errors. Handlers parse and
bound path, query, and body values before calling the repository. Mock latency
is 250–650 ms in the browser and injectable for deterministic tests.

Telemetry records correlation ID, method, path, duration, and status. It does
not log query values, VINs, notes, or request bodies.

## Persistence Flow

The Local Storage key is `keyloop.inventory-state.v1`.

Read flow:

1. Read the stored string once.
2. If no state exists, create and persist the deterministic seed.
3. Parse unknown JSON into the versioned domain shape.
4. Join Master, Unit, and Activity records for the requested view.
5. Apply filters and sorting before pagination.

Malformed or unsupported stored data returns a typed failure instead of being
silently reset.

Action flow:

1. Read and parse the current snapshot.
2. Validate Unit existence, action type, note length, and the aging rule.
3. Clone the snapshot.
4. Update `latestAction` and append one matching Activity event.
5. Serialize both changes through one `setItem` call.
6. Return the joined Unit and Activity result.
7. Invalidate Overview, Inventory, the exact Unit, and Activity query keys.

Unit update flow validates and trims VIN, stock number, lifecycle status, and
the optional Zone/Slot label; rejects duplicate VIN/stock values; diffs the
normalized values; and writes the Unit plus one `unit-updated` Activity in the
same snapshot. A no-op returns the current detail without a write or Activity.
Successful changes invalidate the same dependent query families.

If persistence fails, no partial snapshot is written. Notes are rendered as
plain text and excluded from telemetry.

## Responsive Data Surface

Desktop and tablet inventory views lazy-load AG Grid Community. Mobile renders
cards from the same `UnitListItem` API response and shares the same filter,
result, page, and action meaning. AG Grid Enterprise, Master/Detail, and the
server-side row model are not used.

## Scope Boundaries

Vehicle Master is supporting normalized identity only. Inventory Units may
carry one optional plain-text Zone/Slot label. Location hierarchy, capacity,
assignment, movement, authentication, authorization,
production APIs, SSE/WebSockets, and multi-user synchronization are outside the
MVP. Production deployment is not evidenced.

## Validation Boundary

Vitest covers domain, repository, HTTP, query, and component behavior.
Playwright runs desktop, tablet, and mobile Chromium projects for the manager
journey, responsive surfaces, navigation, persistence, and accessibility. The
production build may emit a non-blocking large-chunk advisory for the
lazy-loaded AG Grid dependency.
