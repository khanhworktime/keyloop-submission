# Global Inventory Search Command Palette

## Status

in_progress

## Scope

Add a Base UI command palette to desktop primary navigation and the compact
application header without changing the Inventory API schema or persisted
state.

## Tasks

- [x] Add desktop navigation and compact header triggers with one responsive
  Command/Ctrl + K owner.
- [x] Compose Base UI Dialog, Autocomplete, and ScrollArea using async Inventory results.
- [x] Navigate a selected result to its Inventory Unit detail route.
- [x] Cover keyboard, query, result, and navigation behavior with focused tests.
- [x] Update product/architecture docs and request user manual responsive review.
- [x] Correct compact placement beside Notifications and remove the palette
  input's default focus outline.
- [x] Correct the global query page size to the Inventory API-supported value
  and add client-to-handler regression coverage for HTTP 400.
- [x] Extend the shared Inventory keyword index to Unit name, Stock No., VIN,
  and Vehicle Master name/ID for both Inventory and the command palette.

## Proof

- Focused Vitest for the query hook and command palette.
- `npx tsc -b --pretty false`.
- No browser/E2E automation; user supplies manual UI evidence.
