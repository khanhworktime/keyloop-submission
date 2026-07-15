# Code Review: US-008 Select Component Parity

## Verdict

Implementation behavior is sound. The shared Base UI composition preserves accessible labels and combobox/listbox/option semantics; current consumers keep null, string, numeric, URL, draft, and action adapters at their boundaries. The private empty sentinel is translated before callbacks, 44px minimum targets are retained, and the `z-[70]` portal clears both `z-50` drawer layers.

## Finding

### P2 — Focused tests do not prove the stated keyboard and migrated-drawer contracts

`src/components/ui/select-field.test.tsx:8-23` covers only pointer selection of the empty option. It does not cover keyboard open/navigation/typeahead, Escape dismissal, focus return, disabled state, or `aria-invalid`, despite those being acceptance requirements. `src/features/activity/components/activity-filter-drawer.test.tsx:19-36` only checks initial displayed values and never selects Event type/Actor or asserts the Apply payload. `src/features/inventory-unit/inventory-action-drawer.test.tsx:52-77` supplies `initialAction` and therefore never selects through the migrated shared control. A regression in nested-drawer selection/focus or either adapter could pass all focused tests; the compatibility E2E was updated but intentionally not run (`docs/stories/US-008-select-component-parity.md:49-51`; `plans/reports/tester-2026-07-15-select-component-parity.md:31-35`). Add focused keyboard/focus coverage plus one select-and-apply/submit case for each drawer.

## Verification

- Fresh focused run: 5 files, 8 tests passed.
- Official Base UI Select contract confirms `items` label lookup, `Select.Label` association, primitive Item values, keyboard typeahead, and portal/positioner composition used here.
- No native or consumer-owned Base UI Select remains in feature code.

## Unresolved Questions

None.

**Status:** DONE_WITH_CONCERNS  
**Summary:** Source implementation is correct; focused regression evidence is incomplete for keyboard/focus and migrated drawer selection paths.  
**Concerns/Blockers:** P2 verification gap only; no blocking source defect found.
