# US-004 Responsive UI Correction and Activity Parity

## Status

implemented

## Lane

normal

## Product Contract

Correct the responsive application shell, inventory grid interactions, action
toast, and Activity presentation so the running React application matches the
approved Precision design handoff without changing routes, API contracts,
persistence, or the manager workflow.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `design/v0.3-responsive-screens/screens/activity.html`
- `design/v0.3-responsive-screens/previews/activity/`
- `design/v0.5-design-handoff/`

## Acceptance Criteria

- [x] The compact navigation rail displays the supplied Keyloop brand asset;
  expanded desktop and phone header branding remain correctly proportioned.
- [x] Sidebar hover, active, focus, icon, and label states meet WCAG AA contrast
  while preserving the approved dark Precision navigation language.
- [x] Inventory desktop/tablet rows expose selection checkboxes and a borderless
  44px row-detail action with a visible keyboard focus state.
- [x] At wide desktop widths, the shell spans the viewport and keeps the sidebar
  close to the left edge instead of centering inside a fixed maximum width.
- [x] The action-saved toast is a compact, readable `aria-live` surface that does
  not overlap the application header, mobile navigation, or primary actions.
- [x] Activity matches the approved desktop filter-rail/event-feed composition,
  tablet compact-rail composition, and mobile chip/timeline-card composition.
- [x] Existing Activity filtering, pagination, persistence evidence, and unit
  deep links continue to work across desktop, tablet, and mobile.

## Design Notes

- Commands: no new product command.
- Queries: preserve URL-backed Activity and Inventory filter state.
- API: no API contract change.
- Tables: no data-model change; AG Grid selection presentation only.
- Domain rules: preserve strict aging and atomic action/activity persistence.
- UI surfaces: shell, primary navigation, inventory grid, save toast, Activity.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Existing component and filter tests remain green; add focused UI semantics where useful. |
| Integration | Existing MSW, query, and persistence integration tests remain green. |
| E2E | Playwright proves compact logo, WCAG hover tokens, checkbox/action, left shell alignment, toast geometry, and Activity responsive parity. |
| Platform | Browser-only; Chromium desktop/tablet/mobile viewports. |
| Release | `npm run validate` and React diagnostics pass. |

## Harness Delta

No Harness policy change expected. This story records a bounded visual and
responsive correction against existing authoritative design evidence.

## Evidence

- [Tester report](../../plans/reports/tester-2026-07-15-responsive-ui-activity-parity.md):
  final `npm run validate` passed lint, Vitest 58/58, production build, and
  Playwright 30 passed with 9 intentional viewport-gated skips. The build's
  chunk-size warning is non-blocking.
- [Clean code-review report](../../plans/reports/code-reviewer-2026-07-15-responsive-ui-activity-parity.md):
  prior workspace-scroll and checkbox synchronization findings are resolved;
  no residual implementation finding remains.
- Manual visual review confirmed the approved Activity hierarchy and density at
  desktop 1920×1080, tablet 1024×900, and mobile 390×844. Executable geometry,
  contrast, focus, touch-target, overflow, toast, and axe assertions passed.
- React Doctor found no US-004 component issue. Its only concern is the
  pre-existing `iconsax-reactjs@0.0.8` supply-chain score, outside this story's
  dependency-neutral scope.

## Unresolved Questions

None.
