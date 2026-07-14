---
title: "v0.3.2 Inventory Data Surface Refinement"
description: "Resolve five Inventory browser comments without changing data or routing behavior."
status: completed
priority: P1
branch: "main"
tags: [refactor, frontend, responsive, accessibility]
blockedBy: []
blocks: []
created: "2026-07-14T10:46:41.100Z"
createdBy: "ck:plan"
source: skill
---

# v0.3.2 Inventory Data Surface Refinement

## Overview

Refine only the v0.3 Inventory review surface: contain wide table content beside
the selected-unit rail, clarify filter counts and Add behavior, improve header
rhythm, and relocate query statistics below the active result surface.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Refine Inventory Data Surface](./phase-01-refine-inventory-data-surface.md) | Completed |
| 2 | [Validate Responsive Inventory Evidence](./phase-02-validate-responsive-inventory-evidence.md) | Completed |

## Dependencies

- Accepted Precision spacing/accessibility rules and AG Grid decision 0009.
- Existing v0.3 desktop/tablet grid plus mobile-card split remains authoritative.
- No blocker on Dashboard-only v0.3.1 plans; append evidence without replacing
  their pending visual-review notes.

## Files

- Modify `design/v0.3-responsive-screens/screens/inventory.html`.
- Modify `design/v0.3-responsive-screens/styles/inventory.css`.
- Modify `design/v0.3-responsive-screens/validation.md` after proof.
- Modify `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`
  after proof; keep story `in_progress` and design-evidence boundary explicit.
- Inspect-only regression surfaces: shared tablet/mobile CSS and
  `scripts/responsive-screen-controls.js`; change only if the scoped Inventory
  selectors cannot satisfy the contract.

## Responsive Contract

- Desktop: visible text is `+ Add`; grid scrolls inside its own main-panel
  wrapper when constrained; 276px detail rail never overlaps or shifts off-canvas.
- Tablet: Add becomes a 48px icon-only `+`; reduced columns and 244px rail remain;
  only the table wrapper may scroll horizontally.
- Mobile: expose a scoped 48px icon-only Add despite the shared page-action hide;
  keep cards instead of the table and place statistics beneath the cards.
- All modes: button accessible name is `Add inventory unit`; filter labels never
  wrap; numeric counts use separate filled circular spans and remain announced.

## Acceptance and Proof

- Add 8px breadcrumb-to-header spacing using the approved spacing scale.
- Move `12 results` out of `.filter-bar` into one semantic statistics line after
  table/card markup, structured for later query-time/page metadata; do not add
  fake live behavior.
- Verify main-panel/right-rail bounds do not intersect; wrapper `scrollWidth` may
  exceed `clientWidth`, while page/device/screen widths must not.
- Browser-check desktop, tablet 1024x744, mobile 390x740, narrow-desktop stress,
  keyboard/focus, long chip labels, 200% zoom/reflow, and 44/48px targets.
- Run local-reference checks, `node --check` on shared JS, CSS brace balance,
  `npm run lint`, `npm run build`, and `git diff --check`; record observed proof only.

## Completion Evidence

- Source confirms desktop `+ Add` plus one accessible Add button, with explicit
  48 × 48px icon-only treatment on tablet/mobile.
- Source confirms filled filter-count bubbles, internal table overflow,
  tablet filter wrapping, the post-result footer, and 8px context spacing.
- `npm run lint` and `npm run build` passed; independent tester and reviewer
  source/static checks passed.
- The in-app `file://` reload remained blocked. Plan implementation and bounded
  static-evidence work are complete, but no refreshed visual, interaction,
  runtime accessibility, or production proof is claimed.

## Unresolved Questions

None.
