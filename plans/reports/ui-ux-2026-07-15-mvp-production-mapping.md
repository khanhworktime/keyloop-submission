# MVP UI/UX production mapping

Date: 2026-07-15
Scope: implementation guidance only; no product or design-source changes

## Production baseline

The accepted loop is `Overview → Inventory → Inventory Unit action → Activity`.
Primary navigation is exactly Overview, Inventory, and Activity. Inventory Unit
is contextual. Vehicle Master supplies normalized make, model, variant, and
type only; a Master library/detail UI is optional support and must not block the
MVP. Locations, Zone/Slot capacity, assignment, movement, APIs, persistence,
filters, and proof are deferred.

Current React is a sound neutral foundation: TanStack Router and React Query are
mounted, Axios and MSW startup boundaries exist, and Iconsax is installed.
Production UI is otherwise unbuilt: only `/` exists, the page is a placeholder,
MSW has no handlers, and current `styles.css` uses temporary Inter/hard-coded
colors rather than Precision tokens. Replace the placeholder incrementally;
retain Router/Query/MSW boundaries and keep UI components away from Local
Storage.

## Routes and shared shell

| Route | Production ownership | Navigation state |
| --- | --- | --- |
| `/` | Overview summary and aging queue | Overview selected |
| `/inventory` | Inventory filters, results, selection | Inventory selected |
| `/inventory/:unitId` | Unit identity, aging facts, action, recent history | Inventory selected |
| `/activity` | Global inventory activity and filters | Activity selected |

`AppShell` owns a skip link, primary navigation, application header, main
landmark, route outlet, and global toast/live region. `PrimaryNavigation` owns
one route definition rendered as desktop sidebar, tablet icon rail, or mobile
bottom navigation; never maintain three independent nav lists. Use TanStack
`Link`, `aria-current="page"`, Iconsax Rounded Linear, and the Bold variant only
for the selected destination. Inventory Unit must not become a fourth item.

Desktop uses a persistent 216px floating sidebar, fluid workspace up to the
1440px review width, 24px content padding, and an optional 280–320px contextual
rail. Tablet uses a 72px icon rail, 16px content padding, abbreviated header,
and 48px frequent controls. Mobile uses a 64px top bar and a three-item bottom
nav padded by `env(safe-area-inset-bottom)`; main content reserves nav space and
uses 16px inline padding. Keep the full Keyloop wordmark at least 150px wide on
desktop; hide it on constrained rails rather than shrinking it.

Production breakpoints:

- Mobile: `< 768px`; no AG Grid, no desktop detail rail, bottom sheets for
  focused work.
- Tablet: `768px–1199px`; compact rail, AG Grid with deliberate column
  reduction, 48–56px frequent targets.
- Desktop: `>= 1200px`; full sidebar, comparison columns, selected-record rail.

Use CSS media/container queries, not the prototype's `data-mode` switch or
fixed device height. Support 320px minimum width, 200% zoom/reflow, long VINs
and labels, safe areas, and zero horizontal page scroll. Only the grid's own
internal viewport may scroll horizontally.

## Screen contracts

### Overview

Lead with one prominent aging signal: count of units where
`daysInStock > 90`, explicit `Aging` label/diamond cue, threshold copy, and a
link to the aging Inventory view. Exactly 90 days is not aging. Supporting
content is limited to core data: total inventory, saved-action activity, and an
oldest-first aging queue. Each queue item links to its Unit detail and keeps
stock number, make/model, age, and current action legible.

Desktop may show the signal, compact core summaries, and the oldest-first
queue together. Tablet reduces secondary copy and columns, not the aging cue.
Mobile shows the aging count plus the next/oldest exception; avoid a compressed
desktop dashboard. Use live query timestamps only when real, with copy such as
`Last refreshed`; do not imply SSE or multi-user real time.

Do not copy the prototype's Unassigned, Slot capacity, Zone pulse, Locations
links, notifications, or other placement signals. Replace those areas with
core inventory/action evidence or remove them.

### Inventory

One `InventoryQueryState` drives search, make, model, age, sort, and pagination
through URL search params and the API request. Required filters are make,
model, and age; keyword search may cover stock number, VIN, make/model. Keep the
reviewed `Needs attention` view, with `All units` as a clear reset. The Overview
CTA deep-links to the aging filter. Filter changes reset pagination.

Use one shared `InventoryRecordViewModel` for AG Grid and mobile cards:
`unitId`, `stockNumber`, `vin`, `vehicleMasterId`, `make`, `model`, `variant`,
`displayName`, `arrivalDate`, `daysInStock`, `isAging`, `inventoryStatus`, and
`proposedAction`. No presentation calculates aging independently.

- Desktop AG Grid Community: Inventory Unit identity, Vehicle Master-owned
  make/model/variant, age, semantic status, proposed action, and visible open
  action. Use 60px fixed rows, 44–48px headers, virtualization, pagination, and
  a Quartz theme derived from Precision tokens. Keep the 280–320px selected
  detail rail outside AG Grid and sync it from row selection.
- Tablet AG Grid Community: minimum 64px rows; keep identity/make-model, age,
  status, and open action. Move optional detail into the rail/drawer and expose
  a column menu rather than squeezing every desktop column.
- Mobile: render `InventoryMobileList` and `InventoryCard`, not AG Grid. Each
  card shows identity, stock number, make/model, age/aging cue, current proposed
  action, and one `Review unit` affordance. Same query, filters, result count,
  sort, pagination, and empty semantics as the grid.

External React controls own filter state and update the grid model. Custom cell
controls remain visible without hover, have accessible names, stop grid pointer
handling when required, and preserve AG Grid keyboard navigation. Do not use
Enterprise imports, Master/Detail, server-side row model, or DOM overrides.
Zone/Slot columns and `Unassigned` filtering are outside the MVP; if legacy
location text is retained, it is plain read-only context with no link/action.

### Inventory Unit action

`InventoryUnitPage` composes `UnitIdentityPanel`, `MasterRelationshipSummary`,
`UnitFacts`, `ProposedActionPanel`, `ProposedActionDrawer`, and
`RecentActivityPreview`. Identity includes stock number, VIN, make/model/
variant, Vehicle Master reference, arrival date, derived age, inventory status,
and current proposed action. Use the honest `Vehicle image / Asset pending`
placeholder until an approved licensed asset exists.

Desktop keeps facts and decision context visible with a right-side action
panel/drawer. Tablet keeps the four essential facts and uses a right drawer.
Mobile orders summary → action → recent history and uses a bottom sheet with
internal scrolling, contained overscroll, and safe-area padding.

Action flow:

1. `Record proposed action` opens a labelled modal drawer/sheet with unit
   context; proposed action is required and manager note is optional.
2. Validate inline and focus the first error. Keep the submit enabled until the
   request starts; then preserve its footprint, show `Saving…`, and prevent
   repeat activation.
3. On success, update the durable current-action display, append timestamped
   Activity evidence, close the overlay, restore trigger focus, announce a
   polite success, and invalidate/refetch Overview, Inventory, Unit, and
   Activity queries.
4. On failure, keep values and overlay context, show an actionable inline error
   plus Retry, and do not rely on a transient toast. Cancel never commits.

The Unit link to `/activity?unit=<stockNumber>` applies a filter; it does not turn
Activity into a unit-owned page. Zone/Slot assignment, movement, and location
action history are not part of this flow.

### Global Activity

Activity identity is invariant: breadcrumb `Activity`, title
`Operational activity`, and across-all-inventory copy remain global whether or
not filters are active. Direct `/activity` defaults to all inventory.
`?unit=` optionally hydrates the unit combobox and feed context only. Never use
`Activity for STK-…` as the page title or add a page-level `Open STK-…` CTA;
each event may link its stock number to the Unit route.

Production filters are inventory unit (stock number, VIN, make/model), event
type, date range, and actor. Keep filter state in URL params so reload/back/
forward/deep links work. Desktop shows the unit combobox and filter panel;
tablet uses the compact panel/right drawer; mobile shows applied-filter chips
and edits draft values in a bottom sheet. Apply commits draft state, Cancel
restores the prior state, Reset clears all, removable chips clear one filter,
and result changes announce through a polite live region. A valid unit with no
events renders an honest filtered-empty state.

Do not ship the prototype's Zone filter or treat historical location fixture
events as MVP mutation proof. Activity must expose the newly saved manager
action with timestamp, action label, optional note, actor, and Unit link.

## Reusable component boundaries

Keep feature modules thin and avoid one large dashboard component:

```text
components/app-shell/
  app-shell, primary-navigation, application-header, page-header
components/ui/
  button, icon-button, status-badge, filter-chip, field, search-field
  async-region, empty-state, error-state, toast-region, modal-drawer
features/overview/
  overview-page, aging-summary-card, inventory-summary, aging-unit-queue
features/inventory/
  inventory-page, inventory-toolbar, inventory-data-surface
  inventory-grid, inventory-mobile-list, inventory-card, selection-detail-rail
features/inventory-unit/
  inventory-unit-page, unit-identity-panel, master-relationship-summary
  unit-facts, proposed-action-panel, proposed-action-drawer, recent-activity-preview
features/activity/
  activity-page, activity-toolbar, inventory-unit-combobox
  activity-filter-drawer, activity-feed, activity-event
```

Hooks/view models own URL parsing, API/query integration, and responsive-neutral
record mapping. Components receive API-shaped data and callbacks only. Shared
primitive components own visual/accessibility behavior; feature components own
domain copy and composition. Vehicle Master gets no primary navigation or
standalone feature module unless the optional supporting UI is explicitly
scheduled.

## Precision implementation gate

Move the approved variables into the application styling layer and consume
them globally: Carbon/Stone foundations, Signal/Fusion interaction accents,
semantic Ready/Attention/Info/Pending/Error pairs, 4–64px spacing scale, 9/13/
19/24px radii, borders, overlay shadow, target sizes, 60/64px grid rows, and
the dual white + `#006d9c` focus ring. Add only shared recipes needed for
breakpoints, z-index, and reduced motion; do not create component-local themes.

Use Plus Jakarta Sans for headings, IBM Plex Sans for body/controls, tabular
numerals for counts/ages/timestamps, and IBM Plex Mono only for VIN in detail.
Use no more than three type sizes per widget. Icons come from installed
`iconsax-reactjs`: Rounded Linear by default, Bold only for selected nav;
decorative icons are hidden from assistive tech and icon-only actions have
specific accessible names.

Component source mapping:

| Need | Source |
| --- | --- |
| Inventory table | AG Grid React + Community, Quartz modern Theming API |
| Unit proposed-action select | Base UI Select; Animate UI Select was roadmap-only at the verified handoff |
| Activity unit search | Base UI Combobox; no invented Animate UI API |
| Unit action and Activity filter drawer/sheet | Base UI Drawer; right drawer on desktop/tablet, bottom sheet on mobile |
| Popover/Dialog/Alert Dialog, only if a later interaction needs one | Copy the official Animate UI Base variant, then map it to Precision |
| Text input/textarea/radio | Native semantic control styled through shared Precision recipes |
| Toast/live feedback | App-owned global region unless a current catalog component is re-verified and adds value |

For every copied Animate UI or Base UI source, map typography, color, spacing,
radius, border, shadow, z-index, focus, semantic states, and motion globally;
portals must inherit the same variables. Verify current catalogs at
implementation time. Roadmap entries and example Lucide icons are not usable
components. Honor `prefers-reduced-motion`; animate only transform/opacity and
never use `transition: all`.

## Required states and accessibility proof

Every query surface needs initial loading/skeleton, background refresh with
safe stale content, populated, unfiltered empty, filtered empty, recoverable
error with Retry, and not-found where relevant. Inventory additionally needs
selected/deselected and aging/non-aging states. Mutation UI needs pristine,
validation, saving, success, recoverable failure, and duplicate-submit
protection. AG Grid overlays and mobile cards must express equivalent states.

Use semantic landmarks/headings, a visible-on-focus skip link, logical DOM/tab
order, and visible `:focus-visible` treatment. Targets are at least 44×44px;
frequent tablet/mobile targets are at least 48×48px. Modal drawers/sheets set
the background inert, contain focus, close on Escape, restore focus, and
contain overscroll. Async outcomes use polite live announcements; blocking
errors remain inline. Status always combines label, marker/edge/shape, and
color. Preserve browser zoom, paste, keyboard activation, and reduced motion;
no action or information is hover-only.

## Prototype-only patterns not to copy

- Review header, viewport switch, device frame, `data-mode`, fixed 740/772px
  heights, and review-gallery navigation.
- Five-item navigation, Locations/Masters destinations, disabled dead-end nav,
  Zone/Slot capacity/unassigned workflows, or placement CTAs.
- Notifications, Export, Add Inventory Unit, and fabricated operational
  metrics unless separately accepted.
- Hand-authored `role="grid"`, DOM-query/dataset scripts, inline SVG symbol
  sheet, hard-coded records/counts/dates, `sessionStorage` action persistence,
  hash routes, or `Review fixture` copy.
- Native production Select chrome, manual focus traps, or copied upstream
  visual themes; use the sourced primitives and application state.
- A compressed desktop grid on mobile, hidden-on-hover row actions, color-only
  aging/status, fake vehicle imagery, or toasts as the sole durable evidence.

## Source gap

The requested `implementation-annotations.md` and `prototype.html` do not
exist. This report uses `v0.5-design-handoff/index.html` as the handoff board,
`README.md`/`scope.md`/`validation.md` as annotations, and the linked v0.3 core
plus v0.4 Vehicle Master screens as non-normative visual evidence. Gap is
non-blocking; v0.5 scope and ADR 0010 remain authoritative.

**Status:** DONE
**Summary:** Mapped the accepted v0.5 design to exact React shell, responsive, screen, component, state, sourcing, and accessibility contracts while removing deferred prototype scope.
**Concerns/Blockers:** Missing requested annotation/prototype filenames are documented as a non-blocking source gap; no implementation blocker.
