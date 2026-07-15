# US-001 Intelligent Inventory Dashboard Foundation

## Status

implemented

## Lane

normal

## Product Contract

Deliver the submission-only dashboard described in
`docs/product/inventory-dashboard.md`: browse and filter inventory, identify
vehicles held longer than 90 days, and persist manager actions with activity
history through an MSW API boundary.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0008-submission-solution-architecture.md`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`
- `docs/decisions/0010-supply-inventory-mvp-scope.md`
- `design/v0.5-design-handoff/`

## Acceptance Criteria

- [x] Components access persisted data only through feature hooks, Axios, MSW
  handlers, and the Local Storage repository.
- [x] Inventory filters and pagination return API-shaped data with loading,
  empty, error, and retry states.
- [x] Inventory Units reference reusable Vehicle Masters; Unit-specific state
  is not duplicated into master data.
- [x] Primary navigation contains only Overview, Inventory, and Activity;
  Inventory Unit remains contextual.
- [x] Locations, Zone/Slot workflows, backend, auth, SSE, Enterprise features,
  and multi-user synchronization remain outside the story.
- [x] Vehicles over 90 days are visibly aging; exactly 90 days are not.
- [x] Recording an aging-vehicle action atomically persists the Unit action and
  one Activity entry, then refreshes all affected query families.
- [x] Mock requests carry correlation IDs and emit payload-safe telemetry.
- [x] Desktop/tablet AG Grid and mobile cards expose equivalent inventory
  meaning without document horizontal overflow.
- [x] The manager flow is covered across desktop, tablet, and mobile Chromium.

## Implementation Summary

- Routes: `/`, `/inventory`, `/inventory/$unitId`, and `/activity`.
- Queries: Overview, filtered Inventory, Unit detail, and global Activity.
- Command: record one proposed action for an aging Inventory Unit.
- Persistence: versioned `keyloop.inventory-state.v1` Local Storage envelope.
- Aging rule: derived UTC calendar age with strict `daysInStock > 90`.
- Responsive data: AG Grid Community on desktop/tablet and shared DTO cards on
  mobile.
- Cache behavior: successful actions invalidate Overview, Inventory, the exact
  Unit, and Activity keys; failed actions preserve cache and form context.

The accepted Precision design direction and versioned prototypes remain design
evidence under `design/`. They inform the production implementation but are not
counted as production runtime proof.

## Validation

| Layer | Result | Evidence |
| --- | --- | --- |
| Unit/integration/component | PASS | `npm run test`: 16 files, 58/58 tests |
| E2E | PASS | `npm run test:e2e`: 24 passed, 3 intentional viewport-specific skips |
| Accessibility | PASS | Playwright axe coverage reports zero automated violations on the tested route/viewport matrix |
| Lint | PASS | `npm run lint`: exit 0 |
| Production build | PASS | `npm run build`: TypeScript and Vite completed; advisory large-chunk warning only |
| Dependency audit | PASS | `npm audit --audit-level=low`: 0 vulnerabilities |
| Review | PASS | Reviewer Stage 1 spec compliance and Stage 2 quality/security/reliability |
| Platform | Not applicable | Browser-only submission; durable platform flag remains `0` |
| Release | Not claimed | Hosting and production deployment are outside scope |

Final verification was rerun on 2026-07-15. `git diff --check` also passed.

## Evidence Links

- `plans/reports/tester-2026-07-15-mvp-verification.md`
- `plans/reports/reviewer-2026-07-15-mvp-final.md`
- `tests/e2e/inventory-manager-journey.spec.ts`
- `tests/e2e/responsive-accessibility.spec.ts`
- `src/domain/aging-stock.test.ts`
- `src/mocks/handlers.test.ts`
- `src/mocks/persistence/local-storage-inventory-repository.test.ts`
- `src/features/inventory/inventory-queries.test.tsx`

## Known Non-Blocking Issue

Vite reports a large-chunk advisory for the lazy-loaded AG Grid dependency.
The build succeeds, and the grid is excluded from the mobile render path. Load
performance should be measured before changing the chunk strategy.

## Harness Delta

No Harness operating rule changed. US-001 records browser-only proof; platform
and production deployment proof remain explicitly unclaimed.

## Unresolved Questions

None.
