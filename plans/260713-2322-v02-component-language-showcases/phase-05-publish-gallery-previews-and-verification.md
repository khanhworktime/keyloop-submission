# Phase 5: Publish Gallery, Previews, and Verification

## Context Links

- `design/v0.2-component-language/index.html`
- `design/v0.2-component-language/component-spec.md`
- `docs/TEST_MATRIX.md`

## Overview

Priority: P1. Status: complete. Validate and publish reviewable artifacts while
leaving the milestone at an explicit early-review state.

## Key Insights

Screenshots are evidence, not the source of truth; HTML and spec remain primary.

## Requirements

- Validate HTML/CSS structure, local references, overflow, focus, contrast,
  touch targets, and record console-check availability/limitations.
- Capture desktop, tablet, and mobile previews for each showcase.
- Update design manifest and story evidence without claiming product completion.

## Architecture

Preview folders mirror component and viewport names. Verification notes record
commands, dimensions, and known limitations.

## Related Code Files

- Create: `previews/navigation-shell/`
- Create: `previews/ag-grid-data-surface/`
- Create: `validation.md`
- Update: `design/README.md`
- Update: `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`

## Implementation Steps

1. Run static parsing and link checks.
2. Render three viewport states and inspect essential clipping.
3. Audit contrast, target size, state semantics, and Community boundaries.
4. Record evidence and update version status to early review.

## Todo List

- [x] All references resolve.
- [x] No essential clipping or horizontal page scroll.
- [x] Preview dimensions and formats verified.
- [x] Story evidence and Harness trace updated.

## Success Criteria

- Both showcases are reproducible, inspectable, and ready for manager review.

## Risk Assessment

Remote fonts/icons may fail; local fallbacks and attribution must remain valid.

## Security Considerations

No secrets, third-party data transmission, or production endpoints.

## Next Steps

Wait for manager approval before implementing the remaining v0.2 families.
