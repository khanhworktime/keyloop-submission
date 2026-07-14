---
phase: 2
title: "Align Product and Decision Sources"
status: completed
priority: P1
effort: 1.5h
dependencies: [1]
---

# Phase 2: Align Product and Decision Sources

## Overview

Make the design index, screen map, product contract, story, and durable decision
agree with the v0.5 MVP boundary.

## Context Links

- `docs/product/inventory-dashboard.md`
- `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`
- `docs/decisions/0008-submission-solution-architecture.md`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`

## Key Insights

- The current product/story still requires Zone/Slot management; leaving those
  clauses active would contradict the approved MVP.
- ADR 0008 remains valid for submission architecture. Narrow scope with a new
  ADR rather than rewriting its historical decision.
- ADR 0009 remains valid for Inventory and supporting Vehicle Master surfaces.

## Requirements

- Preserve aging threshold, dashboard/inventory refresh, proposed action, and
  Activity history behavior.
- Preserve Vehicle Master → Inventory Unit ownership and shared data model.
- Remove dedicated Locations/Zone-Slot implementation and proof requirements
  from the active MVP; retain them as deferred future scope.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/README.md`
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.3-responsive-screens/screen-map.md`
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/docs/product/inventory-dashboard.md`
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/docs/decisions/0010-supply-inventory-mvp-scope.md`

## Implementation Steps

1. Add v0.4 and v0.5 rows to `design/README.md`; label v0.5 implementation-ready
   and keep `v1.0-approved` planned.
2. Update the screen map with Core / Supporting / Deferred classifications and
   the Overview / Inventory / Activity navigation contract.
3. Narrow the product contract: Vehicle Masters support Inventory; Locations
   and Zone/Slot management move to Deferred Decisions/Modules. Clarify that
   passive fixture labels do not imply assignment APIs.
4. Update US-001 acceptance, design notes, expected queries/tables, validation,
   and relevant-doc links. Do not mark the story implemented.
5. Add ADR 0010 recording the scope freeze and consequences. It narrows MVP
   delivery while preserving ADR 0008 architecture and ADR 0009 AG Grid rules.
6. Cross-link ADR 0010 from product, story, and v0.5 handoff.

## Success Criteria

- [x] No active MVP acceptance criterion requires Zone capacity, Slot occupancy,
      assignment, movement, or unassigned-unit management.
- [x] Product/story still require Vehicle Master references without duplicating
      VIN-specific Unit state.
- [x] Story remains `in_progress`; design evidence is not implementation proof.
- [x] ADR history is additive and contains a clear scope consequence.

## Risk Assessment

Risk: over-narrowing deletes useful future intent. Mitigation: move it to an
explicit deferred section and ADR consequence instead of erasing it.

## Security Considerations

No security boundary changes. Real auth/RBAC remains outside the submission.

## Next Steps

Phase 3 verifies consistency, links, build health, and reviewable browser sources.
