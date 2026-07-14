---
title: "v0.2.2 Form Rhythm and Data Commit Action"
status: complete
priority: P2
effort: 2h
blockedBy: []
blocks: []
created: 2026-07-14
---

# v0.2.2 Form Rhythm and Data Commit Action

## Overview
Refine the existing Actions & Inputs board in place. Keep generic primary actions
Carbon; make form commits recognizably data-changing with the existing Ready teal
family. Stabilize paired-field rhythm without adding empty helper copy or fake DOM text.

## Context and Dependencies
- Follows completed `plans/260714-0118-v022-actions-and-inputs/plan.md`.
- Preserve `design/v0.2-component-language/**` and pending later-family boundaries.
- Reuse `--color-ready-marker`, `--color-ready-border`, and canonical `--focus-ring`.
- Keep native form semantics, current save behavior, and 44px/48px target contracts.

## Files in Scope
- `design/v0.2.2-component-families/component-spec.md`
- `design/v0.2.2-component-families/components/actions-and-inputs.html`
- `design/v0.2.2-component-families/styles/component-foundation.css`
- `design/v0.2.2-component-families/styles/actions-and-inputs.css`
- `design/v0.2.2-component-families/styles/actions-and-inputs-responsive.css` only if needed
- `design/v0.2.2-component-families/validation.md` and affected previews
- `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`

## Implementation Plan
1. Extend the contract with a `data commit` primary modifier and paired-field
   support-row rhythm; state that reserved layout space must not use invented copy.
2. Reserve a shared minimum support row for non-wide form fields through CSS grid
   tracks/min-block-size. Real `<small>` helper/error/success content occupies that
   row; fields without content retain layout space without empty semantic nodes.
3. Add a narrowly scoped commit modifier to both Save controls while retaining
   `.button-primary` behavior. Use Ready marker/border with white text; keep generic
   Add action Carbon and secondary/contextual/destructive variants unchanged.
4. Ensure cascade order preserves global focus, neutral disabled styling, busy
   opacity/spinner, disabled repeat protection, target sizes, and mobile sticky actions.

## Validation Matrix
| State | Desktop 1392 | Tablet 1024 | Mobile 390 |
| --- | --- | --- | --- |
| Normal | paired baselines; commit hierarchy | 48px targets; paired baselines | stable one-column rhythm; sticky commit |
| Validation | error/success rows do not shift peers | same, without overflow | messages wrap naturally; no clipping |

- Measure paired field/control/support-row bounds and page/device/workspace overflow.
- Verify Ready/white contrast meets WCAG 2.2 AA for normal text; verify focus ring visible.
- Regression-check Busy and disabled Save states, spinner, `aria-busy`, and both submits.
- Confirm generic primary remains visually distinct from data commit in every viewport.
- Run JS syntax, local-reference, CSS-brace, `git diff --check`, lint, and build checks.
- Refresh existing review captures after browser checks; record exact viewport evidence.

## Evidence Updates
Update `validation.md` with the six Normal/Validation viewport results, measured
contrast, state regressions, commands, and refreshed assets. Append matching concise
proof to the US-001 v0.2.2 evidence block; do not overstate product E2E coverage.

## Success Criteria
- Paired fields retain consistent rhythm before and during validation at all modes.
- No fake helper copy, empty announced message, horizontal overflow, or clipped text.
- Save controls read as data commits; generic primary hierarchy remains intact.
- Focus, busy, disabled, contrast, target size, and semantic behavior regressions pass.
- Validation and story evidence match fresh browser/static results.

## Risks
- Fixed helper height may clip wrapped messages; use minimum, not fixed, block size.
- Ready teal can imply success; restrict it to explicit data commits and document intent.
- Modifier cascade may override disabled/focus states; test computed styles per state.

## Unresolved Questions
None.
