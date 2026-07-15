import type { InventoryActionType, InventoryStatus } from '../../domain/inventory-types'

export const actionLabels: Record<InventoryActionType, string> = {
  'price-reduction-planned': 'Price reduction planned',
  'transfer-to-another-dealership': 'Transfer to another dealership',
  'marketing-campaign-review': 'Marketing campaign review',
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatStatus = (status: InventoryStatus): string =>
  status.charAt(0).toUpperCase() + status.slice(1)

export const formatDate = (value: string): string => dateFormatter.format(new Date(value))

export const formatDateTime = (value: string): string =>
  dateTimeFormatter.format(new Date(value))
