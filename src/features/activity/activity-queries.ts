import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import type { ActivityFilters, ActivityPage } from '../../domain/inventory-types'
import { fetchActivity } from '../shared/inventory-api'
import { activityKeys } from '../shared/query-keys'

export const useActivityQuery = (
  filters: ActivityFilters,
): UseQueryResult<ActivityPage, Error> =>
  useQuery({ queryKey: activityKeys.list(filters), queryFn: () => fetchActivity(filters) })
