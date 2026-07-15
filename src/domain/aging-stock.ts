import type { InventoryStatus } from './inventory-types'

const MILLISECONDS_PER_DAY = 86_400_000

function utcCalendarDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export function daysInStock(arrivalDate: string, now: Date): number {
  const arrival = new Date(arrivalDate)

  if (Number.isNaN(arrival.getTime()) || Number.isNaN(now.getTime())) {
    throw new RangeError('Arrival date and current time must be valid dates.')
  }

  return Math.max(0, Math.floor((utcCalendarDay(now) - utcCalendarDay(arrival)) / MILLISECONDS_PER_DAY))
}

export function isAgingStock(
  arrivalDate: string,
  inventoryStatus: InventoryStatus,
  now: Date,
): boolean {
  return inventoryStatus === 'available' && daysInStock(arrivalDate, now) > 90
}
