---
phase: 1
title: "Lock Visual Parity Baseline"
status: complete
priority: P1
effort: "3h"
dependencies: []
---

# Phase 1: Lock Visual Parity Baseline

## Overview

Lock the visual contract and implement the first slice: application shell,
workspace surface, navigation hierarchy, and shared Precision primitives.

## Context Links

- `design/v0.5-design-handoff/scope.md`
- `design/v0.3-responsive-screens/styles/application-shell.css`
- `design/v0.1-d-precision-guideline/brand-guideline.md`
- `docs/stories/US-003-production-ui-visual-parity.md`

## Requirements

- Keep only Overview, Inventory, Activity in primary navigation.
- Desktop: floating 216px rail and bounded working surface; tablet: 72px rail; mobile: top bar and fixed bottom navigation.
- Reuse existing tokens, focus treatment, 44/48px targets, reduced motion, and official wordmark.

## Related Code Files

- Modify: `src/components/app-shell/app-shell.tsx`
- Modify: `src/components/app-shell/application-header.tsx`
- Modify: `src/components/app-shell/primary-navigation.tsx`
- Modify: `src/components/ui/button.tsx`, `src/components/ui/status-badge.tsx`, `src/components/ui/async-state.tsx`
- Modify: `src/styles.css`

## Implementation Steps

1. Map v0.5-approved shell elements to existing React landmarks; ignore prototype-only routes/actions.
2. Align canvas, workspace panel, rail, app bar, active navigation, padding, borders, and radii at all three breakpoints.
3. Normalize shared buttons, badges, async states, focus, and touch geometry through existing tokens.
4. Keep route-specific styling in component utilities; do not expand the 632-line global stylesheet with feature layouts.

## Todo List

- [x] Shell geometry matches desktop/tablet/mobile source hierarchy.
- [x] Shared primitives retain accessible states and semantic color cues.
- [x] No horizontal overflow or content hidden behind mobile navigation.

## Success Criteria

- [x] All four routes render in the aligned shell without route or data changes.
- [x] Keyboard focus, skip link, active-route indication, and touch targets remain correct.

## Risk Assessment

Sticky/fixed navigation can obscure content. Verify safe-area padding and scroll boundaries at each viewport.

## Security Considerations

Presentation-only; do not change storage, API, telemetry, or user-entered note rendering.

## Evidence

The authoritative design audit accepted shell parity at desktop, tablet, and
mobile widths. Mobile branding uses `public/keyloop-mobile-logo.jpeg`.

## Unresolved Questions

None.
