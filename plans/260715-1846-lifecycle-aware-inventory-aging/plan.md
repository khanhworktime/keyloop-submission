---
title: "Lifecycle-aware inventory aging"
description: "Count and present only available units older than 90 days as aging."
status: in_progress
priority: P1
branch: "main"
tags: [domain, inventory, aging]
blockedBy: []
blocks: []
created: "2026-07-15T11:46:53.388Z"
createdBy: "ck:plan"
source: skill
---

# Lifecycle-aware Inventory Aging

## Overview

Keep `daysInStock` as elapsed calendar days, but redefine the aging signal as:

```text
inventoryStatus === available AND daysInStock > 90
```

Reserved and sold units retain their age for display/sorting but never count,
filter, style, or behave as aging. Centralize the rule so list joins, Overview,
detail UI, filters, and manager-action eligibility cannot diverge.

## Phases

| Phase | Name | Status |
| --- | --- | --- |
| 1 | [Centralize lifecycle-aware aging](./phase-01-centralize-lifecycle-aware-aging.md) | Complete |
| 2 | [Align surfaces and action eligibility](./phase-02-align-surfaces-and-action-eligibility.md) | Complete |
| 3 | [Validate and document](./phase-03-validate-and-document.md) | In progress — manual review pending |

## Scope Boundary

- No persisted schema/API response change; `isAging` remains derived.
- No change to arrival-date math, `daysInStock`, lifecycle transitions, or query keys.
- Automated proof: focused Vitest plus TypeScript; no browser automation required.

## Acceptance Criteria

- Available at 91+ days is aging; available at exactly 90 is not.
- Reserved/sold at any age are not aging and cannot record aging-only actions.
- Overview counts/queue and Inventory aging facets/filter include eligible available units only.
- UI keeps age visible but shows lifecycle status, not Aging/attention styling, for reserved/sold.
