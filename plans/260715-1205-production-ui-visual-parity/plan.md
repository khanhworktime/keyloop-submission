---
title: "Production UI Visual Parity"
description: "Align the React manager journey with the approved Precision handoff without changing product behavior."
status: complete
priority: P1
effort: "2d"
branch: "main"
tags: [refactor, frontend]
blockedBy: []
blocks: []
created: "2026-07-15T05:05:41.067Z"
createdBy: "ck:plan"
source: skill
---

# Production UI Visual Parity

## Overview

Bring `/`, `/inventory`, `/inventory/$unitId`, and `/activity` into visual parity
with the v0.5-scoped v0.3 handoff. Start with shell/surface hierarchy, then
refine route composition. Preserve queries, persistence, routes, accessibility,
strict aging behavior, and the Overview → Inventory → Unit → Activity flow.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Lock Visual Parity Baseline](./phase-01-lock-visual-parity-baseline.md) | Complete |
| 2 | [Align Production Surfaces](./phase-02-align-production-surfaces.md) | Complete |
| 3 | [Validate Responsive Parity](./phase-03-validate-responsive-parity.md) | Complete |

## Dependencies

- Product boundary: `docs/stories/US-003-production-ui-visual-parity.md` and `design/v0.5-design-handoff/scope.md`.
- Visual source: `design/v0.3-responsive-screens/` plus `design/v0.1-d-precision-guideline/`.
- No cross-plan blocker. Older Locations/Master Data prototype content stays out of production.

## Definition of Done

- [x] Shell, hierarchy, density, and responsive adaptations match the approved source closely.
- [x] Twelve route/viewport comparisons reviewed: four routes × desktop/tablet/mobile.
- [x] Final `npm run validate` passed: lint, 58/58 Vitest tests, production build,
  and 25 Playwright tests; 5 skips were intentional and the build chunk warning
  was non-blocking.

## Evidence

- Authoritative design audit and tester reports accepted the implementation.
- Responsive proof includes a sticky-sidebar assertion and the mobile asset
  `public/keyloop-mobile-logo.jpeg`.

## Unresolved Questions

None.
