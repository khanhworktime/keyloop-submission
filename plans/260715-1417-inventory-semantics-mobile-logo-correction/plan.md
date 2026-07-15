---
title: "Inventory Semantics and Mobile Logo Correction"
description: "Separate derived aging from lifecycle status on every inventory surface and replace the phone-header JPEG with the supplied transparent slate wordmark."
status: completed
priority: P1
effort: "4h"
branch: "main"
tags: [bugfix, frontend]
blockedBy: []
blocks: []
created: "2026-07-15T07:17:08.097Z"
createdBy: "ck:plan"
source: skill
---

# Inventory Semantics and Mobile Logo Correction

## Overview

Correct two accepted presentation defects without changing domain or API behavior:
show `daysInStock`/`isAging` only as inventory-age meaning, always show
`inventoryStatus` as lifecycle meaning, and use the supplied transparent slate
Keyloop PNG in the phone header. Preserve strict `daysInStock > 90`, routes,
persistence, filters, and the tablet compact-rail logo.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Correct Inventory Semantics and Mobile Logo](./phase-01-correct-inventory-semantics-and-mobile-logo.md) | Completed |

## Dependencies

- Source diagnosis: `plans/reports/debugger-2026-07-15-inventory-status-semantics.md`.
- Accepted contract: `docs/product/inventory-dashboard.md`, `docs/ARCHITECTURE.md`, and `docs/stories/US-004-responsive-ui-correction-and-activity-parity.md`.
- Supplied asset: `/var/folders/lg/yzbmlf817vsgq26s2nwggflh0000gn/T/codex-clipboard-hg7aE7.png` (3840×2160 RGBA).
- No cross-plan blocker; this is a bounded follow-up to implemented US-004.

## Success Criteria

- [x] Desktop/tablet grid and selected rail, mobile cards, and Unit detail expose age and lifecycle as separate labelled facts.
- [x] Aging/reserved `STK-1886` shows `96 days · Aging` and `Reserved`; exactly 90 days remains non-aging.
- [x] Mobile header shows the transparent slate wordmark at readable fit with no dark square, crop, distortion, or layout overflow.
- [x] Focused tests plus `npm run lint`, `npm run test`, `npm run build`, and `npm run test:e2e` pass.

## Evidence

- [Final tester report](../reports/tester-2026-07-15-inventory-semantics-mobile-brand.md):
  90 passed, 0 failed, 11 intentional skips; lint and production build passed.
- [Clean code-review report](../reports/code-reviewer-2026-07-15-inventory-semantics-mobile-brand.md):
  no remaining correctness, accessibility, semantic, responsive, scope, or
  test-quality finding.
- [Desktop screenshot](./desktop-inventory.png) at 1440×1000 and
  [mobile screenshot](./mobile-inventory.png) at 390×844 passed visual review.
- React Doctor retained only the pre-existing Iconsax supply-chain concern.
  Vite's large-chunk warning and Playwright's color-output notice are
  non-blocking; details are recorded in the tester report and US-005 story.

## Unresolved Questions

None.
