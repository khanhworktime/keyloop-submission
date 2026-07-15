# Activity Content Composition Parity — Investigation

## Executive Summary

- **Issue:** Live `/activity` retains an earlier, spacious Activity composition; supplied reference uses compact `Activity` / `Operational activity` hierarchy, a 282px filter rail, visible count, and smaller feed rows.
- **Impact:** Desktop visual parity fails; filters, URL state, pagination, and Inventory Unit navigation are otherwise intact.
- **Root cause:** `activity-page.tsx` hard-codes superseded header/rail copy; `styles.css` diverges from supplied `activity.css` desktop geometry and event sizing; `activity-feed.tsx` omits the visible result count and renders extra row metadata absent from the reference.
- **Status:** Diagnosed. No runtime source changed.

## Evidence

| Area | Live capture | Supplied reference | Source cause |
| --- | --- | --- | --- |
| Page hierarchy | `Operational history` → `Decisions stay visible.` | `Activity` → `Operational activity` | `src/features/activity/components/activity-page.tsx:78-80` |
| Page subtitle | Record-attached wording | `Review manager actions, location changes, and system events across all inventory.` | `activity-page.tsx:80`; reference `design/.../activity.html:24` |
| Rail | 268px, `Find activity` / `Keep context narrow.`, separate search field | 282px, `Filters`, unit combobox then advanced filters | `src/styles.css:1278`; `activity-page.tsx:88-104`; reference CSS final desktop rule and HTML:26-30 |
| Feed header | No visible total count | right-aligned bordered `3 events` control | `activity-feed.tsx:23-31`; reference `activity.html:31`, `activity.css` `.event-count` |
| Event grid | `64px 28px ...`, 12px list gutter, 28px marker | `72px 32px ...`, 14px gutter, 32px marker | `src/styles.css:568-612,1282`; reference `activity.css` `.event-list`, `.event`, `.event-marker` |
| Row density | 13px padding, 14px title, 11px detail plus trailing timestamp/actor and model line | 14px compact typography, no trailing row metadata/model line in fixture | `src/styles.css:571-697`; `activity-feed.tsx:54-60`; reference `activity.css` `.event*`, `activity.html:31` |

Visual comparison: current capture is 1440×1000 and includes the production shell; the supplied reference is an 1138×304 crop of the Activity content. Relative to its content origin, live rail/feed is **268px + 10px** while reference is **282px + 10px**. Header-to-card gap is broadly already aligned (about 20px after subtitle); the visible mismatch is the old labels and over-wide/dense-content geometry, not a shell-spacing defect.

## Root-Cause Trace

1. The running capture renders exactly the JSX at `activity-page.tsx:78-80`; old hierarchy is intentional code, not a loading/data fault.
2. Desktop CSS applies `@media (min-width:1200px) .activity-layout { grid-template-columns:268px ... }` at `styles.css:1278`. The supplied design’s last desktop override is 282px. This shifts the feed left by 14px and makes the rail visibly narrower.
3. The feed has only a screen-reader result count (`activity-feed.tsx:31`). The reference keeps that accessible status but also displays a visual count badge in the header.
4. Production event markup adds `em` (full timestamp + actor) and a model `small` below each stock link. Neither exists in the reference fixture; together with larger production typography, they increase row height and weaken the compact scan pattern.

## Minimal Safe Source Changes

1. In `activity-page.tsx`, replace page copy with `Activity`, `Operational activity`, and the supplied global subtitle. Replace the desktop rail’s `Find activity` / `Keep context narrow.` framing with a single `Filters` heading.
2. Keep search functional by relying on the existing search control in `ActivityFilterDrawer`; remove only the duplicate desktop `ActivitySearchForm` and its icon/import if the rail must match the reference. Do not change `filters`, `toActivityQueryFilters`, or `onFiltersChange`.
3. In `activity-feed.tsx`, add a visual, non-interactive count badge based on `data.meta.total` while retaining the existing `role="status"`. Keep Unit links and all filtering/pagination props unchanged.
4. Align desktop CSS with design: 282px rail; 14px event-list gutter; `72px 32px minmax(0,1fr) auto` event grid; 32px markers; reference-scale event typography/padding. Scope these to desktop so tablet/mobile retain their deliberate layouts.
5. Before suppressing `em`/model text, preserve its information in the visible event detail or another accessible equivalent. The reference encodes manager attribution in the detail line; do not silently remove actor evidence merely to shorten rows.

## Focused Regression Tests

- Update `src/features/activity/components/activity-page.test.tsx` to assert `Operational activity` and the supplied global subtitle with a URL unit filter; retain the empty-state/applied-filter assertion.
- Add/extend `ActivityFeed` component coverage: visual count text uses singular/plural correctly and every event still exposes its named Unit link.
- Update the current old-copy assertions in `tests/e2e/responsive-accessibility.spec.ts:142-156` and `tests/e2e/inventory-manager-journey.spec.ts:62-75`. On desktop assert: `Activity` context, `Operational activity`, `Filters`, `activity-layout` rail width 282px, visible event count, and an event grid first-column/marker geometry. Keep existing mobile/tablet filter and route assertions.
- Capture `/activity` at desktop, tablet, and mobile after the change; compare desktop hierarchy/rail/feed geometry to the supplied image and run existing axe/overflow coverage.

## Verification Notes

- Screenshot evidence inspected: `/private/tmp/activity-current.png` and `/var/folders/lg/yzbmlf817vsgq26s2nwggflh0000gn/T/codex-clipboard-0e55b98e-8932-41aa-9657-43a9ea0cf753.png`.
- Browser automation unavailable in this environment (`agent-browser` command not installed); no source changes or test execution performed for this diagnosis.

## Unresolved Questions

- The reference uses fixture wording (`Review fixture`, capitalized action title) while production uses live totals and domain event text. Treat this as visual hierarchy guidance unless product explicitly requires fixture copy/data.
- Whether actor/timestamp should remain as a compact metadata line or be folded into `activity.detail` needs product confirmation; removing it without replacement conflicts with the requirement to preserve activity evidence.
