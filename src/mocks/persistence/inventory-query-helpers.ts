import { daysInStock, isAgingStock } from '../../domain/aging-stock'
import type {
  ActivityFilters,
  ActivityListItem,
  ActivityPage,
  InventoryFilters,
  InventoryPage,
  InventorySortField,
  PaginationMeta,
  PersistedInventoryStateV1,
  SortDirection,
  UnitListItem,
} from '../../domain/inventory-types'

const LEGACY_MANAGER_ACTORS = new Set(['avery manager', 'every manager', 'krist manager', 'manager'])

export function normalizeActivityActor(actor: string): string {
  const label = actor.trim()
  return LEGACY_MANAGER_ACTORS.has(label.toLocaleLowerCase()) ? 'Manager' : label
}

export function joinUnits(state: PersistedInventoryStateV1, now: Date): UnitListItem[] {
  return state.inventoryUnits.map((unit) => {
    const master = state.vehicleMasters.find(({ id }) => id === unit.vehicleMasterId)
    if (!master) throw new Error(`Missing master ${unit.vehicleMasterId}.`)
    const age = daysInStock(unit.arrivalDate, now)
    const normalizedUnit = unit.latestAction
      ? { ...unit, latestAction: { ...unit.latestAction, actor: normalizeActivityActor(unit.latestAction.actor) } }
      : unit
    return {
      unit: normalizedUnit,
      master,
      daysInStock: age,
      isAging: isAgingStock(unit.arrivalDate, unit.inventoryStatus, now),
    }
  })
}

function pageMeta(total: number, requestedPage = 1, requestedSize = 10): PaginationMeta {
  const pageSize = Math.max(1, Math.floor(requestedSize))
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(Math.max(1, Math.floor(requestedPage)), totalPages)
  return { page, pageSize, total, totalPages }
}

function paginate<T>(items: T[], meta: PaginationMeta): T[] {
  const start = (meta.page - 1) * meta.pageSize
  return items.slice(start, start + meta.pageSize)
}

function searchableUnit(item: UnitListItem): string {
  return [
    item.master.id,
    item.unit.stockNumber,
    item.unit.vin,
    item.master.make,
    item.master.model,
    item.master.variant,
  ].join(' ').toLocaleLowerCase()
}

function sortValue(item: UnitListItem, field: InventorySortField): string | number {
  if (field === 'daysInStock') return item.daysInStock
  if (field === 'make' || field === 'model') return item.master[field]
  if (field === 'arrivalDate') return Date.parse(item.unit.arrivalDate)
  return item.unit[field]
}

function sortUnits(items: UnitListItem[], field: InventorySortField, direction: SortDirection): UnitListItem[] {
  const factor = direction === 'asc' ? 1 : -1
  return [...items].sort((left, right) => {
    const a = sortValue(left, field)
    const b = sortValue(right, field)
    return (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))) * factor
  })
}

export function queryInventory(
  state: PersistedInventoryStateV1,
  now: Date,
  filters: InventoryFilters = {},
): InventoryPage {
  const joined = joinUnits(state, now)
  const search = filters.search?.trim().toLocaleLowerCase()
  const make = filters.make?.trim().toLocaleLowerCase()
  const model = filters.model?.trim().toLocaleLowerCase()
  const filtered = joined.filter((item) => {
    if (search && !searchableUnit(item).includes(search)) return false
    if (make && item.master.make.toLocaleLowerCase() !== make) return false
    if (model && item.master.model.toLocaleLowerCase() !== model) return false
    if (filters.age === 'aging' && !item.isAging) return false
    if (filters.age === 'not-aging' && item.isAging) return false
    return true
  })
  const sorted = sortUnits(filtered, filters.sortBy ?? 'daysInStock', filters.sortDirection ?? 'desc')
  const meta = pageMeta(sorted.length, filters.page, filters.pageSize)

  return {
    items: paginate(sorted, meta),
    meta,
    facets: {
      makes: [...new Set(joined.map(({ master }) => master.make))].sort(),
      models: [...new Set(joined.map(({ master }) => master.model))].sort(),
      ages: {
        all: joined.length,
        aging: joined.filter(({ isAging }) => isAging).length,
        notAging: joined.filter(({ isAging }) => !isAging).length,
      },
    },
  }
}

function dateBoundary(value: string, endOfDay: boolean): number {
  const suffix = endOfDay && /^\d{4}-\d{2}-\d{2}$/.test(value) ? 'T23:59:59.999Z' : ''
  return Date.parse(`${value}${suffix}`)
}

export function joinActivities(state: PersistedInventoryStateV1): ActivityListItem[] {
  return state.activities.map((activity) => {
    const unit = state.inventoryUnits.find(({ id }) => id === activity.unitId)
    const master = unit && state.vehicleMasters.find(({ id }) => id === unit.vehicleMasterId)
    if (!unit || !master) throw new Error(`Missing activity reference for ${activity.id}.`)
    return {
      activity: { ...activity, actor: normalizeActivityActor(activity.actor) },
      unit,
      master,
    }
  })
}

export function queryActivity(
  state: PersistedInventoryStateV1,
  filters: ActivityFilters = {},
): ActivityPage {
  const joined = joinActivities(state)
  const selectedUnits = filters.units?.map((unit) => unit.trim().toLocaleLowerCase())
  const search = filters.search?.trim().toLocaleLowerCase()
  const actor = filters.actor
    ? normalizeActivityActor(filters.actor).toLocaleLowerCase()
    : undefined
  const from = filters.from ? dateBoundary(filters.from, false) : undefined
  const to = filters.to ? dateBoundary(filters.to, true) : undefined
  const filtered = joined.filter((item) => {
    const identity = `${item.unit.stockNumber} ${item.unit.vin} ${item.master.model}`.toLocaleLowerCase()
    if (selectedUnits?.length && !selectedUnits.includes(item.unit.stockNumber.toLocaleLowerCase())) return false
    if (search && !identity.includes(search)) return false
    if (filters.eventType && item.activity.eventType !== filters.eventType) return false
    if (actor && item.activity.actor.toLocaleLowerCase() !== actor) return false
    const timestamp = Date.parse(item.activity.timestamp)
    if (from !== undefined && timestamp < from) return false
    if (to !== undefined && timestamp > to) return false
    return true
  })
  filtered.sort((left, right) => Date.parse(right.activity.timestamp) - Date.parse(left.activity.timestamp))
  const meta = pageMeta(filtered.length, filters.page, filters.pageSize)
  const units = state.inventoryUnits.map((itemUnit) => {
    const master = state.vehicleMasters.find(({ id }) => id === itemUnit.vehicleMasterId)
    if (!master) throw new Error(`Missing master ${itemUnit.vehicleMasterId}.`)
    return {
      id: itemUnit.id,
      stockNumber: itemUnit.stockNumber,
      vin: itemUnit.vin,
      label: `${master.make} ${master.model} ${master.variant}`,
    }
  })

  return {
    items: paginate(filtered, meta),
    meta,
    facets: {
      actors: [...new Set(joined.map(({ activity }) => activity.actor))].sort(),
      eventTypes: [...new Set(joined.map(({ activity }) => activity.eventType))].sort(),
      units,
    },
  }
}
