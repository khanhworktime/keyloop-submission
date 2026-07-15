---
phase: 6
title: "Implement Overview Dashboard"
status: completed
priority: P1
effort: "0.5d"
dependencies: [5]
---

# Phase 6: Implement Overview Dashboard

## Overview

Deliver current persisted inventory totals and a prominent aging priority queue.

## Requirements and Architecture

- Consume only `useOverviewQuery`; metrics include total and aging counts.
- Show the oldest aging Units with Master identity and links to Unit detail.
- Primary action links to `/inventory` with aging filter search state.
- Loading footprint is stable; empty/error states are explicit and retryable.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/overview/overview-page.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/overview/overview-page.test.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/index-route.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css`.

## Implementation Steps

1. Render total/aging summary and one clear aging-inventory action.
2. Render top-five oldest aging Units with stock, Master, days, and action state.
3. Add loading skeleton, honest no-inventory/no-aging states, and retry error.
4. Test counts, `> 90` treatment, links, query states, and accessible labels.

## Success Criteria

- [x] Exactly 90 never appears as aging.
- [x] Summary reflects persisted data after invalidation.
- [x] Priority links retain Unit identity and keyboard access.
- [x] `npx vitest run src/features/overview` passes.

## Risks and Security

Do not calculate independent UI totals or log record identity. Use API output.

## Next Steps

Phase 7 delivers the complete Inventory browsing route.
