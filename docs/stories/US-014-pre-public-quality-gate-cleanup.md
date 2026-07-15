# US-014 Pre-public Quality Gate Cleanup

## Status

implemented

## Lane

normal

## Product Contract

The accepted browser experience builds and starts without errors, preserves
backward-compatible Activity links, and normalizes them to the current URL
shape without retaining stale parameters.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`

## Acceptance Criteria

- React source no longer uses render-time ref mutation or effect-driven draft-state synchronization.
- Legacy Activity `unit` links normalize to `units` and remove invalid pagination.
- Async Base UI Select tests wait for portalled options, and browser assertions match accepted lifecycle and responsive UI behavior.
- The production build completes and the development server starts without errors.

## Design Notes

- Preserve legacy Activity URL parsing; only canonical output changes.
- Do not change Inventory aging or lifecycle business rules.
- Keep verification bounded to the user-approved build and startup checks.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Assertions updated; suite intentionally not run for this quick cleanup. |
| Integration | Not required. |
| E2E | Assertions updated; suite intentionally not run for this quick cleanup. |
| Platform | Not required. |
| Release | `npm run build`; successful Vite development-server startup. |

## Harness Delta

Normal maintenance request recorded as intake #63. No API, persistence, or
product-contract change.

## Evidence

- Production build passed with TypeScript compilation and Vite packaging.
- Vite development server started successfully; port 5173 was already occupied,
  so the verification process used Vite's automatic fallback to port 5174.
- Full unit and browser suites were intentionally omitted per user direction.
- Lint and React Doctor were not rerun; React Doctor was blocked because its
  external package execution was not approved by the environment security gate.
