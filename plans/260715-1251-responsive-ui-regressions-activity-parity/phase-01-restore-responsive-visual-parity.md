---
phase: 1
title: "Restore Responsive Visual Parity"
status: completed
priority: P1
effort: "2d"
dependencies: []
---

# Phase 1: Restore Responsive Visual Parity

## Overview

Apply targeted shell, grid, toast, and Activity composition fixes. Keep React,
AG Grid Community, Base UI, API/query state, routes, and persistence unchanged.

## Context Links

- Authority: `design/v0.3-responsive-screens/screens/activity.html`
- Visuals: `design/v0.3-responsive-screens/previews/activity/desktop.png`,
  `tablet.png`, `mobile.png`
- Shell/activity CSS: `design/v0.3-responsive-screens/styles/{application-shell,activity,responsive-tablet,responsive-mobile}.css`
- Contracts: `docs/decisions/0009-ag-grid-responsive-data-surface.md`,
  `docs/stories/US-003-production-ui-visual-parity.md`
- Current proof: `tests/e2e/responsive-accessibility.spec.ts`,
  `tests/e2e/inventory-manager-journey.spec.ts`

## Key Insights

- At 1920px, live shell starts at x=160 because `max-width:1600px` is centered;
  target outer inset is 12px.
- Tablet rail is 72px but hides all brand content. Use the official square asset
  `public/keyloop-mobile-logo.jpeg`, 40–44px, undistorted.
- Sidebar hover currently resolves near `#11181c` on `#1a2f3e` (~1.30:1).
- Grid explicitly sets `checkboxes:false`; detail action has a visible border.
- Toast is fixed top-right over header actions; source places it bottom-right and
  above mobile navigation.
- Loaded Activity measures ~1855px document height on desktop and 3127px mobile.
  Source uses a compact 282px/230px filter rail, dense feed, mobile chips/sheet,
  and internally scrolling desktop/tablet workspace.

## Requirements

- Functional: preserve filter URL canonicalization, pagination, drawer semantics,
  row/detail selection sync, action save/persistence, and unit deep links.
- Accessibility: WCAG 2.2 AA; normal text/state contrast ≥4.5:1, non-text state
  contrast ≥3:1, visible focus, labelled controls, polite toast, no focus theft.
- Interaction: controls ≥44×44px; frequent tablet/mobile actions ≥48×48px; hover
  is supplemental; no horizontal page overflow at any supported viewport.

## Architecture

- Keep shell breakpoints: mobile `<768`, compact 72px rail `768–1199`, full rail
  `≥1200`. Remove wide centering; let workspace consume remaining viewport.
- Make desktop/tablet workspace a two-row grid (header + scroll region); scroll
  `app-shell__main`, not the document/sidebar.
- Compose Activity as filter-aside + feed on desktop/tablet. On mobile, hide the
  aside, show scope/filter chips, and use the existing Base UI bottom sheet.
- Keep the explicit official Keyloop mobile header branding. Expose the Activity
  filter control in the horizontal scope-chip row and reuse the existing drawer.
- Keep AG Grid row selection as source of selected-unit context; expose its
  checkbox selection column and retain click/keyboard selection.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css` — shell, nav, Activity, toast geometry.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/components/app-shell/app-shell.tsx` — compact official brand/slot markup.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/components/inventory-grid.tsx` — checkbox selection and borderless action.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory-unit/action-save-toast.tsx` — stable three-column toast structure/classes.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/components/activity-page.tsx` — responsive filter/feed composition.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/components/activity-feed.tsx` — compact chronological row layout.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/components/activity-filter-drawer.tsx` — shared aside/header trigger and mobile sheet.
- Modify if required: `activity-applied-filters.tsx`, `activity-unit-combobox.tsx`, `activity-formatters.ts` — chips, compact controls, split date/time.
- Modify: `src/features/activity/components/activity-page.test.tsx`, `tests/e2e/responsive-accessibility.spec.ts`, `tests/e2e/inventory-manager-journey.spec.ts`.

## Implementation Steps

1. Add tablet brand markup/style; make wide shell left-aligned and viewport-bound.
2. Replace dark-rail hover token pair with a verified ≥4.5:1 foreground/background;
   retain active white pill and visible focus.
3. Enable AG Grid row checkboxes without a header bulk-select checkbox; make the
   44/48px detail affordance borderless/transparent with hover/focus feedback.
4. Rebuild toast to 22px icon + flexible copy + 44px dismiss columns. Position
   bottom-right inside workspace on desktop/tablet and 12px insets above the
   mobile nav/safe area; preserve polite announcement and current timeout.
5. Refactor Activity to reference hierarchy: title, desktop/tablet filter rail,
   feed header/count, compact time-marker-body-record rows, applied chips, and
   mobile title/filter header + horizontal scope chips + bottom sheet.
6. Preserve loading/error/empty/pagination layouts and all URL/query behavior.
7. Add geometry, contrast, selection, keyboard, touch, overflow, and axe proof.

## Todo List

- [x] Shell/brand/hover/full-width fixes
- [x] Grid checkbox and borderless row action
- [x] Non-overlapping responsive toast
- [x] Activity desktop/tablet/mobile parity
- [x] Focused regression and full validation runs

## Success Criteria

- [x] Desktop 1920×1080: shell/sidebar x is 0–16px; shell height ≤ viewport;
  workspace owns vertical scrolling; document has no horizontal overflow.
- [x] Desktop Activity: filter rail 268–290px, gap 10–16px, feed fills remainder;
  typical event rows 96–132px and first three events visible at 1440×900.
- [x] Tablet 1024×900: rail is 72px with official 40–44px logo; filter rail
  220–240px; all frequent controls ≥48px; workspace/sidebar remain viewport-bound.
- [x] Mobile 390×844 (also 320/375/414): the official Keyloop wordmark remains
  visible; the Activity chip row has a ≥48px filter action; desktop filter rail
  is hidden; feed top is ≤300px; bottom nav/safe areas do not cover content.
- [x] Sidebar hover normal text contrast ≥4.5:1; focus indicator and active state
  remain distinct without relying only on color.
- [x] Each desktop/tablet grid row exposes a labelled selection checkbox; selecting
  checkbox or row updates the same detail rail. Open action has no visible border
  at rest, remains ≥44px (≥48px tablet), keyboard reachable, and visibly focused.
- [x] Toast width ≤380px, copy wraps without collision, dismiss target ≥44px, and
  its box never intersects `.application-header__actions` or mobile bottom nav.
- [x] Activity search/unit/advanced/date/actor filters, chips, reset, pagination,
  deep links, empty/error/loading states, and live result count still work.
- [x] `npm run lint`, focused Vitest, `npm run build`, responsive Playwright/E2E,
  and axe WCAG A/AA checks pass with no new console errors.

## Testing Plan

1. Vitest: Activity global framing/filter callbacks/empty state; toast dismissal
   semantics; grid selection configuration where practical.
2. Playwright desktop/tablet/mobile: assert exact geometry above, logo visibility,
   hover computed contrast, checkbox-to-detail sync, borderless action, toast
   non-intersection, Activity filter/drawer flows, and zero horizontal overflow.
3. Visual comparison: capture `/activity` at 1920×1080, 1024×900, 390×844 and
   compare hierarchy/density against the three canonical PNGs.
4. Full journey: save an action, observe toast, reload, then verify Activity entry.

## Risk Assessment

- Shell overflow changes can break sticky tests: update proof to scroll main region.
- AG Grid checkbox column can squeeze tablet columns: reserve fixed selection width
  and re-check visible column set.
- Portaled/header drawer trigger can duplicate labels/focus: one Drawer.Root, unique
  IDs, restore focus to the trigger that opened it.
- Design prototype includes deferred nav/events: copy composition only; do not add
  Locations/Master routes or Zone behavior.

## Security Considerations

No auth/data-boundary change. Keep rendered activity text escaped by React; do not
log manager notes or add storage access outside existing query/repository layers.

## Next Steps

Implementation, independent review, and full validation are complete. See the
[tester report](../reports/tester-2026-07-15-responsive-ui-activity-parity.md)
and [clean code-review report](../reports/code-reviewer-2026-07-15-responsive-ui-activity-parity.md).

## Unresolved Questions

None.
