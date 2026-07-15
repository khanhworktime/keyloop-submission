---
phase: 1
title: "Align Activity header typography and validate"
status: completed
priority: P2
effort: "1h"
dependencies: []
---

# Phase 1: Align Activity Header Typography and Validate

## Overview

Replace Activity-specific header styling with the exact utility-class pattern
used by Overview and Inventory, then verify no Activity layout regression.

## Context Links

- `docs/stories/US-007-activity-header-typography-parity.md`
- `src/features/overview/components/overview-page.tsx`
- `src/features/inventory/components/inventory-page.tsx`

## Key Insights

- Overview and Inventory already share identical header markup classes; that
  existing pattern is the canonical recipe and needs no new abstraction.
- Activity duplicates the same intent in `.activity-page__header` CSS but
  differs in eyebrow scale/tracking, title line height, subtitle spacing/scale,
  and responsive handling.
- Keeping `.activity-page` unchanged preserves the current header-to-card gap
  and every filter/feed placement rule.

## Requirements

- Functional: keep the existing `Activity`, `Operational activity`, and global
  subtitle copy and semantic h1 hierarchy.
- Visual: use the exact Overview/Inventory classes for the `max-w-3xl` header,
  12px uppercase tracked eyebrow, 26px mobile / 30px tablet-desktop title, and
  12px mobile / 13px tablet-desktop subtitle.
- Non-functional: preserve Activity query, URL filters, cards, pagination,
  responsive breakpoints, accessibility, and loading/error behavior.

## Architecture

Presentation-only deduplication: `ActivityPage` adopts the proven utility-class
recipe in JSX; `src/styles.css` stops owning Activity header typography. No
shared component, token, state, route, API, or domain change.

## Related Code Files

| Action | File | Change |
| --- | --- | --- |
| Modify | `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/activity/components/activity-page.tsx` | Apply the exact Overview/Inventory header and child utility classes; use a paragraph for the subtitle. |
| Modify | `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/styles.css` | Remove only `.activity-page__header` base rules and its 768px title-size override. |
| No change | `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/overview/components/overview-page.tsx` | Canonical reference only. |
| No change | `/Users/kristdev/Desktop/CodingChallenge/key-loop/src/features/inventory/components/inventory-page.tsx` | Canonical reference only. |

## Implementation Steps

1. In `activity-page.tsx`, set the header to `max-w-3xl`. Copy the exact eyebrow,
   h1, and subtitle class strings from Overview/Inventory; change only the
   subtitle element from `span` to `p`. Keep copy and render flow unchanged.
2. In `src/styles.css`, delete selectors targeting `.activity-page__header p`,
   `.activity-page__header h1`, and `.activity-page__header > span`, plus the
   Activity title override inside `@media (min-width: 768px)`.
3. Do not modify `.activity-page`, `.activity-layout`, filter/feed/event rules,
   or any responsive Activity grid selector.
4. Run existing Activity framing, responsive composition, URL-filter, and axe
   coverage. Compare desktop and mobile headers with Overview/Inventory, then
   run `npm run validate`.

## Todo List

- [x] Apply the shared header utility classes to Activity.
- [x] Remove only redundant Activity header typography CSS.
- [x] Confirm unchanged card placement at mobile, tablet, and desktop.
- [x] Run existing tests and full validation.

## Success Criteria

- [x] Eyebrow matches `text-xs`, bold, uppercase, `tracking-[0.14em]`, and the
  shared carbon color.
- [x] Title matches 26px mobile / 30px tablet-desktop, `leading-[1.08]`, bold,
  `tracking-[-0.045em]`, and the shared margins.
- [x] Subtitle matches 12px mobile / 13px tablet-desktop, relaxed line height,
  max width, shared color, and `mt-1.5` spacing.
- [x] Activity cards begin at the same positions as before across breakpoints;
  no filter, feed, pagination, overflow, or accessibility regression.
- [x] Existing Activity tests and `npm run validate` pass.

## Risk Assessment

- CSS deletion could accidentally remove feed-header styling. Delete only
  `.activity-page__header` selectors; retain `.activity-feed__header` rules.
- Wrapper-gap changes could move cards. Leave `.activity-page` and its 768px
  gap override unchanged.

## Security Considerations

None. No data, input, route, API, storage, or authorization change.

## Next Steps

Complete. No product or architecture documentation update was needed because
behavior and contracts did not change.

## Evidence

- Existing `npm run validate` passed: 59 unit tests, production build, and 31
  active Playwright cases with 11 intentional viewport-gated skips.
- Desktop 1440×1000 and mobile 390×844 visual checks confirmed the shared
  header scale; the user manually approved the result on 2026-07-15.
