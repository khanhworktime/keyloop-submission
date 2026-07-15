import { isAgingStock } from '../../domain/aging-stock'
import {
  INVENTORY_STORAGE_KEY,
  InventoryRepositoryError,
  type InventoryRepository,
} from '../../domain/inventory-repository'
import {
  INVENTORY_ACTION_TYPES,
  INVENTORY_STATUSES,
  type Activity,
  type ActivityFilters,
  type ActivityPage,
  type InventoryFilters,
  type InventoryPage,
  type InventoryUnitDetail,
  type OverviewView,
  type PersistedInventoryStateV1,
  type RecordActionCommand,
  type RecordActionResult,
  type UpdateInventoryUnitCommand,
  type UpdateInventoryUnitResult,
} from '../../domain/inventory-types'
import { createInventorySeed } from '../data/inventory-seed'
import {
  joinActivities,
  joinUnits,
  normalizeActivityActor,
  queryActivity,
  queryInventory,
} from './inventory-query-helpers'
import { parseInventoryState } from './inventory-state-parser'

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface LocalStorageInventoryRepositoryOptions {
  now?: () => Date
  seed?: () => PersistedInventoryStateV1
}

const actionTitles = {
  'price-reduction-planned': 'Price reduction planned',
  'transfer-to-another-dealership': 'Transfer to another dealership',
  'marketing-campaign-review': 'Marketing campaign review',
} as const

export class LocalStorageInventoryRepository implements InventoryRepository {
  private readonly now: () => Date
  private readonly seed: () => PersistedInventoryStateV1

  constructor(
    private readonly storage: StorageLike,
    options: LocalStorageInventoryRepositoryOptions = {},
  ) {
    this.now = options.now ?? (() => new Date())
    this.seed = options.seed ?? createInventorySeed
  }

  getOverview(): OverviewView {
    const state = this.readState(true)
    const joined = joinUnits(state, this.now())
    const priorityUnits = joined
      .filter(({ isAging }) => isAging)
      .sort((left, right) => right.daysInStock - left.daysInStock)
      .slice(0, 5)

    return {
      totalInventory: joined.length,
      agingInventory: joined.filter(({ isAging }) => isAging).length,
      availableInventory: joined.filter(({ unit }) => unit.inventoryStatus === 'available').length,
      priorityUnits,
    }
  }

  getInventory(filters: InventoryFilters = {}): InventoryPage {
    return queryInventory(this.readState(true), this.now(), filters)
  }

  getUnit(unitId: string): InventoryUnitDetail {
    return this.unitDetail(this.readState(true), unitId, this.now())
  }

  getActivity(filters: ActivityFilters = {}): ActivityPage {
    return queryActivity(this.readState(true), filters)
  }

  recordAction(command: RecordActionCommand): RecordActionResult {
    const state = this.readState(false)
    const unit = state.inventoryUnits.find(({ id }) => id === command.unitId)
    if (!unit) {
      throw new InventoryRepositoryError('UNIT_NOT_FOUND', `Inventory unit ${command.unitId} was not found.`)
    }
    if (!INVENTORY_ACTION_TYPES.includes(command.action)) {
      throw new InventoryRepositoryError('INVALID_ACTION', 'A supported proposed action is required.')
    }
    if (command.note && command.note.length > 500) {
      throw new InventoryRepositoryError('NOTE_TOO_LONG', 'Manager note must be 500 characters or fewer.')
    }

    const now = this.now()
    if (!isAgingStock(unit.arrivalDate, unit.inventoryStatus, now)) {
      throw new InventoryRepositoryError(
        'UNIT_NOT_AGING',
        'Actions can only be recorded for available aging inventory.',
      )
    }

    const next = structuredClone(state)
    const nextUnit = next.inventoryUnits.find(({ id }) => id === command.unitId)
    if (!nextUnit) throw new InventoryRepositoryError('UNIT_NOT_FOUND', 'Inventory unit was not found.')
    const timestamp = now.toISOString()
    const actor = normalizeActivityActor(command.actor ?? 'Manager')
    const note = command.note?.trim() || undefined
    nextUnit.latestAction = { type: command.action, recordedAt: timestamp, actor, ...(note ? { note } : {}) }

    const activity: Activity = {
      id: `ACT-${nextUnit.id}-${now.getTime()}-${next.activities.length + 1}`,
      unitId: nextUnit.id,
      eventType: 'manager-action',
      timestamp,
      actor,
      title: actionTitles[command.action],
      detail: 'A proposed action was recorded for this aging unit.',
      actionType: command.action,
      ...(note ? { note } : {}),
    }
    next.activities.push(activity)
    this.writeState(next)

    const activityItem = joinActivities(next).find(({ activity: item }) => item.id === activity.id)
    if (!activityItem) throw new InventoryRepositoryError('MISSING_REFERENCE', 'Recorded activity could not be joined.')
    return { unit: this.unitDetail(next, nextUnit.id, now), activity: activityItem }
  }

  updateUnit(command: UpdateInventoryUnitCommand): UpdateInventoryUnitResult {
    const state = this.readState(false)
    const unit = state.inventoryUnits.find(({ id }) => id === command.unitId)
    if (!unit) {
      throw new InventoryRepositoryError('UNIT_NOT_FOUND', `Inventory unit ${command.unitId} was not found.`)
    }

    const vin = command.vin.trim()
    const stockNumber = command.stockNumber.trim()
    const zoneSlot = command.zoneSlot?.trim() || undefined
    if (!vin || vin.length > 64 || !stockNumber || stockNumber.length > 40 || (zoneSlot?.length ?? 0) > 80) {
      throw new InventoryRepositoryError('INVALID_UNIT', 'Inventory Unit details are invalid.')
    }
    if (!INVENTORY_STATUSES.includes(command.inventoryStatus)) {
      throw new InventoryRepositoryError('INVALID_UNIT', 'Choose a supported inventory status.')
    }

    const normalizedVin = vin.toLocaleLowerCase()
    const normalizedStockNumber = stockNumber.toLocaleLowerCase()
    if (state.inventoryUnits.some((item) => item.id !== unit.id && item.vin.trim().toLocaleLowerCase() === normalizedVin)) {
      throw new InventoryRepositoryError('DUPLICATE_VIN', 'VIN is already assigned to another Inventory Unit.')
    }
    if (state.inventoryUnits.some((item) => item.id !== unit.id && item.stockNumber.trim().toLocaleLowerCase() === normalizedStockNumber)) {
      throw new InventoryRepositoryError('DUPLICATE_STOCK_NUMBER', 'Stock number is already assigned to another Inventory Unit.')
    }

    const changedFields = [
      unit.vin !== vin ? 'VIN' : null,
      unit.stockNumber !== stockNumber ? 'Stock No.' : null,
      unit.inventoryStatus !== command.inventoryStatus ? 'Status' : null,
      unit.zoneSlot !== zoneSlot ? 'Zone / Slot' : null,
    ].filter((field): field is string => field !== null)
    if (changedFields.length === 0) {
      return { unit: this.unitDetail(state, unit.id, this.now()) }
    }

    const next = structuredClone(state)
    const nextUnit = next.inventoryUnits.find(({ id }) => id === command.unitId)
    if (!nextUnit) throw new InventoryRepositoryError('UNIT_NOT_FOUND', 'Inventory unit was not found.')
    nextUnit.vin = vin
    nextUnit.stockNumber = stockNumber
    nextUnit.inventoryStatus = command.inventoryStatus
    if (zoneSlot) nextUnit.zoneSlot = zoneSlot
    else delete nextUnit.zoneSlot
    const now = this.now()
    const activity: Activity = {
      id: `ACT-${nextUnit.id}-${now.getTime()}-${next.activities.length + 1}`,
      unitId: nextUnit.id,
      eventType: 'unit-updated',
      timestamp: now.toISOString(),
      actor: normalizeActivityActor(command.actor ?? 'Manager'),
      title: 'Inventory Unit details updated',
      detail: `Updated ${changedFields.join(', ')}.`,
    }
    next.activities.push(activity)
    this.writeState(next)

    const activityItem = joinActivities(next).find(({ activity: item }) => item.id === activity.id)
    if (!activityItem) throw new InventoryRepositoryError('MISSING_REFERENCE', 'Updated activity could not be joined.')
    return { unit: this.unitDetail(next, nextUnit.id, now), activity: activityItem }
  }

  private unitDetail(state: PersistedInventoryStateV1, unitId: string, now: Date): InventoryUnitDetail {
    const item = joinUnits(state, now).find(({ unit }) => unit.id === unitId)
    if (!item) throw new InventoryRepositoryError('UNIT_NOT_FOUND', `Inventory unit ${unitId} was not found.`)
    const activities = state.activities
      .filter(({ unitId: activityUnitId }) => activityUnitId === unitId)
      .sort((left, right) => Date.parse(right.timestamp) - Date.parse(left.timestamp))
      .map((activity) => ({ ...activity, actor: normalizeActivityActor(activity.actor) }))
    return { ...item, activities }
  }

  private readState(persistMissing: boolean): PersistedInventoryStateV1 {
    let raw: string | null
    try {
      raw = this.storage.getItem(INVENTORY_STORAGE_KEY)
    } catch (cause) {
      throw new InventoryRepositoryError('STORAGE_FAILURE', 'Inventory state could not be read.', cause)
    }
    if (raw !== null) return parseInventoryState(raw)

    const seed = parseInventoryState(JSON.stringify(this.seed()))
    if (persistMissing) this.writeState(seed)
    return seed
  }

  private writeState(state: PersistedInventoryStateV1): void {
    try {
      this.storage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(state))
    } catch (cause) {
      throw new InventoryRepositoryError('STORAGE_FAILURE', 'Inventory state could not be saved.', cause)
    }
  }
}
