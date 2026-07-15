---
phase: 1
title: "Align Activity composition and validate"
status: completed
priority: P1
effort: "4h"
dependencies: []
---

# Phase 1: Align Activity composition and validate

## Overview

Implement the smallest visual refactor that makes desktop `/activity` follow
the supplied reference, then prove the responsive and behavioral contracts.

## Context Links

- Story: `docs/stories/US-006-activity-content-composition-parity.md`
- Product boundary: `docs/product/inventory-dashboard.md`
- Architecture boundary: `docs/ARCHITECTURE.md`
- Prototype: `design/v0.3-responsive-screens/screens/activity.html`
- Prototype geometry: `design/v0.3-responsive-screens/styles/activity.css`

## Key Insights

- `ActivityPage` already owns URL-filter updates and canonical page/unit
  normalization. Keep those callbacks and render a different composition.
- `ActivityUnitCombobox` already searches stock number, VIN, and model; use it
  as the sole visible desktop rail input. The existing advanced drawer already
  exposes the text-search URL filter, so removing the standalone rail search
  does not remove search behavior.
- `ActivityFeed` already maps each persisted event and preserves its Unit link.
  Only the header/row layout and reference-aligned label treatment are in scope.

## Requirements

- Functional: desktop shows eyebrow `Activity`, h1 `Operational activity`, and
  subtitle `Review manager actions, location changes, and system events across
  all inventory.`; a compact bordered filter rail sits directly beside the
  operational feed.
- Functional: preserve unit/filter/search URL state, advanced drawer, live
  event count, pagination, empty/loading/error behavior, and unit navigation.
- Non-functional: preserve the mobile chip/drawer flow, tablet compact rail,
  44px/48px touch targets, no horizontal overflow, keyboard semantics, and axe
  baseline.
- Out of scope: changes to `ActivityUrlFilters`, API/query/domain/persistence,
  routes, event data, or responsive shell.

## Architecture

```text
ActivityRoute search -> ActivityPage callbacks -> existing URL filters/query
                                      |                 |
                                      v                 v
                        reference-aligned rail     dense ActivityFeed rows
                                      |                 |
                              existing filter drawer   existing Unit links
```

The page continues to be presentation-only: it receives parsed search state,
calls `onFiltersChange`, and renders the existing query result. No new state,
network call, or shared component is needed.

## Related Code Files

| Action | File | Reason |
| --- | --- | --- |
| Modify | `src/features/activity/components/activity-page.tsx` | Replace desktop framing and remove the duplicated visible search form while retaining the existing unit combobox, drawer, filters, and pagination. |
| Modify | `src/features/activity/components/activity-feed.tsx` | Align compact feed context/count and desktop event-row information hierarchy without changing mapping or links. |
| Modify | `src/features/activity/components/activity-filter-drawer.tsx` | Preserve the advanced text-search drawer while aligning its trigger and responsive composition with the completed Activity layout. |
| Modify | `src/styles.css` | Tune only Activity selectors/breakpoints for the reference geometry, rail/feed cards, density, and intentional tablet/mobile overrides. |
| Modify | `src/features/activity/components/activity-page.test.tsx` | Assert the new global title/subtitle and that a filtered URL still renders global Activity identity. |
| Modify | `tests/e2e/inventory-manager-journey.spec.ts` | Update global Activity heading assertions; retain canonical URL and persisted-action coverage. |
| Modify | `tests/e2e/responsive-accessibility.spec.ts` | Assert reference labels/composition and desktop density while preserving mobile control, overflow, and axe checks. |
| No change | `src/features/activity/activity-filter-state.ts`, `src/routes/activity-route.tsx`, `src/features/activity/components/activity-unit-combobox.tsx` | Existing contracts already provide URL state and unit lookup. |

## Implementation Steps

1. In `activity-page.tsx`, replace the alternate header copy with the exact
   supplied eyebrow, title, and subtitle. On desktop/tablet, make the rail
   begin with `Filters`, the existing unit combobox, and the existing advanced
   filter trigger; keep the drawer as the home for free-text search. Do not
   change `onFiltersChange`, `filtered`, query use, canonicalization, or
   pagination.
2. In `activity-feed.tsx`, retain the query item loop, event labels/timestamps,
   `role=status`, empty state, and typed Unit `Link`. Present the reference
   hierarchy: compact all-inventory context, `Recent operational events`, a
   visible event-count token, then date/marker/body/right-aligned Unit link.
3. In `src/styles.css`, constrain changes to the Activity block. At desktop
   (>=1200px), use the reference-aligned 282px rail / flexible-feed grid, 10px gap,
   compact card headers, 32px markers, 72px date column, and compact rows.
   Keep the reference's one-pixel borders/radii and note treatment. At tablet,
   preserve the 230px rail and in-row Unit action. At mobile, retain chips,
   bottom drawer, 48px controls, stacked event layout, and no side rail.
4. Update the component test to protect exact supplied framing under a unit
   URL filter. Update E2E assertions from `Decisions stay visible.` and `Keep
   context narrow.` to the new wording; add bounded geometry assertions that
   desktop rail and feed are adjacent, count is visible, events use the dense
   four-column layout, and Unit links still work. Keep behavior assertions
   instead of asserting arbitrary pixel-perfect screenshots.
5. Validate desktop at 1440x1000 against the supplied reference hierarchy;
   validate tablet with the configured iPad Pro 11 Chromium project and mobile
   with the configured iPhone 13 Chromium project. Check filter application,
   URL canonicalization, pagination, one persisted manager action, Unit link,
   overflow, 44px/48px targets, keyboard focus, and axe.

## Todo List

- [x] Replace Activity framing and desktop rail composition.
- [x] Align feed header and event-row density without changing event semantics.
- [x] Preserve tablet/mobile Activity compositions with focused CSS overrides.
- [x] Update unit and E2E assertions to the supplied global framing.
- [x] Run targeted checks, then full validation.

## Success Criteria

- [x] Desktop exposes `Activity`, `Operational activity`, the supplied subtitle,
  `Filters`, `Recent operational events`, and a visible event count.
- [x] The filter rail and feed are adjacent bordered cards; desktop event rows
  are compact and retain timestamp, event detail/note, and Unit navigation.
- [x] `?unit=stk-2048&page=99` canonicalizes as before; advanced/text search,
  filters, pagination, and persisted action evidence work unchanged.
- [x] Tablet and mobile keep their current intentional rails/chips/drawer,
  touch-target, no-overflow, and accessibility behavior.
- [x] `npm run lint`, `npm run test -- activity-page`, `npm run build`,
  targeted `npm run test:e2e -- --project=<desktop|tablet|mobile>-chromium`,
  and final `npm run validate` pass.

## Risk Assessment

| Risk | Mitigation |
| --- | --- |
| Removing the visible desktop search seems to remove search | Preserve it in the existing advanced drawer and verify `search` URL behavior. |
| Desktop CSS leaks into intentional tablet/mobile layouts | Keep base/mobile rules and scope desktop refinements to the current Activity selectors/media query. |
| Visual refactor weakens event evidence or navigation | Do not alter `ActivityFeed` data mapping, status announcement, empty state, or typed link props; cover in E2E. |
| Dense layout clips long values | Keep `minmax(0, 1fr)`, wrapping body text, and overflow checks at all configured viewports. |

## Security Considerations

No new data handling or authorization surface. Continue rendering activity
notes as existing plain text and do not add telemetry, URLs, or storage writes.

## Next Steps

Complete. Visual proof and final validation are recorded in US-006; product and
architecture documents remain unchanged because contracts did not change.

## Evidence

- Final `npm run validate`: lint, 59 unit tests, production build, and 31 active
  Playwright E2E tests passed; 11 skips were intentional viewport/project gates.
- Targeted Activity component/E2E checks passed. Desktop 1440×1000 and mobile
  390×844 visual checks confirmed reference hierarchy, responsive controls,
  and no clipping or horizontal overflow.
- The pre-existing React Doctor Iconsax supply-chain warning is out of scope;
  no dependency or React diagnostic change was introduced.

## Unresolved Questions

None.
