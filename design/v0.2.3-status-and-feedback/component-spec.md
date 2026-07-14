# Precision Status & Feedback contract

Version: `v0.2.3` early review

## Semantic layers

1. **Domain status** persists with Inventory, Zone, or Slot data.
2. **Action feedback** confirms one user or system event.
3. **System availability** explains async progress and recovery.

Do not use a toast as the only location for a durable status, blocking error,
or required manager action.

## Domain status

| State | Meaning | Required cues |
| --- | --- | --- |
| Ready | Can progress | Circle marker + label |
| Needs attention | Manager review required | Diamond marker + label |
| In transit | Location is changing | Directional marker + label |
| Pending | Waiting on another step | Open marker + label |
| Blocked | Cannot continue | Square marker + label + reason |

Counts and color support meaning but never replace the label or marker.

## Feedback behavior

- Inline feedback stays beside the affected context.
- Toasts announce non-blocking outcomes and use `role="status"` by default.
- Blocking errors stay visible until resolved and use assertive announcements
  only when immediate attention is genuinely required.
- Busy state preserves existing content and prevents duplicate activation.
- Success confirms what changed; it never relies on a green fill alone.
- Error and offline states retain last-known data when it remains safe to show.
- Every failed operation provides one clear recovery action.

## Motion and sourcing

- Use the global `Animate UI → Base UI → approved primitive` hierarchy.
- Configure every sourced component through global Precision tokens and state
  recipes before use; portaled surfaces inherit the same theme context.
- Respect `prefers-reduced-motion`; progress meaning remains readable without
  animation.
- Icons remain Iconsax even when upstream examples use Lucide.

## Responsive contract

- Desktop compares status families and keeps action context visible.
- Tablet uses 48px frequent targets and preserves recovery actions.
- Mobile orders content by urgency: active operation, durable status, feedback,
  then collection summary. Toasts remain reachable and non-obscuring.
- No viewport creates horizontal page or device overflow.

## Scope boundary

No persistence, API request, production notification queue, or production
component dependency is implemented. State controls are deterministic review
tools for the HTML specimen.
