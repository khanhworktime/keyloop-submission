# 0009 AG Grid Responsive Data Surface

Date: 2026-07-13

## Status

Accepted

## Context

Inventory and Vehicle Master screens need professional sorting, filtering,
selection, pagination, custom status/action cells, keyboard behavior, and
comfortable tablet interaction. The selected Precision design also requires a
strong visual hierarchy and contextual detail rail. A hand-built or headless
table would make these behaviors implementation responsibilities before the
product workflows can be demonstrated.

AG Grid is a data-grid surface, not an automatic mobile information
architecture. Squeezing the full desktop column model into a narrow viewport
would conflict with the accepted fast-check mobile experience.

## Decision

Use AG Grid React with AG Grid Community for desktop and tablet Inventory and
Vehicle Master data surfaces. Apply a Quartz-based custom theme through the
modern Theming API and use React cell renderers for record identity,
Master/Unit relationships, Zone/Slot, semantic status, and row actions.

Keep the selected-record detail rail outside the grid and synchronize it from
row selection. Use external React filter chips and search controls to update
the grid filter model. On mobile, replace the grid with a dedicated fast-check
card/list presentation backed by the same React Query data and API contract.

Desktop and tablet may additionally offer an application-owned operational
card Grid View backed by the same query and record view model. AG Grid remains
the Table View implementation; the card presentation is not an AG Grid feature
and must not depend on Enterprise capabilities.

Do not introduce AG Grid Enterprise features unless a later accepted story
requires them and the licence is explicitly approved.

## Alternatives Considered

1. TanStack React Table. Rejected for this submission: its headless flexibility
   would require more custom sorting, filtering, keyboard, virtualization, and
   table-state presentation work.
2. Native HTML table. Rejected as the main data surface: appropriate for simple
   static data, but insufficient for the expected manager interactions without
   substantial custom behavior.
3. AG Grid Enterprise immediately. Rejected: native Master/Detail, advanced
   grouping, and server-side row models are not required by the bounded mock
   architecture and would add a production licence constraint.

## Consequences

Positive:

- Desktop and tablet receive a mature, accessible data-grid interaction model.
- The Precision visual language can be implemented through supported theming
  and component extension points rather than fragile DOM overrides.
- Community Edition covers the current sorting, filtering, pagination,
  selection, touch, and custom-renderer needs.
- Mobile remains task-focused instead of inheriting desktop table complexity.
- Managers can switch between comparison-oriented Table View and
  scanning-oriented Grid View without changing the underlying result set.

Tradeoffs:

- Desktop/tablet and mobile use different presentations and must share a
  deliberate view-model contract.
- Table, operational card grid, and mobile cards must not drift in record,
  selection, filter, or pagination semantics.
- Custom cell renderers own keyboard behavior for their internal controls.
- The team must avoid accidental Enterprise imports and features.
- AG Grid theme and component APIs become a front-end dependency boundary.

## Follow-Up

- Add `ag-grid-react` and `ag-grid-community` at matching versions during the
  component-language implementation.
- Create the Keyloop-aligned Quartz theme from
  `design/v0.1-d-precision-guideline/design-tokens.css`.
- Validate keyboard navigation, touch targets, loading/empty/error states, and
  responsive presentation switching in browser tests.
