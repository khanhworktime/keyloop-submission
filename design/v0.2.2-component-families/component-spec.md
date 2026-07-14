# Precision component-family contract

Version: `v0.2.2` Actions & Inputs review

## Form rationale

- Narrative role: prove decision controls, not simulate a complete screen.
- Viewing distance: desktop comparison, tablet action, mobile task completion.
- Temperature: calm, precise, soft through spacing rather than weak contrast.
- Capacity: one board with four working regions and one compact state rail.
- Motif: a decision lane runs from search → selection → owned data → commit.

## Action hierarchy

| Variant | Contract |
| --- | --- |
| Primary | One per region; Carbon fill, white label |
| Data commit | Ready-teal fill marks write intent; it does not mean the save already succeeded |
| Secondary | White surface, visible boundary, Carbon label |
| Contextual | Pale blue surface, dark blue label |
| Destructive | Explicit red outline/surface after intent is clear |
| Icon-only | 44px minimum, English accessible name and tooltip |

Loading retains the action footprint, disables repeat activation, and announces
plain-language progress. Disabled controls remain readable but unmistakably
inactive. Hover never reveals an essential action.

## Input contract

- Search, text, select, and textarea always have persistent labels or an
  equivalent programmatic name; placeholder text is supporting copy only.
- Field boundary is `control-boundary`; focus uses the canonical dual ring.
- Paired form fields reserve a minimum support row for helper or validation
  copy. Empty space is layout only; no invented or announced copy.
- Error uses `aria-invalid`, a non-color icon, and linked error text.
- Success uses a non-color icon and linked confirmation text.
- Native text input, textarea, checkbox, and radio semantics remain the base
  where they satisfy the interaction. Select-like and calendar controls follow
  the custom-control matrix below.
- Filter chips use buttons with synchronized `aria-pressed` state.
- The switch uses `role="switch"` and synchronized `aria-checked` state.

### Custom-control source matrix

Availability verified against the official Animate UI
[component catalog](https://animate-ui.com/docs/components) and
[roadmap](https://animate-ui.com/docs/roadmap), plus the official Base UI
[component catalog](https://base-ui.com/react/components), on 2026-07-14.

| Control | Production contract | Animate UI status | Base UI fallback status |
| --- | --- | --- | --- |
| Date-time picker | Custom, app-owned field and overlay | Not in the current catalog | Not in the current catalog |
| Calendar | Custom, app-owned calendar surface | Not in the current catalog | Not in the current catalog |
| Select | Custom, app-owned trigger and listbox | Planned; not a current component | Available; preferred primitive |
| Combobox | Custom, app-owned input and listbox | Planned; not a current component | Available; preferred primitive |
| Autocomplete | Custom, app-owned input and suggestions | Planned; not a current component | Available; preferred primitive |

- Animate UI is the first source to check for component structure, composition,
  and motion. When a matching official component becomes available, copy its
  source into the application and adapt it to Precision tokens and Iconsax.
- Roadmap entries never authorize a speculative import or invented Animate UI
  API. When Animate UI does not supply the control, use Base UI if its official
  catalog provides the primitive. If an Animate UI component has multiple
  primitive variants, select the Base UI-based variant.
- Before a sourced component enters a feature, configure it against the global
  Precision styling layer. Map all visual tokens and interaction states through
  shared CSS variables or global component recipes; do not retain isolated
  upstream theme values. Portaled surfaces must inherit the same token context.
- If neither official catalog supplies the control, use a separately approved
  accessible primitive and keep the result app-owned.
- Every adoption requires keyboard, screen-reader, touch, focus,
  `prefers-reduced-motion`, and responsive verification. Motion is enhancement,
  never the only carrier of state or hierarchy.

## Responsive contract

- Desktop shows the action ladder, filters, selection, and form together.
- Tablet keeps comparison but raises frequent targets to at least 48px.
- Mobile becomes one vertical task flow. Primary text actions are full-width;
  secondary utilities may become labelled icon buttons when space competes.
- No mode may create horizontal page or device overflow.

## Scope boundary

No form data leaves the document. No persistence, API call, production custom
control implementation, production validation rule, Status & Feedback board,
or Overlay board is implemented in this milestone. Native Select and date
fields in the HTML specimen are visual placeholders for the custom production
controls defined above.
