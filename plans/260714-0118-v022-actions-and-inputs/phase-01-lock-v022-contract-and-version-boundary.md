---
phase: 1
title: "Lock v0.2.2 Contract and Version Boundary"
status: complete
priority: P1
effort: "2h"
dependencies: []
---

# Phase 1: Lock v0.2.2 Contract and Version Boundary

## Context Links

- `design/v0.1-d-precision-guideline/brand-guideline.md`
- `design/v0.1-d-precision-guideline/design-tokens.css`
- `design/v0.2-component-language/component-spec.md`
- `docs/product/inventory-dashboard.md`
- `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`

## Overview

Create a new version boundary and a small contract for one board only. Preserve
v0.2.1 as immutable review evidence.

## Key Insights

- Actions retain hierarchy: one primary action per region; destructive is explicit.
- Input meaning cannot rely on placeholder, icon, or color alone.
- Native controls reduce custom keyboard and form-state risk.

## Requirements

- Functional: define Actions & Inputs inventory, states, responsive modes, and interactions.
- Non-functional: English UI, token inheritance, Iconsax attribution, WCAG 2.2 AA.
- Deferred: feedback/status, overlays, navigation/data refinements, and other boards.

## Architecture

`v0.2.2-component-families` imports v0.1-d tokens and owns its HTML/CSS/JS,
previews, review notes, and validation. It may reuse v0.2.1 patterns by reference,
but must not import mutable showcase CSS from the older version.

## Related Code Files

- Create: `design/v0.2.2-component-families/README.md`
- Create: `design/v0.2.2-component-families/component-spec.md`
- Create: `design/v0.2.2-component-families/index.html`
- Create: `design/v0.2.2-component-families/review.md`
- Create: `design/v0.2.2-component-families/styles/component-foundation.css`
- Reuse: `design/v0.1-d-precision-guideline/design-tokens.css`
- Preserve unchanged: `design/v0.2-component-language/**`

## Implementation Steps

1. Create the new version folder and review manifest.
2. Record action priority, input semantics, state, icon, target, and focus rules.
3. List Actions & Inputs as current; name all later boards as pending only.
4. Link inherited tokens/guidelines and Iconsax provenance.

## Todo List

- [x] New folder is independent from v0.2.1.
- [x] Contract enumerates every required variant and meaningful state.
- [x] Later boards have no placeholder implementation files.

## Success Criteria

- [x] No path under `design/v0.2-component-language/` changes.
- [x] Reviewers can identify scope, inheritance, and deferred work from README/spec.

## Risk Assessment

Risk: copying old CSS creates drift. Mitigation: import canonical tokens, then keep
one small v0.2.2 foundation stylesheet containing only shared showcase rules.

## Security Considerations

Static fictional UI only. No submission, persistence, credentials, or customer data.

## Next Steps

Build the semantic Actions & Inputs board against the locked inventory.
