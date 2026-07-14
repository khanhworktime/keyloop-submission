# US-001 Intelligent Inventory Dashboard Foundation

## Status

in_progress

## Lane

normal

## Product Contract

Deliver the submission-only dashboard described in
`docs/product/inventory-dashboard.md`: browse and filter inventory, identify
vehicles held longer than 90 days, and persist manager actions with activity
history through an MSW API boundary.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/decisions/0008-submission-solution-architecture.md`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`
- `docs/decisions/0010-supply-inventory-mvp-scope.md`

## Acceptance Criteria

- The app uses MSW handlers and Local Storage-backed mock-domain services,
  rather than direct component access to persisted data.
- Inventory filtering and pagination return API-shaped data and render loading,
  empty, and error states.
- Inventory Units reference reusable Vehicle Masters; VIN-specific inventory
  state is not duplicated into master data.
- Primary navigation contains Overview, Inventory, and Activity. Inventory Unit
  detail is reached contextually; Vehicle Master UI remains supporting/admin.
- Locations, Zone/Slot capacity, assignment, movement, APIs, persistence, and
  proof are deferred beyond this submission story.
- Vehicles over 90 days are visibly aging; exactly 90 days are not.
- Recording an aging-vehicle action persists the action and an activity entry,
  then refreshes the affected inventory and dashboard data.
- Every mock request has a correlation ID and simulated latency is logged via
  MSW lifecycle events without logging sensitive data.

## Design Notes

- Commands: record a vehicle action.
- Queries: dashboard summary, inventory page, Inventory Unit detail, vehicle
  activity history, and supporting Vehicle Master identity.
- API: exact endpoint and response-envelope names are a pre-implementation
  task; all UI access crosses the MSW HTTP boundary.
- Tables: browser Local Storage records for Vehicle Masters, Inventory Units,
  actions, and activities.
- Domain rules: `daysInStock > 90` means aging.
- UI surfaces: dashboard, inventory list/filters, Inventory Unit action control,
  and activity timeline. Vehicle Master library/detail is supporting evidence;
  Locations and Zone/Slot management are deferred.
- Design system: the selected Precision direction is defined in
  `design/v0.1-d-precision-guideline/brand-guideline.md`; AG Grid Community is
  the desktop/tablet data-grid target, while mobile uses a fast-check list.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-001 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Aging threshold and mock-domain persistence rules. |
| Integration | MSW handler contracts, filtered inventory, and action persistence. |
| E2E | Browser flow for filtering and recording an aging-vehicle action. |
| Platform | Not applicable; browser-only submission. |
| Release | Production deployment is out of scope. |

## Harness Delta

No Harness rule change. The supplied design was decomposed into a product
contract, architecture decision, and implementation story.

## Evidence

Phase 1 frontend foundation complete on 2026-07-13:

- `npm run lint` passed.
- `npm run build` passed; the production application bundle is 297.90 kB before gzip.
- Independent static validation confirmed the Router, Query Client, Axios client,
  generated MSW worker asset, and absence of direct browser-storage access under
  `src/`.
- Browser smoke remains pending because no in-app browser target was available
  in the execution environment.

Selected brand guideline added on 2026-07-13:

- Direction C is the primary visual language; Direction A typography/spacing
  and Direction B overlay/widget strengths are incorporated selectively.
- The implementation guideline defines hierarchy, semantic colors,
  accessibility, responsive behavior, and AG Grid styling guardrails.
- The brand-kit board is rendered at 1600 × 1000 for review.

v0.2 component-language early review prepared on 2026-07-13:

- The Navigation Shell and AG Grid Data Surface are linked from
  `design/v0.2-component-language/index.html` with desktop, tablet, and mobile
  working modes.
- Iconsax Rounded Linear is the default icon language; Bold is limited to the
  selected navigation destination.
- Browser checks confirmed 60px desktop rows, 64px tablet rows, 44px minimum
  targets, no essential surface overflow, mobile decision cards, and populated,
  loading, empty, and error data states.
- Standalone checks pass for local references, CSS brace balance, JavaScript
  syntax, and seven 1600 × 900 PNG previews. Repository `npm run lint` and
  `npm run build` also pass as integration checks for the existing React app;
  they do not constitute showcase or product E2E proof.

v0.2.1 refinement review prepared on 2026-07-14:

- Master Data now uses the Iconsax Driver database/server glyph; mobile Add
  Record is an accessible 44 × 44 icon action and intro/status spacing is 18px.
- Desktop and tablet can switch between the AG Grid-style Table View and an
  app-owned Grid View that projects the same record contract as operational
  cards. Mobile intentionally keeps the fast-check list without a view switch.
- Browser checks confirmed four desktop cards, two tablet columns, shared data
  state behavior, correct pressed state, 44px minimum controls, and no essential
  horizontal overflow. Static checks, `npm run lint`, and `npm run build` pass.
- Seven refreshed PNG previews are 1600 × 900; the desktop data preview records
  the new Grid View for manager review.

v0.2.2 Actions & Inputs early review prepared on 2026-07-14:

- A new version boundary preserves the approved v0.2.1 artifacts and publishes
  only the Actions & Inputs family; Status & Feedback and Overlays & Decisions
  remain pending.
- The responsive board covers action hierarchy, labelled native fields,
  filters, choices, validation, success, busy, and disabled states using
  Iconsax Rounded Linear.
- Browser checks confirm 44px base targets, 48px frequent tablet targets,
  deliberate mobile form-first reduction, no horizontal overflow, synchronized
  pressed/checked state, live save feedback, and focus on an invalid VIN.
- Four 1600 × 900 PNG previews, standalone static checks, `npm run lint`, and
  `npm run build` provide reproducible review evidence.
- Browser-comment refinement reserves a non-semantic support row so paired
  fields remain aligned in Normal and Validation states. Data commit actions
  now use the Ready-teal family at 7.69:1 contrast while generic primary
  actions remain Carbon; responsive overflow and busy-state behavior still pass.

v0.2.3 Status & Feedback early review prepared on 2026-07-14:

- A versioned board separates durable domain status, transient action feedback,
  and async availability/recovery for Inventory, Zone, and Slot workflows.
- Normal, Busy, Success, Error, and Offline states synchronize operation,
  collection, toast, and live-region copy; desktop, tablet, and mobile modes
  preserve manager context and prioritize recovery on mobile.
- Component sourcing now follows Animate UI → Base UI → approved primitive,
  with Base UI variants preferred and global Precision style configuration
  required before feature use.
- Four 1600 × 900 previews, JavaScript/CSS/reference checks, `npm run lint`,
  and `npm run build` provide reproducible review evidence.

v0.2.4 Overlays & Decisions early review prepared on 2026-07-14:

- The component contract separates anchored popovers, reversible dialogs,
  destructive alert dialogs, and context-rich drawers/sheets by purpose,
  dismissal, background behavior, and production source.
- Desktop keeps anchored and centered layers, tablet uses a right-side drawer,
  and mobile converts overlays to bottom sheets with 48px frequent actions.
- Modal layers require labelled triggers, focus containment and restoration,
  inert background content, Escape handling, and reduced-motion support.
- Animate UI Base supplies Popover, Dialog, and Alert Dialog on Base UI
  primitives; Base UI Drawer is the gesture-ready fallback. Every source must
  pass the global Precision styling gate.
- Four fresh 1600 × 900 captures, browser interaction checks, standalone static
  checks, `npm run lint`, `npm run build`, and independent tester/reviewer passes
  provide reproducible design evidence.
- The milestone remains design evidence only, not production React behavior or
  proof that the overall US-001 story is implemented.

v0.3 Responsive Screens early review prepared on 2026-07-14:

- The eight-family map covers Dashboard, Inventory, Inventory Unit, Vehicle
  Masters, Vehicle Master, Locations, Zone/Slot, and Activity. The first
  review composes Dashboard, Inventory, Inventory Unit, and Activity; the
  other four families remain mapped and deferred.
- Desktop/tablet use the AG Grid Community composition contract while mobile
  uses fast-check cards with the same filter, selection, record, and action meaning.
- Browser checks confirm all twelve screen/viewport combinations have no
  horizontal overflow and preserve filter → selection → modal/sheet decision
  → saved action → Activity continuity.
- Fourteen fresh 1600 × 900 previews, reference/JavaScript/CSS checks,
  `npm run lint`, `npm run build`, and independent tester/reviewer passes
  provide reproducible early-review evidence.
- This is HTML design evidence only. It does not prove production React routes,
  AG Grid runtime behavior, persistence, or completion of US-001; story status
  remains `in_progress`.

v0.3.1 Dashboard refinement evidence recorded on 2026-07-14:

- The HTML Dashboard has a quieter hierarchy, one primary aging-inventory
  action, and stable vehicle identity/alignment in its priority rows; routes,
  data meaning, responsive modes, and product scope are unchanged.
- Local reference, JavaScript syntax, and CSS brace checks passed. Repository
  `npm run lint` and `npm run build` also passed.
- Independent source-only tester and reviewer checks passed for the static
  assertions, lint and build evidence, CTA hierarchy, page-head selector
  ownership, anchor underline and touch-size rules, queue geometry, and
  thumbnail slots.
- The in-app `file://` visual reload is pending because browser security policy
  blocks that navigation path. No refreshed screenshots, browser interaction,
  accessibility, runtime behavior, independent visual review, or production
  behavior is claimed.
- US-001 remains `in_progress`; this refinement is design evidence only.

v0.3.1 signal-label top-alignment evidence recorded on 2026-07-14:

- Dashboard `.signal-label` now uses `align-items: flex-start` to top-align
  wrapped label text with its adjacent status or secondary label.
- The static source assertion, `npm run lint`, `npm run build`, and
  `git diff --check` passed.
- No browser or visual proof is claimed; visual confirmation remains pending.
- US-001 remains `in_progress`; this refinement is design evidence only.

v0.3.2 Inventory data-surface refinement evidence recorded on 2026-07-14:

- The HTML Inventory source retains one Add button with the accessible name
  `Add inventory unit`: desktop renders `+ Add`, while tablet and mobile apply
  an explicit 48 × 48px icon-only `+` treatment.
- Filter labels and filled circular count bubbles are separate; screen-reader
  text preserves each announced unit count.
- Wide desktop table content is owned by an internal overflow wrapper inside
  the main panel. Tablet wraps filters to avoid a second scroller while keeping
  the reduced-column table in its table wrapper.
- A semantic result footer follows the table/mobile-card result markup, and
  Inventory context spacing uses the approved 8px step.
- Repository `npm run lint` and `npm run build` passed. Independent tester and
  reviewer source/static checks passed for the scoped source assertions and
  evidence boundary.
- The in-app browser visual reload remains blocked by its `file://` navigation
  policy. No refreshed screenshot, browser geometry, keyboard, zoom/reflow,
  runtime accessibility, or independent visual-review proof is claimed.
- US-001 remains `in_progress`; v0.3.2 is HTML design evidence only and does
  not prove production React, AG Grid runtime behavior, or persistence.

v0.3.3 Inventory Unit Detail refinement evidence recorded on 2026-07-14:

- Identity is consolidated around the VIN-specific unit and its reusable Master.
  Semantic fact, activity-list, and time markup preserves the review sequence
  Master → Unit → Zone/Slot → Action → History.
- Tablet keeps four essential facts. Mobile places Action before History, uses a
  48px frequent action trigger and 44px Activity links, and exposes no dormant
  hash-link actions on the Inventory Unit screen.
- The mobile bottom sheet owns internal scrolling, contains overscroll, and
  respects the safe-area inset above fixed navigation.
- Localhost browser proof confirmed save → success toast → reload continuity,
  zero horizontal overflow in desktop/tablet/mobile modes, and no console errors.
- Local-reference, JavaScript syntax, CSS brace, focused semantic/control-size,
  lint, and production-bundle checks passed. Independent tester and reviewer
  checks also passed with no unresolved scoped finding.
- US-001 remains `in_progress`. This is HTML design/browser-prototype evidence
  only; it does not prove production React routes, API persistence, Base UI
  runtime behavior, or completion of the product story.

v0.3.4 responsive annotation refinement evidence recorded on 2026-07-14:

- Inventory Unit uses the approved 8px context margin, four semantic
  Iconsax-style fact icons, tighter `0 12px 10px` Recent activity padding with
  44px links, separated `Stock no.`/VIN metadata, and an honest
  `Vehicle image` / `Asset pending` slot without fabricated media.
- Dashboard uses semantic attention accent `#9d2e20` with white
  label/value/copy/link and a white/red Aging badge; white-on-red contrast is
  7.38:1.
- Desktop, tablet, and mobile browser checks measured zero horizontal overflow
  on both refined screens. Inventory Unit save → toast → reload retained
  `Price Reduction Planned`.
- Focused source checks, `npm run lint`, and `npm run build` passed. Independent
  tester passed 19/19 checks; independent review was clean aside from the stale
  plan state corrected in the v0.3.4 plan.
- US-001 remains `in_progress`. This is HTML design/browser-prototype evidence
  only; it does not prove production React routes, API persistence, or product
  story completion.

Activity filter and Locations capacity-badge refinements recorded on
2026-07-14:

- Direct Activity routes default to `All inventory`; Inventory Unit Detail
  links preserve `?unit=STK-2048` and responsive mode.
- The custom Activity combobox searches Stock number, VIN, and model. Other
  accepted units render an honest zero-event empty state rather than invented
  history.
- Advanced event/date/Zone/actor filters use a responsive drawer/sheet. Apply,
  Cancel, Reset, chips, and result `aria-live` feedback work; mobile Cancel
  rolls back draft scope and Apply commits it.
- Radiogroup, combobox, focus, and Escape semantics pass. Desktop, tablet, and
  mobile checks confirm 44px/48px targets and zero overflow.
- The Locations North Zone capacity-badge cascade is corrected. Browser
  measurement confirms all four badges are 56.48 × 25px with centered
  marker/text and zero overflow in all three responsive modes.
- Static JavaScript, `npm run lint`, `npm run build`, and `git diff --check`
  pass. Independent tester result is PASS and independent review is CLEAN.
- US-001 remains `in_progress`. These refinements are design-prototype evidence
  only; they do not prove production API, persistence, Base UI runtime
  behavior, or story completion. Manager Keep/Fix review remains pending.

Vehicle Masters annotation refinement evidence recorded on 2026-07-14:

- The hidden-state override is corrected so Table and Grid surfaces remain
  mutually exclusive. Type is a direct select and Sort remains a separate
  control; search, filtering, and sorting compose.
- Vehicle image surfaces render honest `Vehicle image` / `Asset pending`
  placeholders because image source and licensing remain deferred.
- Linked Inventory Units label `Stock no.`, Inventory age, Zone, and Slot
  explicitly.
- A zero-result search clears stale detail. Recovery synchronizes row, card,
  and detail record IDs.
- Header, mobile, and footer counts track `visibleRows`. Hidden enforcement
  covers individual table rows, Grid cards, and mobile cards.
- Tablet retains a visible 220px detail rail with explicit linked-Unit fields
  and zero overflow. Table rows keep native button semantics and synchronize
  `aria-pressed` with selection.
- Browser checks confirm 44px desktop controls, 48px tablet/mobile controls,
  and zero overflow in all three responsive modes.
- The final focused tester passes 21/21 checks. Inline JavaScript, CSS,
  `npm run lint`, `npm run build`, and `git diff --check` pass. Independent
  re-review is CLEAN with no blockers.
- US-001 remains `in_progress`. This is design-prototype evidence only; it does
  not prove production React, AG Grid runtime behavior, API persistence, or
  completion of the story. Manager Keep/Fix review remains pending.

Vehicle Master Detail CTA refinement evidence recorded on 2026-07-14:

- The redundant `Review STK-2048` footer CTA is removed. Desktop/tablet row
  chevrons and mobile linked-card navigation remain, along with a compact
  visible footer note.
- Browser QA confirms 0px overflow across desktop, tablet, and mobile. Lint,
  build, and diff checks pass; final review is CLEAN.
- US-001 remains `in_progress`; this is design-prototype evidence only.

Activity global-view refinement evidence recorded on 2026-07-14:

- Activity identity is always global: `Activity` breadcrumb, the
  `Operational activity` title, and an across-all-inventory subtitle. The
  page-level `Open STK-2048` CTA and dynamic `Activity for <stock>` framing are
  removed.
- Inventory Unit remains an optional Stock/VIN/model combobox filter. `?unit=`
  hydrates filter and feed context only; Advanced filters remain. Per-event
  `Stock No.` links remain and measure 48px on tablet/mobile.
- Browser QA confirms 0px overflow in every mode, invariant global and filtered
  identity, an honest zero-event state, and a visible filter sheet.
- Tester passes 19/19 plus 7/7 follow-up checks. Lint, build, and diff pass;
  reviewer re-check is CLEAN after three interaction/copy fixes.
- US-001 remains `in_progress`; this is design-prototype evidence only.

v0.5 Supply Inventory design handoff recorded on 2026-07-14:

- The normative core journey is Overview → Inventory → Inventory Unit action →
  Activity, with primary navigation limited to Overview, Inventory, and Activity.
- Vehicle Master remains supporting normalized identity. Locations, Zone/Slot
  capacity, assignment, movement, APIs, persistence, and proof are deferred by
  decision 0010.
- The visual handoff board maps make/model/age filtering, `daysInStock > 90`,
  action persistence, responsive behavior, component sources, and evidence
  boundaries to the approved source prototypes.
- Local references, Markdown links, CSS balance, whitespace/final-newline,
  lint, build, HTTP route, desktop/mobile browser, and independent tester checks
  pass. The v0.5 board has zero horizontal overflow and no console errors at the
  checked desktop and mobile sizes.
- US-001 remains `in_progress`; v0.5 is an implementation-ready design contract,
  not React, AG Grid, MSW, persistence, or product E2E proof.
