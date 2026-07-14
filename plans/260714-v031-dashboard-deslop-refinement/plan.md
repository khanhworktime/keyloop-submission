---
title: "v0.3.1 Dashboard De-Slop Refinement"
description: "Resolve six dashboard browser comments without changing product behavior."
status: implemented_visual_review_pending
priority: P1
branch: "main"
tags: [refactor, frontend, design, responsive]
blockedBy: []
blocks: []
created: "2026-07-14T09:56:27.427Z"
createdBy: "ck:plan"
source: skill
---

# v0.3.1 Dashboard De-Slop Refinement

## Overview

Refine only the existing v0.3 Dashboard. Remove ornamental UI, establish one
important aging-inventory action, improve geometry and row identity, and retain
desktop/tablet/mobile plus Keyloop/Precision contracts.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Lock Dashboard Refinement Contract](./phase-01-lock-dashboard-refinement-contract.md) | Completed |
| 2 | [Refine Dashboard Hierarchy and Geometry](./phase-02-refine-dashboard-hierarchy-and-geometry.md) | Completed |
| 3 | [Validate Responsive Dashboard and Evidence](./phase-03-validate-responsive-dashboard-and-evidence.md) | Implemented; visual review pending |

## Dependencies

- Existing `design/v0.3-responsive-screens/` version boundary.
- Precision spacing/radii, 44px targets, English UI, Iconsax, reduced motion.
- Apple-informed hierarchy, consistent geometry, control spacing, and 44pt
  touch guidance; no iOS imitation or new token system.

## Scope

- Remove page-head eyebrow and duplicate floating CTA.
- Improve title, intro, and section vertical rhythm.
- Keep one Ready-teal aging-data action; teal does not mean success.
- Prevent underlines on button-like anchors in every interaction state.
- Add a stable vehicle thumbnail/avatar slot to priority queue rows.
- Assess app-bar account avatar; add only with meaningful account context.
- No route, workflow, data, component-source, or product-scope change.

## Target Files

- `design/v0.3-responsive-screens/screens/dashboard.html`
- `design/v0.3-responsive-screens/styles/dashboard.css`
- `design/v0.3-responsive-screens/styles/application-shell.css`
- `design/v0.3-responsive-screens/styles/screen-foundation.css`
- `design/v0.3-responsive-screens/styles/responsive-tablet.css`
- `design/v0.3-responsive-screens/styles/responsive-mobile.css`
- Validation and US-001 evidence after proof.

Note: requested `styles/responsive-contract.css` does not exist; responsive
ownership is split between the tablet and mobile files above.

## Validation Gate

Refresh Dashboard desktop/tablet/mobile and gallery previews. Verify overflow,
44/48px targets, focus, all anchor-button states, queue alignment, long copy,
200% zoom/reflow, and Inventory/Unit/Activity regressions. Run reference,
JavaScript, CSS, lint, production-bundle, and diff checks; record independent review.

Static assertions, lint and build, and independent source-only tester/reviewer
checks pass. The in-app `file://` reload, refreshed previews, browser behavior,
accessibility, runtime, and independent visual review remain pending.
