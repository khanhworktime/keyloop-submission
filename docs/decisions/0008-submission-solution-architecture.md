# 0008 Submission Solution Architecture

Date: 2026-07-13

## Status

Accepted

## Context

The supplied system-design document defines both a production-oriented
full-stack architecture and a bounded submission architecture. The requested
deliverable is the latter. Without an explicit boundary, a front-end coding
exercise could accidentally grow into backend, infrastructure, or provider
work that cannot be demonstrated locally.

## Decision

Build the Intelligent Inventory Dashboard as a Vite + React application using
TanStack Router, React Query, Axios, MSW, and Local Storage. MSW handlers own
the mock domain and expose API-shaped contracts; Local Storage is their
persistence mechanism. React Query invalidates and refetches affected queries
after mutations.

Implement the core inventory, aging-stock, dashboard, manager-action, activity
history, and submission-only telemetry behaviors. Treat the full-stack
architecture as a future scale-up reference, not a delivery requirement.

## Alternatives Considered

1. Build the Full-stack Solution now. Rejected: it exceeds the requested
   submission scope and adds operations that cannot be validated in the local
   browser deliverable.
2. Let UI components read and write Local Storage directly. Rejected: it would
   bypass the API boundary and make a later backend replacement costly.
3. Use static in-memory fixtures only. Rejected: it cannot prove persistence or
   preserve activity history across a refresh.

## Consequences

Positive:

- The application is demonstrable without services or cloud dependencies.
- API consumers are insulated from mock persistence details.
- The behavior can later migrate to the documented backend without rewriting
  presentation code around direct storage access.

Tradeoffs:

- Browser persistence is local to a device and is not multi-user.
- Telemetry is educational instrumentation, not production observability.
- Real authentication, authorization, realtime updates, and integrations are
  intentionally unproven.

## Follow-Up

- Define the exact API contract and seed schema in the implementation story.
- Define Zone/Slot and Vehicle Master/Inventory Unit mock API contracts before
  implementing the accepted product scope.
