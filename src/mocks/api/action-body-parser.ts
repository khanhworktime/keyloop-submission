import {
  INVENTORY_ACTION_TYPES,
  type InventoryActionType,
} from '../../domain/inventory-types'
import type { RecordActionRequest } from '../../lib/api-contracts'
import { RequestValidationError } from './request-validation-error'

const ACTION_TYPES = new Set<InventoryActionType>(INVENTORY_ACTION_TYPES)

export const parseRecordActionRequest = (value: unknown): RecordActionRequest => {
  if (typeof value !== 'object' || value === null) {
    throw new RequestValidationError([
      { field: 'body', message: 'A JSON request body is required.' },
    ])
  }

  const action = 'action' in value ? value.action : undefined
  const note = 'note' in value ? value.note : undefined
  const fieldErrors = []

  if (typeof action !== 'string' || !ACTION_TYPES.has(action as InventoryActionType)) {
    fieldErrors.push({ field: 'action', message: 'Choose a supported proposed action.' })
  }
  if (note !== undefined && typeof note !== 'string') {
    fieldErrors.push({ field: 'note', message: 'Must be plain text.' })
  } else if (typeof note === 'string' && note.trim().length > 500) {
    fieldErrors.push({ field: 'note', message: 'Must be 500 characters or fewer.' })
  }
  if (fieldErrors.length > 0) {
    throw new RequestValidationError(fieldErrors)
  }

  return {
    action: action as InventoryActionType,
    note: typeof note === 'string' && note.trim() ? note.trim() : undefined,
  }
}
