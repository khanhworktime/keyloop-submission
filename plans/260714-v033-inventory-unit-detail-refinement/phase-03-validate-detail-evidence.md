---
phase: 3
title: "Validate Detail Evidence"
status: completed
effort: ""
---

# Phase 3: Validate Detail Evidence

## Overview

Priority P1. Status completed. The final HTML/CSS/interaction evidence was
validated and records only what the environment proved.

## Context Links

- `phase-02-refine-semantic-responsive-detail.md`
- `design/v0.3-responsive-screens/validation.md`
- `docs/TEST_MATRIX.md`

## Key Insights

- Repository lint and bundle checks are integration guards, not visual proof.
- Browser `file://` navigation may be blocked; source/static proof must say so.

## Requirements

- Validate local references, JS syntax, CSS balance, semantics, target sizing,
  responsive visibility, overlay labels, and no misleading dormant actions.
- Run independent tester and reviewer after implementation.
- Keep US-001 `in_progress` and state the HTML design-evidence boundary.

## Architecture

Proof chain: source assertions → repository checks → browser checks when
permitted → independent tester → reviewer → documentation/trace.

## Related Code Files

- Validate: final HTML, CSS, and shared JS.
- Modify after proof: v0.3 validation, US-001 evidence, this plan status.
- Delete: none.

## Implementation Steps

1. Run local-reference, JS syntax, CSS balance, and focused DOM/CSS assertions.
2. Run repository lint, bundle, and whitespace checks.
3. Check desktop/tablet/mobile geometry, focus, sheet scrolling, and save flow if
   browser navigation is allowed; otherwise record the visual gate as pending.
4. Address tester/reviewer findings and rerun affected checks.
5. Append bounded evidence, complete the plan, and record Harness trace.

## Success Criteria

- [x] All available mechanical checks pass with zero ignored failures.
- [x] Independent review has no unresolved correctness/accessibility finding.
- [x] Documentation distinguishes design proof from production behavior.

## Risk Assessment

Risk: claiming visual behavior without a permitted browser run. Mitigation:
explicitly separate static, browser, and production evidence.

## Security Considerations

No credentials or user data enter fixtures, logs, or screenshots.

## Next Steps

Plan complete. Present the Inventory Unit screen for manager Keep/Fix feedback;
US-001 remains `in_progress` and production implementation remains separate.
