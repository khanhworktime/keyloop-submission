---
title: "v0.4 Management Responsive Screens"
description: "Review Activity, then compose the deferred Master Data and Location families."
status: awaiting_manager_review
priority: P1
intake: 27
branch: main
tags: [frontend, design, responsive, accessibility]
blockedBy: []
blocks: []
created: 2026-07-14
---

# v0.4 Management Responsive Screens

## Outcome

Preserve the approved `v0.3` core loop and add
`design/v0.4-management-screens/` for Vehicle Masters, Vehicle Master detail,
Locations, and Zone/Slot. The v0.4 gallery references approved v0.3 screens so
all eight families remain discoverable without duplicating approved artifacts.

## Locked contracts

- Official Keyloop logo; English UI; Precision tokens and hierarchy; Iconsax.
- AG Grid Community Table View on desktop/tablet, application-owned Grid View
  where useful, and dedicated mobile cards/lists from the same record model.
- Animate UI first, then Base UI primitives; every sourced control maps through
  global Precision styling and accessibility states.
- Vehicle Master owns make/model/variant/type; Inventory Unit owns VIN, stock,
  arrival, status, action, and Slot assignment. Zone derives from Slot.
- Missing Vehicle Master type is displayed honestly as `Not supplied`.
- HTML design-prototype scope only: no product editing, persistence, API, or
  invented vehicle image/data.

## Delivery sequence

1. **Activity review gate** — collect Keep/Fix annotations for existing family
   08 in desktop/tablet/mobile. If fixes are requested, land a narrow reviewed
   v0.3 patch before freezing that screen; otherwise mark it approved.
2. **Master Data batch** — compose family 04 library and family 05 detail with
   shared identity, linked-unit counts, Table/Grid parity, external detail rail,
   and mobile master cards. Do not merge Unit-owned fields into Master facts.
3. **Locations batch** — compose family 06 capacity overview/unassigned queue
   and family 07 Slot assignment flow. Use reconciled `83/101 occupied`, `18
   available`, `3 unassigned`; revalidation/conflict recovery belongs in the
   interaction contract even though persistence remains out of scope.
4. **Gallery integration** — publish a v0.4 index for all eight families, link
   the approved v0.3 core screens, and add direct responsive review controls for
   the four new screens.
5. **Proof and handoff** — update v0.4 review/validation notes, then run tester,
   independent UI review, and documentation sync after implementation.

## Screen acceptance

- Vehicle Masters answers which reusable definition a Unit should reference;
  Vehicle Master detail verifies shared specs and downstream linked stock.
- Locations identifies constrained Zones and exposes the three-unit placement
  queue; Zone/Slot selects an available Slot without losing prior assignment.
- Desktop supports comparison at high information density; tablet raises common
  targets to 48px; mobile reduces each surface to fast-check or one-task flow.
- Selection, filters, sort, counts, pagination, and record meaning stay aligned
  across Table View, Grid View, detail rails, and mobile cards.

## Validation gates

- [x] Activity refinement plus Vehicle Masters, Vehicle Master Detail,
      Locations, and Zone/Slots prototypes are delivered.
- [x] Responsive geometry passes in 15 page/mode combinations with zero
      overflow.
- [x] View switching, search/type filtering, Slot drawer/selection, and focus
      restoration pass interaction checks.
- [x] `npm run lint`, `npm run build`, Node syntax checks, and static checks
      pass.
- [x] Prototype scope is documented accurately: production React, AG Grid, and
      persistence are not implemented.
- [x] Validation notes and design README files are synchronized for handoff.
- [x] Locations North Zone capacity-badge cascade is corrected; all four
      badges measure 56.48 × 25px with centered content and zero overflow in
      desktop, tablet, and mobile modes.
- [x] Activity filtering preserves Unit Detail scope, supports scalable
      Stock/VIN/model lookup and honest empty history, and provides responsive
      advanced event/date/Zone/actor filters.
- [x] Activity Apply/Cancel/Reset/chip/live-result behavior, mobile draft
      rollback/commit, radiogroup/combobox/focus/Escape semantics, 44px/48px
      targets, and zero overflow pass.
- [x] Annotation-refinement JavaScript, lint, build, and diff checks pass;
      independent tester reports PASS and reviewer reports CLEAN.
- [x] Vehicle Masters Table/Grid hidden-state override is corrected; Type and
      Sort remain separate, search/filter/sort compose, and hidden enforcement
      covers individual rows, Grid cards, and mobile cards.
- [x] Vehicle Masters uses honest pending-image slots, explicit linked-Unit
      `Stock no.`/Inventory age/Zone/Slot fields, and synchronized
      row/card/detail record IDs after zero-result recovery.
- [x] Vehicle Masters desktop 44px targets, tablet/mobile 48px targets, and
      zero-overflow browser geometry pass in all modes.
- [x] Vehicle Masters header/mobile/footer counts track `visibleRows`; tablet
      retains a visible 220px detail rail with explicit linked-Unit fields and
      zero overflow.
- [x] Vehicle Masters table rows preserve native button semantics with
      synchronized `aria-pressed` selection state.
- [x] Vehicle Masters tester passes 21/21 checks; inline JavaScript, CSS, lint,
      build, and diff checks pass.
- [x] Independent Vehicle Masters re-review is CLEAN with no blockers.
- [ ] Manager Keep/Fix review approves Activity and the four management
      families across desktop, tablet, and mobile.

## Unresolved questions

None. Vehicle types absent from accepted source data default to `Not supplied`.
