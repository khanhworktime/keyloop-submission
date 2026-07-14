# Screen composition contract

## Composition rules

- Preserve one obvious primary decision per working region.
- Desktop retains the floating 224px rail, full comparison density, and a
  contextual detail rail outside AG Grid.
- Tablet reduces the rail and visible columns intentionally; frequent actions
  are at least 48px and never depend on hover.
- Mobile replaces AG Grid with fast-check cards and moves focused actions into
  a bottom sheet. It does not inherit the desktop view switch.
- Table rows, operational cards, mobile cards, detail, and Activity project the
  same record and filter meaning.

## Production source of trust

- AG Grid Community + Quartz Theming API: desktop/tablet data surface.
- Animate UI Base variant: first choice for available interactive components.
- Base UI: preferred fallback and primitive base.
- Approved accessible primitive: only when neither catalog supplies the need.
- Date-time picker, Calendar, Select, Combobox, and Autocomplete remain custom.
- Every adopted component passes the global Precision token/state/motion gate.
- Iconsax Rounded Linear is the icon vocabulary; examples from upstream
  component libraries do not replace it.

## Accessibility gate

- WCAG 2.2 AA contrast and non-color state cues.
- 44px minimum controls; 48–56px frequent touch actions.
- Visible focus, visual-order keyboard order, labelled icon actions.
- Modal/sheet focus containment and restoration in production.
- Reduced motion and no horizontal page scrolling.

