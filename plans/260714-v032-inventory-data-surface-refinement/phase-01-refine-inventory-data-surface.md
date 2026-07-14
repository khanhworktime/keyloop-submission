---
phase: 1
title: "Refine Inventory Data Surface"
status: completed
priority: P1
effort: "1h"
dependencies: []
---

# Phase 1: Refine Inventory Data Surface

## Overview

Implement the five comments with Inventory-scoped markup and CSS.

## Requirements and Architecture

- Wrap `.ag-grid-proof` in a dedicated horizontal-scroll owner and clip the
  rounded `.inventory-main`; retain `minmax(0,1fr)` and rail outside the grid.
- Split each counted chip into label/count spans; use `inline-flex`, no-wrap,
  non-shrinking circular count bubble, and pressed-state contrast.
- Replace the action with one accessible button whose desktop label is `+ Add`
  and whose tablet/mobile visual is `+`; do not duplicate focusable controls.
- Add Inventory-scoped context-strip margin and move stats after both desktop
  table and mobile cards so DOM order works in every mode.

## Implementation Steps

1. Update `screens/inventory.html` wrappers, chip spans, Add spans/name, and stats.
2. Update `styles/inventory.css` containment, scroll, spacing, chips, action modes,
   and bottom-statistics styling; preserve shared responsive defaults elsewhere.
3. Regression-check filter and row-selection selectors in shared JavaScript;
   avoid JS edits because this static artifact has no real query update.

## Success Criteria

- [x] Wide data is contained by the main panel's internal table-scroll owner.
- [x] All five comments are represented in scoped desktop, tablet, and mobile source.
- [x] Source preserves one labelled Add control, explicit 48 × 48px tablet/mobile
  sizing, pressed-state styling, and readable filled count bubbles.

## Completion Evidence

- Desktop source renders `+ Add`; tablet/mobile retain the same accessible
  button and show an icon-only `+` in an explicit 48 × 48px box.
- Count bubbles, internal table overflow, tablet filter wrapping, result-footer
  placement, and Inventory context spacing are implemented without route/data
  changes.
- Independent tester and reviewer source/static checks passed. Browser visual
  and interaction proof remains outside this phase's completed static evidence.

## Risk Assessment

Avoid `overflow:hidden` on the scroll owner, duplicate Add buttons, hidden count
semantics, or a global mobile page-action override affecting other screens.
