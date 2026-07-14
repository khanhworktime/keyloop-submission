# v0.4 Management Screens

Status: reviewed exploration; superseded for MVP scope by v0.5

This version preserves the approved v0.3 manager loop and composes the four
deferred management families:

- `screens/vehicle-masters.html`
- `screens/vehicle-master.html`
- `screens/locations.html`
- `screens/zone-slots.html`

Open `index.html` for the eight-family gallery. The first four screens are
linked from v0.3 rather than duplicated. Every new screen provides explicit
desktop, tablet, and mobile review modes.

## System contracts

- Vehicle Master owns make, model, variant, and type.
- Inventory Unit owns VIN, stock number, arrival, status, proposed action, and
  Slot assignment.
- Zone is derived from Slot; it is never edited independently.
- AG Grid Community is the desktop/tablet production contract for tabular
  Master Data. The HTML prototype expresses that structure without bundling a
  grid runtime.
- Mobile uses task-specific cards or Slot rows rather than compressed tables.
- Animate UI is the preferred component source; Base UI is the fallback. Both
  must inherit the global Precision styling and accessibility states.

These files are design evidence, not production React behavior or persistence.

## Delivery and verification

Activity refinement plus Vehicle Masters, Vehicle Master Detail, Locations,
and Zone/Slots prototypes are delivered. Responsive geometry passes in 15
page/mode combinations with zero overflow. View switching, search/type
filtering, Slot drawer/selection, and focus restoration are checked. npm lint
and build plus Node syntax and static checks pass.

The manager accepted the overall flow direction and chose to defer Locations
and Zone/Slots from the Supply Inventory submission. These prototypes remain
future-module design evidence; production React routes, AG Grid runtime
behavior, and persistence are not implemented.

## Vehicle Masters annotation refinement

Table and Grid surfaces are mutually exclusive after correcting the hidden
override, with enforcement on individual table rows, Grid cards, and mobile
cards. Type is a direct select, Sort is separate, and search/filter/sort
compose. Vehicle image surfaces use honest `Vehicle image` / `Asset pending`
slots because source and licensing remain deferred. Linked Inventory Units
identify `Stock no.`, Inventory age, Zone, and Slot explicitly.

Zero-result filtering clears stale detail; recovery keeps row, card, and detail
record IDs synchronized. Header, mobile, and footer counts track `visibleRows`.
Tablet keeps a visible 220px detail rail with explicit linked-Unit fields and
zero overflow. Table rows retain native button semantics and synchronize
`aria-pressed` with selection.

Browser checks confirm 44px desktop controls, 48px tablet/mobile controls, and
zero overflow in every mode. The final focused tester passes 21/21 checks, and
inline JavaScript, CSS, lint, build, and diff checks pass. Independent re-review
is CLEAN with no blockers.

This remains design-prototype evidence, not production React, AG Grid runtime,
API persistence, or Base UI behavior. For MVP scope, follow
`../v0.5-design-handoff/scope.md`.
