# US-012 Lifecycle-aware Inventory Aging

## Status

in_progress

## Lane

normal

## Product Contract

Inventory age remains the elapsed number of calendar days since arrival, but an
aging signal exists only when the Unit is `available` and older than 90 days.
Reserved and sold Units remain visible and sortable by age without contributing
to aging totals, filters, priority queues, attention styling, or aging-only actions.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0011-lifecycle-aware-aging-eligibility.md`

## Acceptance Criteria

- An available Unit is aging only when `daysInStock > 90`; exactly 90 is not aging.
- Reserved and sold Units are never aging regardless of their elapsed age.
- Overview, Inventory facets/filters, and Unit detail consume one derived rule.
- Reserved and sold Units show their age and lifecycle status without Aging copy or attention styling.
- Aging-only proposed actions are rejected for reserved and sold Units without a write.

## Design Notes

- Domain rules: `inventoryStatus === 'available' && daysInStock > 90`.
- API: no response-shape change; `isAging` remains derived.
- Persistence: no schema change; action eligibility reuses the derived predicate.
- UI surfaces: Overview, Inventory list/selection, and Inventory Unit detail.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Status-by-threshold domain table and lifecycle-aware component rendering. |
| Integration | Repository counts, filters, detail derivation, and action rejection. |
| E2E | User-owned manual review; no automated browser claim. |
| Platform | Not required. |
| Release | Focused Vitest and `npx tsc -b --pretty false`. |

## Harness Delta

Normal behavior change, intake #55. Product contract and architecture are updated
because the accepted definition of aging now includes lifecycle eligibility.

## Evidence

- Implementation plan: `plans/260715-1846-lifecycle-aware-inventory-aging/plan.md`
- Focused Vitest: 8 files and 42 tests passed across domain, repository, handlers,
  Inventory Unit detail, Inventory filters, Overview, mobile cards, and selected-unit presentation.
- TypeScript: `npx tsc -b --pretty false` passed with no diagnostics.
- Code review: clean; no actionable correctness or regression findings.
- Manual available/reserved/sold review remains assigned to the user.
