---
phase: 2
title: "Compose Core Desktop and Tablet Screens"
status: completed
priority: P1
effort: "3h"
---

# Phase 2: Compose Core Desktop and Tablet Screens

## Overview

Compose the four core-loop families for full-context desktop and touch-first
tablet while reusing approved component and overlay contracts.

## Context Links

- `design/v0.2-component-language/component-spec.md`
- `design/v0.2.2-component-families/component-spec.md`
- `design/v0.2.3-status-and-feedback/component-spec.md`
- `design/v0.2.4-overlays-and-decisions/component-spec.md`

## Requirements

- Dashboard makes total and aging inventory actionable, not decorative.
- Inventory uses AG Grid Community contract on desktop/tablet with external filters.
- Unit detail/action retains Master, Zone/Slot, aging, status, and history context.
- Activity confirms the saved decision in a readable timeline.

## Architecture

Use a versioned gallery plus one standalone HTML composition per reviewed
family, shared foundation/responsive styles, and deterministic navigation/state
controls. Desktop uses 224px/72px navigation and contextual rail; tablet uses
72px rail/drawer, fewer intentional columns, 48–56px frequent targets.

## Related Code Files

- Create: `design/v0.3-responsive-screens/index.html`
- Create: `design/v0.3-responsive-screens/screens/{dashboard,inventory,inventory-unit,activity}.html`
- Create: `design/v0.3-responsive-screens/styles/` composition and responsive CSS
- Create: `design/v0.3-responsive-screens/scripts/responsive-screen-controls.js`

## Implementation Steps

1. Build gallery and four linked screen specimens using one consistent seeded record.
2. Compose Dashboard summary/exception path and Inventory filtered aging state.
3. Model AG Grid Community Table View; keep detail rail outside the grid and
   avoid Enterprise features or fragile virtualized-child CSS selectors.
4. Compose Unit detail/action with v0.2.4 decision layer, then visible success
   feedback and Activity entry using v0.2.3 semantics.
5. Adapt tablet by reducing columns/details deliberately, not scaling desktop.
6. Keep Iconsax vocabulary, Precision tokens, focus, targets, and one primary action.

## Todo List

- [x] Four desktop/tablet families form one traceable record journey.
- [x] Grid filters, selection, detail, action, and activity remain synchronized.
- [x] Tablet preserves essential identity, aging, location, and next action.

## Success Criteria

- [x] Core loop is understandable without narration.
- [x] No prior design milestone file changes.
- [x] No horizontal page overflow or hidden-on-hover essential action.

## Risk Assessment

Risk: copied component specimens drift when composed. Mitigation: reference
approved contracts and share tokens/state recipes rather than duplicate styles.

## Security Considerations

Action controls are deterministic design states only; copy must not claim persistence.

## Next Steps

Translate the same loop into a purpose-built mobile fast-check flow.
