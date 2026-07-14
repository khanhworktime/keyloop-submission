# Phase 2: Build Navigation Shell Showcase

## Context Links

- `phase-01-lock-component-contract.md`
- `design/v0.1-brand-foundation/assets/keyloop-logo-slate.svg`

## Overview

Priority: P1. Status: complete. Demonstrate one responsive navigation system at
desktop, tablet, and mobile working distances.

## Key Insights

- Floating means spatially separated, not detached from information hierarchy.
- Labels remain available; no critical navigation depends on hover.
- Full wordmark disappears below its 150px minimum rather than shrinking.

## Requirements

- Desktop: 224px expanded and 72px collapsed specimen.
- Tablet: 72px rail with explicit drawer affordance.
- Mobile: bottom navigation plus More.
- Iconsax 24px nav glyphs, visible active marker, 44px targets, focus proof.

## Architecture

Self-contained semantic HTML uses shared CSS and inline official Iconsax SVG
symbols. A viewport switch presents the three modes without production routing.

## Related Code Files

- Create: `components/navigation-shell.html`
- Create: `styles/navigation-shell.css`
- Create: `scripts/showcase-controls.js`

## Implementation Steps

1. Compose the desktop expanded shell with clear page/content hierarchy.
2. Add collapsed and tablet specimens without hover-only disclosure.
3. Add mobile bottom navigation and More trigger specimen.
4. Add labels, icon names, touch/focus annotations, and responsive notes.

## Todo List

- [x] Three working modes visible.
- [x] Selected and focus states demonstrated.
- [x] Icons align to one Iconsax vocabulary.
- [x] Logo clear-space/minimum-size rules pass.

## Success Criteria

- A manager can identify current location and primary destinations instantly.
- Every interactive specimen target is at least 44px.

## Risk Assessment

The showcase can become a fake dashboard; keep content secondary to navigation.

## Security Considerations

Static prototype only; controls must not transmit or persist user information.

## Next Steps

Apply the same shell grammar to the AG Grid showcase.
