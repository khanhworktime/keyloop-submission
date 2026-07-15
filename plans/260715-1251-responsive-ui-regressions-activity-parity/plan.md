---
title: "Responsive UI Regressions and Activity Parity"
description: "Repair five shell/data/feedback regressions and restore Activity parity with the canonical responsive design."
status: completed
priority: P1
effort: "2d"
branch: "main"
tags: [bugfix, frontend, accessibility]
blockedBy: []
blocks: []
created: "2026-07-15T05:52:06.021Z"
createdBy: "ck:plan"
source: skill
---

# Responsive UI Regressions and Activity Parity

## Overview

Repair the compact-rail brand, dark-navigation hover contrast, Inventory AG Grid
selection/action treatment, wide-desktop shell alignment, and action-saved toast.
Redesign `/activity` against the canonical v0.3 desktop/tablet/mobile sources
without changing routes, query contracts, persistence, or the manager journey.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Restore Responsive Visual Parity](./phase-01-restore-responsive-visual-parity.md) | Completed |

## Dependencies

- Canonical hub: `design/final/index.html`.
- Activity authority: `design/v0.3-responsive-screens/screens/activity.html` and
  `design/v0.3-responsive-screens/previews/activity/{desktop,tablet,mobile}.png`.
- Tokens/components: v0.1 Precision guideline, v0.2 AG Grid, v0.2.3 feedback.
- Product boundary: `docs/stories/US-003-production-ui-visual-parity.md` and
  `design/v0.5-design-handoff/scope.md`; obsolete Locations/Master nav stays excluded.
- No cross-plan blocker; prior production-parity plan is complete.

## Definition of Done

- [x] Five reported regressions pass measurable responsive/accessibility checks.
- [x] Activity matches approved hierarchy/density at 1920×1080, 1024×900, and 390×844.
- [x] URL filters, selection/detail sync, action persistence, and announcements remain intact.
- [x] Lint, focused Vitest, build, Playwright responsive/E2E, and axe checks pass.

## Evidence

- [Tester report](../reports/tester-2026-07-15-responsive-ui-activity-parity.md):
  lint passed; Vitest 58/58; build passed with a non-blocking chunk warning;
  Playwright 30 passed with 9 intentional skips.
- [Clean code-review report](../reports/code-reviewer-2026-07-15-responsive-ui-activity-parity.md):
  prior findings resolved and no residual implementation concern.
- Manual desktop, tablet, and mobile review accepted responsive Activity parity.
- React Doctor reported only the pre-existing Iconsax supply-chain concern.

## Unresolved Questions

None.
