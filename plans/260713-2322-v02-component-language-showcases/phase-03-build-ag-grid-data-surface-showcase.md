# Phase 3: Build AG Grid Data Surface Showcase

## Context Links

- `phase-01-lock-component-contract.md`
- `docs/decisions/0009-ag-grid-responsive-data-surface.md`

## Overview

Priority: P1. Status: complete. Prove that the Precision language maps to AG
Grid Community on desktop/tablet and to fast-check cards on mobile.

## Key Insights

- Quartz parameters are the primary theming layer; scoped CSS is secondary.
- Contextual detail rail stays outside the grid.
- Mobile needs a different information architecture, not a squeezed table.

## Requirements

- Desktop rows 60px, tablet rows 64px, 44px+ controls.
- Record, Master, Zone/Slot, aging/status, and visible action cells.
- Search/filter chips, selection, focus, loading, empty, and error specimens.
- No Enterprise-only Master/Detail, tool panel, range selection, grouping, or chart.

## Architecture

HTML visually models supported AG Grid regions and documents the future Quartz
parameter mapping. Mobile cards share the same representative record model.

## Related Code Files

- Create: `components/ag-grid-data-surface.html`
- Create: `styles/ag-grid-data-surface.css`

## Implementation Steps

1. Build toolbar, column header, rows, pagination, and selected detail rail.
2. Add semantic cell renderers and persistent row actions.
3. Add tablet column reduction and larger touch rhythm.
4. Add mobile exception cards and explicit next actions.
5. Add a compact state strip for loading, empty, and error behavior.

## Todo List

- [x] Community-safe capabilities only.
- [x] Selected/focus/status cues are not color-only.
- [x] Tablet preserves record, status, location, and action.
- [x] Mobile removes the grid.

## Success Criteria

- Desktop supports comparison; tablet supports action; mobile supports checking.
- The showcase can be implemented through Quartz params and cell renderers.

## Risk Assessment

Dense data can flatten hierarchy; detail rail and one primary action must lead.

## Security Considerations

Use fictional representative VINs and no personal/customer data.

## Next Steps

Run the early review gate across both showcases.
