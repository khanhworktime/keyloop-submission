---
phase: 4
title: "Validate and document"
status: pending
effort: "2h"
---

# Phase 4: Validate and Document

## Automated Proof

- Repository: success, trim/clear optional field, case-insensitive VIN/stock conflicts,
  invalid status/lengths, missing Unit, one-write atomicity, failed-write rollback,
  exact changed-field Activity detail, and no-op no-write/no-Activity behavior.
- Parser/handler: request field errors, 404/409 mapping, persisted PATCH response,
  changed versus no-op Activity result, and correlation ID.
- Query: payload forwarding; four invalidations on success; none on failure.
- Component: prefill, status options, validation associations, API field errors,
  submit/pending/success, cancel/reopen, responsive Drawer classes, and persisted placement.

```bash
npx vitest run \
  src/mocks/persistence/inventory-state-parser.test.ts \
  src/mocks/persistence/local-storage-inventory-repository.test.ts \
  src/mocks/handlers.test.ts \
  src/features/inventory/inventory-queries.test.tsx \
  src/features/inventory-unit/inventory-unit-edit-drawer.test.tsx \
  src/features/inventory-unit/inventory-unit-page.test.tsx
npx tsc -b --pretty false
```

Do not run Playwright or browser automation for this story.

## Manual Browser Checklist (User-owned)

- Desktop opens/closes from the right; mobile opens/closes from the bottom.
- Trigger stays inside the summary; focus enters the sheet and returns on close.
- Labels, help, field errors, error summary, pending state, and touch targets are clear.
- VIN, Stock No., status, and optional Zone/Slot persist after close/reload.
- A real multi-field edit adds one Activity whose detail lists each changed field;
  a second unchanged save adds none.
- Overview totals, Inventory results/filters, Unit detail, and Activity labels refresh.
- Changing status or Zone/Slot does not alter arrival date, age, or strict `> 90` aging.

## Documentation

- Update `docs/product/inventory-dashboard.md` with the narrow free-text Zone/Slot exception.
- Update `docs/ARCHITECTURE.md` for PATCH, optional V1 field, atomic update Activity,
  no-op behavior, and cache invalidation.
- Add a focused ADR superseding only the placement-persistence sentence in decision 0010;
  preserve deferral of location entities, capacity, assignment, and movement.
- Update this story evidence and Harness proof flags only after checks pass.

## Success Criteria

- [ ] Focused Vitest passes.
- [ ] TypeScript passes with no diagnostics.
- [ ] User receives the manual browser checklist; no automated browser claim is made.
- [ ] Product, architecture, decision, story, and Harness matrix agree.
