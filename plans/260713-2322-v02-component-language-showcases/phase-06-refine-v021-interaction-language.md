# Phase 6: Refine v0.2.1 Interaction Language

## Context Links

- `design/v0.2-component-language/components/navigation-shell.html`
- `design/v0.2-component-language/components/ag-grid-data-surface.html`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`
- Manager screenshots supplied on 2026-07-14

## Overview

Priority: P1. Status: complete. Applied manager feedback without expanding
beyond the two approved proof surfaces.

## Key Insights

- Mobile header actions should prioritize icon recognition over repeated copy.
- Master Data needs an immediately recognizable database/server glyph.
- Grid View is an application-owned card presentation, not an AG Grid feature.
- Table, card grid, mobile cards, and detail rail share one record contract.

## Requirements

- Replace the Master Data glyph with Iconsax Driver/database language.
- Make mobile Add Record icon-only with a 44px target and accessible label.
- Add one spacing step between mobile intro copy and status.
- Add accessible Table/Grid switching for desktop/tablet only.
- Preserve data states, filters, selection, pagination, and mobile cards.

## Architecture

The shared showcase controller owns viewport, state, and view attributes. CSS
switches between the AG Grid-style table and an application-owned list of
operational cards. Mobile ignores the view preference and retains fast-check
cards.

## Related Code Files

- Update: `design/v0.2-component-language/components/*.html`
- Update: `design/v0.2-component-language/styles/*.css`
- Update: `design/v0.2-component-language/scripts/showcase-controls.js`
- Update: v0.2 manifests, contract, review, validation, ADR, and story evidence
- Refresh: seven PNG previews

## Implementation Steps

1. Update Iconsax vocabulary and mobile navigation-shell rules.
2. Add Table/Grid controls and parity-safe card markup.
3. Add responsive view CSS and controller state.
4. Update versioned contracts and durable design evidence.
5. Verify every applicable viewport, data state, and view combination.

## Todo List

- [x] Navigation refinements complete.
- [x] Table/Grid switch and operational cards complete.
- [x] v0.2.1 documentation aligned.
- [x] Browser and static checks pass.
- [x] Independent tester and reviewer pass.

## Success Criteria

- Mobile header and content spacing match manager feedback.
- Table/Grid switch is keyboard accessible and retains shared state.
- No populated desktop/tablet presentation duplicates visibly.
- Mobile never exposes desktop Table/Grid controls.

## Risk Assessment

Duplicated card fixtures can drift from table values. Validate record parity and
describe both surfaces as projections of one future view model.

## Security Considerations

Static fictional records only; no customer, credential, or production data.

## Next Steps

Return the refreshed v0.2.1 gallery to the manager for Keep/Fix review.
