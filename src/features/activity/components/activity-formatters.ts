import type { ActivityEventType } from '../../../domain/inventory-types'

export const activityEventLabels: Record<ActivityEventType, string> = {
  'inventory-arrived': 'Inventory arrival',
  'status-changed': 'Status change',
  'manager-action': 'Manager action',
  'unit-updated': 'Unit update',
}

const activityDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatActivityDate = (value: string): string =>
  activityDateFormatter.format(new Date(value))

const activityDayFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
})

const activityTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
})

export const formatActivityDateParts = (value: string): { date: string; full: string; time: string } => {
  const date = new Date(value)
  return {
    date: activityDayFormatter.format(date),
    full: activityDateFormatter.format(date),
    time: activityTimeFormatter.format(date),
  }
}
