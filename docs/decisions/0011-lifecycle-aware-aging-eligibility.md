# 0011 Lifecycle-aware Aging Eligibility

Date: 2026-07-15

## Status

Accepted

## Context

The original submission rule derived aging only from elapsed days. That caused
reserved and sold Units to remain in aging totals and manager-review workflows,
even though their lifecycle no longer represents available stock requiring aging action.

## Decision

An Inventory Unit is aging only when its lifecycle status is `available` and its
derived `daysInStock` is strictly greater than 90. Numeric age remains derived and
visible for reserved and sold Units, but no aging signal or aging-only action applies.

## Alternatives Considered

1. Keep age-only aging and display lifecycle as a separate badge.
2. Hide aging only in the UI while retaining old counts and repository eligibility.

## Consequences

Positive:

- Overview, filters, detail presentation, and action eligibility share one rule.
- Reserved and sold stock no longer creates false manager attention.

Tradeoffs:

- Aging totals can decrease immediately when a Unit becomes reserved or sold.
- A Unit can become aging again if changed back to available while still over 90 days.

## Follow-Up

- Validate all status and 90/91-day combinations with focused tests.

