---
phase: 1
title: "Redesign Inventory Unit detail composition"
status: pending
priority: P1
effort: "4h"
dependencies: []
---

# Phase 1: Redesign Inventory Unit Detail Composition

## Context Links

- [Canonical HTML](../../design/v0.3-responsive-screens/screens/inventory-unit.html)
- [Canonical page CSS](../../design/v0.3-responsive-screens/styles/inventory-unit.css)
- [Tablet shell CSS](../../design/v0.3-responsive-screens/styles/responsive-tablet.css)
- [Mobile shell CSS](../../design/v0.3-responsive-screens/styles/responsive-mobile.css)
- [Product boundary](../../docs/product/inventory-dashboard.md)

## Overview

Replace the current large hero / Shared Definition / three-card composition
with the exact v0.3 information hierarchy. Keep all live React data and action
flows. For Recent activity, use the Activity tab's existing event-row pattern
instead of inventing a separate mini-timeline treatment. Raise only page-local
Inventory Unit typography to production-page scale; preserve the established
layout and shared Activity event-row styling.

## Canonical Composition

```text
context strip: Inventory › Stock no. {stockNumber}
unit layout: 1.35fr / .65fr, 10px gap
  left row 1: compact Unit card
    122px media | identity and identifiers | age/status badge
    Vehicle Master → Inventory Unit relationship strip
    2×2 facts: age | arrival | Zone / Slot | status
  left row 2: Recent activity using Activity tab event rows
  right rows 1–2: Manager Decision
    introduction
    current proposed action
    threshold note
    filtered activity link
    green bottom-aligned Record proposed action CTA
```

## Data and Behavior Mapping

| Design content | Existing source / rule |
| --- | --- |
| Identity | `master.make`, `model`, `variant`; `unit.stockNumber`, `unit.vin` |
| Vehicle Master relationship | `master.id`, `model`, `variant`, `type` plus fixed explanatory copy |
| Inventory age / arrival / status | `daysInStock`, `unit.arrivalDate`, `unit.inventoryStatus` |
| Zone / Slot | exact read-only fixture text `North · N-04`; no domain or API field |
| Current proposed action | `unit.latestAction?.type`, otherwise `Not recorded`; render trimmed non-empty `unit.latestAction.note` directly below the value |
| Threshold | aging remains `daysInStock > 90`; exactly 90 is not aging |
| Recent activity | existing `activities`, recent-only limit, Activity tab event-row presentation |
| Activity navigation | existing filtered `/activity` link for the current stock number |
| CTA | existing `InventoryActionDrawer`; eligibility, save, toast, and invalidation unchanged |

## Requirements

- Replace the standalone desktop Back treatment with the context strip
  `Inventory › Stock no. …`. Preserve a usable back affordance on mobile because
  the live application shell does not contain the prototype's mobile back bar.
- Desktop uses `minmax(0, 1.35fr) minmax(290px, .65fr)` with a 10px gap. The
  Manager Decision panel occupies the right column across both left rows.
- Compact hero uses 122px media, 14px spacing/padding, a 22px identity heading,
  wrap-safe stock/VIN values, summary copy, and the age/status badge.
- Render the relationship strip between hero and facts: Vehicle Master details,
  cyan directional rail, and VIN-specific Inventory Unit explanation.
- Render one bordered 2×2 fact grid containing Inventory age, Arrival date,
  Zone / Slot (`North · N-04`), and Status. Keep age and lifecycle status distinct.
- Move current proposed action out of the left summary and into the right panel.
  Show its action label or `Not recorded`; when `latestAction.note` is present and
  non-empty, render the note directly beneath that value. Omit the note element
  for missing/empty notes and preserve the existing no-action UI. Do not duplicate
  the old blue action card.
- Make the right panel a flex column so its green commit CTA aligns to the bottom
  on desktop. Keep CTA absent/disabled according to the existing non-aging rule.
- Show the threshold note and exact `> 90` semantics. Retain the filtered Activity
  link and existing drawer/action behavior.
- Place Recent activity under the left card on desktop. Keep its recent-only
  slicing, empty state, and `View activity` header link, but render each item with
  the same semantic structure, marker, metadata, note treatment, and CSS classes
  used by the Activity tab's `activity-feed.tsx` event rows. Prefer extracting a
  shared presentational row only if direct reuse is not already practical; do not
  duplicate the row markup or change Activity tab behavior.
- Increase Inventory Unit page-local typography consistently: labels/eyebrows
  about 11–12px, metadata and body copy 13–14px, primary fact/action values
  14–16px, and section/identity headings 20–24px. Maintain the existing weight,
  hierarchy, line-height, wrapping, and contrast relationships.
- Do not change grid columns, gaps, card padding, media dimensions, responsive
  order/visibility, or shared Activity event-row classes to achieve the type lift.
  Recent activity must retain the Activity tab's shared row font sizes exactly.
- Preserve semantic headings, `dl` facts, keyboard order, visible focus, contrast,
  wrap behavior, and at least 44px targets (48px in tablet/mobile controls).

## Responsive Rules

### Tablet

- Keep two columns with `minmax(0, 1fr) 270px`.
- Hero becomes `96px minmax(0, 1fr)` with 12px padding; status moves below the
  identity, media stays at least 104px high, and summary copy is hidden.
- Keep relationship/facts compact, panel padding 14px, and CTA at least 48px.
- Keep Recent activity visible below the left Unit card. This intentionally
  overrides the stale canonical tablet hiding rule after manual review.

### Mobile

- Use one flex column: Unit card, Manager Decision, Recent activity.
- Present the compact hero as its own bordered card; media is full width and at
  least 104px high. Keep identifiers in a `90px / 1fr` grid.
- Keep the relationship strip and 2×2 facts; hide relationship supporting copy.
- Put the CTA in normal flow at 48px minimum; hide the decision-panel activity
  link because Recent activity follows directly.
- Keep only the canonical reduced recent-event amount while retaining the
  `View activity` header link and Activity tab row styling.
- Prevent horizontal overflow and retain the route's mobile back affordance.

## Related Code Files

| Action | File | Purpose |
| --- | --- | --- |
| Modify | `src/features/inventory-unit/inventory-unit-page.tsx` | Context strip, exact grid placement, tall decision panel, action/current/threshold/link/CTA composition, activity placement. |
| Modify | `src/features/inventory-unit/inventory-unit-summary.tsx` | Compact hero, relationship strip, and 2×2 facts including read-only fixture location. |
| Modify | `src/features/inventory-unit/inventory-unit-activity.tsx` | Recent-only Activity-tab row presentation, header link, empty state, responsive visibility. |
| Modify if required for reuse | `src/features/activity/activity-feed.tsx` | Extract a presentation-only event row without changing feed behavior. |
| Modify | `src/features/inventory-unit/inventory-action-drawer.tsx` | Green commit styling on the existing trigger only; drawer logic remains unchanged. |
| Modify | `src/features/inventory-unit/inventory-unit-page.test.tsx` | Assert corrected hierarchy, fixture location, activity placement/link, and action states. |
| Add or modify | `src/features/inventory-unit/inventory-unit-activity.test.tsx` | Assert recent limit, Activity tab row semantics/classes, empty state, and header link. |
| No change | `src/domain/inventory-types.ts`, `src/features/inventory/inventory-queries.ts` | No domain, API, query, or mutation expansion. |

## Implementation Steps

1. Recompose `InventoryUnitPage` into the context strip and exact two-row/two-column
   shell. Retain all query branches, toast state, and drawer props.
2. Rework `InventoryUnitSummary` to match the compact hero, relationship strip,
   and 2×2 facts. Render `North · N-04` as non-interactive fixture copy.
3. Move current-action display into Manager Decision. Add the threshold note,
   filtered Activity link, and green bottom CTA without changing action eligibility.
   Render the latest action note immediately under its value only when non-empty.
4. Align Recent activity with the Activity tab event-row pattern. Reuse or extract
   the smallest presentational row boundary while preserving each surface's list
   limit, headings, link labels, filtering, and empty states.
5. Apply the canonical tablet/mobile sizing, stacking, and target rules, except
   keep Recent Activity visible on tablet as documented above.
6. Raise page-local labels, copy, values, and headings within the specified type
   bands. Leave shared Activity row classes and layout geometry untouched.
7. Update focused tests for hierarchy, conditional states, read-only location,
   Activity row reuse, recent limits, links, drawer trigger behavior, and the
   presence/absence of the optional latest-action note.
8. Run focused Vitest and TypeScript only, then complete the manual checklist.

## Focused Validation

```bash
npx vitest run \
  src/features/inventory-unit/inventory-unit-page.test.tsx \
  src/features/inventory-unit/inventory-unit-activity.test.tsx \
  src/features/inventory-unit/inventory-action-drawer.test.tsx
npx tsc -b --pretty false
```

Do not run Playwright, browser automation, or the production bundle for this task.

## Manual Visual Checklist

- Desktop: context strip, 1.35/.65 grid, 122px hero media, relationship, four
  facts, Activity-style recent rows below left, and right panel spanning both rows.
- Decision panel: current action, correct threshold copy, filtered activity link,
  and green CTA pinned to the bottom without changing drawer behavior.
- Identity hero: Edit aligns with the Inventory Unit eyebrow, the aging badge
  wraps beside the vehicle title, and the metadata strip contains Vehicle Master
  only—no duplicate Unit label or relationship arrow.
- Proposed action note: non-empty note appears directly below the current action
  value; missing/empty note and no-action states show no stray note container.
- Activity rows: marker, event type/title, date/actor metadata, and optional note
  match the Activity tab; recent limit and View activity link remain intact.
- Typography: unit-page labels read at roughly 11–12px, metadata/body at 13–14px,
  values at 14–16px, and headings at 20–24px; shared Activity rows are unchanged.
- Tablet: 270px rail, 96px hero media column, hidden summary, visible Recent
  activity below the Unit card, 48px CTA, no clipping.
- Mobile: one-column Unit → Decision → Recent activity order, full-width hero,
  compact relationship/facts, reduced recent items, and no horizontal overflow.
- Non-aging, no-action, no-activity, long VIN/title/note, loading, error, and empty
  states remain honest and accessible.

## Todo List

- [x] Recompose the canonical page shell and responsive geometry.
- [x] Implement compact hero, relationship strip, and four facts.
- [x] Recompose Manager Decision with current action, threshold, link, and CTA.
- [x] Reuse the Activity tab row pattern for Recent activity.
- [x] Raise only page-local Inventory Unit typography to production-page scale.
- [x] Render and test the optional latest proposed-action note in the decision panel.
- [x] Update focused tests and pass TypeScript compilation.
- [ ] Complete manual visual review.

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Fixture location appears like persisted placement | Label it read-only in code structure; add no domain/API/mutation and test exact copy only. |
| Shared Activity row extraction changes the Activity tab | Extract presentation only, preserve props/markup/classes, and include existing Activity tests if the shared file changes. |
| Tall rail loses bottom alignment | Use a flex column with CTA `margin-top: auto`; return it to normal flow on mobile. |
| Responsive hiding removes navigation | Keep the mobile back affordance and the Recent activity header link even when the panel link is hidden. |
| Layout changes action semantics | Leave `isAging`, mutation, validation, toast, and invalidation logic untouched; run drawer tests. |

## Security Considerations

No new data or trust boundary. Render persisted text through React and keep the
legacy location string presentation-only; add no HTML injection or storage access.

## Next Steps

Complete the pending manual visual review. Any real Zone/Slot model remains a
separate future scope.
