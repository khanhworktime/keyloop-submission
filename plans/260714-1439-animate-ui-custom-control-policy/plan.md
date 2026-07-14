---
title: Animate UI Custom Control Trust Policy
description: >-
  Document Animate UI as the qualified reference for custom interactive controls
  without overstating its current catalog.
status: completed
priority: P2
effort: 1h
branch: main
tags:
  - docs
  - frontend
blockedBy: []
blocks: []
created: '2026-07-14'
createdBy: 'ck:plan'
source: skill
---

# Animate UI Custom Control Trust Policy

## Overview

Amend the selected Precision guideline and current Actions & Inputs contract so
Animate UI is the source of trust for custom-control interaction and motion
patterns. Preserve official availability: copy-in catalog entries are usable;
roadmap entries and absent entries are not current components.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Document Animate UI Control Policy](./phase-01-document-animate-ui-control-policy.md) | Completed |
| 2 | [Add Base UI Fallback Hierarchy](./phase-02-add-base-ui-fallback-hierarchy.md) | Completed |

## Dependencies

- Official catalog: <https://animate-ui.com/docs/components>
- Official roadmap: <https://animate-ui.com/docs/roadmap>
- Official Base UI catalog: <https://base-ui.com/react/components>
- Official Base UI styling guide: <https://base-ui.com/react/handbook/styling>
- Selected UI authority: `design/v0.1-d-precision-guideline/brand-guideline.md`
- Current control contract: `design/v0.2.2-component-families/component-spec.md`
- No cross-plan blocker; related v0.2.2 plans are complete.

## Scope Boundary

Documentation only. No package install, component implementation, showcase,
preview, validation-evidence, product-doc, or story changes.

## Success Criteria

- Five required controls have explicit, truthful availability guidance.
- “Source of trust” cannot be read as “currently available component.”
- The policy keeps Keyloop tokens, WCAG, keyboard, and reduced-motion rules authoritative.
- Base UI is the fallback and preferred Animate UI primitive family; global
  Precision styling is mandatory before feature adoption.
