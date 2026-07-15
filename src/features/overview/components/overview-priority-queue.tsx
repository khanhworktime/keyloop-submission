import { Link } from '@tanstack/react-router'

import type { UnitListItem } from '../../../domain/inventory-types'
import { EmptyState, StatusBadge } from '../../../components/ui'

interface OverviewPriorityQueueProps {
  items: UnitListItem[]
}

const actionLabel = (item: UnitListItem): string =>
  item.unit.latestAction?.type.replaceAll('-', ' ') ?? 'Action not recorded'

export const OverviewPriorityQueue = ({ items }: OverviewPriorityQueueProps): React.JSX.Element => {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No aging inventory"
        message="No units are currently over 90 days in stock."
        action={
          <Link className="button button--secondary" to="/inventory">
            Browse inventory
          </Link>
        }
      />
    )
  }

  return (
    <section className="overflow-hidden rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] bg-white">
      <header className="flex items-start justify-between gap-4 border-b border-[var(--color-stone-900)] p-4 md:p-5">
        <div>
          <p className="m-0 text-xs font-bold tracking-[0.12em] text-[var(--color-carbon-700)] uppercase">
            Priority queue
          </p>
          <h2 className="m-0 mt-1 text-lg font-bold">Oldest inventory first</h2>
          <p className="m-0 mt-1 text-sm text-[var(--color-carbon-700)]">
            One decision path, ordered by inventory age.
          </p>
        </div>
        <Link
          className="min-h-11 shrink-0 py-2 text-sm font-semibold text-[var(--color-info-text)] underline-offset-4 hover:underline"
          to="/inventory"
          search={{ age: 'aging' }}
        >
          View all
        </Link>
      </header>

      <ol className="m-0 list-none p-0">
        {items.slice(0, 5).map((item, index) => (
          <li key={item.unit.id} className={`border-b border-[var(--color-stone-900)] last:border-b-0 ${index > 0 ? 'hidden md:block' : ''}`}>
            <Link
              className="grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-inherit no-underline transition-colors duration-200 hover:bg-[var(--color-info-surface)] md:grid-cols-[minmax(0,1fr)_8rem_11rem_auto] md:px-5"
              to="/inventory/$unitId"
              params={{ unitId: item.unit.id }}
              aria-label={`Review ${item.unit.stockNumber}, ${item.daysInStock} days in stock`}
            >
              <span className="min-w-0">
                <strong className="block truncate text-sm">
                  {item.master.make} {item.master.model} {item.master.variant}
                </strong>
                <span className="mt-1 block truncate text-xs text-[var(--color-carbon-700)]">
                  {item.unit.stockNumber} · {item.unit.vin}
                </span>
              </span>
              <StatusBadge tone="attention">{item.daysInStock} days</StatusBadge>
              <span className="hidden min-w-0 md:block">
                <span className="block text-xs font-semibold capitalize">{actionLabel(item)}</span>
                <span className="mt-1 block text-xs text-[var(--color-carbon-700)]">Proposed action</span>
              </span>
              <span className="hidden text-lg text-[var(--color-carbon-700)] md:block" aria-hidden="true">›</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
