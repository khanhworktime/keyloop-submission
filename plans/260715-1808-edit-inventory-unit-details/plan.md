---
title: "Edit Inventory Unit details"
description: "Persist validated Inventory Unit identity, lifecycle status, and optional free-text placement through the existing typed browser API."
status: pending
priority: P1
branch: "main"
tags: [feature, inventory, persistence, accessibility]
blockedBy: []
blocks: []
created: "2026-07-15T11:08:29.980Z"
createdBy: "ck:plan"
source: skill
---

# Edit Inventory Unit Details

## Overview

Add an Edit action inside the Inventory Unit summary. The form opens as a right
drawer on desktop and bottom sheet on mobile, then saves VIN, Stock No., lifecycle
status, and optional free-text Zone/Slot through React Query → typed Axios → MSW →
Local Storage. A real change appends one atomic `unit-updated` Activity; a no-op
save creates no Activity. Aging remains derived only from arrival date.

## Phases

| Phase | Name | Status |
| --- | --- | --- |
| 1 | [Define update contract and persistence](./phase-01-define-update-contract-and-persistence.md) | Pending |
| 2 | [Wire HTTP mutation and invalidation](./phase-02-wire-http-mutation-and-invalidation.md) | Pending |
| 3 | [Build accessible edit sheet](./phase-03-build-accessible-edit-sheet.md) | Pending |
| 4 | [Validate and document](./phase-04-validate-and-document.md) | Pending |

## Boundaries

- Keep the V1 storage envelope; optional `zoneSlot` is backward-compatible.
- No Location/Zone/Slot entity, capacity, assignment, or movement workflow.
- Browser proof is user-owned manual review; automated proof is focused Vitest
  plus `npx tsc -b --pretty false`.

## Success Criteria

- Valid edits persist and refresh Overview, Inventory, Unit, and Activity data.
- Required/length/enum/uniqueness failures are field-addressable and do not write.
- Changed fields produce exactly one atomic `unit-updated` Activity; no-op saves do not.
- Drawer/sheet focus, labels, errors, pending state, close, and responsive behavior are accessible.
