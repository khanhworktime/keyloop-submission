---
title: "Reusable select component parity"
description: "Replace six native or locally composed selects with one accessible Base UI select matching the supplied Inventory and Proposed action references."
status: completed
priority: P1
branch: "main"
tags: [refactor, frontend, accessibility]
blockedBy: []
blocks: []
created: "2026-07-15T08:49:09.696Z"
createdBy: "ck:plan"
source: skill
---

# Reusable Select Component Parity

## Overview

Create one shared `SelectField` primitive, then migrate Inventory Make/Model,
Inventory page size, Activity event type/actor, and Proposed action. Preserve
each consumer's value conversion and URL/form behavior. Keep automated proof to
focused unit tests; use a manual desktop/tablet/mobile visual checklist.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Build reusable select and migrate consumers](./phase-01-build-reusable-select-and-migrate-consumers.md) | Completed |

## Dependencies

- Base UI Select 1.6.0 and existing Precision tokens already in the project.
- Supplied Inventory filter and Proposed action screenshots are visual truth.

## Scope Boundary

- No domain, query, route, API, persistence, or filter-state contract changes.
- No second select variant and no consumer-owned popup/option styling.
- Existing E2E behavior is preserved; visual parity is checked manually.

## Success Criteria

- [x] No native `<select>` or feature-local Base UI Select composition remains.
- [x] All six controls share accessible behavior and reference-aligned styling.
- [x] Focused select/consumer unit tests pass; manual checklist covers responsive
  placement, open/selected/focus states, and drawer layering.

## Evidence

- [Focused tester report](../reports/tester-2026-07-15-select-component-parity.md):
  5/5 Vitest files and 8/8 tests passed; TypeScript passed. Playwright and full
  release validation were intentionally omitted under the agreed fast UI
  workflow.
- [Code-review report](../reports/code-reviewer-2026-07-15-select-component-parity.md):
  source behavior is sound and all six consumers share the component.
- User approved desktop/mobile visual parity, keyboard/focus behavior, popup
  placement, and drawer layering on 2026-07-15.

## Unresolved Questions

None.
