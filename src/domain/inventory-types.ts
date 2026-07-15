export const INVENTORY_ACTION_TYPES = [
  'price-reduction-planned',
  'transfer-to-another-dealership',
  'marketing-campaign-review',
] as const

export const INVENTORY_STATUSES = ['available', 'reserved', 'sold'] as const

export const ACTIVITY_EVENT_TYPES = [
  'inventory-arrived',
  'status-changed',
  'manager-action',
  'unit-updated',
] as const

export type VehicleMasterId = string
export type InventoryUnitId = string
export type ActivityId = string
export type InventoryActionType = (typeof INVENTORY_ACTION_TYPES)[number]
export type InventoryStatus = (typeof INVENTORY_STATUSES)[number]
export type ActivityEventType = (typeof ACTIVITY_EVENT_TYPES)[number]

export interface VehicleMaster {
  id: VehicleMasterId
  make: string
  model: string
  variant: string
  type: string
}

export interface InventoryAction {
  type: InventoryActionType
  note?: string
  recordedAt: string
  actor: string
}

export interface InventoryUnit {
  id: InventoryUnitId
  vehicleMasterId: VehicleMasterId
  vin: string
  stockNumber: string
  arrivalDate: string
  inventoryStatus: InventoryStatus
  zoneSlot?: string
  latestAction: InventoryAction | null
}

export interface Activity {
  id: ActivityId
  unitId: InventoryUnitId
  eventType: ActivityEventType
  timestamp: string
  actor: string
  title: string
  detail: string
  actionType?: InventoryActionType
  note?: string
}

export interface PersistedInventoryStateV1 {
  version: 1
  vehicleMasters: VehicleMaster[]
  inventoryUnits: InventoryUnit[]
  activities: Activity[]
}

export type InventoryAgeFilter = 'all' | 'aging' | 'not-aging'
export type InventorySortField =
  | 'arrivalDate'
  | 'daysInStock'
  | 'make'
  | 'model'
  | 'stockNumber'
  | 'inventoryStatus'
export type SortDirection = 'asc' | 'desc'

export interface InventoryFilters {
  page?: number
  pageSize?: number
  search?: string
  make?: string
  model?: string
  age?: InventoryAgeFilter
  sortBy?: InventorySortField
  sortDirection?: SortDirection
}

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface UnitListItem {
  unit: InventoryUnit
  master: VehicleMaster
  daysInStock: number
  isAging: boolean
}

export interface InventoryFacets {
  makes: string[]
  models: string[]
  ages: { all: number; aging: number; notAging: number }
}

export interface InventoryPage {
  items: UnitListItem[]
  meta: PaginationMeta
  facets: InventoryFacets
}

export interface InventoryUnitDetail extends UnitListItem {
  activities: Activity[]
}

export interface OverviewView {
  totalInventory: number
  agingInventory: number
  availableInventory: number
  priorityUnits: UnitListItem[]
}

export interface ActivityFilters {
  page?: number
  pageSize?: number
  units?: string[]
  search?: string
  eventType?: ActivityEventType
  actor?: string
  from?: string
  to?: string
}

export interface ActivityListItem {
  activity: Activity
  unit: InventoryUnit
  master: VehicleMaster
}

export interface ActivityFacets {
  actors: string[]
  eventTypes: ActivityEventType[]
  units: Array<Pick<InventoryUnit, 'id' | 'stockNumber' | 'vin'> & { label: string }>
}

export interface ActivityPage {
  items: ActivityListItem[]
  meta: PaginationMeta
  facets: ActivityFacets
}

export interface RecordActionCommand {
  unitId: InventoryUnitId
  action: InventoryActionType
  note?: string
  actor?: string
}

export interface RecordActionResult {
  unit: InventoryUnitDetail
  activity: ActivityListItem
}

export interface UpdateInventoryUnitCommand {
  unitId: InventoryUnitId
  vin: string
  stockNumber: string
  inventoryStatus: InventoryStatus
  zoneSlot?: string
  actor?: string
}

export interface UpdateInventoryUnitResult {
  unit: InventoryUnitDetail
  activity?: ActivityListItem
}
