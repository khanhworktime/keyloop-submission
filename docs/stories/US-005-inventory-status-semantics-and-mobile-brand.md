# US-005 Inventory Status Semantics and Mobile Brand

## Status

implemented

The original age-only aging semantics in this historical story were superseded
by `US-012`: reserved and sold Units now retain numeric age without an aging signal.

## Lane

normal

## Product Contract

Keep derived inventory aging and persisted inventory lifecycle status visibly
separate on every inventory surface, and use the supplied transparent slate
Keyloop wordmark in the mobile application header.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`
- `design/v0.3-responsive-screens/screens/inventory-unit.html`

## Acceptance Criteria

- [x] `Inventory age` always represents `daysInStock` and visibly identifies
  aging units without replacing another field.
- [x] `Inventory status` always represents `available`, `reserved`, or `sold`
  in the grid, mobile cards, selected-unit rail, and full unit summary.
- [x] A reserved unit retains its numeric age and `Reserved` lifecycle status
  without displaying an aging signal.
- [x] The supplied transparent slate Keyloop wordmark is stored as a local,
  web-optimized asset and replaces the square JPEG in the mobile header.
- [x] Desktop/tablet/mobile regression proof covers the corrected semantics and
  mobile brand rendering without changing domain, persistence, or API behavior.

## Design Notes

- Commands: no new product command.
- Queries: no query or URL-state change.
- API: no contract change.
- Tables: no data-model change.
- Domain rules: aging requires `inventoryStatus === 'available'` and
  `daysInStock > 90`; lifecycle status remains persisted independently.
- UI surfaces: inventory grid, mobile cards, selected-unit rail, full unit
  summary, mobile application header.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Component tests prove reserved age/status remain visible independently without aging. |
| Integration | Existing query and repository suites remain green; no contract change. |
| E2E | Playwright proves selected-rail semantics and mobile wordmark source/geometry. |
| Platform | Chromium desktop, tablet, and mobile viewports. |
| Release | `npm run validate` passes; React diagnostics introduce no new in-scope issue. |

## Harness Delta

No Harness policy change expected. This story records a bounded correction to
user-visible terminology and responsive branding.

## Evidence

- [Root-cause report](../../plans/reports/debugger-2026-07-15-inventory-status-semantics.md).
- [Final tester report](../../plans/reports/tester-2026-07-15-inventory-semantics-mobile-brand.md):
  `npm run validate` exited 0 with ESLint passing, Vitest 59/59,
  `tsc -b && vite build` passing after transforming 1,768 modules, and
  Playwright 31/31 passing with 11 intentional viewport/project-gated skips.
  Combined proof is 90 passed, 0 failed, and 11 intentional skips.
- Historical pre-US-012 tests proved `STK-1886` exposed `96 days · Aging` and
  `Reserved` independently. Current US-012 proof replaces that aging behavior.
  The original Playwright run covered desktop Chromium 1440×1000,
  iPad Pro 11 tablet Chromium, and iPhone 13 mobile Chromium; all 12 axe
  route/project scans and responsive overflow checks passed.
- [Clean code-review report](../../plans/reports/code-reviewer-2026-07-15-inventory-semantics-mobile-brand.md):
  verdict `CLEAN`; no correctness, accessibility, semantic, responsive, scope,
  or test-quality finding remains.
- [Desktop screenshot](../../plans/260715-1417-inventory-semantics-mobile-logo-correction/desktop-inventory.png)
  at 1440×1000 is historical pre-US-012 evidence showing separate `Inventory age`
  and `Inventory status` fields. Its `96 days · Aging` reserved result is no
  longer the current product contract.
- [Mobile screenshot](../../plans/260715-1417-inventory-semantics-mobile-logo-correction/mobile-inventory.png)
  at 390×844 shows the fully visible, proportional slate wordmark without a
  square backing, crop, or horizontal overflow. Executable proof additionally
  verifies the transparent PNG source, at least 150px rendered width,
  image-within-container geometry, and alpha range `{ min: 0, max: 255 }`.

## Non-blocking Warnings

- React Doctor reported only the pre-existing
  `socket/low-supply-chain-score` concern for `iconsax-reactjs@0.0.8`,
  documented in the
  [responsive correction tester report](../../plans/reports/tester-2026-07-15-responsive-ui-activity-parity.md);
  US-005 changes no dependency or package manifest and introduces no React
  component diagnostic.
- Vite warned that minified `index` (670.87 kB) and `inventory-grid`
  (1,079.17 kB) chunks exceed 500 kB. This is a code-splitting advisory; the
  production build passed.
- Playwright reported that `NO_COLOR` is ignored while `FORCE_COLOR` is set.
  This is test-output configuration only and did not affect results.

## Unresolved Questions

None.
