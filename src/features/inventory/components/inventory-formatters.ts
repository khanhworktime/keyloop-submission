import type { InventoryActionType, InventoryStatus } from '../../../domain/inventory-types'

export const formatInventoryAction = (action: InventoryActionType | undefined): string => {
  if (!action) return 'Not recorded'
  return action
    .split('-')
    .map((word, index) => (index === 0 ? `${word[0]?.toUpperCase()}${word.slice(1)}` : word))
    .join(' ')
}

export const formatInventoryStatus = (status: InventoryStatus): string =>
  `${status[0]?.toUpperCase()}${status.slice(1)}`
