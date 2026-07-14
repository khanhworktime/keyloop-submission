---
phase: 3
title: "Implement Responsive Accessible Overlay Behavior"
status: completed
effort: "60m"
---

# Phase 3: Implement Responsive Accessible Overlay Behavior

## Overview

Adapt placement and interaction for oversight, touch operation, and fast checking.

## Implementation Steps

1. Keep popovers anchored on desktop and convert them to sheets on mobile.
2. Use a side drawer for tablet detail and a bottom sheet on mobile.
3. Implement Escape, close, focus entry/restore, and modal background isolation.
4. Respect reduced motion and minimum 44/48px targets.

## Success Criteria

- [x] Keyboard focus stays within modal layers and returns to the trigger.
- [x] Mobile actions remain thumb-reachable and do not overflow.
- [x] Motion is supportive and removable.
