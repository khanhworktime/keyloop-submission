---
date: 2026-07-15
role: scout
scope: intelligent-inventory-dashboard-mvp-edge-cases
status: done-with-concerns
---

# MVP Edge-Case Scout

## Summary

Current baseline remains green: 54/54 Vitest and 21/21 Playwright. Six current risks remain; none invalidate the strict `> 90` domain rule or the one-write action snapshot already covered by tests.

## Findings

1. **Medium — persisted-state validation is not length- or calendar-strict.** The accepted plan requires schema and length validation at the Local Storage boundary (`phase-02...md:62-65`), but most persisted strings use only `trim().length > 0`, and dates use `Date.parse` (`src/mocks/persistence/inventory-state-parser.ts:17-23,49-109`). Values such as `2026-02-30` normalize instead of failing, while arbitrarily long VIN/master/actor/title/detail fields pass and then reach UI DTOs. Existing parser tests cover forbidden fields, references, and overlong notes only (`inventory-state-parser.test.ts:17-47`).

2. **Medium — Activity URL boundaries are internally inconsistent.** Calendar-invalid dates pass both URL and API checks because both combine a shape regex with `Date.parse` (`src/features/activity/activity-filter-state.ts:19-23`; `src/mocks/api/activity-query-parser.ts:12-20`). Out-of-range Activity pages are clamped by the repository, but `ActivityPage` never replaces the stale `?page=` URL as Inventory does (`src/features/activity/components/activity-page.tsx:33-58`; `src/features/inventory/components/inventory-page.tsx:34-41`). Lowercase Stock Numbers are accepted by the query path but fail exact-case combobox selection (`src/mocks/persistence/inventory-query-helpers.ts:116-124`; `src/features/activity/components/activity-unit-combobox.tsx:26-36`).

3. **Low — malformed JSON action requests become 500, not a validation response.** `request.json()` executes inside the generic handler work callback (`src/mocks/handlers.ts:125-137`); JSON parse failures are not `RequestValidationError`, so `mapError` returns `INTERNAL_ERROR` 500 (`src/mocks/handlers.ts:35-60`). This conflicts with the planned malformed-input 400 boundary and makes a client error appear to be service failure.

4. **Medium — several mobile Activity controls are 40px, below the specified 44px minimum.** Applied-filter chips use `min-h-10`, Activity search submit uses `min-h-10`, and combobox clear/trigger use `h-10 w-10` (`src/features/activity/components/activity-applied-filters.tsx:10-22`; `activity-page.tsx:25-29`; `activity-unit-combobox.tsx:39-44`). The committed browser suite checks overflow and axe output, not target geometry (`tests/e2e/responsive-accessibility.spec.ts:9-40`).

5. **Medium — accessibility and interaction proof is narrower than the plan.** Axe assertions discard moderate violations and check only serious/critical results (`tests/e2e/responsive-accessibility.spec.ts:27-40`). No committed test verifies drawer focus containment/restoration/Escape, keyboard grid/detail navigation, touch-target dimensions, back/forward URL state, error retry, double-submit prevention, or exactly one matching Activity event after the E2E save (`tests/e2e/inventory-manager-journey.spec.ts:8-56`). These are explicit phase-8/9/10 proof items.

6. **Low — the non-grid application chunk is also oversized.** Verified build evidence reports the app entry at 660.47 kB minified in addition to the isolated 1,078.58 kB Inventory Grid chunk (`plans/reports/tester-2026-07-15-mvp-verification.md`). Only the grid is lazy-loaded (`src/features/inventory/components/inventory-page.tsx:16-19`); route modules remain eagerly attached in `src/router.tsx`. Measure initial-route cost before deciding whether route-level splitting is warranted.

## Reconciled Non-Findings

- Exactly 90 days is non-aging in domain, repository, and handler proof.
- Action persistence performs one serialized `setItem` containing Unit and Activity changes; write failure preserves the previous real Local Storage snapshot.
- UI/features do not access Local Storage directly, and telemetry logs exclude VINs, notes, and response bodies.
- Cross-tab/multi-user synchronization is explicitly out of MVP scope; no race finding is raised for that boundary.
- No current Zone/Slot, auth/backend, or Vehicle Master admin scope leak found.

## Recommendations

1. Tighten persisted date/string validation and add corrupt-boundary tests.
2. Canonicalize Activity dates, page, and Stock Number casing; map malformed JSON to 400.
3. Raise Activity touch controls to 44px and add focused keyboard/focus/target-size regression tests.
4. Treat the 660.47 kB entry warning as a measurement task, not an automatic refactor.

## Unresolved Questions

None.

**Status:** DONE_WITH_CONCERNS  
**Summary:** Six evidence-backed risks documented; current 54/54 unit/integration and 21/21 browser baseline preserved.  
**Concerns/Blockers:** Validation/canonicalization and accessibility proof gaps merit review before declaring the story complete; no blocker to code review.
