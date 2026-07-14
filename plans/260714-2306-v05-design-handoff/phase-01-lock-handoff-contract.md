---
phase: 1
title: "Lock Handoff Contract"
status: completed
priority: P1
effort: 1.5h
dependencies: []
---

# Phase 1: Lock Handoff Contract

## Overview

Create the v0.5 entrypoint and scope contract without copying or redesigning
the approved prototypes.

## Context Links

- `design/README.md`
- `design/v0.3-responsive-screens/screen-map.md`
- `design/v0.4-management-screens/README.md`
- `design/v0.4-management-screens/validation.md`

## Requirements

- Core workflow: Overview → Inventory → Inventory Unit action → Activity.
- Core navigation: Overview, Inventory, Activity.
- Supporting data: Vehicle Masters and Vehicle Master detail, reached from
  Inventory/Master references; not promoted to the core workflow.
- Deferred: Locations and Zone/Slot routes, capacity, assignment, movement,
  persistence, API contracts, and proof.
- Existing read-only Zone/Slot labels may remain in prototype fixtures as
  context; they do not create an implementation requirement.

## Architecture

`design/v0.5-design-handoff/index.html` is the visual handoff entrypoint and
`README.md` is the implementation entrypoint. `scope.md` is the normative
in/supporting/deferred matrix. `validation.md` records evidence and known
limitations. Links point back to v0.3/v0.4 sources; approved source HTML/CSS is
not duplicated.

## Related Code Files

- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.5-design-handoff/README.md`
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.5-design-handoff/index.html`
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.5-design-handoff/styles/handoff.css`
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.5-design-handoff/scope.md`
- Create: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.5-design-handoff/validation.md`
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.4-management-screens/README.md`
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.4-management-screens/review.md`
- Modify: `/Users/kristdev/Desktop/CodingChallenge/key-loop/design/v0.4-management-screens/validation.md`

## Implementation Steps

1. Record v0.4 manager approval and close its Keep/Fix gate without claiming
   production React, AG Grid runtime, API, or persistence proof.
2. Build a visual handoff board that exposes the core loop, MVP scope, source
   prototypes, component sources, responsive contract, and deferred module.
3. Write the v0.5 README with status, reviewed sources, route/screen mapping,
   domain ownership, responsive rules, interaction-state expectations, and
   evidence boundary.
4. Write `scope.md` with explicit Core / Supporting / Deferred tables and a
   precedence note: v0.5 scope overrides broader v0.4 gallery discoverability
   for MVP implementation.
5. Seed `validation.md` with reproducible checks and a known-limitations section.

## Success Criteria

- [x] Handoff is self-contained and links to approved source artifacts.
- [x] Overview, Inventory, and Activity are the only core nav destinations.
- [x] Vehicle Master ownership stays distinct from VIN-specific Unit state.
- [x] Locations and Zone/Slot are explicitly deferred, not silently omitted.
- [x] Minor prototype overflow is a logged limitation, not an automatic blocker.

## Risk Assessment

Main risk is accidentally treating every v0.4 gallery family as MVP scope.
Mitigate with one normative scope matrix and explicit precedence language.

## Security Considerations

No auth or sensitive-data behavior changes. Keep the existing no-sensitive-log
contract visible in the handoff.

## Next Steps

Phase 2 aligns durable product and decision sources to this locked boundary.
