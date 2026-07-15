import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupServer } from 'msw/node'

import { CORRELATION_ID_HEADER } from '../lib/api-client'
import { fetchInventory } from '../features/shared/inventory-api'
import { SEED_REFERENCE_NOW } from './data/inventory-seed'
import { createMockHandlers } from './handlers'
import {
  LocalStorageInventoryRepository,
  type StorageLike,
} from './persistence/local-storage-inventory-repository'

class MemoryStorage implements StorageLike {
  private readonly values = new Map<string, string>()

  clear(): void {
    this.values.clear()
  }

  getItem(key: string): string | null {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

const storage = new MemoryStorage()
const repository = new LocalStorageInventoryRepository(storage, {
  now: () => new Date(SEED_REFERENCE_NOW),
})
const server = setupServer(...createMockHandlers(repository, { delayMs: () => 0 }))

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => {
  storage.clear()
  vi.spyOn(console, 'info').mockImplementation(() => undefined)
})
afterEach(() => {
  server.resetHandlers()
  vi.restoreAllMocks()
})
afterAll(() => server.close())

describe('mock inventory API', () => {
  it('echoes the request correlation ID on overview', async () => {
    const response = await fetch('http://localhost/api/overview', {
      headers: { [CORRELATION_ID_HEADER]: 'test-request-1' },
    })
    const body = (await response.json()) as { data: { totalInventory: number } }

    expect(response.status).toBe(200)
    expect(response.headers.get(CORRELATION_ID_HEADER)).toBe('test-request-1')
    expect(body.data.totalInventory).toBe(12)
  })

  it('filters inventory before returning pagination metadata', async () => {
    const response = await fetch('http://localhost/api/inventory?make=Aster&age=aging')
    const body = (await response.json()) as {
      data: { items: unknown[]; meta: { total: number } }
    }

    expect(response.status).toBe(200)
    expect(body.data.items).toHaveLength(1)
    expect(body.data.meta.total).toBe(1)
  })

  it('accepts the global search client filter contract', async () => {
    const result = await fetchInventory({
      search: 'VM-014',
      page: 1,
      pageSize: 10,
      sortBy: 'daysInStock',
      sortDirection: 'desc',
    })

    expect(result.meta.pageSize).toBe(10)
    expect(result.items.map(({ unit }) => unit.id)).toEqual(['IU-2048'])
  })

  it('rejects an action when a unit is exactly 90 days old', async () => {
    const response = await fetch('http://localhost/api/inventory/IU-2096/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'price-reduction-planned' }),
    })
    const body = (await response.json()) as { error: { code: string } }

    expect(response.status).toBe(422)
    expect(body.error.code).toBe('UNIT_NOT_AGING')
  })

  it('rejects an action when an old unit is reserved', async () => {
    const response = await fetch('http://localhost/api/inventory/IU-1886/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'price-reduction-planned' }),
    })
    const body = (await response.json()) as { error: { code: string } }

    expect(response.status).toBe(422)
    expect(body.error.code).toBe('UNIT_NOT_AGING')
  })

  it('returns a validation response for malformed action JSON', async () => {
    const response = await fetch('http://localhost/api/inventory/IU-2048/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{not-json',
    })
    const body = (await response.json()) as { error: { code: string } }

    expect(response.status).toBe(400)
    expect(body.error.code).toBe('INVALID_REQUEST')
  })

  it('persists one action and exposes one matching activity event', async () => {
    const saveResponse = await fetch('http://localhost/api/inventory/IU-2095/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'price-reduction-planned',
        note: 'Review this unit on Friday.',
      }),
    })
    expect(saveResponse.status).toBe(201)

    const activityResponse = await fetch('http://localhost/api/activity?unit=STK-2095')
    const body = (await activityResponse.json()) as {
      data: { items: Array<{ activity: { eventType: string; note?: string } }> }
    }
    const managerEvents = body.data.items.filter(
      ({ activity }) => activity.eventType === 'manager-action',
    )

    expect(managerEvents).toHaveLength(1)
    expect(managerEvents[0]?.activity.note).toBe('Review this unit on Friday.')
  })

  it('patches editable Inventory Unit details', async () => {
    const response = await fetch('http://localhost/api/inventory/IU-2048', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vin: 'VIN-UPDATED',
        stockNumber: 'STK-UPDATED',
        inventoryStatus: 'reserved',
        zoneSlot: 'South · S-09',
      }),
    })
    const body = (await response.json()) as {
      data: {
        unit: { unit: { stockNumber: string; inventoryStatus: string; zoneSlot?: string } }
        activity?: { activity: { eventType: string; actor: string; detail: string } }
      }
    }

    expect(response.status).toBe(200)
    expect(body.data.unit.unit).toMatchObject({
      stockNumber: 'STK-UPDATED',
      inventoryStatus: 'reserved',
      zoneSlot: 'South · S-09',
    })
    expect(body.data.activity?.activity).toEqual(expect.objectContaining({
      eventType: 'unit-updated',
      actor: 'Manager',
      detail: 'Updated VIN, Stock No., Status, Zone / Slot.',
    }))

    const activityResponse = await fetch('http://localhost/api/activity?unit=STK-UPDATED')
    const activityBody = (await activityResponse.json()) as {
      data: { items: Array<{ activity: { eventType: string } }> }
    }
    expect(activityBody.data.items.some(({ activity }) => activity.eventType === 'unit-updated')).toBe(true)
  })

  it('rejects a duplicate Inventory Unit identifier', async () => {
    const response = await fetch('http://localhost/api/inventory/IU-2048', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vin: 'NTH48277P18',
        stockNumber: 'STK-2048',
        inventoryStatus: 'available',
      }),
    })
    const body = (await response.json()) as { error: { code: string } }

    expect(response.status).toBe(409)
    expect(body.error.code).toBe('DUPLICATE_VIN')
  })
})
