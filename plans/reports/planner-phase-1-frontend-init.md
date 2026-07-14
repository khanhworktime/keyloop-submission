# Phase 1 plan: frontend initialization

## Classification

- Lane: normal.
- Rationale: this is the bounded first slice of `US-001` and establishes a browser application plus client-visible routing/API-boundary foundations. It touches one public UI surface and a future mock API contract, but does not yet introduce domain persistence, data schema, authentication, external providers, or an implemented behavior to regress. The story and test matrix already define the normal-lane proof path.
- Current evidence: `US-001` is planned; unit/integration/E2E/platform proof is currently absent (`harness-cli query matrix --active --summary`, 2026-07-13).

## Documented stack and Phase 1 scope

The accepted architecture fixes the product stack as:

- Vite + React browser application.
- TanStack Router for browser routing.
- TanStack Query (React Query) for server-state ownership, caching, invalidation.
- Axios as the HTTP client.
- MSW browser worker as the sole UI-facing mock HTTP boundary.
- Browser Local Storage as the future mutable mock-domain persistence mechanism.

TypeScript is not named in the accepted decision. Since the repository contains no existing consumer `package.json`, Phase 1 must select the Vite React template before scaffolding. Recommend the React + TypeScript template: it keeps API contracts, query payloads, and MSW handlers explicit without adding runtime complexity. Record this as an implementation detail in the story/progress trace; amend the architecture decision only if this becomes a durable broader convention.

In scope for initialization:

1. Create the Vite React TypeScript project at the repository root, retaining only app-level configuration and a minimal shell route.
2. Add and wire `@tanstack/react-router`, `@tanstack/react-query`, `axios`, and `msw`; keep package versions lockfile-pinned.
3. Add a single app composition root: router provider, query client provider, Axios client module, and development MSW worker startup.
4. Generate and commit MSW's required browser worker asset. Configure the worker to start before app requests; do not add inventory endpoints or fixtures yet.
5. Add base, responsive-neutral CSS and an accessible application landmark/title sufficient to prove the browser shell mounts.

Explicitly defer: inventory/dashboard pages, filters, pagination, vehicle models, Local Storage reads/writes, MSW handlers/contracts, latency/failure simulation, telemetry/correlation IDs, action/history flows, seed data, visual system, and E2E scenarios. These belong to subsequent vertical slices; direct component Local Storage access remains prohibited.

## Smallest safe execution sequence

1. Bootstrap the Harness, record normal-lane intake, and refresh the active matrix before modifying repository artifacts. Confirm the clean baseline and keep the existing `US-001` packet as the governing story.
2. Scaffold Vite's React + TypeScript template in place. Preserve the repository Harness files; do not nest the application in a second project directory.
3. Install the documented runtime dependencies and use the scaffold's ESLint setup. Do not add a state-management library, component kit, design system, backend, test runner, or persistence wrapper in this phase.
4. Replace demo UI with a tiny app shell. Compose `QueryClientProvider` and `RouterProvider`, create one index route, and make strict-mode behavior safe for worker startup.
5. Create a shared Axios instance with a relative base URL only; no inventory endpoint constants, request types, or response envelopes until the API-contract slice decides them.
6. Initialize MSW's browser worker in development and generate its public worker asset. Use an empty handler collection or a clearly named registration point so later query/mutation handlers are the only data path.
7. Verify production build, lint, and a manual local browser smoke. Then have the tester validate the final initialization code before code review. Update harness proof only with evidence actually produced; do not claim US-001's unit/integration/E2E proof complete merely because the shell builds.

## Completion criteria and proof

- `npm run lint` exits 0.
- `npm run build` exits 0 and produces a Vite production bundle.
- `npm run dev -- --host 127.0.0.1` serves the root route; browser smoke shows the application landmark/title and no startup/runtime console error.
- Network inspection confirms MSW starts in development. No UI code directly accesses Local Storage, and no product data is silently invented in the shell.
- `scripts/bin/harness-cli query matrix --active --summary` still reports `US-001` proof fields accurately. Later phases add unit proof for the aging/persistence rules, integration proof for MSW contracts, and E2E proof for the manager flow.

## Required implementation files (expected)

- Create: root Vite configuration and package files, `src/main.tsx`, app/router/provider/client/worker modules, minimal root route/style files, and MSW public worker asset.
- Modify: `.gitignore` only as required by Vite/Node build artifacts; `docs/stories/US-001-intelligent-inventory-dashboard-foundation.md` only if progress/evidence needs recording after implementation.
- Do not modify the accepted product contract or decision merely to add setup details.

## Unresolved choice

Use Vite's React + TypeScript template unless the user explicitly requires plain JavaScript. This is the only execution-affecting choice not fixed by the accepted architecture; all other Phase 1 boundaries are specified.
