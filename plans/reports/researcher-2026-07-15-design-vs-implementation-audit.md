# Design vs implementation audit

## Authority and method

- Canonical review entrypoint: `design/final/index.html`, verified by `design/final/README.md` and `docs/stories/US-002-basic-design-foundation.md`.
- Approved screen sources: the four HTML prototypes under `design/v0.3-responsive-screens/screens/`; `design/v0.5-design-handoff/scope.md` overrides their obsolete Locations/Master navigation. The production three-item nav is therefore correct.
- Compared repository previews/CSS with the live React app at `http://127.0.0.1:5173` at 1440x900, 1024px tablet, and 390x844.

## Prioritized mismatches

| Priority | Mismatch and observed evidence | Target | Likely production source |
| --- | --- | --- | --- |
| P0 | **Desktop sidebar does not stay pinned on long pages.** On Inventory at 1440x900 it measured 1060px high; after the document scrolled 208px, its top was `-184px`. Grid stretching makes the sticky element taller than the viewport, so sticky cannot engage. | Design shell is viewport-height; `.workspace` owns inner scrolling, while sidebar remains stable. | `src/styles.css:449-469`, `src/styles.css:536-552`; shell markup in `src/components/app-shell/app-shell.tsx`. Compare `design/v0.3-responsive-screens/styles/application-shell.css:1-8`. |
| P0 | **Workspace surface/frame is missing.** Live desktop header and main are transparent on the page canvas, with no shared rounded workspace boundary. | One `#f7f8f9` rounded 18px workspace with a white app bar, border, clipped corners, and internally scrolling screen. | `src/components/app-shell/app-shell.tsx`, `src/styles.css:170-235`, `src/styles.css:572-589`. Compare `application-shell.css:6-8`. |
| P1 | **Shell spacing is about 2x the reference.** Live desktop uses 24px outer padding, 24px rail/content gap, and 24px main top padding. | 12px outer padding, 12px gap, 18px screen padding. This denser geometry is central to the approved cockpit composition. | `src/styles.css:536-585`. Compare `application-shell.css:1,8`. |
| P1 | **Sidebar/rail selected state differs.** Live uses translucent blue with white text and a blue inset rule; desktop target uses a white pill with carbon text. Tablet live rail is flush to the viewport rather than inset inside the framed app. | White selected nav surface on the dark rail; 10px tablet shell inset and 72px rail. | `src/styles.css:449-529`, especially `:513-516`; compare `application-shell.css:4` and `responsive-tablet.css:1-4`. |
| P1 | **Mobile header identity is wrong.** Live shows a 150px Keyloop logo on every route. The prototypes use a route/product title (`Inventory Intelligence` or `Inventory · 86 units`) and a contextual 44-48px action. | Compact, task-aware 64px header; brand is not the only information. | `src/components/app-shell/application-header.tsx`; `src/styles.css:189-230`. Compare `application-shell.css:9` and `responsive-mobile.css:1`. |
| P1 | **Mobile active navigation is over-surfaced.** Live active item is a pale-blue rounded block with a top blue inset line; approved mobile nav uses a restrained dark active icon/label on the same white bar. | Flat white 68px bar, compact icon/label, active state primarily through ink/icon weight. Three production destinations remain correct per v0.5. | `src/styles.css:257-305` and `src/components/app-shell/primary-navigation.tsx`; compare `application-shell.css:10`. |
| P1 | **Mobile Inventory spends the first viewport on controls.** At 390x844 the filter surface measured 462px high; first card begins around 693px, under a nav whose top is 779px. Live renders labeled search, Make, Model, Search, Reset, then age chips. | Compact 48px search plus age chips; first stock card begins around mid-viewport. Make/model can remain available through progressive/mobile filtering without retaining the desktop form geometry. | `src/features/inventory/components/inventory-filters.tsx:42-133`; `src/features/inventory/components/inventory-page.tsx:63-68`. Compare `inventory.css:1,4`. |
| P1 | **Tablet Inventory is desktop content clipped into a rail layout.** Grid switches on at 768px, retains all AG Grid columns/horizontal scrolling, while the selected-unit rail only becomes side-by-side at Tailwind `xl`. The approved tablet shows a reduced-column grid and visible 244px detail rail. | Tablet-specific columns, 48px actions, filter wrapping, and persistent selected record context. | `src/features/inventory/components/use-responsive-inventory-surface.ts:3-15`; `src/features/inventory/components/inventory-page.tsx:93-108`; `src/features/inventory/components/inventory-grid.tsx`. Compare `inventory.css:3` and `responsive-tablet.css:2-4`. |
| P2 | **Typography is materially oversized.** Live page heading measured 36/45px desktop and 30/37.5px mobile; live descriptions are 16/24px. | 30/32.4px desktop, 27px tablet, 26px mobile; descriptions 13px desktop and 12px mobile. Font families already match. | Heading/description utilities in `src/features/overview/components/overview-page.tsx:33-43` and `src/features/inventory/components/inventory-page.tsx:50-60`. Compare `application-shell.css:8`, `responsive-tablet.css:4`, `responsive-mobile.css:1`. |
| P2 | **Overview mobile composition ignores the approved fast-check layout.** Live stacks three large summary cards and then the full five-row priority queue; live page height measured 1418px. | Two compact signals side-by-side, then one focused “oldest inventory” exception card; core action fits in the 740px design viewport. | `src/features/overview/components/overview-summary.tsx:10-57`, `src/features/overview/components/overview-priority-queue.tsx`; compare `dashboard.css:5-6`. |
| P2 | **Mobile Inventory cards are too tall/dense in surface area.** Live uses 16px padding, 16px title text, 14px metadata/actions, and renders ten full cards plus a large pagination card. | 13px padding, 13px title, 9-11px metadata/action, 8px gaps; reference focuses the fast-check list. | `src/features/inventory/components/inventory-mobile-cards.tsx:12-54`, `src/features/inventory/components/inventory-pagination.tsx`; compare `inventory.css:4`. |
| P2 | **Canvas tones are close but not exact.** Live uses `#f1f1f3` globally and directly behind all content; target desktop workspace is `#f7f8f9` and mobile workspace is `#f4f5f6`, with white cards. Card semantic colors/radii otherwise largely align. | Separate outer canvas, workspace, and white component surfaces. | `src/styles.css:9-21,93-105`; shell surfaces at `:170-235`. Compare `application-shell.css:6` and `responsive-mobile.css:1`. |

## Recommended correction order

1. Constrain desktop/tablet shell to viewport height and move overflow to the workspace/main region; prevent sidebar grid stretch.
2. Restore the rounded workspace/app-bar surface and reference shell spacing.
3. Correct tablet grid/detail behavior and mobile header/nav.
4. Introduce compact mobile filter/overview compositions.
5. Tune type scale and card density after shell geometry is stable.

## Unresolved questions

- Whether mobile make/model controls should become a sheet/drawer or remain inline but collapsed; the functional contract requires those filters, while the approved mobile prototype only shows search and age chips.

**Status:** DONE
**Summary:** Canonical design sources identified and live React UI audited across desktop, tablet, and mobile. Highest-impact defect is sidebar grid stretching, followed by missing workspace framing and responsive density drift.
**Concerns/Blockers:** None for the audit; one mobile filter interaction choice remains for implementation.
