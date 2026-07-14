# US-002 Basic Design Foundation

## Status

implemented

## Lane

tiny

## Product Contract

Provide one approved, reviewable design foundation for the Keyloop Inventory
Intelligence submission before production feature implementation begins.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/decisions/0010-supply-inventory-mvp-scope.md`
- `design/v0.5-design-handoff/scope.md`
- `design/final/README.md`

## Acceptance Criteria

- Brand, component language, responsive behavior, and the four-screen manager
  journey are documented as versioned HTML design evidence.
- `design/final/index.html` provides the canonical quick-review entrypoint.
- The approved flow is Overview → Inventory → Inventory Unit → Activity.
- Vehicle Master is supporting; Locations, Zones, and Slots are deferred.
- Review instructions and a current preview image are included.

## Design Notes

- Primary navigation: Overview, Inventory, Activity.
- Aging rule: `daysInStock > 90`.
- Component sources: AG Grid, Animate UI/Base UI, and Iconsax.
- Versioned design folders remain editable evidence; `design/final` is a
  curated entrypoint rather than a duplicate source tree.

## Validation

| Layer | Expected proof |
| --- | --- |
| Static | Final review references resolve and deferred routes are not linked |
| Browser | Desktop/mobile layouts and the four-screen click flow pass |
| Build | `npm run lint` and `npm run build` pass |
| Production | Not applicable; tracked separately by US-001 |

## Harness Delta

Adds a dedicated completed design milestone so US-001 can remain honest about
pending production behavior.

## Evidence

- `design/final/index.html`
- `design/final/previews/final-review-index.jpg`
- 23/23 final-bundle references and anchors resolved.
- Desktop and mobile review hub checks found no horizontal overflow or console
  errors.
- Overview → Inventory → Inventory Unit → Activity navigation passed.
- Independent QA, accessibility review, and documentation audit passed.
- `npm run lint` and `npm run build` passed on 2026-07-14.
- Harness completion verification passed and marked `US-002` implemented.
