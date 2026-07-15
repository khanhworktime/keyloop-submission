---
phase: 5
title: "Build Application Shell and Routes"
status: completed
priority: P1
effort: "1d"
dependencies: [4]
---

# Phase 5: Build Application Shell and Routes

## Overview

Replace the placeholder with the responsive Precision shell and exact route tree.

## Requirements and Architecture

- Primary navigation is exactly Overview, Inventory, Activity.
- Inventory Unit is contextual at `/inventory/$unitId`, never a nav item.
- Root shell owns skip link, landmarks, active state, Outlet, toast live region,
  responsive rail/mobile navigation, and route error/not-found presentation.
- Use design tokens and Iconsax; no Zone/Slot or Vehicle Master route.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/router.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/root-route.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/index-route.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/components/inventory-dashboard-shell.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/inventory-route.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/inventory-unit-route.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/activity-route.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/components/feedback/toast-provider.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/components/async-state.tsx`.

## Implementation Steps

1. Port global Precision tokens, focus ring, type hierarchy, target sizes,
   reduced motion, and responsive shell geometry from the accepted handoff.
2. Make root route render shell plus Outlet; add skip link and landmarks.
3. Add the four exact routes with typed search parsing and route-level titles.
4. Add shared loading/empty/error/retry primitives and toast provider.
5. Test active nav, contextual detail, keyboard order, mobile targets, not-found,
   and absence of deferred routes.

## Success Criteria

- [x] Exactly three primary navigation links render.
- [x] All four URLs resolve; unknown/deferred URLs show not-found.
- [x] Focus, landmarks, 44px/48px targets, and reduced motion are present.
- [x] `npx vitest run src/routes src/components` passes.

## Risks and Security

Keep responsive navigation in one semantic landmark and avoid duplicated focus
targets. No auth/account affordance may imply a real identity system.

## Next Steps

Phase 6 fills the Overview route.
