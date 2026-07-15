---
phase: 8
title: "Implement Inventory Unit Action Persistence"
status: completed
priority: P1
effort: "1d"
dependencies: [4, 5]
---

# Phase 8: Implement Inventory Unit Action Persistence

## Overview

Implement Unit identity/detail and the aging-only proposed-action form with
atomic persistence, immediate feedback, and cache refresh.

## Requirements and Architecture

- Show normalized Master facts before Unit-specific VIN/stock/arrival/status.
- Derive and label age. Non-aging Units explain why action is unavailable.
- Aging form: required action type and optional 500-character note.
- Busy disables duplicate submission. Success toast is live-announced; failure
  preserves form values and focuses recovery guidance.
- Activity link uses `/activity?unit=<stockNumber>` as filter context only.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory-unit/inventory-unit-page.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory-unit/inventory-action-form.tsx`.
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory-unit/inventory-unit-page.test.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/routes/inventory-unit-route.tsx`.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css`.

## Implementation Steps

1. Render query states, Master/Unit facts, honest image placeholder, age, latest
   action, and recent Activity context.
2. Implement labelled action select and note validation with busy state.
3. Submit one mutation; prevent duplicate clicks while pending.
4. After the awaited mutation/invalidation, show toast and updated action/event.
5. Test non-aging rejection, note validation, duplicate prevention, server
   failure recovery, invalidation, reload persistence, and Activity deep link.

## Success Criteria

- [x] Successful save produces one Unit update and one Activity event.
- [x] Overview, Inventory, Unit, and Activity refresh after success.
- [x] Reload preserves both records; failure preserves neither partial change.
- [x] `npx vitest run src/features/inventory-unit` passes.

## Risks and Security

The repository remains the final aging/validation authority. Treat notes as
plain text; never inject HTML or emit notes in telemetry.

## Next Steps

Phase 9 exposes the persisted event in global Activity.
