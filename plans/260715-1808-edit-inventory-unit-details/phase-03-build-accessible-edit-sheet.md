---
phase: 3
title: "Build accessible edit sheet"
status: pending
effort: "3h"
---

# Phase 3: Build Accessible Edit Sheet

## Overview

Add a focused edit form inside the current Inventory Unit summary hierarchy.

## Requirements

- Add an Edit button inside the summary hero with an unambiguous accessible name.
- Create `inventory-unit-edit-drawer.tsx` using Base UI Drawer. At desktop it is
  right-anchored and enters from the right; on mobile it is a bottom sheet using
  the established responsive drawer pattern.
- Prefill VIN, Stock No., lifecycle status, and persisted Zone/Slot on every open.
- Use labeled text inputs and existing `SelectField` for status. Show required and
  maximum-length guidance; Zone/Slot is optional plain text.
- Mirror basic client validation for immediate help, but treat API/repository
  validation as authoritative. Map returned field errors beside their controls;
  focus an error summary when save fails.
- Disable duplicate submits while pending. On success close, restore trigger focus,
  show a save confirmation, and let invalidated queries repaint the page.
- Cancel, Escape, backdrop, and close button discard draft changes.
- Replace the summary's hard-coded legacy placement map with
  `detail.unit.zoneSlot ?? 'Not assigned'`.

## Related Files

- `src/features/inventory-unit/inventory-unit-edit-drawer.tsx` (new)
- `src/features/inventory-unit/inventory-unit-summary.tsx`
- `src/features/inventory-unit/inventory-unit-page.tsx`
- `src/components/ui/select-field.tsx` (reuse; change only if required for errors)

## Implementation Steps

1. Implement controlled form state, validation/error mapping, and the responsive drawer.
2. Place the trigger in the summary without disturbing identity/status hierarchy.
3. Submit the mutation, announce success, and render persisted placement.

## Success Criteria

- [ ] Desktop uses a right drawer; mobile uses a bottom sheet.
- [ ] Every field has a label, error association, and keyboard-accessible control.
- [ ] Reopen resets to current server data; cancel never persists draft state.
- [ ] Successful edits update visible identifiers, status, and Zone/Slot.
- [ ] Existing proposed-action drawer and aging behavior remain intact.

## Risks

- Two drawers conflict: keep independent controlled roots and triggers.
- Identifier changes stale activity labels: Activity invalidation refreshes joined Unit data.
