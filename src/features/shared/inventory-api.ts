import type {
  ActivityFilters,
  ActivityPage,
  InventoryFilters,
  InventoryPage,
  InventoryUnitDetail,
  InventoryUnitId,
  OverviewView,
  RecordActionResult,
  UpdateInventoryUnitResult,
} from '../../domain/inventory-types'
import { apiClient } from '../../lib/api-client'
import type {
  ActivityResponse,
  InventoryResponse,
  InventoryUnitResponse,
  OverviewResponse,
  RecordActionRequest,
  RecordActionResponse,
  UpdateInventoryUnitRequest,
  UpdateInventoryUnitResponse,
} from '../../lib/api-contracts'
import { normalizeApiError } from '../../lib/api-error'

const serializeParameters = <T extends object>(filters: T): string => {
  const parameters = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== 'all') {
      if (Array.isArray(value)) value.forEach((item) => parameters.append(key, String(item)))
      else parameters.set(key, String(value))
    }
  })
  return parameters.toString()
}

const request = async <T>(work: () => Promise<T>): Promise<T> => {
  try {
    return await work()
  } catch (error) {
    throw normalizeApiError(error)
  }
}

export const fetchOverview = (): Promise<OverviewView> =>
  request(async () => (await apiClient.get<OverviewResponse>('/overview')).data.data)

export const fetchInventory = (filters: InventoryFilters): Promise<InventoryPage> =>
  request(async () => {
    const query = serializeParameters(filters)
    return (await apiClient.get<InventoryResponse>(`/inventory${query ? `?${query}` : ''}`)).data
      .data
  })

export const fetchInventoryUnit = (unitId: InventoryUnitId): Promise<InventoryUnitDetail> =>
  request(async () => (await apiClient.get<InventoryUnitResponse>(`/inventory/${unitId}`)).data.data)

export const recordInventoryAction = (
  unitId: InventoryUnitId,
  payload: RecordActionRequest,
): Promise<RecordActionResult> =>
  request(async () =>
    (await apiClient.post<RecordActionResponse>(`/inventory/${unitId}/actions`, payload)).data.data,
  )

export const updateInventoryUnit = (
  unitId: InventoryUnitId,
  payload: UpdateInventoryUnitRequest,
): Promise<UpdateInventoryUnitResult> =>
  request(async () =>
    (await apiClient.patch<UpdateInventoryUnitResponse>(`/inventory/${unitId}`, payload)).data.data,
  )

export const fetchActivity = (filters: ActivityFilters): Promise<ActivityPage> =>
  request(async () => {
    const query = serializeParameters(filters)
    return (await apiClient.get<ActivityResponse>(`/activity${query ? `?${query}` : ''}`)).data.data
  })
