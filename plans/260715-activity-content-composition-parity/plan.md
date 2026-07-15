---
title: "Activity content composition parity"
description: "Align the existing React Activity route with the supplied compact desktop reference without changing its URL, domain, API, or responsive contracts."
status: completed
priority: P1
branch: "main"
tags: [bugfix, frontend, responsive]
blockedBy: []
blocks: []
created: "2026-07-15T08:00:58.685Z"
createdBy: "ck:plan"
source: skill
---

# Activity Content Composition Parity

## Overview

Correct only the Activity presentation layer. Desktop changes from the oversized
"Decisions stay visible." framing and tall two-input rail to the reference's
compact `Activity` / `Operational activity` hierarchy, one unit-search rail,
and dense event feed. Tablet and mobile retain their deliberate existing
compositions and controls.

## Scope Boundary

- Preserve `ActivityUrlFilters`, TanStack Router search canonicalization, query
  request shape, pagination, activity-event semantics, persisted actions, and
  Inventory Unit links.
- Keep text search available through the existing advanced-filter drawer; do
  not add a second filter mechanism or new component abstraction.
- No route, API, domain, persistence, asset, or product-document change.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Align Activity composition and validate](./phase-01-align-activity-composition-and-validate.md) | Completed |

## Dependencies

- Story: `docs/stories/US-006-activity-content-composition-parity.md`.
- Reference: supplied `codex-clipboard-0e55b98e-8932-41aa-9657-43a9ea0cf753.png`.
- Design evidence: `design/v0.3-responsive-screens/screens/activity.html` and
  `design/v0.3-responsive-screens/styles/activity.css`.

## Success Criteria

- [x] Desktop matches the reference hierarchy, adjacent rail/feed cards, and
  dense event treatment; the existing behavior remains executable at every
  viewport.
- [x] Targeted Vitest and Playwright proof pass, followed by `npm run validate`.

## Evidence

- [Investigation report](../reports/debugger-2026-07-15-activity-content-composition-parity.md)
  records the accepted compact composition and preserved behavior boundary.
- Final `npm run validate` passed: lint, 59 unit tests, production build, and
  31 active Playwright E2E tests passed; 11 skips were intentional
  viewport/project gates.
- Targeted Activity component/E2E checks and desktop 1440×1000/mobile 390×844
  visual checks passed. The pre-existing React Doctor Iconsax supply-chain
  warning remains out of scope for this dependency-neutral change.

## Unresolved Questions

None.
