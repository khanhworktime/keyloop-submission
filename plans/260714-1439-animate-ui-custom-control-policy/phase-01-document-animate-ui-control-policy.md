---
phase: 1
title: "Document Animate UI Control Policy"
status: completed
priority: P2
effort: "1h"
dependencies: []
---

# Phase 1: Document Animate UI Control Policy

## Overview

Add one durable sourcing rule and one control-status matrix. Keep wording
normative, implementation-neutral, and explicit about catalog versus roadmap.

## Context Links

- [Animate UI components](https://animate-ui.com/docs/components)
- [Animate UI roadmap](https://animate-ui.com/docs/roadmap)
- `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.1-d-precision-guideline/brand-guideline.md`
- `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.2.2-component-families/component-spec.md`

## Key Insights

- Current catalog entries are copy-in animated components, not a package-wide guarantee.
- Select, Combobox, and Autocomplete are roadmap-planned, not current catalog components.
- Calendar and Date picker are absent from the current catalog; Date-time picker therefore has no current official entry.
- Availability is time-sensitive; implementation must re-check official pages and record the check date.

## Requirements

- Define Animate UI as source of trust for motion, interaction, and composition when an official component exists.
- Keep Precision tokens, semantics, WCAG 2.2 AA, keyboard behavior, target sizes, and reduced motion as local acceptance gates.
- Add statuses for: date-time picker, calendar, select, combobox, autocomplete.
- State that roadmap or absence never authorizes invented APIs, copied unofficial code, or a “supported” claim.
- For unavailable controls, require native/accessibility-first fallback or separately approved custom work; do not imply Animate UI supplied it.

## Architecture

The selected guideline owns the reusable sourcing policy. The v0.2.2 contract
maps that policy to the five controls. Avoid a third document and duplicated prose.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.1-d-precision-guideline/brand-guideline.md` — durable trust and precedence rule.
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.2.2-component-families/component-spec.md` — dated availability matrix and fallback rule.
- Create: none.
- Delete: none.

## Implementation Steps

1. Re-check both official pages; note the verification date in the matrix.
2. Add the guideline rule near interaction/accessibility guidance. Define trust scope and local acceptance precedence.
3. Add the five-row matrix to the input contract: date-time picker and calendar “not in current catalog”; select, combobox, and autocomplete “planned on roadmap, not current.”
4. Add fallback wording: use native/accessibility-first behavior or obtain explicit design approval; re-evaluate when the official catalog changes.
5. Remove any wording that equates roadmap status, catalog absence, or Animate UI inspiration with delivered component support.

## Todo List

- [x] Official availability re-verified and dated.
- [x] Guideline contains one canonical sourcing rule.
- [x] Component contract contains all five truthful statuses.
- [x] No unavailable component API or implementation is claimed.
- [x] Documentation checks pass.

## Success Criteria

- [x] Official catalog and roadmap were opened and verified directly on 2026-07-14.
- [x] Official availability supports the dated five-control matrix.
- [x] Policy and all five controls are present in the two selected design files.
- [x] Roadmap and current-catalog qualifiers are explicit.
- [x] `git diff --check` passes.
- [x] `npm run lint` passes.

## Risk Assessment

- Catalog drift: require dated re-verification against official pages.
- “Source of trust” overreach: distinguish design reference from availability and local acceptance.
- Duplicated policy: keep normative wording in the guideline; matrix only applies it.

## Security Considerations

No auth or data change. Do not copy third-party code without reviewing provenance,
license, dependencies, focus behavior, keyboard semantics, and reduced motion.

## Next Steps

Submit documentation for design review. Component implementation needs a separate plan.

## Unresolved Questions

None.
