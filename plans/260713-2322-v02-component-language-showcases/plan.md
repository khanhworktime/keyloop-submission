---
title: "v0.2 Component Language Showcases"
status: complete
priority: P1
created: "2026-07-13"
---

# v0.2 Component Language Showcases

## Objective

Prove the selected Precision language on two implementation-feasible surfaces:
the responsive navigation shell and an AG Grid Community data surface. Stop at
an early review gate before expanding the component library.

## Locked decisions

- Light theme, English UI, Keyloop-aligned Precision `v0.1-d`.
- Iconsax Rounded Linear; Bold only for selected emphasis.
- Desktop sidebar 224px → 72px; tablet rail/drawer; mobile bottom navigation.
- AG Grid Community on desktop/tablet; mobile fast-check cards.
- Desktop grid rows 60px; tablet rows 64px; no hover-only actions.

## Phases

| Phase | Name | Status |
| --- | --- | --- |
| 1 | [Lock component contract](./phase-01-lock-component-contract.md) | Complete |
| 2 | [Build navigation shell showcase](./phase-02-build-navigation-shell-showcase.md) | Complete |
| 3 | [Build AG Grid data-surface showcase](./phase-03-build-ag-grid-data-surface-showcase.md) | Complete |
| 4 | [Run early design review](./phase-04-run-early-design-review.md) | Complete — approved 2026-07-14 |
| 5 | [Publish gallery, previews, and verification](./phase-05-publish-gallery-previews-and-verification.md) | Complete |
| 6 | [Refine v0.2.1 interaction language](./phase-06-refine-v021-interaction-language.md) | Complete |

## Dependencies

- `design/v0.1-d-precision-guideline/brand-guideline.md`
- `design/v0.1-d-precision-guideline/design-tokens.css`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`
- Official Keyloop logo and official free Iconsax assets.

## Review gate

The two showcases must be reviewed together. No remaining component families
advance until hierarchy, density, responsive behavior, icon language, and
touch/accessibility treatment are approved.
