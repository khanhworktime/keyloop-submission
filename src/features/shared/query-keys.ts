import type { ActivityFilters, InventoryFilters, InventoryUnitId } from '../../domain/inventory-types'

const stableFilterKey = <T extends object>(filters: T): string =>
  Object.entries(filters)
    .filter(([, value]) => value !== undefined && value !== '' && value !== 'all' && (!Array.isArray(value) || value.length > 0))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}:${String(value)}`)
    .join('|')

export const overviewKeys = {
  all: ['overview'] as const,
}

export const inventoryKeys = {
  all: ['inventory'] as const,
  list: (filters: InventoryFilters) =>
    [...inventoryKeys.all, 'list', stableFilterKey(filters)] as const,
  unit: (unitId: InventoryUnitId) => [...inventoryKeys.all, 'unit', unitId] as const,
}

export const activityKeys = {
  all: ['activity'] as const,
  list: (filters: ActivityFilters) =>
    [...activityKeys.all, 'list', stableFilterKey(filters)] as const,
}
