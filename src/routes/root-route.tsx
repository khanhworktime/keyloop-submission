import { Outlet, createRootRoute } from '@tanstack/react-router'

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <p role="status">Page not found.</p>,
})
