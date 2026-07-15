import { ACTIVITY_EVENT_TYPES, type ActivityEventType, type ActivityFilters } from '../../domain/inventory-types'
import { isValidCalendarDate } from '../../domain/date-validation'

export interface ActivityUrlFilters {
  actor?: string
  eventType?: ActivityEventType
  from?: string
  page?: number
  search?: string
  to?: string
  units?: string[]
}

const unitValues = (value: unknown): string[] | undefined => {
  const values = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : []
  const clean = [...new Set(values.map((item) => textValue(item, 40)).filter((item): item is string => Boolean(item)))]
  return clean.length ? clean : undefined
}

const textValue = (value: unknown, maximum: number): string | undefined => {
  if (typeof value !== 'string') return undefined
  const clean = value.trim().slice(0, maximum)
  return clean || undefined
}

const dateValue = (value: unknown): string | undefined => {
  const clean = textValue(value, 10)
  return clean && isValidCalendarDate(clean)
    ? clean
    : undefined
}

export const parseActivitySearch = (search: Record<string, unknown>): ActivityUrlFilters => {
  const from = dateValue(search.from)
  const to = dateValue(search.to)
  const eventType = ACTIVITY_EVENT_TYPES.includes(search.eventType as ActivityEventType)
    ? (search.eventType as ActivityEventType)
    : undefined
  const pageNumber = typeof search.page === 'number' ? search.page : Number(search.page)

  return {
    units: unitValues(search.units ?? search.unit),
    search: textValue(search.search, 100),
    eventType,
    actor: textValue(search.actor, 80),
    from: from && (!to || from <= to) ? from : undefined,
    to: to && (!from || from <= to) ? to : undefined,
    page: Number.isInteger(pageNumber) && pageNumber > 1 ? pageNumber : undefined,
  }
}

export const toActivityQueryFilters = (filters: ActivityUrlFilters): ActivityFilters => ({
  ...filters,
  page: filters.page ?? 1,
  pageSize: 10,
})

export const countAdvancedFilters = (filters: ActivityUrlFilters): number =>
  [filters.eventType, filters.actor, filters.from || filters.to].filter(Boolean).length

export const withoutFilter = (
  filters: ActivityUrlFilters,
  key: keyof ActivityUrlFilters,
): ActivityUrlFilters => ({ ...filters, [key]: undefined, page: undefined })
