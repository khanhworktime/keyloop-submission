---
title: "Inventory Unit detail page redesign"
description: "Match the canonical v0.3 Inventory Unit composition while preserving existing React behavior."
status: in_progress
priority: P1
branch: "main"
tags: [refactor, frontend, responsive]
blockedBy: []
blocks: []
created: "2026-07-15T10:07:06.699Z"
createdBy: "ck:plan"
source: skill
---

# Inventory Unit Detail Page Redesign

## Overview

Recompose `/inventory/$unitId` from the canonical v0.3 HTML/CSS: context
breadcrumb, compact unit card, Vehicle Master relationship strip, 2×2 facts,
Recent activity below the left card, and a tall Manager Decision rail. Preserve
the existing query, drawer, mutation, toast, filtered Activity navigation, and
loading/error/empty/non-aging behavior. Refine page-local typography to match
other production pages without changing this composition or the shared Activity
event-row styles. When the latest proposed action has a non-empty note, show it
directly below the current action value without changing no-action states. The
save notification uses the official Base UI Toast anatomy and a compact,
responsive presentation instead of a custom timer-driven status card.

## Source of Truth

- `design/v0.3-responsive-screens/screens/inventory-unit.html`
- `design/v0.3-responsive-screens/styles/inventory-unit.css`
- `design/v0.3-responsive-screens/styles/responsive-tablet.css`
- `design/v0.3-responsive-screens/styles/responsive-mobile.css`

These files override the prior screenshot interpretation and the stale US-010
wording that omitted the relationship and location context.

## Phases

| Phase | Name | Status |
| --- | --- | --- |
| 1 | [Redesign Inventory Unit detail composition](./phase-01-redesign-inventory-unit-detail-composition.md) | Implementation complete; manual visual approval pending |

## Scope Boundary

- Presentation changes in existing Inventory Unit components and focused tests.
- Reuse the Activity tab event-row presentation for Recent activity; retain its
  recent-only list, header link, and shared typography/styles unchanged.
- Typography refinement only: unit-page labels about 11–12px, metadata/body
  13–14px, values 14–16px, and headings 20–24px.
- Present `latestAction.note` immediately below the Current proposed action value
  only when it is present and non-empty; preserve existing empty/no-action UI.
- `North · N-04` is fixed, read-only legacy fixture copy only. Do not add Zone or
  Slot routes, persistence, API fields, mutations, or domain types.
- No changes to query/action behavior and no Playwright or browser automation.
- Keep one save toast at a time, retain explicit dismissal and the eight-second
  automatic timeout, and place it above mobile navigation without covering
  primary actions.

## Success Criteria

- Desktop, tablet, and mobile match the canonical composition and responsive
  rules, including the green bottom CTA and four facts.
- Recent activity uses the existing Activity tab row pattern without changing
  filtering, navigation, or data behavior.
- Unit-specific text is legible at production-page scale while shared Activity
  rows and all layout measurements remain unchanged.
- Optional proposed-action notes appear in the decision panel with focused test
  coverage and no regression to empty-note or no-action rendering.
- Focused Vitest and `npx tsc -b --pretty false` pass; final appearance is
  checked manually.
- Toast rendering, message replacement, and close behavior have focused unit
  coverage; motion respects the user's reduced-motion preference.
