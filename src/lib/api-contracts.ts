import type {
  ActivityPage,
  InventoryActionType,
  InventoryStatus,
  InventoryPage,
  InventoryUnitDetail,
  OverviewView,
  RecordActionResult,
  UpdateInventoryUnitResult,
} from '../domain/inventory-types'

export interface ApiSuccess<T> {
  data: T
}

export interface ApiFieldError {
  field: string
  message: string
}

export interface ApiErrorBody {
  error: {
    code: string
    message: string
    fieldErrors?: ApiFieldError[]
  }
  correlationId: string
}

export interface RecordActionRequest {
  action: InventoryActionType
  note?: string
}

export interface UpdateInventoryUnitRequest {
  vin: string
  stockNumber: string
  inventoryStatus: InventoryStatus
  zoneSlot?: string
}

export type OverviewResponse = ApiSuccess<OverviewView>
export type InventoryResponse = ApiSuccess<InventoryPage>
export type InventoryUnitResponse = ApiSuccess<InventoryUnitDetail>
export type RecordActionResponse = ApiSuccess<RecordActionResult>
export type UpdateInventoryUnitResponse = ApiSuccess<UpdateInventoryUnitResult>
export type ActivityResponse = ApiSuccess<ActivityPage>
