# Inventory Status Semantics - Investigation Report

## Executive Summary

- **Issue:** Inventory list surfaces use `Status` for two different concepts: lifecycle (`available`/`reserved`/`sold`) and derived aging (`daysInStock > 90`).
- **Impact:** Desktop/tablet selected-unit rail hides the real lifecycle value for every aging unit. Example: aging reserved `STK-1886` renders `Aging stock`, not `Reserved`.
- **Root cause:** `InventorySelectedUnit` conditionally replaces `unit.inventoryStatus` with `isAging`; prototype list semantics were copied into one surface despite the typed domain exposing both fields separately.
- **Status:** Confirmed. No source implementation changed.
- **Smallest coherent fix:** Keep aging under `Inventory age`; always render lifecycle under `Inventory status`. Apply those labels consistently to table, cards, selected rail, and full Unit detail.

## Domain Truth

- Lifecycle is persisted Unit state: `InventoryStatus = 'available' | 'reserved' | 'sold'` and `InventoryUnit.inventoryStatus` (`src/domain/inventory-types.ts:7,19,37-45`).
- Aging is derived presentation/query state: `UnitListItem.daysInStock` plus `UnitListItem.isAging` (`src/domain/inventory-types.ts:94-99`).
- Strict rule: `isAgingStock(...)` returns `daysInStock(...) > 90`; exactly 90 is not aging (`src/domain/aging-stock.ts:7-18`). Query join preserves both independent values (`src/mocks/persistence/inventory-query-helpers.ts:15-21`).
- Seed proves the concepts can vary independently: `STK-1886` is `reserved` while aging; other aging units are `available`; later units include `sold` (`src/mocks/data/inventory-seed.ts:36-48`).

## Surface Comparison

| Surface | Current implementation | Prototype | Recommended contract |
| --- | --- | --- | --- |
| Desktop/tablet table | `Age` uses `daysInStock` + `isAging`; `Status` uses `unit.inventoryStatus`. Semantically correct values, ambiguous headers (`src/features/inventory/components/inventory-grid.tsx:62-68,128-144`). | `Age` contains only days while `Status` contains `Aging`, conflating derived aging with Unit state (`design/v0.3-responsive-screens/screens/inventory.html:20`). | `Inventory age`: `128 days · Aging`; `Inventory status`: `Available`/`Reserved`/`Sold`. |
| Mobile cards | Top badge uses age/aging; `Status` row uses lifecycle. Values already separated (`src/features/inventory/components/inventory-mobile-cards.tsx:31-43`). | Top badge shows days; metadata omits lifecycle status (`design/v0.3-responsive-screens/screens/inventory.html:21`). | Preserve values; rename metadata label to `Inventory status`. |
| Selected-unit rail | `Inventory age` shows days only. `Status` renders `Aging stock` for aging items, otherwise lifecycle (`src/features/inventory/components/inventory-selected-unit.tsx:37-54`). This is the defect. | Puts `Needs attention` in `Inventory age` and omits lifecycle status (`design/v0.3-responsive-screens/screens/inventory.html:22`). | `Inventory age`: days plus `Aging` when true; `Inventory status`: always formatted `unit.inventoryStatus`. |
| Full Unit detail | Hero badge shows age/aging; fact row shows lifecycle (`src/features/inventory-unit/inventory-unit-summary.tsx:28-30,47-50`). | Same conceptual split: `128 days · Aging` and separate `Status: Available` (`design/v0.3-responsive-screens/screens/inventory-unit.html:23`). | Keep behavior; rename fact label to `Inventory status` for cross-route alignment. |

The accepted product contract also distinguishes Unit-owned arrival/status/action from prominent derived aging (`docs/product/inventory-dashboard.md:51-56,68-74`). Architecture explicitly says `daysInStock`/`isAging` are derived, never stored (`docs/ARCHITECTURE.md:61-71`). Prototype is design evidence, not runtime contract (`docs/stories/US-001-intelligent-inventory-dashboard-foundation.md:59-61`); its list-level `Status: Aging` should not override the typed domain.

## Root Cause

Confirmed source-level trigger:

```tsx
{item.isAging ? 'Aging stock' : formatInventoryStatus(item.unit.inventoryStatus)}
```

At `src/features/inventory/components/inventory-selected-unit.tsx:46-48`, `isAging === true` prevents reading the lifecycle field. The API/query layer is not missing data; the same `UnitListItem` carries both values and the table/mobile components render both. This is a presentation branching bug, not a domain, persistence, API, or formatter bug.

## Affected Components and Tests

### Implementation

1. **Must fix:** `src/features/inventory/components/inventory-selected-unit.tsx` — move the aging label into `Inventory age`; always format `unit.inventoryStatus` under `Inventory status`.
2. **Label alignment only:** `src/features/inventory/components/inventory-grid.tsx` — `Age` → `Inventory age`, `Status` → `Inventory status`.
3. **Label alignment only:** `src/features/inventory/components/inventory-mobile-cards.tsx` — `Status` → `Inventory status`; values already correct.
4. **Cross-route label alignment:** `src/features/inventory-unit/inventory-unit-summary.tsx` — `Status` → `Inventory status`; values already correct.
5. **No change:** domain types, aging calculation, repository/query/API, and `formatInventoryStatus`.

### Regression proof

- `src/features/inventory/components/inventory-mobile-cards.test.tsx:23-49` already asserts both `128 days · Aging` and `Available`, but not their labels. Update it to assert `Inventory status`; use an aging `reserved` fixture to prove independence.
- No direct `InventorySelectedUnit` component test exists. Add `inventory-selected-unit.test.tsx` with an aging/reserved item and assert both `96 days · Aging` and `Reserved`; assert the lifecycle value is not replaced by `Aging stock`.
- `tests/e2e/inventory-manager-journey.spec.ts:80-94` verifies rail selection and links only. Extend it to select aging/reserved `STK-1886` and assert `Inventory age`, `Inventory status`, `96 days · Aging`, and `Reserved` within the rail.
- `tests/e2e/responsive-accessibility.spec.ts:9-30` verifies responsive surface presence/overflow only. No semantic change required there unless header-label visibility is intentionally made part of responsive proof.
- `src/features/inventory/components/inventory-formatters.test.ts:5-13` remains valid and needs no change.

## Verification

- `npx vitest run src/domain/aging-stock.test.ts src/features/inventory/components/inventory-mobile-cards.test.tsx src/features/inventory/components/inventory-formatters.test.ts` — 3 files, 8 tests passed.
- `npx playwright test tests/e2e/inventory-manager-journey.spec.ts --grep "desktop and tablet grid selection" --project=desktop-chromium --project=tablet-chromium` — 2 tests passed.
- Passing tests do not disprove the defect: none asserts selected-rail age/lifecycle semantics.

## Recommendation

Use one UI vocabulary everywhere:

- **Inventory age** = `daysInStock`, optionally suffixed `· Aging` when `isAging`.
- **Inventory status** = formatted `unit.inventoryStatus` only.

This is low-effort and presentation-only. It preserves the prototype's conspicuous aging signal, restores lifecycle visibility, and avoids changing API/domain behavior.

## Unresolved Questions

None.

**Status:** DONE  
**Summary:** Confirmed selected-unit rail conflates derived aging with lifecycle status; table/mobile already carry both fields. Recommended one presentation fix plus explicit label alignment and targeted regression coverage.  
**Concerns/Blockers:** None.
