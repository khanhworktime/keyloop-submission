---
phase: 3
title: "Compose Mobile Fast-Check Flow"
status: completed
priority: P1
effort: "2h"
---

# Phase 3: Compose Mobile Fast-Check Flow

## Overview

Create the mobile form of the core loop as rapid exception checking, not a
compressed desktop grid.

## Context Links

- `docs/decisions/0009-ag-grid-responsive-data-surface.md`
- `design/v0.1-d-precision-guideline/brand-guideline.md`

## Requirements

- Replace AG Grid with mobile cards backed by the same query/view-model semantics.
- Preserve filters, identity, `daysInStock > 90`, location, selection, action,
  feedback, and activity continuity.
- Use bottom navigation and bottom sheets; frequent actions are at least 48px.

## Architecture

Mobile uses urgency-ordered cards and one decision at a time. Dashboard opens a
filtered fast-check list; selecting a unit opens detail/action in a sheet;
success keeps context and links to the resulting activity entry.

## Related Code Files

- Modify: `design/v0.3-responsive-screens/screens/{dashboard,inventory,inventory-unit,activity}.html`
- Modify: `design/v0.3-responsive-screens/styles/` responsive CSS
- Modify: `design/v0.3-responsive-screens/scripts/responsive-screen-controls.js`

## Implementation Steps

1. Define mobile content priority and bottom-navigation position for each family.
2. Replace table composition with cards showing identity, exception, location,
   and one next action from the shared record contract.
3. Move detail/action into a bottom sheet; retain safe cancel, focus, and
   destructive-decision rules from v0.2.4.
4. Preserve query/filter/pagination meaning without exposing desktop view switches.
5. Prove loading, empty, error/offline, busy, success, and long-content states.
6. Verify thumb reach, keyboard order, focus restore, reduced motion, and no overflow.

## Todo List

- [x] Mobile loop reaches the same outcome with less comparison detail.
- [x] Cards and AG Grid project the same record/filter/action semantics.
- [x] Sheet and feedback never obscure the next recovery or navigation action.

## Success Criteria

- [x] No AG Grid or desktop column model renders on mobile.
- [x] One-handed fast-check flow remains legible and operable.
- [x] Exactly 90 days is not presented as aging; over 90 days is explicit.

## Risk Assessment

Risk: mobile becomes a separate product. Mitigation: shared view-model contract
and parity checks for identity, filtering, action outcome, and history.

## Security Considerations

Do not place record details in unlabelled decorative regions or capture real data.

## Next Steps

Publish comparative viewport evidence and review prompts.
