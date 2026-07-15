import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import type { OverviewView } from '../../domain/inventory-types'
import { fetchOverview } from '../shared/inventory-api'
import { overviewKeys } from '../shared/query-keys'

export const useOverviewQuery = (): UseQueryResult<OverviewView, Error> =>
  useQuery({ queryKey: overviewKeys.all, queryFn: fetchOverview })
