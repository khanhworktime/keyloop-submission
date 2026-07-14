---
phase: 1
title: "Lock Dashboard Refinement Contract"
status: completed
priority: P1
effort: "30m"
---

# Phase 1: Lock Dashboard Refinement Contract

## Overview

Map each browser comment to its narrowest semantic or style owner before edits.

## Context Links

- `design/v0.1-d-precision-guideline/brand-guideline.md`
- Apple HIG accessibility and button geometry: 44pt targets plus clear spacing.

## Requirements

- Preserve Precision control/widget/panel radii and 4/8/12/16/24 spacing.
- Keep 44px base and 48px frequent tablet/mobile targets.
- No fake account model, remote images, routes, or product behavior.

## Architecture

`dashboard.html` owns semantic removal/addition; `dashboard.css` owns queue and
dashboard geometry; `application-shell.css` owns shared page-head rhythm;
`screen-foundation.css` owns the global button-anchor invariant. Shared edits
require regression checks on all four v0.3 screens.

## Related Code Files

- Modify: `screens/dashboard.html`
- Modify: `styles/dashboard.css`, `styles/application-shell.css`
- Modify: `styles/screen-foundation.css`
- Verify: `styles/responsive-tablet.css`, `styles/responsive-mobile.css`

## Implementation Steps

1. Map eyebrow, duplicate CTA, app-bar CTA, page rhythm, queue grid, and links.
2. Lock one Ready-teal aging-data action; do not treat teal as saved/success.
3. Define thumbnail slot size, fallback initials/icon, and accessible image rules.
4. Assess account avatar: add only with a labelled account purpose; otherwise defer.
5. Keep dashboard selectors local unless a rule is a true system invariant.

## Todo List

- [x] Six comments map to exact selectors and checks.
- [x] Avatar decision has semantic rationale.
- [x] Shared versus dashboard-only ownership is explicit.

## Success Criteria

- [x] Contract preserves routes, data, and responsive behavior.
- [x] No decorative account control or Apple imitation is introduced.
- [x] Actual tablet/mobile files replace the nonexistent requested path.

## Risk Assessment

Shared CSS could drift other screens; prefer dashboard selectors and require
cross-screen proof for every shared change.

## Security Considerations

Use fictional vehicle identity only; do not imply authenticated account data.

## Next Steps

Apply the semantic and geometry refinements in place.
