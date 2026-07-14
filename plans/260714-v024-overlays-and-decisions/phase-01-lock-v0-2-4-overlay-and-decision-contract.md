---
phase: 1
title: "Lock v0.2.4 Overlay and Decision Contract"
status: completed
effort: "30m"
---

# Phase 1: Lock v0.2.4 Overlay and Decision Contract

## Overview

Define when a manager workflow uses a popover, dialog, alert dialog, or drawer.

## Implementation Steps

1. Separate anchored context from interruptive decisions.
2. Map upstream sources: Animate UI Base Dialog/Popover, Base UI Alert Dialog/Drawer.
3. Define desktop, tablet, and mobile transformations.
4. Lock focus, dismissal, background interaction, and action-order rules.

## Success Criteria

- [x] Each overlay has one semantic purpose.
- [x] Destructive confirmation cannot be confused with a generic dialog.
- [x] Source hierarchy and global-style gate are explicit.
