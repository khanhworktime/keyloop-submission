---
phase: 3
title: "Validate Handoff Evidence"
status: completed
priority: P1
effort: 1h
dependencies: [2]
---

# Phase 3: Validate Handoff Evidence

## Overview

Prove the handoff is internally consistent, references real artifacts, preserves
repository build health, and states prototype limitations honestly.

## Context Links

- `design/v0.5-design-handoff/validation.md`
- `docs/TEST_MATRIX.md`
- `package.json`

## Requirements

- Validate documentation and source references; do not claim production E2E.
- Inspect approved core and Vehicle Master prototypes in desktop, tablet, and
  mobile modes as reference evidence.
- Record observed overflow. It blocks only when essential content is hidden,
  a required action is unusable, or core navigation breaks.

## Related Code Files

- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.5-design-handoff/validation.md`
- Verify: all files created or modified in phases 1–2

## Implementation Steps

1. Run scope search across handoff/product/story/ADR and confirm every mention
   classifies Overview, Inventory, Activity, Vehicle Masters, Locations, and
   Zone/Slot consistently:
   `rg -n "Overview|Inventory|Activity|Vehicle Master|Locations|Zone.?Slot" design/v0.5-design-handoff design/README.md design/v0.3-responsive-screens/screen-map.md docs/product/inventory-dashboard.md docs/stories/US-001-intelligent-inventory-dashboard-foundation.md docs/decisions/0010-supply-inventory-mvp-scope.md`.
2. Check every relative Markdown link in the changed files resolves to an
   existing repository path; record the checked file list in `validation.md`.
3. Run `npm run lint`, `npm run build`, and `git diff --check`.
4. Serve with `npm run dev -- --host 127.0.0.1`. Review Dashboard, Inventory,
   Inventory Unit, Activity, Vehicle Masters, and Vehicle Master at desktop,
   tablet, and mobile modes. Confirm routes load, core loop remains legible,
   actions/links needed for the loop remain reachable, and console has no errors.
5. For each reviewed mode, compare `scrollWidth` and `clientWidth`; record any
   residual overflow and whether it affects essential content/action/navigation.
6. Query `scripts/bin/harness-cli query matrix --active --summary`; verify
   US-001 stays `in_progress` with no unsupported proof promotion.
7. Complete `validation.md` with command results, browser matrix, known
   limitations, evidence boundary, and final handoff readiness.

## Success Criteria

- [x] Core nav is exactly Overview / Inventory / Activity in the normative handoff.
- [x] Vehicle Masters are supporting data; Locations and Zone/Slot are deferred.
- [x] All changed Markdown links resolve.
- [x] Lint, build, and explicit no-index whitespace checks pass.
- [x] Handoff and linked source routes load; the v0.5 board has no console errors.
- [x] Any minor archived-prototype overflow is documented and does not hide essential content,
      disable a required action, or break core navigation.
- [x] US-001 status/proof remains honest.

## Risk Assessment

Browser prototypes can expose old, broader navigation. Treat v0.5 scope as
normative, record the mismatch, and do not reopen prototype redesign unless it
blocks the approved core loop.

## Security Considerations

Validation must not introduce or log credentials, personal data, or external
services.

## Next Steps

After all checks pass, hand the v0.5 contract to production implementation;
keep Locations and Zone/Slot in deferred backlog only.
