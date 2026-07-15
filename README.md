# Intelligent Inventory Dashboard

A browser application for dealership managers to find aging vehicles, review
inventory, and record a proposed action. The core flow is:

```text
Overview → Inventory → Inventory Unit → Activity
```

## Business scope

- Search and filter vehicles by make, model, age, and keyword, including global
  Inventory search from primary navigation or Command/Ctrl + K.
- Highlight aging stock: a vehicle is aging only when its status is
  `available` and it has been in stock for more than 90 days. A vehicle at
  exactly 90 days is not aging; reserved and sold vehicles are excluded.
- Record a proposed action for an aging vehicle and retain it in Activity.

The MVP is browser-only. It uses MSW to simulate the API and Local Storage to
persist seeded inventory, unit changes, and activity records. Clearing this
site's browser storage restores the seed data.

## Technology

- React, TypeScript, Vite, and Tailwind CSS
- TanStack Router and TanStack Query
- Axios, MSW, and Local Storage
- Vitest, Testing Library, Playwright, and axe-core

## Prerequisites

- Node.js 20.19 or later
- npm

## Install and run

Install the locked dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

## Build and preview

Create a production build:

```bash
npm run build
```

Preview that build locally:

```bash
npm run preview
```

## Test

Run the unit, component, repository, and API-handler tests:

```bash
npm run test
```

Run the browser tests. On a new machine, install Chromium once first:

```bash
npx playwright install chromium
npm run test:e2e
```

Playwright starts the Vite server and checks the main manager journey on
desktop, tablet, and mobile viewports. Other useful commands are:

```bash
npm run lint          # Check source quality
npm run test:coverage # Generate Vitest coverage
npm run validate      # Run lint, tests, build, and browser tests
```

### Test coverage

The test suite validates the core business logic and its user-facing flow:

| Area | Examples covered |
| --- | --- |
| Aging rules | UTC day calculation, the `> 90 days` boundary, future dates, and exclusion of reserved or sold stock |
| Inventory repository | Seed state, search and filters, sorting, pagination, persistence failures, and valid action updates |
| Actions and activity | Only aging vehicles can receive a proposed action; a saved action updates the unit and creates an activity record together |
| Browser journey | Filter aging stock, record an action, reload the page, and confirm the action remains visible in Activity |
| Responsive and accessibility | Desktop, tablet, and mobile layouts, touch targets, overflow, and automated WCAG checks |

## AI Collaboration Narrative

AI was used as a collaborator, not as the final decision-maker. I set a narrow
brief around three outcomes: a filterable inventory, a clear aging-stock
signal, and a persisted proposed action. I also set the aging rule and the MVP
boundary: no production backend, authentication, or multi-user behavior.

The work followed a short loop. I provided the requirements and feedback;
Codex proposed screen structures, data boundaries, and implementation steps;
I reviewed each result against the business rules before accepting it. The
implementation kept a clear path from UI to persistence:

```text
Route → query hook → Axios → MSW → Local Storage repository
```

To refine the output, I checked that an action updates both the selected unit
and its activity history, then reviewed the same journey on desktop, tablet,
and mobile layouts. The final quality gate combines linting, unit and
repository tests, a production build, Playwright journeys, and automated
accessibility checks. When a result did not match the required flow or layout,
it was corrected at the source and the relevant checks were run again.

### Design flow

Review the final responsive design flow in the
[v0.5 design handoff](https://khanhworktime.github.io/keyloop-submission/design/v0.5-design-handoff/index.html).
