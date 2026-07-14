# v0.5 Supply Inventory Design Handoff

Status: implementation-ready design contract

This milestone freezes the approved Keyloop-aligned Precision direction around
the submitted **Supply** task: give dealership managers a current inventory
overview, make stock held longer than 90 days conspicuous, and persist a
manager's proposed action for an aging vehicle.

Open `index.html` for the visual handoff board. `scope.md` is the normative
implementation boundary; when an older prototype exposes broader navigation,
the v0.5 scope takes precedence for the submission MVP.

## Core product journey

`Overview → Inventory → Inventory Unit → Activity`

- Primary navigation contains **Overview**, **Inventory**, and **Activity**.
- Inventory Unit detail is reached from the selected stock record.
- Vehicle Master remains a supporting normalized data relationship.
- Locations, Zone/Slot capacity, placement, assignment, and movement are a
  future module and are not MVP routes or acceptance criteria.

## Requirement mapping

| Requirement | Design surface | Required outcome |
| --- | --- | --- |
| Inventory visualization | Inventory | Filterable stock list by make, model, and age |
| Aging identification | Overview and Inventory | `daysInStock > 90` receives prominent attention treatment |
| Actionable insight | Inventory Unit and Activity | Proposed action persists and produces timestamped evidence |

## Approved source artifacts

- [Overview](../v0.3-responsive-screens/screens/dashboard.html)
- [Inventory](../v0.3-responsive-screens/screens/inventory.html)
- [Inventory Unit](../v0.3-responsive-screens/screens/inventory-unit.html)
- [Activity](../v0.3-responsive-screens/screens/activity.html)
- [Vehicle Masters supporting evidence](../v0.4-management-screens/screens/vehicle-masters.html)
- [Vehicle Master detail supporting evidence](../v0.4-management-screens/screens/vehicle-master.html)

Existing HTML prototypes are design evidence. They do not prove React routes,
AG Grid runtime behavior, MSW contracts, Local Storage persistence, or product
E2E completion.

## Production interaction contract

- Desktop: persistent navigation, detailed comparison, selected-record context.
- Tablet: the same information contract with 48px frequent actions and reduced
  columns where necessary.
- Mobile: purpose-built fast-check cards and focused sheets; do not compress
  the desktop grid.
- Required states: loading, empty, error, selected, aging, save-in-progress,
  success, and recoverable failure.
- Focus is visible, modal focus is contained and restored, frequent touch
  actions are at least 48px, and meaning never depends on color alone.

## Production sources of trust

- [AG Grid React](https://www.ag-grid.com/react-data-grid/): Community edition
  for desktop/tablet Inventory comparison; custom Quartz-based Precision theme.
- [Animate UI](https://animate-ui.com/docs): preferred source for custom
  interactive controls and overlays.
- [Base UI](https://base-ui.com/react/components): fallback primitive source;
  prefer Base UI-backed Animate UI variants when available.
- [Iconsax](https://iconsax.io/): Rounded Linear by default; Bold only for the
  selected navigation destination.

Every external component must be configured through the global Precision
tokens and accessibility states. Upstream sample styling is never copied as
the application theme.

## Domain ownership

- Vehicle Master owns make, model, variant, and type.
- Inventory Unit owns VIN, stock number, arrival date, inventory status, and
  latest proposed action.
- Activity owns timestamped evidence of manager and system events.
- UI components use API-shaped data; they do not access Local Storage directly.

## Evidence and limitation policy

Minor prototype overflow is non-blocking unless it hides essential content,
prevents a required action, or breaks core navigation. See `validation.md` for
the exact evidence boundary.

The durable scope decision is recorded in
`docs/decisions/0010-supply-inventory-mvp-scope.md`.
