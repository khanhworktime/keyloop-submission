---
phase: 3
title: "Implement Responsive Interaction and States"
status: complete
priority: P1
effort: "3h"
dependencies: [2]
---

# Phase 3: Implement Responsive Interaction and States

## Context Links

- `phase-02-build-actions-and-inputs-semantic-board.md`
- `design/v0.2-component-language/scripts/showcase-controls.js`
- `design/v0.2-component-language/styles/component-foundation.css`

## Overview

Make viewport switching and component state changes operable while keeping the
showcase small, deterministic, and keyboard friendly.

## Key Insights

- Tablet enlarges frequent actions, not every desktop element.
- Mobile prioritizes one task flow instead of shrinking the state matrix.
- Focus proof includes actual keyboard focus, not only a painted example.

## Requirements

- Desktop: comparison board with Actions and Inputs visible together.
- Tablet: 48px frequent controls, simplified columns, comfortable form rhythm.
- Mobile: single-column task flow; full-width text actions; icon utility stays 44px.
- Interactions: viewport switch, filters, switch, loading/retry, validation, reset.

## Architecture

The controller updates `.device[data-mode]`, pressed/checked attributes,
validation messages, and loading state. CSS owns presentation changes. JavaScript
does not replace native field behavior or create a custom form framework.

## Related Code Files

- Create: `design/v0.2.2-component-families/scripts/showcase-controls.js`
- Update: `design/v0.2.2-component-families/components/actions-and-inputs.html`
- Update: `design/v0.2.2-component-families/styles/component-foundation.css`
- Update: `design/v0.2.2-component-families/styles/actions-and-inputs.css`

## Implementation Steps

1. Implement Desktop/Tablet/Mobile buttons with grouped `aria-pressed` state.
2. Toggle filter chips and switch with synchronized visible/semantic state.
3. Validate on submit/reset; focus the first invalid field.
4. Demonstrate loading with disabled trigger, `aria-busy`, live text, and deterministic reset.
5. Apply 44px base and 48px tablet target rules; remove horizontal overflow.
6. Respect reduced motion and the canonical dual focus ring.

## Todo List

- [x] Every interactive demo works by keyboard and pointer.
- [x] Mobile presents one coherent form task, not a compressed desktop matrix.
- [x] Loading and validation changes have text announcements.
- [x] Disabled native controls cannot be focused or activated.

## Success Criteria

- [x] Viewport selection preserves relevant component state.
- [x] No visible control is under 44px; frequent tablet controls are at least 48px.
- [x] `scrollWidth === clientWidth` for all three modes.
- [x] Reduced-motion users lose no state meaning.

## Risk Assessment

Risk: scripted focus/state fights native behavior. Mitigation: enhance native controls
only, keep one controller, and reset every demo deterministically.

## Security Considerations

No entered value leaves the document. Loading is simulated locally; cancel any
pending timer during reset or viewport teardown.

## Next Steps

Capture the board and publish reproducible validation evidence.
