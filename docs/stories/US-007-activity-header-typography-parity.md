# US-007 Activity Header Typography Parity

## Status

implemented

## Lane

normal

## Product Contract

Use the same responsive page-header typography and spacing on Activity as the
existing Overview and Inventory pages.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/stories/US-006-activity-content-composition-parity.md`

## Acceptance Criteria

- [x] Activity eyebrow uses the same 12px uppercase tracked label as Overview
  and Inventory.
- [x] Activity title uses the shared 26px mobile / 30px tablet-desktop scale,
  line height, weight, and tracking.
- [x] Activity subtitle uses the shared responsive body scale and spacing.
- [x] The Activity cards retain their existing placement with no responsive or
  accessibility regression.

## Design Notes

- Commands: no change.
- Queries: no change.
- API: no change.
- Tables: no change.
- Domain rules: no change.
- UI surfaces: Activity page header only.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Existing Activity framing assertions remain green. |
| Integration | Activity query and URL-filter behavior remain green. |
| E2E | Responsive Activity composition and axe checks pass. |
| Platform | Desktop and mobile screenshots match the shared page-header scale. |
| Release | `npm run validate` passes. |

## Harness Delta

No Harness policy change.

## Evidence

- User comparison screenshots supplied on 2026-07-15.
- Activity and Inventory were visually compared at 1440×1000; Activity was
  also checked at 390×844.
- Existing validation passed: 59 unit tests, production build, and 31 active
  Playwright E2E tests with 11 intentional viewport-gated skips.
- The user manually confirmed the corrected header on 2026-07-15 and requested
  ticket closure without repeating automated UI validation.

## Unresolved Questions

None.
