---
phase: 3
title: "Validate Responsive Parity"
status: complete
priority: P1
effort: "5h"
dependencies: [2]
---

# Phase 3: Validate Responsive Parity

## Overview

Prove visual parity and regression safety across the complete manager journey.

## Context Links

- `playwright.config.ts`
- `tests/e2e/inventory-manager-journey.spec.ts`
- `tests/e2e/responsive-accessibility.spec.ts`
- `design/v0.3-responsive-screens/previews/`

## Requirements

- Compare all four routes at desktop 1440×1000, configured iPad/tablet, and iPhone 13/mobile.
- Use the inner application composition in reference previews; ignore the black review gallery frame.
- Treat v0.5 scope as authoritative when older preview content conflicts.

## Related Code Files

- Modify: `tests/e2e/responsive-accessibility.spec.ts`
- Modify if journey selectors legitimately change: `tests/e2e/inventory-manager-journey.spec.ts`
- Update after proof: `docs/stories/US-003-production-ui-visual-parity.md`

## Implementation Steps

1. Capture live screenshots for Overview, Inventory, Unit, and Activity in all three Playwright projects.
2. Compare shell geometry, hierarchy, density, wrapping, sticky/fixed behavior, and essential actions against references.
3. Add stable E2E assertions for responsive surface selection, overflow, touch targets, and unobscured navigation; avoid brittle full-page pixel snapshots.
4. Run `npm run lint`, `npm run test`, `npm run build`, then `npm run test:e2e`.
5. Re-run the 12-view visual review after fixes and record dated evidence in US-003.

## Todo List

- [x] 12 screenshot comparisons reviewed with no blocking mismatch.
- [x] Desktop, tablet, and mobile manager journey passes.
- [x] Axe, overflow, touch-target, lint, unit/integration, build, and E2E checks pass.

## Success Criteria

- [x] Visual parity is evidenced without weakening behavioral or accessibility proof.
- [x] Any accepted non-blocking difference is documented with scope rationale.

## Risk Assessment

Dates and seeded content make pixel snapshots noisy. Review geometry manually and automate stable structural invariants.

## Security Considerations

Use deterministic local seed data only; screenshots must not contain secrets or external user data.

## Evidence

- Tester report confirms responsive and accessibility coverage, including the
  sticky-sidebar assertion.
- Final `npm run validate`: lint passed; Vitest 58/58; build passed with one
  non-blocking chunk warning; Playwright 25 passed with 5 intentional skips.
- Manual screenshot review covered all 12 route/viewport combinations with no
  blocking mismatch.

## Unresolved Questions

None.
