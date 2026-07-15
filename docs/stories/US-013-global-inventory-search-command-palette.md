# US-013 Global Inventory Search Command Palette

## Status

in_progress

## Lane

normal

## Product Contract

A manager can search Inventory Units globally from the application shell—desktop
primary navigation or the tablet/mobile header—or with Command/Ctrl + K. The
modal command palette reuses the Inventory keyword API and navigates directly
to a selected Inventory Unit.

## Relevant Product Docs

- `docs/product/inventory-dashboard.md`
- `docs/ARCHITECTURE.md`

## Acceptance Criteria

- Desktop primary navigation exposes Search with icon and label; tablet/mobile
  expose an icon-only Search trigger beside Notifications in the header.
- Command + K and Ctrl + K open the same palette from anywhere in the app.
- Base UI Dialog, Autocomplete, and ScrollArea follow the official command-palette pattern.
- Search uses one shared Inventory keyword contract for Inventory Unit name,
  Stock No., VIN, and Vehicle Master name/ID; blank input does not issue a
  search request.
- Selecting a result closes the palette and navigates to `/inventory/$unitId`.
- Loading, empty, error/retry, Escape, keyboard highlight, and focus restoration
  remain accessible.

## Design Notes

- Queries: reuse `fetchInventory` and `inventoryKeys.list` with a trimmed keyword.
- API: no contract change.
- UI surfaces: desktop primary navigation, compact application header, and a
  portalled modal command palette.
- Responsive: the visible breakpoint-specific trigger owns Command/Ctrl + K so
  only one palette opens and focus restores to the visible control.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Query enablement and component keyboard/navigation states. |
| Integration | Existing Inventory handler/repository keyword behavior. |
| E2E | User-owned manual desktop/tablet/mobile review. |
| Platform | Not required. |
| Release | Focused Vitest and `npx tsc -b --pretty false`. |

## Harness Delta

Normal change request, intake #57. No API or persistence change.

Responsive placement correction recorded as intake #58. No API, persistence,
or route contract change.

HTTP 400 contract correction recorded as intake #59. Global Search now uses the
supported 10-item page size; API and persistence contracts remain unchanged.

Shared keyword semantics extension recorded as intake #60. Inventory page and
palette now also match the displayed Vehicle Master identifier without changing
the request/response schema or persisted state.

## Evidence

- Implementation plan: `plans/260715-global-inventory-search-command-palette/plan.md`
- Official Base UI Autocomplete command-palette and async-search patterns reviewed.
- Focused component/query tests cover triggers, Command/Ctrl + K, async keyword
  search, Escape/focus restoration, Enter navigation, loading/empty states, and error retry.
- Focused Vitest: 4 files and 33 tests passed across command-palette, query,
  handler, and repository behavior.
- TypeScript: `npx tsc -b --pretty false` passed with no diagnostics.
- React Doctor: no new component finding; the existing `iconsax-reactjs@0.0.8`
  low supply-chain score remains outside this UI ticket.
- Manual desktop/tablet/mobile review remains assigned to the user.
- User manual review identified incorrect compact placement and an unsuitable
  input focus outline; the correction moves Search beside Notifications and
  scopes the outline reset to the palette input.
- Correction verification: focused command-palette Vitest passed 6/6,
  TypeScript compiled without diagnostics, and final code review was clean.
- User console evidence identified HTTP 400 for global Search. Root-cause proof
  traced the request to unsupported `pageSize=8`; regression coverage now spans
  the query hook, real API serialization/parser boundary, and palette states.
- HTTP correction verification: 4 focused files and 26 tests passed; TypeScript
  compiled without diagnostics.
- Search-semantic verification covers Unit name, Stock No., VIN, and Vehicle
  Master ID at the repository and real API boundary; 5 focused files and 43
  tests passed with a clean TypeScript compile.
