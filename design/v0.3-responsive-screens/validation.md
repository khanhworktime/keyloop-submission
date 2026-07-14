# v0.3 Responsive Screens validation

Date: 2026-07-14  
Status: implementation and independent review checks passed; manager review pending

## Evidence boundary

This milestone validates HTML design artifacts. It does not prove production
React routes, AG Grid runtime behavior, API persistence, or US-001 completion.

## Automated checks

- Local `href` and `src` references: pass.
- Shared JavaScript syntax: pass with `node --check`.
- CSS brace balance across all v0.3 styles: pass.
- Repository `npm run lint`: pass.
- Repository `npm run build`: pass; existing application bundle remains
  297.90 kB before gzip.
- Fourteen fresh 1600 × 900 previews: twelve responsive screen captures,
  gallery, and mobile-success evidence under `previews/`.

## Browser checks

- Dashboard, Inventory, Inventory Unit, and Activity switch deterministically
  among desktop, tablet, and mobile modes.
- All twelve mode/screen combinations have no page, device, or screen-level
  horizontal overflow.
- Desktop/tablet Inventory shows the AG Grid Community composition contract;
  mobile hides the grid and uses the same record/filter meaning in cards.
- Inventory Unit action opens as a drawer on desktop/tablet and a bottom sheet
  on mobile. Save closes the layer, changes the proposed-action value, and
  exposes a labelled success toast.
- Filter, selected record, modal/sheet decision, saved action, and Activity
  evidence remain continuous through the core review loop.
- Responsive links preserve the selected viewport mode.
- Mobile and the intentionally scrollable Unit/Activity surfaces preserve a
  fixed bottom navigation without hiding recovery or primary action context.
- Tablet Unit composition was reduced to four essential facts so its commit
  action is fully visible without edge collision or vertical clipping.

## Visual inspection

- Desktop keeps detailed comparison and a contextual rail.
- Tablet removes columns/history intentionally and maintains touch-size actions.
- Mobile prioritizes identity, age, location, and one next decision.
- Attention coral, Ready teal, and Information blue remain semantically distinct.
- The official Keyloop wordmark remains intact and at least 150px when shown.

## Independent review

- Independent tester responsive/accessibility review: pass.
- Independent reviewer hierarchy, source, and responsive contract review: pass.
- No unresolved horizontal-overflow, modal, selection, filter, action-continuity,
  accessibility, or source-of-trust finding remains.

## Pending gate

- Manager Keep/Fix feedback before promotion or composing deferred families.

## v0.3.1 Dashboard refinement — 2026-07-14

### Refinement evidence

- Dashboard hierarchy was simplified without changing routes, data meaning,
  responsive modes, or the manager workflow.
- The page retains one Ready-teal aging-inventory action; priority rows now
  include a stable vehicle identity slot and consistent row geometry.
- Local reference checks, shared JavaScript syntax checks, and CSS brace checks
  passed.
- Repository `npm run lint` and `npm run build` passed.
- Independent source-only tester and reviewer checks: PASS. Their scope covered
  the static assertions and lint and build results, single-CTA hierarchy,
  dashboard-owned page-head selectors, anchor underline invariants, touch-size
  rules, queue geometry, and thumbnail-slot coverage.

### Pending visual gate

- An in-app `file://` visual reload is pending because the browser security
  policy blocks that navigation path.
- No refreshed screenshot, browser interaction, accessibility, runtime, or
  independent visual-review result is claimed for v0.3.1 yet.
- The earlier v0.3 evidence above remains the baseline and does not substitute
  for the pending v0.3.1 visual reload.

## v0.3.1 Signal-label top alignment — 2026-07-14

- `.signal-label` now uses `align-items: flex-start` so wrapped label text and
  its adjacent status or secondary label align from the top edge.
- The static source assertion, repository `npm run lint`, `npm run build`, and
  `git diff --check` passed.
- No browser reload, screenshot, interaction, accessibility, runtime, or other
  visual proof is claimed; visual confirmation remains pending.

## v0.3.2 Inventory data-surface refinement — 2026-07-14

### Source and static evidence

- The Inventory Add control keeps one accessible button with
  `aria-label="Add inventory unit"`; desktop source renders `+ Add`, while
  tablet and mobile CSS give the icon-only `+` an explicit 48 × 48px box.
- Counted filters separate their labels from filled circular count spans and
  preserve the announced count in screen-reader text.
- The desktop grid is contained by an internal horizontal-overflow wrapper, so
  wide table content has a dedicated scroll owner inside the main panel rather
  than painting into the selected-unit rail.
- Tablet source removes a second filter scroller by wrapping the filter bar;
  the reduced-column table remains inside the table wrapper.
- One semantic result footer follows the table/card result markup, so desktop,
  tablet, and mobile place result statistics after the active data surface.
- Inventory-scoped context spacing adds 8px between breadcrumb context and the
  page header.
- Repository `npm run lint` and `npm run build` passed.
- Independent tester and reviewer source/static checks passed for the scoped
  markup, responsive selectors, accessibility attributes, overflow ownership,
  and truthful evidence boundary.

### Pending visual gate

- The in-app browser could not reload the local artifact because its security
  policy blocks `file://` navigation.
- No refreshed screenshot, measured browser geometry, keyboard interaction,
  200% zoom/reflow, runtime accessibility, or independent visual-review proof
  is claimed for v0.3.2.
- This remains HTML design evidence only; it does not prove production React,
  AG Grid runtime behavior, persistence, or US-001 completion.

## v0.3.3 Inventory Unit Detail refinement — 2026-07-14

### Contract and responsive evidence

- The repeated page and hero identity was consolidated into one clear hierarchy.
  Semantic `dl` facts, ordered activity lists, and `<time datetime>` values now
  preserve the review path from Vehicle Master → Inventory Unit → Zone/Slot →
  proposed action → Activity history.
- Tablet retains exactly four essential facts while keeping the manager decision
  and commit path visible.
- Mobile places Action before History. The frequent action trigger is 48px, both
  Activity links meet the 44px minimum, and dormant `href="#"` actions were
  replaced by honest disabled text on this screen.
- The mobile bottom sheet scrolls internally, contains overscroll, and pads its
  commit controls above the safe-area inset and fixed navigation.
- Browser geometry on localhost measured zero horizontal overflow at desktop,
  tablet, and mobile modes. The browser console reported no errors.

### Interaction and mechanical proof

- The localhost browser flow opened the action layer, saved a proposed action,
  exposed the labelled success toast, and retained the saved action after reload.
- Local-reference, JavaScript syntax, CSS brace-balance, focused semantic and
  control-size assertions, repository lint, and production-bundle checks passed.
- Independent tester and reviewer checks passed with no unresolved scoped
  correctness, accessibility, responsive, or evidence-boundary finding.

### Evidence boundary

- This is HTML design and browser-prototype evidence only. It does not prove
  production React routes, API persistence, Base UI runtime behavior, or US-001
  completion; US-001 remains `in_progress`.

## v0.3.4 Responsive annotation refinement — 2026-07-14

- Inventory Unit now uses an 8px context margin, four semantic Iconsax-style
  fact icons, `0 12px 10px` Recent activity padding with 44px links, separated
  `Stock no.` and VIN metadata, and an honest `Vehicle image` / `Asset pending`
  media slot without a fabricated asset.
- Dashboard scopes the attention card to semantic `#9d2e20`, with white
  label/value/copy/link and a white surface with attention-red text/border for
  the Aging badge. White-on-red contrast measures 7.38:1.
- Browser geometry measured zero horizontal overflow on Inventory Unit and
  Dashboard in desktop, tablet, and mobile modes. Inventory Unit action save →
  toast → reload retained `Price Reduction Planned`.
- Focused local-reference, SVG, semantic, CSS, and diff checks passed, as did
  repository `npm run lint` and `npm run build`. Independent tester passed
  19/19 checks; independent review was clean aside from the stale plan state
  corrected in the v0.3.4 plan.
- This remains HTML design/browser-prototype evidence only. It does not prove
  production React routes or API persistence; US-001 remains `in_progress`.
