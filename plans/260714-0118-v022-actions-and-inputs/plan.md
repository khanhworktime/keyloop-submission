---
title: "v0.2.2 Actions and Inputs Showcase"
description: "Create the first responsive component-family board while preserving the approved v0.2.1 artifacts."
status: complete
priority: P1
effort: 1d
branch: ""
tags: [feature, frontend, design]
blockedBy: []
blocks: []
created: 2026-07-14
---

# v0.2.2 Actions and Inputs Showcase

## Overview

Create `design/v0.2.2-component-families/` as a new Huashu HTML milestone.
Keep `design/v0.2-component-language/` unchanged. Publish only the Actions &
Inputs board; list later component-family boards as pending.

## Locked Contract

- English UI; Precision v0.1-d tokens, hierarchy, geometry, and WCAG 2.2 AA.
- Iconsax Rounded Linear, `currentColor`, accessible names/tooltips for icon-only actions.
- Desktop comparison, tablet touch action, mobile task-focused reduction.
- Minimum target 44px; frequent tablet controls 48px.
- Native HTML controls first; JavaScript only for demonstrable interaction/state.

## Phases

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1 | [Lock v0.2.2 contract and folder boundary](./phase-01-lock-v022-contract-and-version-boundary.md) | Complete |
| 2 | [Build Actions & Inputs semantic board](./phase-02-build-actions-and-inputs-semantic-board.md) | Complete |
| 3 | [Implement responsive interaction and states](./phase-03-implement-responsive-interaction-and-states.md) | Complete |
| 4 | [Publish previews, validation, and version evidence](./phase-04-publish-previews-validation-and-version-evidence.md) | Complete |

## Dependencies

`Phase 1 → Phase 2 → Phase 3 → Phase 4`

## Success Criteria

- New version folder works without modifying or overwriting v0.2.1.
- Required action/input variants and meaningful states are visible and operable.
- Keyboard, focus, labels, errors, pressed/checked state, and loading announcements work.
- Desktop/tablet/mobile previews show deliberate reduction without horizontal overflow.
- Validation evidence is reproducible; later boards remain explicitly pending.

## Scope Boundary

No production React components, API behavior, persistence, overlays, data-grid changes,
or later component-family boards in this iteration.
