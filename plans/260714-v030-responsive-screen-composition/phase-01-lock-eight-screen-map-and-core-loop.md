---
phase: 1
title: "Lock Eight-Screen Map and Core Loop"
status: completed
priority: P1
effort: "45m"
---

# Phase 1: Lock Eight-Screen Map and Core Loop

## Overview

Lock information architecture, shared record semantics, and the first
reviewable operational loop before composing screens.

## Context Links

- `docs/product/inventory-dashboard.md`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`
- `design/v0.2.4-overlays-and-decisions/review.md`

## Requirements

- Define routes/purposes for all eight families and relationships among
  Vehicle Master, Inventory Unit, Zone, Slot, action, and activity.
- First slice covers Dashboard, Inventory, Unit detail/action, and Activity.
- Preserve prior milestone directories; English UI and Precision remain fixed.

## Architecture

One screen contract owns family purpose, data needs, primary decision, desktop,
tablet, and mobile composition. Shared view models keep AG Grid rows,
operational cards, mobile cards, detail, and activity representations aligned.

## Related Code Files

- Create: `design/v0.3-responsive-screens/screen-map.md`
- Create: `design/v0.3-responsive-screens/README.md`

## Implementation Steps

1. Record the eight-family map, navigation destination, route intent, primary
   task, core entities, and responsive transformation for each family.
2. Define the core loop: aging count → filtered inventory → selected unit →
   proposed action → success feedback → activity history.
3. Lock shared record/filter/selection/action semantics across Table View,
   optional operational Grid View, mobile cards, detail, and history.
4. Mark Vehicle Master and Locations families as mapped but deferred; avoid
   placeholder screens that imply review readiness.
5. Carry forward source-of-trust, accessibility, responsive, and no-Enterprise rules.

## Todo List

- [x] Eight families have explicit purpose and viewport behavior.
- [x] Core loop handoffs and state ownership are unambiguous.
- [x] Deferred families have entry/exit dependencies, not speculative designs.

## Success Criteria

- [x] Map covers every accepted product behavior without adding new scope.
- [x] First slice is independently reviewable end to end.
- [x] AG Grid/mobile parity and component sourcing are explicit.

## Risk Assessment

Risk: eight families become eight shallow mockups. Mitigation: map all, compose
four linked families deeply, defer the rest behind a named review gate.

## Security Considerations

Use fictional dealership records; no credentials, personal data, or real telemetry.

## Next Steps

Compose desktop and tablet views from the locked screen contract.
