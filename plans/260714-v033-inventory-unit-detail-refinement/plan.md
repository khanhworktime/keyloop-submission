---
title: "v0.3.3 Inventory Unit Detail Refinement"
description: "Refine the VIN-specific detail and manager-decision flow across desktop, tablet, and mobile."
status: completed
priority: P1
branch: "main"
tags: [design, responsive, accessibility, inventory]
blockedBy: []
blocks: []
created: "2026-07-14T11:35:13.717Z"
createdBy: "ck:plan"
source: skill
---

# v0.3.3 Inventory Unit Detail Refinement

## Overview

Refine the existing Inventory Unit HTML prototype without changing domain
meaning or production architecture. Preserve one continuous rail from Vehicle
Master to VIN-specific state, Zone/Slot, manager action, and Activity evidence.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Lock Detail Contract](./phase-01-lock-detail-contract.md) | Completed |
| 2 | [Refine Semantic Responsive Detail](./phase-02-refine-semantic-responsive-detail.md) | Completed |
| 3 | [Validate Detail Evidence](./phase-03-validate-detail-evidence.md) | Completed |

## Dependencies

- Selected Precision guideline and approved v0.3 shell.
- Product contract and US-001 remain authoritative; story stays `in_progress`.
- Animate UI → Base UI → approved primitive remains production source guidance.

## Files

- Modify `screens/inventory-unit.html` and `styles/inventory-unit.css`.
- Modify shared screen JavaScript only for detail-specific continuity bugs.
- Append bounded evidence to v0.3 validation and US-001 after proof.

## Contract

- Desktop keeps full Master, VIN, Zone/Slot, action, and recent-history context.
- Tablet keeps four essential facts and a visible 48px commit path.
- Mobile removes duplicate headings, keeps summary-first context, and uses a
  scroll-safe bottom sheet above navigation and safe-area insets.
- Semantic facts use `dl`; history uses list/time markup; all actions are honest,
  named, keyboard reachable, and at least 44px (48px for frequent mobile work).

## Proof boundary

HTML design evidence only. Do not claim React routing, API persistence, Base UI
runtime, or US-001 completion. Record browser proof only when navigation is
permitted; otherwise report source/static evidence and the blocked visual gate.

## Completion evidence

- Identity and semantics now express Master → Unit → Zone/Slot → Action →
  History without repeated headings or fake hash actions.
- Tablet preserves four facts; mobile places Action before History with a 48px
  trigger, 44px Activity links, and safe-area-aware internal sheet scrolling.
- Localhost browser proof passed save/toast/reload continuity, zero horizontal
  overflow in all three modes, and a clean console.
- Reference, JavaScript, CSS, focused source, lint, and bundle checks passed;
  independent tester and reviewer checks passed.
- Evidence remains limited to the HTML design prototype. US-001 remains
  `in_progress`; no production React, API persistence, or Base UI runtime claim.

## Unresolved questions

None.
