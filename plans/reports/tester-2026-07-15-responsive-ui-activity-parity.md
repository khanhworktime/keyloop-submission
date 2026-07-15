---
type: tester-report
date: 2026-07-15
scope: responsive-ui-activity-parity
status: pass-with-concerns
---

# Tester Report — 2026-07-15 — Responsive UI and Activity Parity

## Summary

Final post-review US-004 validation passed. `npm run validate` exited 0 with 88 passing tests total: Vitest 58/58 and Playwright 30 passed, 9 intentional viewport-gated skips, 0 failed, 0 flaky. No implementation or test files edited by this validation pass.

React Doctor exited 1 for one pre-existing dependency supply-chain diagnostic. No new or in-scope React diagnostic found.

## Validation Results

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run validate` post-review | PASS | ESLint exit 0; Vitest 16 files/58 tests passed in 2.45s; TypeScript + Vite build passed; Playwright 30 passed/9 intentional skips/0 failed/0 flaky in 13.1s |
| Production build | PASS | 1,768 modules transformed; build completed in 293ms |
| Targeted tablet stability run | PASS | Responsive inventory test passed 3/3 with `--retries=0` |
| `npx -y react-doctor@latest . --verbose --scope changed` | CONCERN | Score 40/100; one pre-existing dependency diagnostic; no US-004 component diagnostic |

## Acceptance Evidence

| Acceptance point | Executable proof | Result |
| --- | --- | --- |
| Compact tablet Keyloop asset | Tablet test verifies visible `.app-shell__compact-brand img` with `src="/keyloop-mobile-logo.jpeg"` | PASS |
| WCAG dark-nav hover computed colors | Desktop 1920 test verifies `rgb(255, 255, 255)` text on `rgb(37, 57, 67)` background; computed contrast 12.03:1 | PASS |
| 1920 shell x ≤16px | Desktop test sets 1920×1000 and asserts sidebar `boundingBox().x <= 16` | PASS |
| Workspace-owned vertical scrolling | Desktop Activity test proves `.app-shell__main.scrollHeight > clientHeight`, changes main `scrollTop`, and confirms the sidebar remains at y=11–13px | PASS |
| AG Grid checkbox selection | Desktop/tablet test clicks the STK-1934 checkbox, verifies the Northstar detail rail, then clicks STK-1918 and verifies the Vela detail rail | PASS |
| Borderless open action | Same test verifies computed `borderTopWidth === "0px"` on desktop/tablet open action | PASS |
| Toast width/non-overlap | Manager journey verifies toast width ≤380px and no intersection with header actions or mobile navigation on all three projects | PASS |
| Activity responsive composition | Desktop/tablet filter panel and mobile hidden-panel/chip/feed-top ≤300px checks pass across projects | PASS |
| Activity axe checks | WCAG 2 A/AA and WCAG 2.1 A/AA axe scans pass on `/activity` for desktop, tablet, mobile | PASS |

Supporting manager-journey coverage also passed on desktop, tablet, and mobile: aging-stock filtering, action save, toast, reload persistence, Activity evidence, canonical filter URL, and back navigation.

## React Doctor Classification

### `socket/low-supply-chain-score` — `iconsax-reactjs@0.0.8`

- Classification: pre-existing, out of US-004 scope; valid dependency-risk hypothesis requiring owner review.
- Severity from tool: error; package supply-chain score 31/100. Vulnerability axis 100, maintenance 79, quality 92, license 100.
- Evidence: base `package.json` already used `iconsax-reactjs@^0.0.8`; MVP plan and US-002 already specify Iconsax. US-004 phase changes no dependency or package manifest.
- Confidence: high.
- Action: separately review/accept the dependency or select an audited replacement. Do not suppress or change thresholds merely to raise the score.

## Reliability and Build Notes

- An earlier pre-review validation had one transient tablet retry and Vite parse message. The affected test subsequently passed 3/3 with retries disabled, a full rerun passed, and the final post-review `npm run validate` also passed cleanly with no retry, parse error, or flake. No reproducible US-004 defect found.
- Vite build remains successful with a non-blocking warning for JavaScript chunks over 500 kB.
- Playwright reports harmless `NO_COLOR`/`FORCE_COLOR` warnings.

## Failed Tests

None in final clean runs.

## Recommendations

1. Review the pre-existing Iconsax supply-chain finding outside US-004.
2. If the transient Vite parse message recurs, capture the served module URL/stack and inspect dev-server reuse; current reruns do not reproduce it.

## Unresolved Questions

None.
