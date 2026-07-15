---
phase: 1
title: "Correct Inventory Semantics and Mobile Logo"
status: completed
priority: P1
effort: "4h"
dependencies: []
---

# Phase 1: Correct Inventory Semantics and Mobile Logo

## Overview

Add regression proof first, then correct presentation labels/branching and the
phone-header brand asset. Keep all persisted and derived fields unchanged.

## Context Links

- `plans/reports/debugger-2026-07-15-inventory-status-semantics.md`
- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`
- `docs/stories/US-004-responsive-ui-correction-and-activity-parity.md`

## Key Insights

- `inventoryStatus` is persisted lifecycle: `available | reserved | sold`.
- `daysInStock` and `isAging` are derived; aging is strictly `daysInStock > 90`.
- Only the selected rail replaces lifecycle with `Aging stock`; grid/mobile values are already independent but labels are ambiguous.
- The supplied PNG has alpha transparency and slate `#3c576b`; the existing phone header renders a square JPEG on a dark block.

## Requirements

- Vocabulary: `Inventory age` = `N days` plus `· Aging` only when true; `Inventory status` = formatted lifecycle only.
- Apply vocabulary to desktop/tablet grid, mobile cards, selected rail, and full Unit summary.
- Add `public/keyloop-logo-slate-transparent.png` from the supplied PNG; use it only in the phone header.
- Keep `app-shell.tsx` and `/keyloop-mobile-logo.jpeg` for the tablet compact rail unchanged.

## Architecture

Presentation-only data flow: existing `UnitListItem`/`InventoryUnitDetail` →
component labels/badges. Do not modify domain types, `aging-stock.ts`, queries,
MSW, repository, seed data, API contracts, or formatters unrelated to labels.

## Related Code Files

- Create: `public/keyloop-logo-slate-transparent.png` — preserve supplied RGBA asset.
- Modify: `src/components/app-shell/application-header.tsx` — phone-header image source only.
- Inspect only: `src/components/app-shell/app-shell.tsx` — retain tablet compact JPEG.
- Modify: `src/styles.css` — transparent phone-brand container and proportional, centered wordmark fit.
- Modify: `src/features/inventory/components/inventory-grid.tsx` — `Inventory age` / `Inventory status` headers.
- Modify: `src/features/inventory/components/inventory-mobile-cards.tsx` — lifecycle label.
- Modify: `src/features/inventory/components/inventory-selected-unit.tsx` — age includes aging cue; lifecycle never branches on `isAging`.
- Modify: `src/features/inventory-unit/inventory-unit-summary.tsx` — lifecycle label.
- Create: `src/features/inventory/components/inventory-selected-unit.test.tsx`.
- Modify: `src/features/inventory/components/inventory-mobile-cards.test.tsx`.
- Modify: `tests/e2e/inventory-manager-journey.spec.ts` and `tests/e2e/responsive-accessibility.spec.ts`.

## Implementation Steps

1. Tests first: use an aging/reserved fixture to assert separate `96 days · Aging` and `Inventory status: Reserved`; add direct selected-rail coverage.
2. Extend desktop/tablet E2E selection to `STK-1886`; assert grid/rail labels and independent values. Add Unit-detail assertion for lifecycle label.
3. Rename ambiguous headers/labels. In the rail, always call `formatInventoryStatus(item.unit.inventoryStatus)` under `Inventory status`; move `· Aging` to the age value.
4. Add the PNG asset unchanged, switch `ApplicationHeader` to it, remove the dark phone-logo backing, and size/center the wordmark without stretching. Do not change the compact-rail JPEG reference.
5. Add mobile E2E proof for new `src`, visible ≥150px wordmark fit, transparent container/corner alpha, no crop/overflow; keep existing tablet JPEG assertion.
6. Run focused Vitest/E2E checks, inspect `/inventory`, `/inventory/IU-1886`, and the mobile header at desktop 1440×1000, tablet project viewport, and mobile 390×844, then run the full validation commands.

## Todo List

- [x] Regression tests cover the correction and pass after implementation.
- [x] Grid, card, rail, and detail semantics agree across desktop/tablet/mobile.
- [x] Mobile wordmark is transparent, slate, readable, proportional, and unobstructed.
- [x] Full lint, test, build, E2E, axe, overflow, and screenshot review pass.

## Success Criteria

- [x] Aging never replaces or masquerades as lifecycle status on any named surface.
- [x] Available, reserved, and sold remain lifecycle values; 90 days is not labelled aging.
- [x] Phone header uses `/keyloop-logo-slate-transparent.png`; tablet compact rail still uses `/keyloop-mobile-logo.jpeg`.
- [x] No API/domain/persistence diff and no accessibility regression.

## Risk Assessment

- Long grid headers may pressure tablet width: preserve intentional tablet column visibility and prove lifecycle in the selected rail.
- The PNG includes transparent canvas padding: center within an overflow-safe header box; verify rendered wordmark bounds, not only the image element.
- Temp clipboard source can disappear: add and verify the repository asset before changing references.

## Security Considerations

Static trusted brand asset only. No user data, external fetch, HTML injection, storage, or telemetry changes.

## Next Steps

Complete. Final proof is recorded in
`plans/reports/tester-2026-07-15-inventory-semantics-mobile-brand.md` and
`plans/reports/code-reviewer-2026-07-15-inventory-semantics-mobile-brand.md`;
desktop and mobile screenshots are stored beside this phase file.

## Unresolved Questions

None.
