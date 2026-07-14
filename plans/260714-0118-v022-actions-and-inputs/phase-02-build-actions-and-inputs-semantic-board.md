---
phase: 2
title: "Build Actions and Inputs Semantic Board"
status: complete
priority: P1
effort: "3h"
dependencies: [1]
---

# Phase 2: Build Actions & Inputs Semantic Board

## Context Links

- `phase-01-lock-v022-contract-and-version-boundary.md`
- `design/v0.1-d-precision-guideline/brand-guideline.md`
- `docs/product/inventory-dashboard.md`

## Overview

Build one production-minded HTML specimen board using native semantics and
representative inventory-manager copy.

## Key Insights

- State coverage is meaningful; do not force every state onto every control.
- Labels, help, error, and success text stay adjacent and programmatically linked.
- Destructive and icon actions need intent/context beyond glyph or color.

## Requirements

- Actions: primary, secondary, contextual, destructive, icon-only.
- Inputs: search, filter chips, select, text, textarea, checkbox, radio, switch.
- States: default/focus/disabled/error/success/loading where meaningful.
- All controls interactive; no fake navigation, persistence, or destructive mutation.

## Architecture

Use `<button>`, `<input>`, `<select>`, `<textarea>`, `<fieldset>`, and native
checkbox/radio elements. Use `aria-pressed` for filters, `role="switch"` plus
`aria-checked` for the switch specimen, `aria-invalid`/`aria-describedby` for
validation, and `aria-busy` plus live text for loading.

## Related Code Files

- Create: `design/v0.2.2-component-families/components/actions-and-inputs.html`
- Create: `design/v0.2.2-component-families/styles/actions-and-inputs.css`
- Create: `design/v0.2.2-component-families/styles/review-gallery.css`
- Update: `design/v0.2.2-component-families/index.html`

## Implementation Steps

1. Compose page header, review controls, and Actions/Input working regions.
2. Add action hierarchy specimens with visible labels and one primary per group.
3. Add labelled fields using inventory search, action note, status, and aging examples.
4. Add filter pressed state, checkbox/radio grouping, and accessible switch semantics.
5. Add explicit error/success text and disabled styling without weakening contrast.
6. Add Iconsax SearchNormal1, Filter, AddCircle, Trash, Refresh2, and approved utilities.

## Todo List

- [x] Every required family is present once in the board inventory.
- [x] Icon-only action has English name and tooltip; SVG is decorative.
- [x] Error/success messages are linked to their fields.
- [x] Disabled controls remain legible and unmistakably inactive.

## Success Criteria

- [x] Keyboard reading/tab order follows visual order.
- [x] No control depends on placeholder, hover, glyph, or color for meaning.
- [x] Form specimens use fictional, product-relevant English copy.

## Risk Assessment

Risk: a state matrix becomes dense and artificial. Mitigation: show base examples,
then a compact state rail using only applicable states and stable footprints.

## Security Considerations

Buttons do not submit or transmit data. Use `type="button"` outside deliberate
form demonstrations; prevent demo forms from navigating.

## Next Steps

Wire interaction and deliberate desktop/tablet/mobile reduction.
