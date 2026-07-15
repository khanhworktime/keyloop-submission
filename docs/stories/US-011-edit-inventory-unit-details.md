# US-011 Edit Inventory Unit Details

## Status

planned

## Lane

normal

## Product Contract

A manager can edit one Inventory Unit's VIN, Stock No., lifecycle status, and
optional free-text Zone/Slot from its detail summary. Saves traverse the current
typed Axios → MSW → Local Storage boundary. Real changes are persisted atomically
with one `unit-updated` Activity; no-op saves create no Activity.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0010-supply-inventory-mvp-scope.md`

## Acceptance Criteria

- Edit is inside the Unit summary and opens an accessible right drawer on desktop
  or bottom sheet on mobile.
- VIN and Stock No. are trimmed, required, bounded, and unique across other units;
  status is `available`, `reserved`, or `sold`; Zone/Slot is optional bounded text.
- Valid edits persist through PATCH and update the detail after query invalidation.
- A real change produces exactly one atomic `unit-updated` Activity by `Manager`
  whose detail lists changed fields; a no-op performs no write and creates no Activity.
- Overview, Inventory, exact Unit, and Activity query families invalidate on success.
- Arrival date is not editable; lifecycle status and age remain separate, and
  aging requires `available` status plus `daysInStock > 90`.
- Zone/Slot remains a plain Inventory Unit attribute only—no location, capacity,
  assignment, occupancy, or movement model is introduced.

## Design Notes

- Commands: `UpdateInventoryUnitCommand` with normalized editable fields and actor.
- Queries: existing detail query plus one update mutation and four-family invalidation.
- API: `PATCH /api/inventory/:unitId` with typed success and field/conflict errors.
- Tables: backward-compatible optional `zoneSlot` in `PersistedInventoryStateV1`.
- Domain rules: case-insensitive unique VIN/stock; no-op diff; one atomic update event.
- UI surfaces: `/inventory/$unitId` summary and responsive Base UI edit drawer/sheet.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Normalization, bounds, enum, uniqueness, diff/no-op, Activity detail, aging separation. |
| Integration | PATCH parser/handler/repository persistence and query invalidation tests. |
| E2E | User-owned manual desktop/mobile browser review; no automated E2E claim. |
| Platform | Not required. |
| Release | Focused Vitest and `npx tsc -b --pretty false`. |

## Harness Delta

Normal change request, intake #53. Update the accepted product/architecture
boundary for one optional free-text placement attribute while keeping the full
location module deferred.

## Evidence

- Implementation plan: `plans/260715-1808-edit-inventory-unit-details/plan.md`
- Initial user manual check confirmed the edit fields persist correctly.
- Responsive direction corrected to desktop right drawer and mobile bottom sheet;
  final manual direction check remains pending.
- Focused Vitest: 8/8 files and 39/39 tests passed across persistence,
  PATCH/query integration, responsive sheet behavior, Unit page, and Activity.
- TypeScript: `npx tsc -b --pretty false` passed with no diagnostics.
- Code review: clean; no P0–P2 findings.
