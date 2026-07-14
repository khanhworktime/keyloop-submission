# Precision Operations brand guideline

Version: `v0.1-d`  
Status: selected direction  
Language: English UI  
Brand relationship: Keyloop-aligned coding-challenge submission

## 1. Strategic foundation

### Audience

Dealership managers who need detailed desktop oversight, comfortable iPad
actions, and immediate mobile exception checking.

### Promise

**Clarity builds confidence.** Every record, relationship, status, and action
must make the next managerial decision easier.

### Character

- Precise, not clinical.
- Soft, not low-contrast.
- Dense, not crowded.
- Connected, not decorative.
- Professional, not generic enterprise software.

### Core metaphor

The Keyloop loop becomes an operational rail: Vehicle Master connects to
Inventory Unit, Inventory Unit connects to Zone and Slot, and every manager
action connects to history. Use rails, aligned edges, and continuous context;
do not invent a new logo or decorative vehicle illustration.

## 2. Identity

- Use only `../v0.1-brand-foundation/assets/keyloop-logo-slate.svg`.
- Minimum complete-wordmark width: 150px.
- Clear space: at least half the displayed logo height on every side.
- Never redraw, crop, stretch, outline, shadow, or separate the wordmark.
- On constrained navigation, hide the complete wordmark rather than shrinking
  it below 150px; keep the full logo in the page header or account surface.
- Always label this work as a Keyloop-aligned submission, not an official
  released Keyloop product.

## 3. Color system

### Foundation colors

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Primary ink | `carbon-900` | `#11181C` | Headings, primary text |
| Navigation frame | `carbon-800` | `#162228` | Floating navigation, primary actions |
| Secondary ink | `carbon-700` | `#2E4758` | Body support text, icons |
| Canvas | `stone-800` | `#F1F1F3` | App background |
| Subtle boundary | `stone-900` | `#D9E0E4` | Dividers and static card borders |
| Control boundary | `control-boundary` | `#6B7D87` | Inputs and actionable controls |
| Surface | `white` | `#FFFFFF` | Working panels and overlays |
| Interaction | `signal-blue` | `#3DA5FF` | Selection and primary-link accents |
| Focus | `focus` | `#006D9C` | Keyboard focus outer ring |
| Connection | `fusion-blue` | `#00C7F2` | Relationship rails and progress |

Signal Blue and Fusion Blue are not body-text colors on white. They mark
interaction and connection; Carbon carries readable text.

### Accessible semantic pairs

| State | Marker | Background | Border | Text |
| --- | --- | --- | --- | --- |
| Ready | `#155E49` | `#E4F8F2` | `#155E49` | `#155E49` |
| Attention / aging | `#9D2E20` | `#FFF0ED` | `#9D2E20` | `#9D2E20` |
| In transit / information | `#1E5E87` | `#EBF6FD` | `#1E5E87` | `#1E5E87` |
| Pending | `#725000` | `#FFF5D6` | `#725000` | `#725000` |
| Blocked / error | `#A11F21` | `#FFEFEF` | `#A11F21` | `#A11F21` |

Every status uses marker + label + shape. Color never carries meaning alone.
Reserve coral for attention and aging stock; reserve red for a concrete blocked
or failed state.

## 4. Typography

- Display and headings: Plus Jakarta Sans, fallback IBM Plex Sans.
- Body and controls: IBM Plex Sans, fallback system sans-serif.
- Operational values: tabular numerals; VIN may use a readable monospace
  fallback in detail views only.

| Level | Size / line | Weight | Use |
| --- | --- | --- | --- |
| Display | 56–72 / 0.98 | 700 | Brand and major overview moments |
| Page title | 36–44 / 1.08 | 700 | One per page |
| Section title | 24–30 / 1.18 | 700 | Major working regions |
| Card title | 18–20 / 1.3 | 600–700 | Widgets and overlays |
| Body | 16 / 1.5 | 400–500 | Default readable content |
| UI label | 14 / 1.35 | 600 | Controls, cells, field labels |
| Metadata | 12 / 1.4 | 600–700 | Uppercase sparingly; never essential body copy |

Do not use more than three type sizes inside one widget. Avoid all-caps outside
short labels. Truncate only when the complete value is available through a
detail view or accessible tooltip.

## 5. Spacing and geometry

Base spacing scale: `4, 8, 12, 16, 24, 32, 48, 64`.

- Control radius: 8–10px.
- Widget and popover radius: 12–14px.
- Major panel radius: 18–20px.
- Bottom sheet radius: 24px on the leading corners.
- Static dividers/cards: 1px `stone-900`; inputs and actionable controls use
  `control-boundary`; selected edge: 3px Signal Blue.
- Shadow is reserved for floating navigation, popovers, dialogs, and sheets.
  Static cards normally use a border rather than a shadow.

Softness comes from spacing and surface separation, not excessive rounding.

## 6. Hierarchy rules

### Three surface levels

1. Canvas — quiet application background.
2. Working surface — tables, forms, widgets, and details.
3. Overlay — popover, dialog, action sheet, and floating navigation.

Do not nest more than two bordered cards. Use whitespace, headings, or a divider
before introducing another container.

### Action priority

- One primary action per page region or overlay.
- Primary: Deep Graphite fill, white label.
- Secondary: white surface, visible border, Carbon label.
- Contextual: pale blue surface, dark blue label.
- Destructive: red treatment only after intent is clear.
- Tertiary actions remain text or quiet icon buttons.

Never give every action equal fill, size, or contrast. Row actions remain
visible; they must not appear only on hover.

## 7. Components

### Widgets

- Lead with one decision or exception, not a decorative metric.
- Title and status align at the top; supporting detail follows; one action sits
  at the bottom or trailing edge.
- Empty, loading, error, and stale states keep the same footprint where
  possible to prevent layout jumps.

### Popovers and popup cards

- Preferred width: 320–420px; never wider than the available viewport minus
  32px.
- Padding: 20–24px; section gap: 16px; action target: at least 44px.
- Move focus into a modal dialog, contain focus, close on Escape, restore focus
  to the trigger, and prevent background interaction.
- Non-modal popovers need a labelled trigger, deterministic dismissal, and no
  critical hover-only content.
- Use one strong title, one concise explanation, and one primary action.

### Status

- Compact status may use a pill; high-severity state uses a stronger square or
  edge marker.
- Include a plain-language label such as `Needs attention`, never only an icon.
- Do not mix attention coral with blocked red.

### Custom interactive controls

- Date-time picker, Calendar, Select, Combobox, and Autocomplete are app-owned
  custom controls in production. Native browser UI may support an early HTML
  specimen, but it is not the final visual or interaction implementation.
- [Animate UI documentation](https://animate-ui.com/docs) is the source of
  trust for reusable component structure, composition, and motion when an
  official component exists in its
  [current catalog](https://animate-ui.com/docs/components). Animate UI uses a
  copy-first model, so adopted source is brought into the repository and
  customized directly instead of treated as an opaque visual dependency.
- Catalog availability must be verified at implementation time. A component
  appearing only on the [Animate UI roadmap](https://animate-ui.com/docs/roadmap),
  or not appearing in the catalog, is not an available upstream component and
  must not be represented as one.
- Source hierarchy is `Animate UI → Base UI → approved accessible primitive`.
  When Animate UI does not provide the required component, use the official
  [Base UI component catalog](https://base-ui.com/react/components) before
  considering another primitive. Base UI is the preferred accessible fallback,
  not a visual style source.
- When Animate UI offers the same component across multiple primitive families,
  choose its Base UI-based implementation. This keeps the interaction base
  consistent across app-owned controls.
- When neither Animate UI nor Base UI provides the required component, build it
  on a separately approved accessible primitive while retaining this system's
  visual and interaction contract. Do not fall back to native browser chrome
  as the production design.
- Every adopted Animate UI or Base UI component must pass a global-style setup
  gate before feature use. The implementing agent must map typography, color,
  spacing, radius, border, shadow, z-index, focus, semantic state, and motion to
  shared Precision tokens; component-local defaults must not create a parallel
  theme.
- Configure Base UI state hooks and data attributes through the application
  styling layer. Portaled popups must receive the same CSS variables and theme
  context as their trigger. Verify default, hover, focus-visible, open,
  selected, disabled, invalid, loading, and reduced-motion states.
- Precision tokens, WCAG 2.2 AA, keyboard semantics, touch targets, focus
  behavior, and reduced motion remain the acceptance authority. Animate UI is
  an acceleration source, not permission to weaken these requirements.
- Animate UI component motion may be reused, but its Lucide icon examples do
  not replace the approved Iconsax Rounded Linear vocabulary.

### AG Grid data surfaces

- AG Grid Community is the desktop/tablet target.
- Base theme: Quartz through the modern Theming API, then Keyloop parameters
  and a small application CSS layer.
- Desktop header: 44–48px; rows: 56–64px. Tablet rows: 64px minimum.
- Use React cell renderers for record identity, Master relationship, Zone/Slot,
  semantic status, and row action.
- Custom cell actions must implement keyboard navigation and suppress grid
  mouse/touch handling when appropriate.
- Keep the contextual detail rail outside AG Grid and synchronize it from row
  selection; this avoids Enterprise Master/Detail and preserves layout control.
- External filter chips and search control the grid filter model.
- Avoid `autoHeight` on many columns; fixed rows preserve virtualization and
  scanning rhythm.
- Do not hide action buttons until hover. Focus, selected, loading, empty, and
  error states require explicit designs.

## 8. Accessibility

- Target WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text and meaningful UI
  boundaries.
- Default interactive target: at least 44 × 44px; frequent tablet actions:
  48–56px.
- Focus ring: 2px white separation plus a 3px `focus` outer ring. This dual-ring
  treatment remains visible on light, colored, and dark surroundings; never
  remove it without an equally visible replacement.
- Keyboard order follows visual order. Escape closes transient overlays.
- Selection uses label, shape, edge, or check state in addition to color.
- Respect `prefers-reduced-motion`; movement must not be required to understand
  state.
- Provide accessible names for icon-only controls and live announcements for
  async save outcomes.
- Avoid horizontal page scrolling at every target width.

## 9. Responsive behavior

### Desktop — full context

- Persistent floating sidebar, detailed AG Grid, and 280–320px contextual rail.
- Preserve column comparison and multi-record scanning.

### Tablet / iPad — fast action

- Compact navigation rail or top bar, fewer visible columns, 48–56px controls,
  sticky action tray, and explicit column/menu affordances.
- No hover dependency. Keep record, status, location, and primary action.

### Mobile — fast check

- Replace AG Grid with prioritized exception cards using the same API/query
  state.
- Surface record identity, aging/status, current location, and one next action.
- Use bottom sheets for detail and action; keep navigation thumb-reachable.

## 10. Design review checklist

- Is there one obvious primary action?
- Can a manager identify the exception within three seconds?
- Are canvas, working surface, and overlay visually distinct?
- Does every status have a label and non-color cue?
- Are all targets at least 44px and all focus states visible?
- Does keyboard order match the visual hierarchy?
- Does tablet remove detail intentionally rather than simply shrink it?
- Does mobile replace the grid with a fast-check decision surface?
- Are Vehicle Master, Inventory Unit, Zone, and Slot relationships explicit?
- Is the official wordmark intact and at least 150px wide?
