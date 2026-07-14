# v0.3 Responsive Screens

Status: awaiting manager Keep/Fix review

This milestone composes the approved Precision foundations and v0.2 component
contracts into real manager screens. It maps eight screen families and makes
the first operational loop reviewable across desktop, tablet, and mobile:

`Dashboard → aging Inventory → Inventory Unit decision → Activity`

## Review slice

- `screens/dashboard.html`
- `screens/inventory.html`
- `screens/inventory-unit.html`
- `screens/activity.html`

Open `index.html` for the review gallery. Earlier design versions are retained
unchanged. These files are design evidence, not production React behavior.

## Refinements carried into v0.4

The Dashboard now has a quieter hierarchy: ornamental and duplicate actions
are removed, one aging-inventory action leads the page, and priority rows have
stable vehicle identity and alignment. The product flow and v0.3 responsive
screen contract are unchanged. Activity refinement is also delivered as part
of the v0.4 management-screen review slice. Manager Keep/Fix review remains
pending.

## Activity filter refinement

Direct Activity routes default to `All inventory`. Inventory Unit Detail links
preserve `?unit=STK-2048` and the active responsive mode. A scalable custom
combobox searches Stock number, VIN, and model; other accepted units show an
honest zero-event state instead of invented history.

Advanced filters cover event, date, Zone, and actor in a responsive drawer or
sheet. Apply, Cancel, Reset, chips, and result `aria-live` feedback work. On
mobile, Cancel rolls back the draft scope and Apply commits it. Radiogroup,
combobox, focus, and Escape semantics pass, as do 44px/48px targets and
zero-overflow checks in desktop, tablet, and mobile modes.

Static JavaScript, lint, build, and diff checks pass. Independent testing
reports PASS and independent review is CLEAN. This remains a design prototype,
not production API, persistence, or Base UI behavior. Manager Keep/Fix review
remains pending.
