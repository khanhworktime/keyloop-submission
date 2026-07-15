---
phase: 9
title: "Implement Global Activity Advanced Filtering"
status: completed
priority: P1
effort: "1d"
dependencies: [5, 8]
---

# Phase 9: Implement Global Activity Advanced Filtering

## Overview

Deliver a globally framed Activity feed with scalable Unit lookup and advanced
event/date/actor filters; Unit context narrows results without changing identity.

## Requirements and Architecture

- Header always says global Activity. `?unit=` hydrates a filter, not a page mode.
- Basic search covers stock number, VIN, and model.
- Advanced filters: event type, from/to date, actor provenance. Zone is absent.
- Base UI Drawer uses right-side presentation on desktop/tablet and a swipeable
  bottom sheet on mobile while sharing draft state. Apply commits to URL;
  Cancel rolls back; Reset clears; chips remove.
- Each event links to Unit detail and uses semantic `<time>`.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/activity-page.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/activity-filters.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/activity-filter-drawer.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/activity-feed.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/activity-page.test.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/activity-route.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css`.

## Implementation Steps

1. Parse/canonicalize Activity URL filters and render global identity invariant.
2. Add Unit combobox/basic search, result announcement, and pagination.
3. Implement advanced draft drawer/sheet with Apply/Cancel/Reset/chips, focus
   containment/restoration, Escape, validation, and reduced motion.
4. Render newest-first events with Unit identity, actor provenance, type, note,
   and honest empty/error/retry states.
5. Test global/filtered copy, URL hydration, filter composition, draft rollback,
   invalid dates, keyboard dialog behavior, zero events, and new action event.

## Success Criteria

- [x] Direct and Unit-filtered URLs retain global Activity framing.
- [x] Event/date/actor/Unit filters compose through MSW before pagination.
- [x] Apply/Cancel/Reset, swipe dismissal, and focus behavior pass interaction tests.
- [x] No Zone/Slot filter, field, or copy is introduced.
- [x] `npx vitest run src/features/activity` passes.

## Risks and Security

Do not conflate actor provenance with authenticated identity. Bound query/search
lengths and render notes as text.

## Next Steps

Phase 10 runs the complete proof ladder.
