import { INVENTORY_STATUSES, type InventoryStatus } from '../../domain/inventory-types'
import type { UpdateInventoryUnitRequest } from '../../lib/api-contracts'
import { RequestValidationError } from './request-validation-error'

const STATUS_VALUES = new Set<InventoryStatus>(INVENTORY_STATUSES)

export const parseUpdateInventoryUnitRequest = (value: unknown): UpdateInventoryUnitRequest => {
  if (typeof value !== 'object' || value === null) {
    throw new RequestValidationError([{ field: 'body', message: 'A JSON request body is required.' }])
  }

  const vin = 'vin' in value ? value.vin : undefined
  const stockNumber = 'stockNumber' in value ? value.stockNumber : undefined
  const inventoryStatus = 'inventoryStatus' in value ? value.inventoryStatus : undefined
  const zoneSlot = 'zoneSlot' in value ? value.zoneSlot : undefined
  const fieldErrors = []

  if (typeof vin !== 'string' || !vin.trim()) {
    fieldErrors.push({ field: 'vin', message: 'VIN is required.' })
  } else if (vin.trim().length > 64) {
    fieldErrors.push({ field: 'vin', message: 'VIN must be 64 characters or fewer.' })
  }
  if (typeof stockNumber !== 'string' || !stockNumber.trim()) {
    fieldErrors.push({ field: 'stockNumber', message: 'Stock number is required.' })
  } else if (stockNumber.trim().length > 40) {
    fieldErrors.push({ field: 'stockNumber', message: 'Stock number must be 40 characters or fewer.' })
  }
  if (typeof inventoryStatus !== 'string' || !STATUS_VALUES.has(inventoryStatus as InventoryStatus)) {
    fieldErrors.push({ field: 'inventoryStatus', message: 'Choose a supported inventory status.' })
  }
  if (zoneSlot !== undefined && typeof zoneSlot !== 'string') {
    fieldErrors.push({ field: 'zoneSlot', message: 'Zone / Slot must be plain text.' })
  } else if (typeof zoneSlot === 'string' && zoneSlot.trim().length > 80) {
    fieldErrors.push({ field: 'zoneSlot', message: 'Zone / Slot must be 80 characters or fewer.' })
  }
  if (fieldErrors.length > 0) throw new RequestValidationError(fieldErrors)

  return {
    vin: (vin as string).trim(),
    stockNumber: (stockNumber as string).trim(),
    inventoryStatus: inventoryStatus as InventoryStatus,
    ...(typeof zoneSlot === 'string' && zoneSlot.trim() ? { zoneSlot: zoneSlot.trim() } : {}),
  }
}
