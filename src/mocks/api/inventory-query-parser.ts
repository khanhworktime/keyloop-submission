import type {
  InventoryAgeFilter,
  InventoryFilters,
  InventorySortField,
  SortDirection,
} from '../../domain/inventory-types'
import {
  readBoundedText,
  readPositiveInteger,
  RequestValidationError,
} from './request-validation-error'

const PAGE_SIZES = new Set([10, 25, 50])
const AGE_FILTERS = new Set<InventoryAgeFilter>(['all', 'aging', 'not-aging'])
const SORT_FIELDS = new Set<InventorySortField>([
  'arrivalDate',
  'daysInStock',
  'make',
  'model',
  'stockNumber',
  'inventoryStatus',
])
const SORT_DIRECTIONS = new Set<SortDirection>(['asc', 'desc'])

const readEnum = <T extends string>(
  value: string | null,
  field: string,
  accepted: Set<T>,
): T | undefined => {
  if (!value) {
    return undefined
  }
  if (!accepted.has(value as T)) {
    throw new RequestValidationError([{ field, message: 'Contains an unsupported value.' }])
  }
  return value as T
}

export const parseInventoryFilters = (parameters: URLSearchParams): InventoryFilters => {
  const pageSize = readPositiveInteger(parameters.get('pageSize'), 'pageSize', 10)
  if (!PAGE_SIZES.has(pageSize)) {
    throw new RequestValidationError([
      { field: 'pageSize', message: 'Must be one of 10, 25, or 50.' },
    ])
  }

  return {
    page: readPositiveInteger(parameters.get('page'), 'page', 1),
    pageSize,
    search: readBoundedText(parameters.get('search'), 'search', 100),
    make: readBoundedText(parameters.get('make'), 'make', 60),
    model: readBoundedText(parameters.get('model'), 'model', 60),
    age: readEnum(parameters.get('age'), 'age', AGE_FILTERS) ?? 'all',
    sortBy: readEnum(parameters.get('sortBy'), 'sortBy', SORT_FIELDS) ?? 'daysInStock',
    sortDirection:
      readEnum(parameters.get('sortDirection'), 'sortDirection', SORT_DIRECTIONS) ?? 'desc',
  }
}
