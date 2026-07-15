---
title: "Activity header typography parity"
description: "Make the Activity eyebrow, title, and subtitle use the exact responsive type recipe already shared by Overview and Inventory."
status: completed
priority: P2
branch: "main"
tags: [bugfix, frontend]
blockedBy: []
blocks: []
created: "2026-07-15T08:26:04.468Z"
createdBy: "ck:plan"
source: skill
---

# Activity Header Typography Parity

## Overview

Align only the `/activity` page header with the established Overview/Inventory
typography. Reuse their exact utility classes, remove redundant Activity-only
header CSS, and preserve the current Activity wrapper, cards, filters, feed,
responsive layout, semantics, and behavior.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Align Activity header typography and validate](./phase-01-align-activity-header-typography-and-validate.md) | Completed |

## Dependencies

- Story: `docs/stories/US-007-activity-header-typography-parity.md`.
- Canonical recipe: `OverviewPage` and `InventoryPage` header markup.

## Success Criteria

- [x] Activity uses the shared 12px eyebrow, 26px/30px title, and 12px/13px
  subtitle recipe at the same margins, line heights, weight, and tracking.
- [x] Only `activity-page.tsx` and redundant header rules in `src/styles.css`
  change; existing Activity layout and validation stay green.
