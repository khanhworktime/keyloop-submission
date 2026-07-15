---
type: tester
date: 2026-07-15
---

# Tester Report: US-005 Inventory Semantics and Mobile Brand

## Summary

PASS. Final `npm run validate` rerun against the strengthened mobile-logo E2E exited 0. Lint, Vitest, production build, desktop/tablet/mobile Playwright, overflow checks, and axe checks passed. No blocking defect found in the supplied desktop/mobile screenshots or the new PNG asset.

## Validation Results

| Layer | Passed | Failed | Skipped | Evidence |
| --- | ---: | ---: | ---: | --- |
| ESLint | 1 command | 0 | 0 | `eslint .` exited 0 |
| Vitest | 59 | 0 | 0 | 17/17 files passed in 2.75s |
| Production build | 1 command | 0 | 0 | `tsc -b && vite build`; 1,768 modules transformed |
| Playwright | 31 | 0 | 11 | 42 project cases in 15.5s |
| Combined test cases | 90 | 0 | 11 | 101 total Vitest + Playwright cases |

Playwright projects cover desktop Chromium at 1440x1000, iPad Pro 11 tablet Chromium, and iPhone 13 mobile Chromium. The 11 skips are intentional viewport/project gates for desktop-only, tablet-only, mobile-only, or non-mobile grid tests; none hide a failure.

## Focused US-005 Proof

- `inventory-selected-unit.test.tsx`: aging/reserved `STK-1886` exposes `96 days · Aging` and `Reserved` as independent facts; rejects legacy `Aging stock` lifecycle text.
- `inventory-mobile-cards.test.tsx`: mobile card exposes `96 days · Aging`, `Inventory status`, and `Reserved` independently.
- `inventory-manager-journey.spec.ts`: desktop/tablet grid and selected rail verify `Inventory age`, `Inventory status`, `96 days · Aging`, and `Reserved` for `STK-1886`.
- `responsive-accessibility.spec.ts`: mobile verifies `/keyloop-logo-slate-transparent.png`, transparent container, rendered width of at least 150px, image-within-container geometry, and browser-canvas alpha range exactly `{ min: 0, max: 255 }`. Tablet retains `/keyloop-mobile-logo.jpeg`.
- Axe ran on `/`, `/inventory`, `/inventory/IU-2048`, and `/activity` in all three projects: 12 route/project scans passed with zero violations.
- Responsive inventory overflow case passed in all three projects.

## Asset Verification

`public/keyloop-logo-slate-transparent.png` exists and is exactly 640x171, non-interlaced 8-bit RGBA (`TrueColorAlpha`). Alpha ranges from 0 to 255; 60,827 pixels are fully transparent, confirming real transparency rather than an opaque RGBA declaration.

## Screenshot Review

- Desktop `desktop-inventory.png` (1440x1000): no viewport overflow or crop. Grid visibly separates `Inventory age` from `Inventory status`; `STK-1886` simultaneously shows `96 days · Aging` and `Reserved`. Selected rail also uses distinct age/status labels.
- Mobile `mobile-inventory.png` (390x844): slate wordmark is fully visible, proportionally fitted, and free of square backing/crop. Cards keep aging text in the age badge and lifecycle under `Inventory status`. No horizontal overflow or clipped controls observed.
- No visible semantic mismatch found. Mobile capture does not show the reserved row within the captured scroll position, but focused component/E2E coverage proves that case.

## Non-blocking Warnings

- Vite reports minified chunks larger than 500 kB (`index` 670.87 kB, `inventory-grid` 1,079.17 kB). Performance/code-splitting advisory only; build passed.
- Playwright web server/workers report `NO_COLOR` ignored because `FORCE_COLOR` is set. Test-output configuration notice only.

## Recommendations

1. Accept US-005 validation; no corrective source change required from testing.
2. Track bundle splitting separately if load-performance work enters scope.

## Unresolved Questions

None.
