# Precision component contract

Version: `v0.2.1` refinement review  
Inherits: `../v0.1-d-precision-guideline/brand-guideline.md`

## Form rationale

- Narrative role: prove the system, not simulate a finished dashboard.
- Viewing distance: laptop full context, iPad fast action, phone fast check.
- Temperature: soft, precise, calm under operational density.
- Capacity: one navigation proof and one data-surface proof only.
- Motif: the Keyloop loop becomes a continuous operational rail connecting
  section, record, location, action, and history.

## Iconsax contract

- Rounded Linear is the default; Bold is reserved for selected navigation.
- Use 24px navigation, 20px controls/table actions, 16px metadata only when
  legibility survives review. Preserve the native 24×24 geometry and 1.5px
  linear stroke.
- Use `currentColor`. Decorative SVGs are hidden from accessibility APIs;
  icon-only controls require an English accessible name and a tooltip.
- Icons never carry status or selection alone. Pair them with label, shape,
  marker, or edge treatment.
- Approved vocabulary: Category2 / Overview, Box / Inventory, Location /
  Locations, Activity / Activity, Driver / Master Data, plus SearchNormal1,
  Filter, AddCircle, More, Refresh2, Eye, RowVertical / Table View, and Grid2 /
  Grid View for actions and presentation switching.

## Navigation contract

| Mode | Structure | Required behavior |
| --- | --- | --- |
| Desktop | 224px floating sidebar | Can collapse to 72px; current section remains explicit |
| Tablet | 72px rail + drawer | 48px targets; secondary context opens on demand |
| Mobile | Four bottom destinations + More | Thumb reachable; no hover dependency |

Mobile utility actions collapse to icon-only buttons when the text label would
compete with page identity. Accessible names and tooltips remain mandatory.

The full Keyloop wordmark is used only when it can remain at least 150px wide.
Compact modes use the `IN` product monogram and retain the full wordmark in an
account/about surface.

## Data-surface contract

- AG Grid Community is the future implementation target. Theme with Quartz
  parameters first, narrowly scoped CSS second, React cell renderers third.
- Desktop/tablet may switch between the AG Grid Table View and an
  application-owned operational card Grid View. Both project the same query,
  filter, pagination, selection, and record view model; Grid View is not an AG
  Grid or Enterprise feature.
- Desktop header 48px and rows 60px. Tablet header/rows 64px. Visible row
  action target is at least 44px and never appears only on hover.
- Responsive column visibility is keyed by stable AG Grid `colId` values and
  applied through column definitions/API; CSS never targets virtualized child
  positions. The showcase's `data-col-id` attributes only model that contract.
- Identity, Master relationship, Zone/Slot, aging/status, and action are
  explicit. The 280–320px detail rail remains outside AG Grid.
- Loading, empty, error, selected, focus, and filtered states have designed
  footprints. Selection uses an edge/check cue in addition to blue.
- Mobile does not render the grid. Fast-check cards show identity, exception,
  location, and one next action from the same view model.
- Mobile does not expose the Table/Grid presentation switch.
- Do not use Enterprise Master/Detail, row grouping, range selection, tool
  panels, status bar, charts, Excel export, or server-side row model.

## Accessibility and responsive proof

- WCAG 2.2 AA targets from v0.1-d remain mandatory.
- All controls are at least 44×44px; frequent tablet controls are 48–56px.
- Dual focus ring uses the canonical `--focus-ring` token.
- Reading and keyboard order follow visual order; async/result states use text.
- Desktop preserves comparison, tablet removes detail deliberately, and mobile
  presents exceptions rather than shrinking the desktop composition.
