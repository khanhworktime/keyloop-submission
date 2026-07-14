# Keyloop-aligned brand specification

Status: working foundation, `v0.1`

## Brand relationship

This submission uses the official Keyloop wordmark and visual language. It is
not presented as an official released Keyloop product. The interface should
feel native to the current Keyloop ecosystem while remaining a clearly scoped
coding-challenge submission.

## Official asset

- Preferred logo: `assets/keyloop-logo-slate.svg`
- Origin: user-provided official vector
  (`keyloop-vector-logo-seeklogo/keyloop-seeklogo.svg`), adopted 2026-07-13.
- Verification: the geometry matches the current Keyloop wordmark and uses the
  documented slate color `#3C576B`.
- Do not redraw, distort, outline, shadow, crop, or separate the wordmark.
- Preserve clear space equal to at least half the logo height.
- Minimum digital width: 150px when the complete mark is shown.
- Use the slate version on light surfaces. A white inverse may be produced from
  the same approved path only when placed on a dark surface.

## Official UI palette

Extracted from the current Keyloop website design tokens:

| Role | Token | Value |
| --- | --- | --- |
| Carbon black | `carbon-900` | `#11181C` |
| Deep graphite | `carbon-800` | `#162228` |
| Tech slate | `carbon-700` | `#2E4758` |
| White | `white` | `#FFFFFF` |
| Website grey | `stone-800` | `#F1F1F3` |
| UI border | `stone-900` | `#D9E0E4` |
| Signal blue | `signal-blue` | `#3DA5FF` |
| Fusion blue | `fusion-blue` | `#00C7F2` |
| Pulse green | `success` | `#18E0A4` |
| Energy coral | `coral` | `#FF6B57` |
| Warning | `warning` | `#FFB800` |
| Error | `error` | `#FF4D4F` |

Signal and Fusion blues are interactive accents, not default body-text colors.
Carbon and Tech Slate provide the accessible foreground hierarchy. Coral is
reserved for aging-stock attention and destructive/high-risk feedback; it
must not become decorative wallpaper.

## Typography

- Headings: Plus Jakarta Sans, then IBM Plex Sans.
- UI and body: IBM Plex Sans, then system sans-serif.
- Body minimum: 16px on touch surfaces; compact desktop table metadata may use
  13-14px with sufficient contrast and row height.
- Use tabular numerals for VIN fragments, stock age, capacity, and financial
  values. VIN itself uses a readable monospace fallback only in detail views.

## Product character

Soft, calm, connected, precise, and operationally credible. Softness comes
from breathable spacing, gentle surface separation, and responsive motion—not
from low contrast, excessive blur, or toy-like rounding.

## Interaction and responsive contract

- Desktop: maximum information visibility, persistent floating sidebar,
  compact but readable data tables, contextual right-side detail panels.
- Tablet/iPad: 48-56px targets, reduced columns, sticky action trays, sheets
  that support one-handed use, and no hover-only meaning.
- Mobile: fast-check summaries, prioritized exceptions, progressive disclosure,
  and bottom sheets for quick actions.
- Keyboard focus is always visible. Color is never the only carrier of status.
- Default control target: at least 44px; high-frequency tablet actions: 48px.

## Visual motif

Use the continuous loop in the Keyloop mark as a structural idea: connected
navigation rails, linked inventory-to-location relationships, and uninterrupted
action/history flows. Zone and Slot layouts may echo dealership lanes and bays,
but should avoid literal car illustrations as decoration.

## Prohibited patterns

- Generic purple AI gradients or neon-on-dark SaaS styling.
- Excessive nested cards and ornamental icons.
- Glass effects that reduce contrast or make touch boundaries ambiguous.
- Bright blue body copy on white.
- Invented vehicle statistics used only to make a design look full.
