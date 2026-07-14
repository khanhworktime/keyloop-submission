# v0.4 Management Screens validation

Date: 2026-07-14
Status: exploratory milestone reviewed; MVP scope superseded by v0.5

## Evidence boundary

This milestone validates static HTML design artifacts. It does not prove React
routes, AG Grid runtime behavior, API persistence, atomic Slot assignment, or
production Animate UI/Base UI integration.

## Delivered scope

- [x] Activity refinement is delivered with Vehicle Masters, Vehicle Master
      Detail, Locations, and Zone/Slots prototypes.
- [x] All eight families are discoverable from the v0.4 gallery.
- [x] The four new families expose desktop, tablet, and mobile review modes.
- [x] Master and Unit field ownership stays distinct across prototype surfaces.
- [x] Capacity reconciles to 83 of 101 occupied, 18 available, and 3
      unassigned.
- [x] Missing Master Type values render as `Not supplied`.
- [x] The Locations North Zone capacity-badge cascade is corrected.
- [x] Vehicle Masters Table and Grid surfaces are mutually exclusive after the
      hidden-state override correction; enforcement covers individual table
      rows, Grid cards, and mobile cards.
- [x] Vehicle Masters uses a direct Type select with a separate Sort control;
      search, filtering, and sorting compose.
- [x] Vehicle image surfaces use honest `Vehicle image` / `Asset pending`
      placeholders because source and licensing remain deferred.
- [x] Linked Inventory Units identify `Stock no.`, Inventory age, Zone, and
      Slot explicitly.

## Verification evidence

- [x] Responsive geometry was checked in 15 page/mode combinations with zero
      page, device, table, grid, card, drawer, sheet, or navigation overflow.
- [x] View switching works in the responsive review controls.
- [x] Vehicle Master search and type filtering work.
- [x] Slot drawer opening, slot selection, and focus restoration work.
- [x] `npm run lint` and `npm run build` pass.
- [x] Node JavaScript syntax checks and static local-asset checks pass.
- [x] Browser measurement confirms all four Locations capacity badges are
      56.48 × 25px with centered marker/text and zero overflow in desktop,
      tablet, and mobile modes.
- [x] Static JavaScript, lint, build, and diff checks pass after the annotation
      refinements; independent testing reports PASS and review is CLEAN.
- [x] Vehicle Masters zero-result state clears stale detail; recovery keeps
      row, card, and detail record IDs synchronized.
- [x] Header, mobile, and footer counts track `visibleRows`.
- [x] Tablet preserves a visible 220px detail rail with explicit linked-Unit
      fields and zero overflow.
- [x] Table rows preserve native button semantics and synchronize
      `aria-pressed` with selection.
- [x] Vehicle Masters desktop controls meet 44px targets and tablet/mobile
      controls meet 48px targets.
- [x] Vehicle Masters browser checks measure zero overflow in desktop, tablet,
      and mobile modes.
- [x] Vehicle Masters tester passes 21/21 checks; inline JavaScript, CSS, lint,
      build, and diff checks pass.
- [x] Independent re-review is CLEAN with no blockers after the Vehicle Masters
      annotation fixes.
- [x] Vehicle Master Detail removes the redundant `Review STK-2048` footer CTA
      while retaining desktop/tablet row chevrons, mobile linked-card
      navigation, and a compact visible footer note.
- [x] Vehicle Master Detail CTA refinement has 0px browser overflow in all
      modes; lint, build, and diff checks pass, and final review is CLEAN.
- [x] Activity keeps a global identity in every state: `Activity` breadcrumb,
      `Operational activity` title, and across-all-inventory subtitle. Unit
      framing and the page-level `Open STK-2048` CTA are removed.
- [x] Inventory Unit remains an optional Stock/VIN/model combobox filter;
      `?unit=` hydrates filter/feed context only, Advanced filters remain, and
      per-event `Stock No.` links are 48px on tablet/mobile.
- [x] Activity browser QA confirms 0px overflow, invariant global identity,
      honest zero-event state, and visible filter sheet in every mode. Tester
      passes 19/19 plus 7/7 follow-up checks; lint, build, and diff pass, and
      reviewer re-check is CLEAN after three interaction/copy fixes.
- [x] Manager accepted the overall flow direction. Vehicle Master remains
      supporting evidence; Locations and Zone/Slot are deferred from MVP.

## Remaining review gate

The flow-level review is closed without promoting the broader v0.4 gallery into
MVP scope. Production React routes, AG Grid runtime behavior, persistence, and
Zone/Slot behavior are not implemented or claimed. Follow the normative v0.5
scope for submission work.
