---
phase: 2
title: "Align Production Surfaces"
status: complete
priority: P1
effort: "1d"
dependencies: [1]
---

# Phase 2: Align Production Surfaces

## Overview

Align each production route with its approved screen composition while
preserving current data, controls, responsive surface switching, and states.

## Context Links

- `design/v0.3-responsive-screens/screens/`
- `design/v0.3-responsive-screens/previews/`
- `design/v0.3-responsive-screens/screen-composition-spec.md`
- `docs/product/inventory-dashboard.md`

## Requirements

- Overview: decisive aging signal and compact priority queue.
- Inventory: filter/data-surface hierarchy, AG Grid + selected rail on desktop/tablet, fast-check cards on mobile.
- Unit: connected identity/facts, manager-decision rail, activity evidence, honest image placeholder.
- Activity: compact filters and scan-friendly evidence feed; mobile controls remain sheet-ready and thumb-reachable.

## Related Code Files

- Modify: `src/features/overview/components/*.tsx`
- Modify: `src/features/inventory/components/*.tsx`
- Modify: `src/features/inventory-unit/*.tsx`
- Modify: `src/features/activity/components/*.tsx`
- Modify only if shared behavior assertions need adjustment: existing component tests under the same feature folders

## Implementation Steps

1. Refine Overview hierarchy, metric proportions, and priority-row density.
2. Align Inventory filters, grid theme/row geometry, selected-unit rail, mobile cards, and pagination.
3. Align Unit identity, facts, decision action, drawer/toast, and recent activity composition.
4. Align Activity filter framing, event hierarchy, responsive feed, and pagination.
5. Verify loading, empty, error/retry, selected, aging, busy, success, and failure states use the same visual language.

## Todo List

- [x] Four route surfaces match approved spacing, typography, borders, and hierarchy.
- [x] No legacy Locations, Zones/Slots, Master navigation, or prototype-only actions added.
- [x] Existing labels, accessible names, URLs, mutations, and cache behavior remain compatible with tests.

## Success Criteria

- [x] Desktop/tablet retain comparison density; mobile uses task-specific cards/sheets rather than compressed desktop layouts.
- [x] Strict `daysInStock > 90`, persistence, filtering, selection, and activity evidence are unchanged.

## Risk Assessment

Prototype fixtures contain out-of-scope data and fewer records. Copy composition, not fixture scope; keep production pagination and API-backed content.

## Security Considerations

Continue rendering notes as text. Do not introduce HTML injection or new telemetry payloads.

## Evidence

The authoritative design audit and 12-view manual review accepted all four
production route surfaces across desktop, tablet, and mobile.

## Unresolved Questions

None.
