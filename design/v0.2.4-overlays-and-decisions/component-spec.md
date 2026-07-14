# v0.2.4 Overlays & Decisions component contract

## Semantic ladder

| Surface | Use | Background | Dismissal | Production source |
| --- | --- | --- | --- | --- |
| Popover | Brief anchored context or quick actions | Interactive | Trigger, outside press, Escape, close | Animate UI Base Popover |
| Dialog | Focused reversible task | Inert | Close, Cancel, Escape | Animate UI Base Dialog |
| Alert dialog | Consequential or irreversible choice | Inert | Explicit safe or destructive choice | Animate UI Base Alert Dialog |
| Drawer / sheet | Context-rich touch workflow | Inert | Close, Cancel, Escape; gesture in production | Base UI Drawer |

Animate UI Base implementations are preferred when available because they use
Base UI primitives. Gesture-ready Drawer falls back directly to Base UI because
Animate UI does not currently offer a Base UI Drawer component. All adopted
source passes the Precision global-style gate.

## Decision rules

- Do not use a dialog for a hint or three quick anchored actions.
- Do not use a generic dialog for an irreversible action.
- Name actions by outcome: `Move to E-02`, not `Submit`.
- Destructive copy identifies what is removed and what remains.
- One filled action per layer; destructive fill appears only at final intent.
- Keep the affected record visible behind the overlay without allowing it to
  compete with or receive interaction during a modal decision.

## Responsive contract

- Desktop: anchored popover, centered dialog/alert dialog, side drawer.
- Tablet: popover remains anchored; focused work becomes a right-side drawer.
- Mobile: every overlay becomes a bottom sheet with 48px frequent actions.
- Drawer gesture and snap points are production behavior provided by Base UI;
  this HTML specimen demonstrates layout and decision order only.

## Accessibility contract

- Every layer has a labelled trigger, title, and visible close path.
- Dialog and Drawer layers set `aria-modal`, isolate the complete app background,
  contain Tab focus, close on Escape, and restore focus to the invoking control.
- Alert Dialog requires an explicit safe or destructive choice; Escape and
  outside press do not dismiss it, and initial focus lands on the safe action.
- Alert Dialog uses `role="alertdialog"` and a concrete description.
- Popover remains non-modal and never contains critical hover-only content.
- Motion is subtle, removable, and never communicates meaning alone.
- Icons use Iconsax Rounded Linear 24×24 geometry at a 1.5px stroke; production
  renders the installed `iconsax-reactjs` components rather than redrawn SVGs.
- The dark review-header switches are prototype controls outside the represented
  product app, but they also become inert while a modal specimen is open so the
  board demonstrates one complete interaction model.
