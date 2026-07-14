# Phase 1: Lock Component Contract

## Context Links

- `design/v0.1-d-precision-guideline/brand-guideline.md`
- `design/v0.1-d-precision-guideline/design-tokens.css`
- `docs/product/inventory-dashboard.md`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`

## Overview

Priority: P1. Status: complete. Convert approved brand and responsive
decisions into a small component contract shared by both showcases.

## Key Insights

- Form role: system proof, not a final screen.
- Viewing distance spans laptop, iPad, and handheld fast-check.
- Visual temperature is soft–precise; density must stay operational.
- Keyloop's connected rail is the content-derived motif.

## Requirements

- Record icon, navigation, grid, state, responsive, and accessibility rules.
- Use representative domain labels without fabricated business metrics.
- Attribute Iconsax and use only verified free assets.

## Architecture

`component-spec.md` extends the canonical v0.1-d tokens. Shared CSS and assets
feed two independent HTML showcases and one gallery.

## Related Code Files

- Create: `design/v0.2-component-language/{README.md,component-spec.md}`
- Create: `design/v0.2-component-language/styles/component-foundation.css`
- Reuse: `design/v0.1-brand-foundation/assets/` (no duplicated v0.2 assets)

## Implementation Steps

1. Create the versioned directory and manifest.
2. Document Huashu form-five answers and locked defaults.
3. Define viewport, icon, target, focus, status, and density contracts.
4. Record Community-only AG Grid guardrails and Iconsax attribution.

## Todo List

- [x] Version manifest created.
- [x] Component contract written.
- [x] Shared foundation CSS imports v0.1-d tokens.
- [x] Asset provenance recorded.

## Success Criteria

- Both showcases can be reviewed against one explicit contract.
- No new visual token contradicts v0.1-d.

## Risk Assessment

Icon licensing drift: verify assets in the official Free filter before export.

## Security Considerations

No external data or secrets. External font/icon dependencies need fallbacks.

## Next Steps

Build the navigation shell from the locked contract.
