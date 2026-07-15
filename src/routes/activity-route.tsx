import { createRoute } from '@tanstack/react-router'

import { rootRoute } from './root-route'
import { ActivityPage } from '../features/activity/components/activity-page'
import { parseActivitySearch } from '../features/activity/activity-filter-state'

export const activityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/activity',
  validateSearch: parseActivitySearch,
  component: function ActivityRouteComponent() {
    const filters = activityRoute.useSearch()
    const navigate = activityRoute.useNavigate()
    return (
      <ActivityPage
        filters={filters}
        onFiltersChange={(nextFilters, replace) =>
          void navigate({
            search: () => nextFilters,
            replace,
          })
        }
      />
    )
  },
})
