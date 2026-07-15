import { Link } from '@tanstack/react-router'

import { StatusBadge } from '../../../components/ui'
import type { UnitListItem } from '../../../domain/inventory-types'
import { formatInventoryAction, formatInventoryStatus } from './inventory-formatters'

interface InventorySelectedUnitProps {
  item: UnitListItem
}

const Detail = ({ label, value }: { label: string; value: string }): React.JSX.Element => (
  <div className="border-t border-[var(--color-stone-900)] pt-3">
    <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-carbon-700)]">
      {label}
    </dt>
    <dd className="m-0 mt-1 font-semibold">{value}</dd>
  </div>
)

export const InventorySelectedUnit = ({
  item,
}: InventorySelectedUnitProps): React.JSX.Element => (
  <aside
    className="rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] bg-white p-4 md:sticky md:top-5"
    aria-labelledby="selected-inventory-title"
  >
    <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-info-text)]">
      Selected unit
    </p>
    <h2 id="selected-inventory-title" className="m-0 mt-2 text-xl font-bold">
      {item.master.make} {item.master.model} {item.master.variant}
    </h2>
    <p className="m-0 mt-1 text-sm text-[var(--color-carbon-700)]">
      VIN-specific inventory record
    </p>

    <dl className="mt-5 grid gap-3">
      <Detail label="Stock Number" value={item.unit.stockNumber} />
      <Detail label="VIN" value={item.unit.vin} />
      <Detail
        label="Inventory age"
        value={`${item.daysInStock} days${item.isAging ? ' · Aging' : ''}`}
      />
      <div className="border-t border-[var(--color-stone-900)] pt-3">
        <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-carbon-700)]">
          Inventory status
        </dt>
        <dd className="m-0 mt-2">
          <StatusBadge
            tone={item.unit.inventoryStatus === 'available' ? 'ready' : item.unit.inventoryStatus === 'reserved' ? 'pending' : 'neutral'}
          >
            {formatInventoryStatus(item.unit.inventoryStatus)}
          </StatusBadge>
        </dd>
      </div>
      <Detail
        label="Proposed action"
        value={formatInventoryAction(item.unit.latestAction?.type)}
      />
    </dl>

    <Link
      className="button button--primary mt-5 w-full no-underline"
      to="/inventory/$unitId"
      params={{ unitId: item.unit.id }}
    >
      Review {item.unit.stockNumber}
    </Link>
  </aside>
)
