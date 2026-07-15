import type { ActivityEventType, ActivityFilters } from '../../domain/inventory-types'
import { ACTIVITY_EVENT_TYPES } from '../../domain/inventory-types'
import { isValidCalendarDate } from '../../domain/date-validation'
import {
  readBoundedText,
  readPositiveInteger,
  RequestValidationError,
} from './request-validation-error'

const PAGE_SIZES = new Set([10, 25, 50])
const EVENT_TYPES = new Set<ActivityEventType>(ACTIVITY_EVENT_TYPES)

const readDate = (value: string | null, field: string): string | undefined => {
  const normalized = readBoundedText(value, field, 10)
  if (!normalized) {
    return undefined
  }
  if (!isValidCalendarDate(normalized)) {
    throw new RequestValidationError([{ field, message: 'Use a valid YYYY-MM-DD date.' }])
  }
  return normalized
}

export const parseActivityFilters = (parameters: URLSearchParams): ActivityFilters => {
  const pageSize = readPositiveInteger(parameters.get('pageSize'), 'pageSize', 10)
  if (!PAGE_SIZES.has(pageSize)) {
    throw new RequestValidationError([
      { field: 'pageSize', message: 'Must be one of 10, 25, or 50.' },
    ])
  }
  const eventType = readBoundedText(parameters.get('eventType'), 'eventType', 40)
  if (eventType && !EVENT_TYPES.has(eventType as ActivityEventType)) {
    throw new RequestValidationError([
      { field: 'eventType', message: 'Contains an unsupported value.' },
    ])
  }
  const from = readDate(parameters.get('from'), 'from')
  const to = readDate(parameters.get('to'), 'to')
  if (from && to && from > to) {
    throw new RequestValidationError([
      { field: 'to', message: 'Must be on or after the From date.' },
    ])
  }
  const units = [...new Set([
    ...parameters.getAll('units'),
    ...parameters.getAll('unit'),
  ].map((unit) => readBoundedText(unit, 'units', 40)).filter((unit): unit is string => Boolean(unit)))]

  return {
    page: readPositiveInteger(parameters.get('page'), 'page', 1),
    pageSize,
    units: units.length ? units : undefined,
    search: readBoundedText(parameters.get('search'), 'search', 100),
    eventType: eventType as ActivityEventType | undefined,
    actor: readBoundedText(parameters.get('actor'), 'actor', 80),
    from,
    to,
  }
}
