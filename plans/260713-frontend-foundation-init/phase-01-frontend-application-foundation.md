---
phase: 1
title: "Frontend application foundation"
status: completed
priority: P1
effort: "2h"
dependencies: []
---

# Phase 1: Frontend application foundation

## Overview

Create the browser application foundation for US-001. This phase establishes
the accepted client stack and proves the shell starts; it does not implement
inventory data or manager workflows.

## Requirements

- Create a root Vite React TypeScript application.
- Wire TanStack Router, TanStack Query, Axios, and the MSW browser worker.
- Provide one accessible root route and no direct UI access to Local Storage.
- Keep product behavior, API contracts, mock data, and persistence deferred.

## Architecture

`main.tsx` composes the Query Client and Router providers. UI requests will
later use the Axios client and MSW handlers; no route or component owns mock
domain state.

## Related Code Files

- Create: Vite package/configuration files, `src/`, and MSW worker asset.
- Modify: `.gitignore` only for standard Node/Vite outputs.
- Update after proof: `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md`.

## Implementation Steps

1. Scaffold Vite's React TypeScript template at the repository root.
2. Install `@tanstack/react-router`, `@tanstack/react-query`, `axios`, and `msw`.
3. Replace the demo with a minimal router-driven application shell.
4. Add query-client, Axios-client, and development-only MSW worker modules.
5. Generate `public/mockServiceWorker.js`.
6. Run lint, production build, and browser smoke validation.

## Success Criteria

- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] Root route provides an accessible application shell.
- [x] MSW startup is development-only and completes before later API requests are added.

## Risk Assessment

MSW initialization must be idempotent under React Strict Mode. Keep the worker
startup outside component render paths and leave handlers empty until the API
contract is defined.
