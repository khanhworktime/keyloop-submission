import { Link } from '@tanstack/react-router'

import type { UnitListItem } from '../../../domain/inventory-types'
import { StatusBadge } from '../../../components/ui'
import { formatInventoryAction, formatInventoryStatus } from './inventory-formatters'

interface InventoryMobileCardsProps {
  items: UnitListItem[]
}

export const InventoryMobileCards = ({ items }: InventoryMobileCardsProps): React.JSX.Element => (
  <section aria-label="Inventory cards">
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item) => (
        <li key={item.unit.id}>
          <Link
            className={`block rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] bg-white p-3 text-inherit no-underline ${item.isAging ? 'border-l-4 border-l-[var(--color-attention-marker)]' : ''}`}
            to="/inventory/$unitId"
            params={{ unitId: item.unit.id }}
            aria-label={`Review ${item.unit.stockNumber}`}
          >
            <header className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <strong className="block text-[13px]">
                  {item.master.make} {item.master.model} {item.master.variant}
                </strong>
                <span className="mt-0.5 block truncate text-[10px] text-[var(--color-carbon-700)]">
                  {item.unit.stockNumber} · {item.unit.vin}
                </span>
              </span>
              <StatusBadge tone={item.isAging ? 'attention' : 'ready'}>
                {item.daysInStock} days{item.isAging ? ' · Aging' : ''}
              </StatusBadge>
            </header>

            <dl className="mt-2 grid grid-cols-2 gap-3 border-t border-[var(--color-stone-900)] pt-2">
              <div>
                <dt className="text-[10px] text-[var(--color-carbon-700)]">Inventory status</dt>
                <dd className="m-0 mt-0.5 text-xs font-semibold">{formatInventoryStatus(item.unit.inventoryStatus)}</dd>
              </div>
              <div>
                <dt className="text-[10px] text-[var(--color-carbon-700)]">Proposed action</dt>
                <dd className="m-0 mt-0.5 text-xs font-semibold">{formatInventoryAction(item.unit.latestAction?.type)}</dd>
              </div>
            </dl>

            <span className="mt-1 flex min-h-11 items-center justify-between text-xs font-bold text-[var(--color-info-text)]">
              Review unit <span aria-hidden="true">›</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)
