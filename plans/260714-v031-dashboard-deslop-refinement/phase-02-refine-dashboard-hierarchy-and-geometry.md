---
phase: 2
title: "Refine Dashboard Hierarchy and Geometry"
status: completed
priority: P1
effort: "75m"
---

# Phase 2: Refine Dashboard Hierarchy and Geometry

## Overview

Implement the six refinements in existing dashboard and shared style files.

## Requirements

- Keep English UI, Keyloop wordmark, Iconsax, focus ring, and destinations.
- One obvious data action; no essential action hidden by viewport or hover.
- Button-like anchors never underline in any interaction state.

## Architecture

Change semantic HTML first, then the smallest CSS selector set. Queue rows use
thumbnail + record + age + location + arrow; tablet hides location without
collapsing the identity slot. Mobile retains its compact exception card.

## Related Code Files

- Modify: `design/v0.3-responsive-screens/screens/dashboard.html`
- Modify: `design/v0.3-responsive-screens/styles/dashboard.css`
- Modify narrowly: `styles/application-shell.css`, `styles/screen-foundation.css`
- Modify only if required: `styles/responsive-tablet.css`, `styles/responsive-mobile.css`

## Implementation Steps

1. Remove `Manager brief · 14 April` and `.page-actions` from Dashboard.
2. Make the app-bar aging-inventory action the sole important CTA, give it an
   outcome-specific label, and apply the Ready-teal action treatment.
3. Increase page-head separation and dashboard padding on the existing scale;
   align radii to Precision and avoid extra shadow/nested rounding.
4. Reset `.button` anchor underlines for default, hover, focus-visible, active,
   and visited states without weakening the dual focus ring.
5. Add a fixed vehicle thumbnail/fallback slot to every priority row and update
   desktop/tablet grid columns for long VIN, age, and location values.
6. Apply the account-avatar decision; if deferred, add no placeholder control.
7. Confirm mobile has no dead page-action gap and keeps its fast-check hierarchy.

## Todo List

- [x] Eyebrow and duplicate CTA removed; page rhythm deliberate in source.
- [x] One Ready-teal data action is the sole important CTA in source.
- [x] Queue identity geometry aligns across desktop/tablet source rules.
- [x] Button-anchor underline and focus rules are present for all states.

## Success Criteria

- [ ] Browser/file visual confirmation of all six comments is pending.
- [x] Dashboard routes and core-loop meaning are unchanged.
- [ ] Browser regression check for Inventory, Unit, and Activity is pending.

## Risk Assessment

Thumbnail width can crowd tablet rows; preserve a flexible record column, hide
location as today, and test long identifiers before accepting.

## Security Considerations

No remote or personal images. Fallback content has an accessible name.

## Next Steps

Refresh responsive evidence and update design-only documentation.
