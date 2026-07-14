# v0.2.2 Actions & Inputs validation

Status: ready for manager Keep/Fix review

Validated on 2026-07-14 against the standalone HTML board served by Vite at
`127.0.0.1`. The review viewport was 1600 × 900; responsive device widths are
1392px desktop, 1024px tablet, and 390px mobile.

## Browser evidence

- Desktop: visible non-choice controls measure at least 44px; clickable
  checkbox/radio labels measure 44px; no page, device, or workspace horizontal
  overflow.
- Tablet: frequent action, icon, chip, field, and select targets are 48px;
  destructive and unavailable comparison variants reduce out; no horizontal
  overflow.
- Mobile: form is the first visual task, fields use one column, sticky commit
  actions remain reachable, and the header Save action is an accessible 44 ×
  48 icon control with a tooltip; no horizontal overflow.
- Normal, Validation, and Busy switches update pressed state. Busy disables
  both Save actions, applies `aria-busy`, and exposes `Saving…` text.
- Filter chips and the archived-record switch synchronize visible copy with
  `aria-pressed` and `aria-checked`.
- A valid 17-character VIN produces Saved status and a live announcement. An
  invalid VIN applies `aria-invalid`, exposes linked error text, focuses the VIN,
  and announces that the record was not saved.

## Browser-comment refinements

- `VIN / Arrival date` and `Zone / Slot` share exact control and field bounds:
  44px controls on desktop and 48px controls on tablet/mobile. A 14px minimum
  support row keeps Normal and Validation layouts aligned without empty helper
  nodes or invented copy.
- Ready-teal differentiates the two Save controls from the Carbon generic
  primary action. White on `#155e49` measures 7.69:1 contrast.
- Busy still disables both commit controls, exposes `Saving…`, and applies
  `aria-busy`; neutral disabled styling remains intact.
- Normal and Validation were rechecked at desktop 1392px, tablet 1024px, and
  mobile 390px. All paired bounds remain stable with zero device/workspace
  horizontal overflow.

## Static and repository evidence

- `node --check design/v0.2.2-component-families/scripts/showcase-controls.js`
- Local HTML/CSS/JS/image references resolve.
- CSS brace counts balance; `git diff --check` passes.
- `npm run lint` and `npm run build` pass as repository integration checks.
  These do not replace the standalone interaction proof above.

## Review assets

- `previews/review-gallery.png`
- `previews/actions-and-inputs/desktop.png`
- `previews/actions-and-inputs/tablet.png`
- `previews/actions-and-inputs/mobile.png`

All four PNG review captures are 1600 × 900, refreshed after the form-rhythm
refinement, and visually inspected at page origin. Semantic HTML remains the
source of truth.

## Scope proof

`design/v0.2-component-language/**` remains the approved v0.2.1 milestone.
Status & Feedback and Overlays & Decisions remain explicitly pending.
