import type {
  ActivityFilters,
  ActivityPage,
  InventoryFilters,
  InventoryPage,
  InventoryUnitDetail,
  OverviewView,
  RecordActionCommand,
  RecordActionResult,
  UpdateInventoryUnitCommand,
  UpdateInventoryUnitResult,
} from './inventory-types'

export const INVENTORY_STORAGE_KEY = 'keyloop.inventory-state.v1'

export type InventoryRepositoryErrorCode =
  | 'CORRUPT_STATE'
  | 'DUPLICATE_STOCK_NUMBER'
  | 'DUPLICATE_VIN'
  | 'INVALID_ACTION'
  | 'INVALID_UNIT'
  | 'MISSING_REFERENCE'
  | 'NOTE_TOO_LONG'
  | 'STORAGE_FAILURE'
  | 'UNIT_NOT_AGING'
  | 'UNIT_NOT_FOUND'

export class InventoryRepositoryError extends Error {
  readonly code: InventoryRepositoryErrorCode
  readonly cause?: unknown

  constructor(code: InventoryRepositoryErrorCode, message: string, cause?: unknown) {
    super(message)
    this.name = 'InventoryRepositoryError'
    this.code = code
    this.cause = cause
  }
}

export interface InventoryRepository {
  getOverview(): OverviewView
  getInventory(filters?: InventoryFilters): InventoryPage
  getUnit(unitId: string): InventoryUnitDetail
  getActivity(filters?: ActivityFilters): ActivityPage
  recordAction(command: RecordActionCommand): RecordActionResult
  updateUnit(command: UpdateInventoryUnitCommand): UpdateInventoryUnitResult
}
