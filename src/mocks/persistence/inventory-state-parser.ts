import {
  ACTIVITY_EVENT_TYPES,
  INVENTORY_ACTION_TYPES,
  INVENTORY_STATUSES,
  type Activity,
  type InventoryAction,
  type InventoryUnit,
  type PersistedInventoryStateV1,
  type VehicleMaster,
} from '../../domain/inventory-types'
import { InventoryRepositoryError } from '../../domain/inventory-repository'
import { isCanonicalIsoTimestamp } from '../../domain/date-validation'

const FIELD_LIMITS = {
  actor: 80,
  detail: 500,
  id: 80,
  identity: 80,
  stockNumber: 40,
  title: 160,
  vin: 64,
  zoneSlot: 80,
} as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isBoundedString(value: unknown, maximum: number): value is string {
  return isNonEmptyString(value) && value.length <= maximum
}

function isIsoDate(value: unknown): value is string {
  return isNonEmptyString(value) && isCanonicalIsoTimestamp(value)
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: readonly string[]): boolean {
  return Object.keys(value).every((key) => allowed.includes(key))
}

function isId<Prefix extends 'ACT-' | 'IU-' | 'VM-'>(
  value: unknown,
  prefix: Prefix,
): value is `${Prefix}${string}` {
  return isBoundedString(value, FIELD_LIMITS.id) && value.startsWith(prefix)
}

function isAction(value: unknown): value is InventoryAction {
  if (!isRecord(value)) return false
  const noteIsValid = value.note === undefined || (typeof value.note === 'string' && value.note.length <= 500)
  return (
    hasOnlyKeys(value, ['type', 'note', 'recordedAt', 'actor']) &&
    isNonEmptyString(value.type) &&
    INVENTORY_ACTION_TYPES.includes(value.type as InventoryAction['type']) &&
    isIsoDate(value.recordedAt) &&
    isBoundedString(value.actor, FIELD_LIMITS.actor) &&
    noteIsValid
  )
}

function isVehicleMaster(value: unknown): value is VehicleMaster {
  if (!isRecord(value)) return false
  return (
    hasOnlyKeys(value, ['id', 'make', 'model', 'variant', 'type']) &&
    isId(value.id, 'VM-') &&
    ['make', 'model', 'variant', 'type'].every((field) =>
      isBoundedString(value[field], FIELD_LIMITS.identity),
    )
  )
}

function isInventoryUnit(value: unknown): value is InventoryUnit {
  if (!isRecord(value)) return false
  return (
    hasOnlyKeys(value, [
      'id',
      'vehicleMasterId',
      'vin',
      'stockNumber',
      'arrivalDate',
      'inventoryStatus',
      'zoneSlot',
      'latestAction',
    ]) &&
    isId(value.id, 'IU-') &&
    isId(value.vehicleMasterId, 'VM-') &&
    isBoundedString(value.vin, FIELD_LIMITS.vin) &&
    isBoundedString(value.stockNumber, FIELD_LIMITS.stockNumber) &&
    isIsoDate(value.arrivalDate) &&
    isNonEmptyString(value.inventoryStatus) &&
    INVENTORY_STATUSES.includes(value.inventoryStatus as InventoryUnit['inventoryStatus']) &&
    (value.zoneSlot === undefined || isBoundedString(value.zoneSlot, FIELD_LIMITS.zoneSlot)) &&
    (value.latestAction === null || isAction(value.latestAction))
  )
}

function isActivity(value: unknown): value is Activity {
  if (!isRecord(value)) return false
  const actionIsValid =
    value.actionType === undefined ||
    (isNonEmptyString(value.actionType) &&
      INVENTORY_ACTION_TYPES.includes(value.actionType as Activity['actionType'] & string))
  return (
    hasOnlyKeys(value, [
      'id',
      'unitId',
      'eventType',
      'timestamp',
      'actor',
      'title',
      'detail',
      'actionType',
      'note',
    ]) &&
    isId(value.id, 'ACT-') &&
    isId(value.unitId, 'IU-') &&
    isNonEmptyString(value.eventType) &&
    ACTIVITY_EVENT_TYPES.includes(value.eventType as Activity['eventType']) &&
    isIsoDate(value.timestamp) &&
    isBoundedString(value.actor, FIELD_LIMITS.actor) &&
    isBoundedString(value.title, FIELD_LIMITS.title) &&
    isBoundedString(value.detail, FIELD_LIMITS.detail) &&
    actionIsValid &&
    (value.note === undefined || (typeof value.note === 'string' && value.note.length <= 500))
  )
}

function assertUnique(values: string[], label: string): void {
  if (new Set(values).size !== values.length) {
    throw new InventoryRepositoryError('CORRUPT_STATE', `Persisted ${label} values must be unique.`)
  }
}

function assertReferences(state: PersistedInventoryStateV1): void {
  const masterIds = new Set(state.vehicleMasters.map(({ id }) => id))
  const unitIds = new Set(state.inventoryUnits.map(({ id }) => id))

  for (const unit of state.inventoryUnits) {
    if (!masterIds.has(unit.vehicleMasterId)) {
      throw new InventoryRepositoryError(
        'MISSING_REFERENCE',
        `Inventory unit ${unit.id} references a missing vehicle master.`,
      )
    }
  }

  for (const activity of state.activities) {
    if (!unitIds.has(activity.unitId)) {
      throw new InventoryRepositoryError(
        'MISSING_REFERENCE',
        `Activity ${activity.id} references a missing inventory unit.`,
      )
    }
  }
}

export function parseInventoryState(raw: string): PersistedInventoryStateV1 {
  let value: unknown
  try {
    value = JSON.parse(raw) as unknown
  } catch (cause) {
    throw new InventoryRepositoryError('CORRUPT_STATE', 'Persisted inventory state is not valid JSON.', cause)
  }

  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ['version', 'vehicleMasters', 'inventoryUnits', 'activities']) ||
    value.version !== 1 ||
    !Array.isArray(value.vehicleMasters) ||
    !value.vehicleMasters.every(isVehicleMaster) ||
    !Array.isArray(value.inventoryUnits) ||
    !value.inventoryUnits.every(isInventoryUnit) ||
    !Array.isArray(value.activities) ||
    !value.activities.every(isActivity)
  ) {
    throw new InventoryRepositoryError('CORRUPT_STATE', 'Persisted inventory state has an invalid shape.')
  }

  const state: PersistedInventoryStateV1 = {
    version: 1,
    vehicleMasters: value.vehicleMasters,
    inventoryUnits: value.inventoryUnits,
    activities: value.activities,
  }

  assertUnique(state.vehicleMasters.map(({ id }) => id), 'vehicle master ID')
  assertUnique(state.inventoryUnits.map(({ id }) => id), 'inventory unit ID')
  assertUnique(state.inventoryUnits.map(({ vin }) => vin), 'VIN')
  assertUnique(state.inventoryUnits.map(({ stockNumber }) => stockNumber), 'stock number')
  assertUnique(state.activities.map(({ id }) => id), 'activity ID')
  assertReferences(state)
  return state
}
