# Code Review — US-004 Responsive UI and Activity Parity

Date: 2026-07-15  
Verdict: **CLEAN — prior findings resolved**

## Resolved findings

### Resolved — Desktop/tablet workspace scroll ownership

The desktop/tablet shell is now height-bound to the viewport, the workspace is a two-row `auto minmax(0, 1fr)` grid, and `.app-shell__main` owns contained vertical scrolling ([src/styles.css:924](/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css:924), [src/styles.css:969](/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css:969), [src/styles.css:1003](/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css:1003)). The focused E2E test verifies overflow exists on main, sets main's `scrollTop`, and proves it advances while the sidebar stays viewport-bound ([tests/e2e/responsive-accessibility.spec.ts:53](/Users/kristdev/Desktop/CodingChallenge/key-loop/tests/e2e/responsive-accessibility.spec.ts:53)).

Resolution: verified by source and post-review validation; no residual finding.

### Resolved — Checkbox-to-detail synchronization proof

The journey test now activates the `STK-1934` row checkbox and verifies the Northstar detail rail/link, then clicks the `STK-1918` row and verifies the Vela detail rail ([tests/e2e/inventory-manager-journey.spec.ts:80](/Users/kristdev/Desktop/CodingChallenge/key-loop/tests/e2e/inventory-manager-journey.spec.ts:80)). This directly covers both required selection paths.

Resolution: verified by source and post-review validation; no residual finding.

## Verified clean areas

- US-004 URL canonicalization, pagination, Activity deep links, persisted action evidence, and filter application remain intact in the reviewed code and green journey tests.
- Activity desktop/tablet filter rail and mobile chip/feed structures follow the v0.3 hierarchy without reintroducing deferred navigation.
- Toast uses polite atomic status semantics, a bounded 380px three-column layout, 44px dismiss target, mobile-nav clearance, and desktop/tablet bottom-right placement ([src/features/inventory-unit/action-save-toast.tsx:18](/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory-unit/action-save-toast.tsx:18), [src/styles.css:378](/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css:378)).
- Compact branding, hover contrast, borderless detail action, visible focus behavior, responsive touch targets, and axe checks have executable green evidence.
- Post-review validation is fully green: lint, 58/58 Vitest, build, and 30 Playwright passes with 9 intentional skips. The Iconsax diagnostic is pre-existing and this change does not worsen it.

## Unresolved questions

None.

**Status:** DONE  
**Summary:** CLEAN. Both prior findings are resolved and post-review validation is green.  
**Concerns/Blockers:** None.
