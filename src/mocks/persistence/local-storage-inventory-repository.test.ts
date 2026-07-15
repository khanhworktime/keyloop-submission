import { beforeEach, describe, expect, it, vi } from 'vitest'

import { INVENTORY_STORAGE_KEY, InventoryRepositoryError } from '../../domain/inventory-repository'
import type { InventoryActionType } from '../../domain/inventory-types'
import { createInventorySeed, SEED_REFERENCE_NOW } from '../data/inventory-seed'
import { LocalStorageInventoryRepository, type StorageLike } from './local-storage-inventory-repository'

class MemoryStorage implements StorageLike {
  readonly values = new Map<string, string>()
  failWrites = false
  readonly getItem = vi.fn((key: string) => this.values.get(key) ?? null)
  readonly setItem = vi.fn((key: string, value: string) => {
    if (this.failWrites) throw new DOMException('Quota exceeded', 'QuotaExceededError')
    this.values.set(key, value)
  })
}

function expectRepositoryError(run: () => unknown, code: InventoryRepositoryError['code']): void {
  try {
    run()
    throw new Error(`Expected ${code} to be thrown.`)
  } catch (error) {
    expect(error).toBeInstanceOf(InventoryRepositoryError)
    expect((error as InventoryRepositoryError).code).toBe(code)
  }
}

describe('LocalStorageInventoryRepository', () => {
  let storage: MemoryStorage
  let repository: LocalStorageInventoryRepository

  beforeEach(() => {
    storage = new MemoryStorage()
    repository = new LocalStorageInventoryRepository(storage, { now: () => new Date(SEED_REFERENCE_NOW) })
  })

  it('seeds a missing state exactly once', () => {
    expect(repository.getOverview().totalInventory).toBe(12)
    expect(repository.getInventory().meta.total).toBe(12)

    expect(storage.setItem).toHaveBeenCalledTimes(1)
    expect(storage.values.has(INVENTORY_STORAGE_KEY)).toBe(true)
  })

  it('rejects malformed JSON without replacing it', () => {
    storage.values.set(INVENTORY_STORAGE_KEY, '{broken')

    expectRepositoryError(() => repository.getOverview(), 'CORRUPT_STATE')
    expect(storage.values.get(INVENTORY_STORAGE_KEY)).toBe('{broken')
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('composes search, make, model, and age filters before pagination', () => {
    const result = repository.getInventory({
      search: 'stk-2048',
      make: 'aster',
      model: 'a7',
      age: 'aging',
      page: 1,
      pageSize: 1,
    })

    expect(result.meta).toMatchObject({ page: 1, pageSize: 1, total: 1, totalPages: 1 })
    expect(result.items[0]?.unit.stockNumber).toBe('STK-2048')
    expect(result.facets.ages).toEqual({ all: 12, aging: 4, notAging: 8 })
  })

  it.each([
    ['Inventory Unit name', 'Aster A7 Touring'],
    ['Stock No.', 'STK-2048'],
    ['VIN', 'WDD2231861A002048'],
    ['Vehicle Master name', 'VM-014'],
  ])('finds an Inventory Unit by %s', (_field, search) => {
    const result = repository.getInventory({ search })

    expect(result.items.map(({ unit }) => unit.id)).toContain('IU-2048')
  })

  it('sorts, paginates, and clamps an out-of-range page', () => {
    const firstPage = repository.getInventory({ age: 'aging', sortBy: 'daysInStock', pageSize: 2 })
    const lastPage = repository.getInventory({ age: 'aging', page: 99, pageSize: 2 })

    expect(firstPage.items.map(({ unit }) => unit.stockNumber)).toEqual(['STK-2048', 'STK-1934'])
    expect(lastPage.meta).toMatchObject({ page: 2, total: 4, totalPages: 2 })
    expect(lastPage.items).toHaveLength(2)
  })

  it('filters activity and returns global facets', () => {
    const result = repository.getActivity({
      units: ['stk-1934'],
      search: 'e2',
      eventType: 'manager-action',
      actor: 'manager',
      from: '2026-07-14',
      to: '2026-07-14',
    })

    expect(result.meta.total).toBe(1)
    expect(result.items[0]?.activity.actionType).toBe('price-reduction-planned')
    expect(result.items[0]?.activity.actor).toBe('Manager')
    expect(result.facets.actors).toEqual(['Inventory Feed', 'Inventory System', 'Manager'])
    expect(result.facets.eventTypes).toEqual(
      expect.arrayContaining(['inventory-arrived', 'manager-action', 'status-changed']),
    )
    expect(result.facets.units).toHaveLength(12)
  })

  it('groups legacy named managers into one Manager actor', () => {
    const legacyState = createInventorySeed()
    const managerActivities = legacyState.activities.filter(({ eventType }) => eventType === 'manager-action')
    managerActivities[0]!.actor = 'Krist Manager'
    managerActivities[1]!.actor = 'Avery Manager'
    legacyState.inventoryUnits.find(({ id }) => id === 'IU-1934')!.latestAction!.actor = 'Krist Manager'
    legacyState.inventoryUnits.find(({ id }) => id === 'IU-1886')!.latestAction!.actor = 'Every Manager'
    storage.values.set(INVENTORY_STORAGE_KEY, JSON.stringify(legacyState))

    const activity = repository.getActivity({ actor: 'Avery Manager' })

    expect(activity.meta.total).toBe(2)
    expect(activity.items.every((item) => item.activity.actor === 'Manager')).toBe(true)
    expect(activity.facets.actors).toEqual(['Inventory Feed', 'Inventory System', 'Manager'])
    expect(repository.getUnit('IU-1934').unit.latestAction?.actor).toBe('Manager')
    expect(repository.getUnit('IU-1934').activities[0]?.actor).toBe('Manager')
    expect(repository.getUnit('IU-1886').unit.latestAction?.actor).toBe('Manager')
  })

  it('records the unit action and activity in one write', () => {
    repository.getOverview()
    storage.setItem.mockClear()

    const before = JSON.parse(storage.values.get(INVENTORY_STORAGE_KEY) ?? '') as { activities: unknown[] }
    const result = repository.recordAction({
      unitId: 'IU-2048',
      action: 'price-reduction-planned',
      note: 'Review market pricing.',
    })
    const persisted = JSON.parse(storage.values.get(INVENTORY_STORAGE_KEY) ?? '') as ReturnType<typeof createInventorySeed>

    expect(storage.setItem).toHaveBeenCalledTimes(1)
    expect(persisted.inventoryUnits.find(({ id }) => id === 'IU-2048')?.latestAction?.type).toBe(
      'price-reduction-planned',
    )
    expect(persisted.activities).toHaveLength(before.activities.length + 1)
    expect(result.activity.activity.note).toBe('Review market pricing.')
    expect(result.unit.activities[0]?.id).toBe(result.activity.activity.id)
  })

  it('updates editable Unit details atomically', () => {
    const activityCount = createInventorySeed().activities.length
    const result = repository.updateUnit({
      unitId: 'IU-2048',
      vin: '  VIN-UPDATED  ',
      stockNumber: '  STK-UPDATED  ',
      inventoryStatus: 'reserved',
      zoneSlot: '  South · S-09  ',
    })

    expect(storage.setItem).toHaveBeenCalledTimes(1)
    expect(result.unit.unit).toMatchObject({
      vin: 'VIN-UPDATED',
      stockNumber: 'STK-UPDATED',
      inventoryStatus: 'reserved',
      zoneSlot: 'South · S-09',
    })
    expect(result.activity?.activity).toMatchObject({
      eventType: 'unit-updated',
      actor: 'Manager',
      title: 'Inventory Unit details updated',
      detail: 'Updated VIN, Stock No., Status, Zone / Slot.',
    })
    expect(result.unit.activities).toHaveLength(
      createInventorySeed().activities.filter(({ unitId }) => unitId === 'IU-2048').length + 1,
    )
    const persisted = JSON.parse(storage.values.get(INVENTORY_STORAGE_KEY) ?? '') as ReturnType<typeof createInventorySeed>
    expect(persisted.activities).toHaveLength(activityCount + 1)
    expect(repository.getInventory({ search: 'STK-UPDATED' }).meta.total).toBe(1)
  })

  it('does not write or track Activity for a no-op Unit update', () => {
    const result = repository.updateUnit({
      unitId: 'IU-2048',
      vin: 'WDD2231861A002048',
      stockNumber: 'STK-2048',
      inventoryStatus: 'available',
      zoneSlot: 'North · N-04',
    })

    expect(result.activity).toBeUndefined()
    expect(storage.setItem).not.toHaveBeenCalled()
    expect(result.unit.activities).toHaveLength(
      createInventorySeed().activities.filter(({ unitId }) => unitId === 'IU-2048').length,
    )
  })

  it('rejects duplicate VIN and stock number without writing', () => {
    expectRepositoryError(
      () => repository.updateUnit({
        unitId: 'IU-2048',
        vin: 'nth48277p18',
        stockNumber: 'STK-2048',
        inventoryStatus: 'available',
      }),
      'DUPLICATE_VIN',
    )
    expectRepositoryError(
      () => repository.updateUnit({
        unitId: 'IU-2048',
        vin: 'WDD2231861A002048',
        stockNumber: 'stk-1934',
        inventoryStatus: 'available',
      }),
      'DUPLICATE_STOCK_NUMBER',
    )
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('uses one atomic write when the first operation is recordAction', () => {
    repository.recordAction({ unitId: 'IU-2048', action: 'marketing-campaign-review' })

    expect(storage.setItem).toHaveBeenCalledTimes(1)
    expect(repository.getUnit('IU-2048').unit.latestAction?.type).toBe('marketing-campaign-review')
  })

  it('preserves the previous persisted snapshot when a write fails', () => {
    repository.getOverview()
    const previousSnapshot = storage.values.get(INVENTORY_STORAGE_KEY)
    storage.setItem.mockClear()
    storage.failWrites = true

    expectRepositoryError(
      () => repository.recordAction({ unitId: 'IU-2048', action: 'price-reduction-planned' }),
      'STORAGE_FAILURE',
    )
    expect(storage.setItem).toHaveBeenCalledTimes(1)
    expect(storage.values.get(INVENTORY_STORAGE_KEY)).toBe(previousSnapshot)
  })

  it('surfaces quota failure while attempting to seed missing state', () => {
    storage.failWrites = true

    expectRepositoryError(() => repository.getOverview(), 'STORAGE_FAILURE')
    expect(storage.values.has(INVENTORY_STORAGE_KEY)).toBe(false)
  })

  it('rejects actions for exactly-90-day and missing units without writing', () => {
    expectRepositoryError(
      () => repository.recordAction({ unitId: 'IU-2096', action: 'price-reduction-planned' }),
      'UNIT_NOT_AGING',
    )
    expectRepositoryError(
      () => repository.recordAction({ unitId: 'IU-missing', action: 'price-reduction-planned' }),
      'UNIT_NOT_FOUND',
    )
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('excludes old reserved and sold stock from aging views and actions', () => {
    const overview = repository.getOverview()
    const agingInventory = repository.getInventory({ age: 'aging', pageSize: 20 })
    const reservedUnit = repository.getUnit('IU-1886')

    expect(overview.agingInventory).toBe(4)
    expect(overview.priorityUnits.map(({ unit }) => unit.id)).not.toContain('IU-1886')
    expect(agingInventory.items.map(({ unit }) => unit.id)).not.toContain('IU-1886')
    expect(reservedUnit.daysInStock).toBe(96)
    expect(reservedUnit.isAging).toBe(false)
    storage.setItem.mockClear()
    expectRepositoryError(
      () => repository.recordAction({ unitId: 'IU-1886', action: 'price-reduction-planned' }),
      'UNIT_NOT_AGING',
    )

    const soldState = createInventorySeed()
    soldState.inventoryUnits.find(({ id }) => id === 'IU-1886')!.inventoryStatus = 'sold'
    storage.values.set(INVENTORY_STORAGE_KEY, JSON.stringify(soldState))

    expect(repository.getUnit('IU-1886')).toMatchObject({ daysInStock: 96, isAging: false })
    expectRepositoryError(
      () => repository.recordAction({ unitId: 'IU-1886', action: 'price-reduction-planned' }),
      'UNIT_NOT_AGING',
    )
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('rejects unsupported actions and notes longer than 500 characters', () => {
    expectRepositoryError(
      () => repository.recordAction({ unitId: 'IU-2048', action: 'unsupported' as InventoryActionType }),
      'INVALID_ACTION',
    )
    expectRepositoryError(
      () => repository.recordAction({
        unitId: 'IU-2048',
        action: 'price-reduction-planned',
        note: 'x'.repeat(501),
      }),
      'NOTE_TOO_LONG',
    )
    expect(storage.setItem).not.toHaveBeenCalled()
  })
})
