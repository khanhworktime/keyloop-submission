# US-010 Inventory Unit Detail Visual Parity

## Status

in_progress

## Lane

normal

## Product Contract

The Inventory Unit detail route matches the accepted responsive composition in
`design/v0.3-responsive-screens/screens/inventory-unit.html`, while preserving
the live Unit query, action mutation, toast, and Activity navigation.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`

## Acceptance Criteria

- Desktop uses the v0.3 context strip and compact 1.35fr/.65fr composition:
  Unit card and mini timeline on the left, Manager Decision spanning the right.
- The Unit card includes the compact identity hero, Master-to-Unit relationship,
  and 2x2 facts for age, arrival, read-only Zone/Slot context, and status.
- Manager Decision includes the current action, strict threshold note, Activity
  recovery link, and green commit action pinned to the bottom.
- Inventory age and lifecycle status remain separate facts; Vehicle Master
  make, model, variant, and type remain visible.
- Tablet and mobile reductions follow the v0.3 responsive CSS, including one
  timeline item on mobile and hiding secondary summary/context text.
- Tablet keeps Recent Activity visible below the left Unit card; it must not be
  suppressed between the tablet and desktop breakpoints.
- Existing query, action drawer/save/toast, Activity navigation, loading,
  error, empty, and non-aging behavior remain intact.
- Successful saves use the Base UI Toast primitives with a compact neutral
  surface, clear success marker, accessible dismissal, and responsive placement
  above mobile navigation.
- Tablet and mobile stack the same content without horizontal overflow while
  preserving heading order, focus visibility, and 44px interaction targets.

## Design Notes

- Commands: record one proposed action for an aging Inventory Unit.
- Queries: load one joined Inventory Unit detail with its recent activities.
- API: unchanged.
- Tables: unchanged.
- Domain rules: aging remains `daysInStock > 90`; inventory status remains
  `available`, `reserved`, or `sold`.
- UI surfaces: `/inventory/$unitId` only.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Focused component rendering and existing action-drawer behavior. |
| Integration | Existing query and mutation contracts remain unchanged. |
| E2E | Deferred to user manual visual acceptance for this UI-only iteration. |
| Platform | Manual desktop, tablet, and mobile layout review. |
| Release | TypeScript compile succeeds. |

## Harness Delta

No Harness behavior changed. This packet records the screenshot-guided UI
iteration and its manual visual evidence boundary.

## Evidence

- Implementation plan:
  `plans/260715-1707-inventory-unit-detail-page-redesign/plan.md`
- Focused Vitest: 3 files, 5 tests passed, including Activity tab regression
  coverage and the Inventory Unit two-event cap.
- TypeScript: `npx tsc -b --pretty false` passed with no diagnostics.
- Code review: clean after scoping the legacy placement fixture to `IU-2048`,
  restoring mobile Back navigation, and matching tablet timeline visibility.
- Human correction #26 records the v0.3 HTML/CSS source-of-truth clarification.
- Recent Activity now uses the same shared `ActivityEventRow` component as the
  Activity tab for timestamp, marker, event content, note, and Unit link.
- Production typography refinement raises page-local labels to 11–12px,
  metadata/body copy to 13–14px, values to 14px+, and headings to 20–24px;
  shared Activity row typography remains unchanged.
- Typography-focused validation: Inventory Unit page test passed (1 file,
  1 test) and TypeScript passed with no diagnostics.
- Manager Decision now renders the trimmed `latestAction.note` beneath the
  current proposed action when non-empty; missing and whitespace-only notes do
  not create an empty row. Focused page validation passes 2/2 tests.
- Identity controls were regrouped: Edit is a compact utility action in the
  eyebrow row, the aging badge sits with the vehicle title, and the redundant
  Unit side of the relationship strip was removed, leaving Vehicle Master only.
- Harness intake #61 migrated the save notification from a custom timed status
  element to Base UI Toast (`Provider`, `Portal`, `Viewport`, `Root`, `Content`,
  `Title`, `Description`, and `Close`). It is
  limited to one message, preserves the existing eight-second timeout, supports right-swipe,
  and uses reduced-motion-safe transitions.
- Toast-focused and Inventory Unit regression validation: 4 Vitest files,
  10 tests passed; TypeScript and `git diff --check` passed.
- Harness intake #62 removes the stale tablet-only `md:hidden` wrapper around
  Recent Activity. The replacement `order-3 md:contents` wrapper preserves the
  mobile Unit → Decision → Activity order while promoting the section into its
  existing tablet/desktop grid placement.
- Tablet-visibility regression proof: Inventory Unit page Vitest passed 4/4,
  TypeScript and `git diff --check` passed, and bounded code review is clean.
- Pending user manual visual approval.
