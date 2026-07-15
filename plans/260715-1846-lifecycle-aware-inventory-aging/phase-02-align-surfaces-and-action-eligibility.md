---
phase: 2
title: "Align surfaces and action eligibility"
status: complete
effort: "2h"
---

# Phase 2: Align Surfaces and Action Eligibility

## Overview

Let every surface consume the corrected derived `isAging` while keeping lifecycle and age legible.

## Implementation Steps

1. Verify repository-derived Overview totals/priority queue and Inventory
   `aging`/`not-aging` facets and filters automatically use the centralized flag.
2. In `inventory-unit-summary.tsx`, keep `{daysInStock} days`; show `Aging` only
   when eligible. For reserved/sold units use formatted lifecycle status rather
   than the misleading non-aging label `Current`.
3. In `inventory-unit-page.tsx`, keep the action drawer absent for any non-aging
   unit. Use lifecycle-aware decision copy for reserved/sold rather than saying
   an action becomes available merely after 90 days.
4. Verify Inventory grid, mobile cards, selected-unit panel, and Overview queue
   apply attention styling only from `isAging`; old reserved/sold units retain
   normal styling and remain sortable by their numeric age.
5. Confirm a successful lifecycle edit invalidates/refetches existing query
   families so available → reserved immediately removes the aging signal.

## Success Criteria

- [x] Old reserved/sold Units show age plus lifecycle status, never “Aging”.
- [x] They have no attention border/badge and do not appear in the aging queue/filter.
- [x] Manager-action controls remain available only to eligible available Units.
- [x] Lifecycle and aging are still separate facts; age remains visible everywhere required.

## Accessibility

Visible text, accessible names, and status semantics must agree; do not rely on color alone.
