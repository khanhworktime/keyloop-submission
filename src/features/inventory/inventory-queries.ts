import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'

import type {
  InventoryFilters,
  InventoryPage,
  InventoryUnitDetail,
  InventoryUnitId,
  RecordActionResult,
  UpdateInventoryUnitResult,
} from '../../domain/inventory-types'
import type { RecordActionRequest, UpdateInventoryUnitRequest } from '../../lib/api-contracts'
import {
  fetchInventory,
  fetchInventoryUnit,
  recordInventoryAction,
  updateInventoryUnit,
} from '../shared/inventory-api'
import { activityKeys, inventoryKeys, overviewKeys } from '../shared/query-keys'

export const useInventoryQuery = (
  filters: InventoryFilters,
): UseQueryResult<InventoryPage, Error> =>
  useQuery({ queryKey: inventoryKeys.list(filters), queryFn: () => fetchInventory(filters) })

export const useGlobalInventorySearchQuery = (
  search: string,
): UseQueryResult<InventoryPage, Error> => {
  const keyword = search.trim()
  const filters: InventoryFilters = {
    search: keyword,
    page: 1,
    pageSize: 10,
    sortBy: 'daysInStock',
    sortDirection: 'desc',
  }

  return useQuery({
    queryKey: inventoryKeys.list(filters),
    queryFn: () => fetchInventory(filters),
    enabled: keyword.length > 0,
  })
}

export const useInventoryUnitQuery = (
  unitId: InventoryUnitId,
): UseQueryResult<InventoryUnitDetail, Error> =>
  useQuery({ queryKey: inventoryKeys.unit(unitId), queryFn: () => fetchInventoryUnit(unitId) })

interface ActionMutationVariables extends RecordActionRequest {
  unitId: InventoryUnitId
}

interface UpdateUnitMutationVariables extends UpdateInventoryUnitRequest {
  unitId: InventoryUnitId
}

export const useUpdateInventoryUnitMutation = (): UseMutationResult<
  UpdateInventoryUnitResult,
  Error,
  UpdateUnitMutationVariables
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ unitId, ...payload }) => updateInventoryUnit(unitId, payload),
    onSuccess: async (_result, { unitId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: overviewKeys.all }),
        queryClient.invalidateQueries({ queryKey: inventoryKeys.all }),
        queryClient.invalidateQueries({ queryKey: inventoryKeys.unit(unitId) }),
        queryClient.invalidateQueries({ queryKey: activityKeys.all }),
      ])
    },
  })
}

export const useRecordActionMutation = (): UseMutationResult<
  RecordActionResult,
  Error,
  ActionMutationVariables
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ unitId, ...payload }) => recordInventoryAction(unitId, payload),
    onSuccess: async (_result, { unitId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: overviewKeys.all }),
        queryClient.invalidateQueries({ queryKey: inventoryKeys.all }),
        queryClient.invalidateQueries({ queryKey: inventoryKeys.unit(unitId) }),
        queryClient.invalidateQueries({ queryKey: activityKeys.all }),
      ])
    },
  })
}
