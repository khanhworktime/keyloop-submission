import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type ColDef,
  type GridApi,
  type ICellRendererParams,
  type SortChangedEvent,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

import type {
  InventorySortField,
  SortDirection,
  UnitListItem,
} from '../../../domain/inventory-types'
import { StatusBadge } from '../../../components/ui'
import { formatInventoryStatus } from './inventory-formatters'

ModuleRegistry.registerModules([AllCommunityModule])

const precisionGridTheme = themeQuartz.withParams({
  accentColor: '#3da5ff',
  backgroundColor: '#ffffff',
  borderColor: '#d9e0e4',
  browserColorScheme: 'light',
  fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
  fontSize: 13,
  foregroundColor: '#11181c',
  headerBackgroundColor: '#edf1f3',
  headerFontSize: 11,
  headerFontWeight: 700,
  headerTextColor: '#2e4758',
  oddRowBackgroundColor: '#fbfcfc',
  rowHoverColor: '#ebf6fd',
  selectedRowBackgroundColor: '#ebf6fd',
  spacing: 8,
  wrapperBorderRadius: 13,
})

interface InventoryGridProps {
  items: UnitListItem[]
  onSelect: (unitId: string) => void
  onSortChange: (sortBy: InventorySortField, direction: SortDirection) => void
  selectedUnitId: string
  sortBy: InventorySortField
  sortDirection: SortDirection
}

const IdentityCell = ({ data }: ICellRendererParams<UnitListItem>): React.JSX.Element | null =>
  data ? (
    <div className="grid h-full content-center leading-tight">
      <strong>{data.master.make} {data.master.model} {data.master.variant}</strong>
      <span className="mt-1 truncate text-xs text-[var(--color-carbon-700)]">
        {data.unit.stockNumber} · {data.unit.vin}
      </span>
    </div>
  ) : null

const StatusCell = ({ data }: ICellRendererParams<UnitListItem>): React.JSX.Element | null =>
  data ? (
    <StatusBadge
      tone={data.unit.inventoryStatus === 'available' ? 'ready' : data.unit.inventoryStatus === 'reserved' ? 'pending' : 'neutral'}
    >
      {formatInventoryStatus(data.unit.inventoryStatus)}
    </StatusBadge>
  ) : null

const MasterCell = ({ data }: ICellRendererParams<UnitListItem>): React.JSX.Element | null =>
  data ? (
    <div className="grid h-full content-center leading-tight">
      <strong>{data.master.id}</strong>
      <span className="mt-1 truncate text-xs text-[var(--color-carbon-700)]">
        {data.master.make} · {data.master.model} {data.master.variant}
      </span>
    </div>
  ) : null

const DetailCell = ({ data }: ICellRendererParams<UnitListItem>): React.JSX.Element | null =>
  data ? (
    <Link
      className="grid min-h-11 min-w-11 place-items-center rounded-[var(--radius-control)] border-0 bg-transparent text-xl text-[var(--color-carbon-900)] no-underline transition-colors hover:bg-[var(--color-info-surface)]"
      to="/inventory/$unitId"
      params={{ unitId: data.unit.id }}
      aria-label={`Open ${data.unit.stockNumber}`}
    >
      <span aria-hidden="true">›</span>
    </Link>
  ) : null

export const InventoryGrid = ({
  items,
  onSelect,
  onSortChange,
  selectedUnitId,
  sortBy,
  sortDirection,
}: InventoryGridProps): React.JSX.Element => {
  const isCompactTablet = window.matchMedia('(max-width: 1023px)').matches

  const selectCurrent = (api: GridApi<UnitListItem>): void => {
    api.getRowNode(selectedUnitId)?.setSelected(true)
  }

  const columns = useMemo<ColDef<UnitListItem>[]>(() => [
    {
      colId: 'stockNumber',
      headerName: 'Inventory unit',
      cellRenderer: IdentityCell,
      valueGetter: ({ data }) => data?.unit.stockNumber,
      flex: 1.7,
      minWidth: 200,
      sort: sortBy === 'stockNumber' ? sortDirection : null,
    },
    {
      colId: 'make',
      headerName: 'Vehicle master',
      cellRenderer: MasterCell,
      valueGetter: ({ data }) => data?.master.make,
      flex: 1.1,
      minWidth: 150,
      hide: isCompactTablet,
      sort: sortBy === 'make' ? sortDirection : null,
    },
    {
      colId: 'daysInStock',
      headerName: 'Inventory age',
      valueGetter: ({ data }) => data?.daysInStock,
      valueFormatter: ({ data, value }) =>
        `${String(value)} days${data?.isAging ? ' · Aging' : ''}`,
      cellStyle: ({ data }) => data?.isAging ? { color: '#9d2e20', fontWeight: 700 } : undefined,
      minWidth: 130,
      sort: sortBy === 'daysInStock' ? sortDirection : null,
    },
    {
      colId: 'inventoryStatus',
      headerName: 'Inventory status',
      cellRenderer: StatusCell,
      minWidth: 140,
      hide: isCompactTablet,
      sort: sortBy === 'inventoryStatus' ? sortDirection : null,
    },
    {
      colId: 'open',
      headerName: '',
      cellRenderer: DetailCell,
      maxWidth: 64,
      minWidth: 64,
      sortable: false,
      suppressHeaderMenuButton: true,
    },
  ], [isCompactTablet, sortBy, sortDirection])

  const handleSort = (event: SortChangedEvent<UnitListItem>): void => {
    const sorted = event.api.getColumnState().find(({ sort }) => Boolean(sort))
    if (!sorted?.sort) return
    const nextSort = sorted.colId as InventorySortField
    if (nextSort !== sortBy || sorted.sort !== sortDirection) {
      onSortChange(nextSort, sorted.sort)
    }
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] bg-white" aria-label="Inventory table">
      <AgGridReact<UnitListItem>
        theme={precisionGridTheme}
        rowData={items}
        columnDefs={columns}
        defaultColDef={{
          resizable: true,
          sortable: true,
          sortingOrder: ['asc', 'desc'],
          unSortIcon: true,
        }}
        domLayout="autoHeight"
        getRowId={({ data }) => data.unit.id}
        getRowStyle={({ data }) => data?.isAging ? { borderLeft: '3px solid #9d2e20' } : undefined}
        rowSelection={{
          mode: 'singleRow',
          checkboxes: true,
          enableClickSelection: true,
        }}
        selectionColumnDef={{
          width: 48,
          minWidth: 48,
          maxWidth: 48,
          resizable: false,
          sortable: false,
          suppressHeaderMenuButton: true,
        }}
        headerHeight={48}
        rowHeight={64}
        suppressCellFocus={false}
        suppressMultiSort
        onFirstDataRendered={({ api }) => selectCurrent(api)}
        onRowDataUpdated={({ api }) => selectCurrent(api)}
        onSelectionChanged={({ api }) => {
          const selected = api.getSelectedRows()[0]
          if (selected && selected.unit.id !== selectedUnitId) onSelect(selected.unit.id)
        }}
        onSortChanged={handleSort}
      />
    </section>
  )
}
