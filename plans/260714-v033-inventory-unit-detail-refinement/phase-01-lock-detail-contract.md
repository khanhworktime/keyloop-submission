---
phase: 1
title: "Lock Detail Contract"
status: completed
effort: ""
---

# Phase 1: Lock Detail Contract

## Overview

Priority P1. Status completed. The domain, responsive, semantic, and overlay
contracts were locked before screen edits.

## Context Links

- `docs/product/inventory-dashboard.md`
- `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`
- `design/v0.3-responsive-screens/screen-map.md`
- `design/v0.1-d-precision-guideline/brand-guideline.md`

## Key Insights

- Inventory Unit owns VIN, stock, arrival, status, action, and Slot assignment.
- Vehicle Master owns reusable make/model/variant/type.
- Aging is strictly `daysInStock > 90`; Zone derives from Slot.

## Requirements

- Preserve VM-014, full VIN, North · N-04, 128 days, current action, and history.
- Keep tablet's accepted four-fact reduction; reflow secondary context elsewhere.
- Keep optional manager note and one primary action per layer.

## Architecture

Static HTML prototype consumes no production data. Interaction may demonstrate
the accepted flow but must not imply API or persistence proof.

## Related Code Files

- Read: product/story/design contracts and existing screen assets.
- Modify later: `inventory-unit.html`, `inventory-unit.css`.
- Delete: none.

## Implementation Steps

1. Inventory current visible facts, actions, routes, and overlay behavior.
2. Map each fact to Master, Unit, Slot/Zone, action, or Activity ownership.
3. Lock desktop/tablet/mobile information priority and target sizes.

## Success Criteria

- [x] No shared specification is presented as VIN-owned state.
- [x] Responsive reductions preserve the manager decision and recovery path.

## Risk Assessment

Risk: hiding meaningful context for compactness. Mitigation: reflow or disclose
secondary facts instead of silently deleting them.

## Security Considerations

No auth or sensitive-data change. VIN remains intentional operational data.

## Next Steps

Completed. Phase 2 applied the locked detail contract.
