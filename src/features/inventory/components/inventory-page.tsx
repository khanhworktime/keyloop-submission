import { lazy, Suspense, useEffect, useState } from 'react'

import { EmptyState, ErrorState, LoadingState } from '../../../components/ui'
import type { InventorySortField, SortDirection } from '../../../domain/inventory-types'
import {
  type InventorySearch,
  toInventoryFilters,
  updateInventorySearch,
} from '../inventory-filter-state'
import { useInventoryQuery } from '../inventory-queries'
import { InventoryFilters } from './inventory-filters'
import { InventoryMobileCards } from './inventory-mobile-cards'
import { InventoryPagination } from './inventory-pagination'
import { InventorySelectedUnit } from './inventory-selected-unit'
import { useDesktopInventorySurface } from './use-responsive-inventory-surface'

const InventoryGrid = lazy(async () => {
  const module = await import('./inventory-grid')
  return { default: module.InventoryGrid }
})

interface InventoryPageProps {
  onSearchChange: (search: InventorySearch, replace?: boolean) => void
  search: InventorySearch
}

export const InventoryPage = ({
  onSearchChange,
  search,
}: InventoryPageProps): React.JSX.Element => {
  const filters = toInventoryFilters(search)
  const inventoryQuery = useInventoryQuery(filters)
  const showGrid = useDesktopInventorySurface()
  const [selectedUnitId, setSelectedUnitId] = useState<string>()

  useEffect(() => {
    if (inventoryQuery.data && inventoryQuery.data.meta.page !== filters.page) {
      onSearchChange(
        updateInventorySearch(search, { page: inventoryQuery.data.meta.page }, false),
        true,
      )
    }
  }, [filters.page, inventoryQuery.data, onSearchChange, search])

  const changeSort = (sortBy: InventorySortField, sortDirection: SortDirection): void => {
    onSearchChange(updateInventorySearch(search, { sortBy, sortDirection }))
  }

  return (
    <div className="grid gap-3 md:gap-4">
      <header className="max-w-3xl">
        <p className="m-0 text-xs font-bold tracking-[0.14em] text-[var(--color-carbon-700)] uppercase">
          Inventory units
        </p>
        <h1 className="m-0 mt-1 text-[26px] leading-[1.08] font-bold tracking-[-0.045em] md:text-[30px]">
          Review current stock
        </h1>
        <p className="m-0 mt-1.5 max-w-2xl text-xs leading-relaxed text-[var(--color-carbon-700)] md:text-[13px]">
          Filter VIN-specific units by identity, vehicle master, and inventory age.
        </p>
      </header>

      <InventoryFilters
        key={search.search ?? ''}
        facets={inventoryQuery.data?.facets}
        search={search}
        onChange={onSearchChange}
      />

      {inventoryQuery.isPending ? <LoadingState label="Loading inventory" /> : null}

      {inventoryQuery.isError ? (
        <ErrorState
          title="Inventory unavailable"
          message={inventoryQuery.error.message}
          onRetry={() => void inventoryQuery.refetch()}
        />
      ) : null}

      {inventoryQuery.data && inventoryQuery.data.items.length === 0 ? (
        <EmptyState
          title="No matching inventory"
          message="Change or reset the filters to see more units."
          action={<button className="button button--secondary" type="button" onClick={() => onSearchChange({})}>Reset filters</button>}
        />
      ) : null}

      {inventoryQuery.data && inventoryQuery.data.items.length > 0 ? (
        <>
          <div className="sr-only" role="status" aria-live="polite">
            {inventoryQuery.data.meta.total} inventory results
          </div>
          {showGrid ? (
            <div className="grid min-w-0 items-start gap-3 md:grid-cols-[minmax(0,1fr)_13.5rem] lg:grid-cols-[minmax(0,1fr)_15.25rem] xl:grid-cols-[minmax(0,1fr)_17rem]">
              <Suspense fallback={<LoadingState label="Loading inventory table" />}>
                <InventoryGrid
                  items={inventoryQuery.data.items}
                  selectedUnitId={inventoryQuery.data.items.find(({ unit }) => unit.id === selectedUnitId)?.unit.id ?? inventoryQuery.data.items[0]!.unit.id}
                  sortBy={filters.sortBy ?? 'daysInStock'}
                  sortDirection={filters.sortDirection ?? 'desc'}
                  onSelect={setSelectedUnitId}
                  onSortChange={changeSort}
                />
              </Suspense>
              <InventorySelectedUnit
                item={inventoryQuery.data.items.find(({ unit }) => unit.id === selectedUnitId) ?? inventoryQuery.data.items[0]!}
              />
            </div>
          ) : (
            <InventoryMobileCards items={inventoryQuery.data.items} />
          )}
          <InventoryPagination
            meta={inventoryQuery.data.meta}
            onPageChange={(page) => onSearchChange(updateInventorySearch(search, { page }, false))}
            onPageSizeChange={(pageSize) => onSearchChange(updateInventorySearch(search, { pageSize }))}
          />
        </>
      ) : null}
    </div>
  )
}
