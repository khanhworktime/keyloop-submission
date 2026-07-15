---
title: "Intelligent Inventory Dashboard MVP"
description: "Implement the approved Supply Inventory loop through typed browser persistence, MSW contracts, TanStack Query, responsive React routes, and executable proof."
status: completed
priority: P1
effort: "9d"
branch: "main"
tags: [feature, frontend, api, critical]
blockedBy: []
blocks: []
created: "2026-07-15"
createdBy: "ck:plan"
source: skill
---

# Intelligent Inventory Dashboard MVP

## Overview

Implement `Overview -> Inventory -> Inventory Unit action -> Activity` on the
existing Vite/React foundation. React routes consume Axios/TanStack Query;
MSW owns a typed repository and one versioned Local Storage envelope.

## Scope

- Routes: `/`, `/inventory`, `/inventory/$unitId`, `/activity`.
- Aging: derived `daysInStock > 90`; exactly 90 is not aging.
- Save: latest Unit action plus one Activity event in one repository commit.
- Vehicle Master: normalized supporting data only.
- Out: Zone/Slot, backend, auth/RBAC, SSE, Enterprise features, multi-user sync.

## Architecture

`route -> query hook -> Axios -> MSW -> repository -> Local Storage`.
UI never imports persistence. Successful mutation invalidates Overview,
Inventory, Unit, and Activity query keys.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Lock Dependencies and Test Tooling](./phase-01-lock-dependencies-and-test-tooling.md) | Completed |
| 2 | [Define Domain Seed and Persistence Repository](./phase-02-define-domain-seed-and-persistence-repository.md) | Completed |
| 3 | [Implement MSW API Contracts and Telemetry](./phase-03-implement-msw-api-contracts-and-telemetry.md) | Completed |
| 4 | [Add TanStack Query Feature Hooks](./phase-04-add-tanstack-query-feature-hooks.md) | Completed |
| 5 | [Build Application Shell and Routes](./phase-05-build-application-shell-and-routes.md) | Completed |
| 6 | [Implement Overview Dashboard](./phase-06-implement-overview-dashboard.md) | Completed |
| 7 | [Implement Responsive Inventory Data Surface](./phase-07-implement-responsive-inventory-data-surface.md) | Completed |
| 8 | [Implement Inventory Unit Action Persistence](./phase-08-implement-inventory-unit-action-persistence.md) | Completed |
| 9 | [Implement Global Activity Advanced Filtering](./phase-09-implement-global-activity-advanced-filtering.md) | Completed |
| 10 | [Validate Tests Accessibility and Build](./phase-10-validate-tests-accessibility-and-build.md) | Completed |
| 11 | [Finalize Story Documentation and Trace](./phase-11-finalize-story-documentation-and-trace.md) | Completed |

## Dependencies

- Cross-plan: none. Prior design plans are evidence, not blockers.
- Existing: React, Vite, TanStack Router/Query, Axios, MSW, Iconsax.
- Add: matching AG Grid Community packages, Base UI dialog primitive, Vitest,
  Testing Library, Playwright, and axe browser checks.

## Success Criteria

- Four routes expose accessible loading, empty, error, and recovery paths.
- Desktop/tablet grid and mobile cards share API/filter/page semantics.
- Refresh preserves an action and exactly one corresponding Activity event.
- Unit, integration, browser, accessibility, lint, and bundle checks pass.
- US-001 proof and Harness trace reflect only observed evidence.

## Completion Status

- Product implementation: complete.
- Quality gates: lint, 58/58 Vitest, production build, 24 Playwright with 3
  intentional viewport-specific skips, audit, and reviewer Stages 1/2 pass.
- Plan sync: all 11 phases complete; US-001 is implemented and Trace 37 meets
  the required Standard tier.
- Known non-blocking issue: Vite large-chunk advisory for lazy-loaded AG Grid.
- Deployment and platform proof remain outside scope.
