import { createRoute } from '@tanstack/react-router'

import { OverviewPage } from '../features/overview/components/overview-page'
import { rootRoute } from './root-route'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: OverviewPage,
})
