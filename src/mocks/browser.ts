import { setupWorker } from 'msw/browser'

import { LocalStorageInventoryRepository } from './persistence/local-storage-inventory-repository'
import { createMockHandlers } from './handlers'

const inventoryRepository = new LocalStorageInventoryRepository(window.localStorage)

export const mockWorker = setupWorker(...createMockHandlers(inventoryRepository))
