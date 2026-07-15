---
title: "Activity inventory unit combobox redesign"
description: "Redesign Activity inventory-unit options into compact, image-ready rows while preserving Base UI combobox semantics."
status: completed
priority: P1
branch: "main"
tags: [refactor, frontend, accessibility]
blockedBy: []
blocks: []
created: "2026-07-15T09:25:15.950Z"
createdBy: "ck:plan"
source: skill
---

# Activity Inventory Unit Combobox Redesign

## Overview

Adopt the official Base UI multiple Combobox composition, including selection
chips, visually icon-only controls, fixed 40px option fallbacks, compact identity
hierarchy, and real multi-unit Activity filtering.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Redesign inventory unit combobox](./phase-01-redesign-inventory-unit-combobox.md) | Completed |

## Dependencies

- Existing `ActivityFacets['units']` identity fields and Base UI Combobox.
- Supplied inventory-unit option reference is manual visual truth.

## Scope Boundary

- Update the selector plus Activity URL/API/filter consumers for `units: string[]`.
- Preserve legacy singular `unit` parsing; no image field or E2E run.

## Success Criteria

- Options remain searchable by stock, model label, and VIN.
- Rows remain compact and single-line-safe with stable avatar/indicator columns.
- Focused tests and TypeScript pass; desktop/mobile appearance manually approved.

## Interaction Amendment

- Keep selected chips in a separate region below the selector input.
- Desktop selection updates a local draft; only `Apply filter` updates URL/query state.
- The advanced-filter drawer continues using its existing form-level Apply action.
