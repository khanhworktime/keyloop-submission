import type {
  InventoryAgeFilter,
  InventoryFilters,
  InventorySortField,
  SortDirection,
} from '../../domain/inventory-types'

const PAGE_SIZES = new Set([10, 25, 50])
const AGE_FILTERS = new Set<InventoryAgeFilter>(['aging', 'not-aging'])
const SORT_FIELDS = new Set<InventorySortField>([
  'arrivalDate',
  'daysInStock',
  'make',
  'model',
  'stockNumber',
  'inventoryStatus',
])
const SORT_DIRECTIONS = new Set<SortDirection>(['asc', 'desc'])

export interface InventorySearch {
  age?: InventoryAgeFilter
  make?: string
  model?: string
  page?: number
  pageSize?: number
  search?: string
  sortBy?: InventorySortField
  sortDirection?: SortDirection
}

const readText = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined
  const text = value.trim().slice(0, 100)
  return text || undefined
}

const readPositiveInteger = (value: unknown): number | undefined => {
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isInteger(number) && number > 0 ? number : undefined
}

export const validateInventorySearch = (value: Record<string, unknown>): InventorySearch => {
  const page = readPositiveInteger(value.page)
  const pageSize = readPositiveInteger(value.pageSize)
  const age = AGE_FILTERS.has(value.age as InventoryAgeFilter)
    ? (value.age as InventoryAgeFilter)
    : undefined
  const sortBy = SORT_FIELDS.has(value.sortBy as InventorySortField)
    ? (value.sortBy as InventorySortField)
    : undefined
  const sortDirection = SORT_DIRECTIONS.has(value.sortDirection as SortDirection)
    ? (value.sortDirection as SortDirection)
    : undefined

  return {
    age,
    make: readText(value.make)?.slice(0, 60),
    model: readText(value.model)?.slice(0, 60),
    page: page === 1 ? undefined : page,
    pageSize: pageSize && PAGE_SIZES.has(pageSize) && pageSize !== 10 ? pageSize : undefined,
    search: readText(value.search),
    sortBy: sortBy === 'daysInStock' ? undefined : sortBy,
    sortDirection: sortDirection === 'desc' ? undefined : sortDirection,
  }
}

export const toInventoryFilters = (search: InventorySearch): InventoryFilters => ({
  age: search.age ?? 'all',
  make: search.make,
  model: search.model,
  page: search.page ?? 1,
  pageSize: search.pageSize ?? 10,
  search: search.search,
  sortBy: search.sortBy ?? 'daysInStock',
  sortDirection: search.sortDirection ?? 'desc',
})

export const updateInventorySearch = (
  current: InventorySearch,
  patch: Partial<InventorySearch>,
  resetPage = true,
): InventorySearch =>
  validateInventorySearch({
    ...current,
    ...patch,
    page: resetPage ? undefined : patch.page,
  })
