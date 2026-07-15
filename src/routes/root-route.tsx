import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AppShell } from '../components/app-shell/app-shell'

export const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  notFoundComponent: () => (
    <section className="page-stack" aria-labelledby="not-found-title">
      <p className="page-eyebrow">Navigation</p>
      <h1 id="not-found-title" className="page-title">Page not found</h1>
      <p className="page-description">This destination is not part of the Inventory MVP.</p>
    </section>
  ),
})
