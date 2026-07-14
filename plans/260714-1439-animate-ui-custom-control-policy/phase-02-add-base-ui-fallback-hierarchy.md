---
phase: 2
title: "Add Base UI Fallback Hierarchy"
status: completed
priority: P2
effort: "30m"
---

# Phase 2: Add Base UI Fallback Hierarchy

## Overview

Add Base UI as the explicit fallback when Animate UI lacks a required
component, prefer Animate UI's Base UI variant, and require global Precision
style configuration before adoption.

## Context Links

- [Base UI components](https://base-ui.com/react/components)
- [Base UI styling](https://base-ui.com/react/handbook/styling)
- `design/v0.1-d-precision-guideline/brand-guideline.md`
- `design/v0.2.2-component-families/component-spec.md`
- `design/v0.2.2-component-families/index.html`
- `design/v0.2.2-component-families/review.md`

## Implementation Steps

1. Add the `Animate UI → Base UI → approved primitive` hierarchy.
2. Prefer Animate UI variants built on Base UI.
3. Add the dated Base UI availability column for all five controls.
4. Require token, state, portal, icon, and reduced-motion mapping through the
   global Precision styling layer.
5. Verify official-source wording and documentation integrity.

## Success Criteria

- [x] Select, Combobox, and Autocomplete are recorded as available in Base UI.
- [x] Date-time picker and Calendar are not falsely claimed as available.
- [x] Global styling configuration is an explicit agent implementation gate.
- [x] Iconsax and Precision accessibility requirements remain authoritative.
- [x] Documentation checks pass.
