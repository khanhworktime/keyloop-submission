import { Link } from '@tanstack/react-router'

import type { OverviewView } from '../../../domain/inventory-types'
import { StatusBadge } from '../../../components/ui'

interface OverviewSummaryProps {
  overview: OverviewView
}

const metricCardClass =
  'flex min-h-36 flex-col rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] p-3.5 md:p-4'

export const OverviewSummary = ({ overview }: OverviewSummaryProps): React.JSX.Element => (
  <section
    className="grid grid-cols-[1.15fr_0.85fr] gap-2.5 md:grid-cols-[1.15fr_0.925fr_0.925fr] md:gap-3"
    aria-label="Inventory summary"
  >
    <article className={`${metricCardClass} border-[var(--color-attention-border)] bg-[var(--color-attention-text)] text-white`}>
      <div className="flex items-start justify-between gap-3 text-sm font-semibold">
        <span>Needs attention</span>
        <StatusBadge tone="neutral">Aging</StatusBadge>
      </div>
      <strong className="mt-3 font-[var(--font-display)] text-2xl tracking-[-0.04em] tabular-nums md:text-[28px]">
        {overview.agingInventory} {overview.agingInventory === 1 ? 'unit' : 'units'}
      </strong>
      <p className="m-0 mt-1 text-xs text-white/85 md:text-sm">Available over 90 days</p>
      <Link
        className="mt-auto min-h-11 pt-3 text-xs font-bold text-white underline decoration-white/55 underline-offset-4 md:text-sm"
        to="/inventory"
        search={{ age: 'aging' }}
      >
        View aging inventory →
      </Link>
    </article>

    <article className={`${metricCardClass} bg-white`}>
      <span className="text-sm font-semibold text-[var(--color-carbon-700)]">Total inventory</span>
      <strong className="mt-3 font-[var(--font-display)] text-2xl tracking-[-0.04em] tabular-nums md:text-[28px]">
        {overview.totalInventory} {overview.totalInventory === 1 ? 'unit' : 'units'}
      </strong>
      <p className="m-0 mt-1 text-xs text-[var(--color-carbon-700)] md:text-sm">Current VIN-specific stock</p>
      <Link
        className="mt-auto min-h-11 pt-3 text-xs font-bold text-[var(--color-info-text)] underline-offset-4 hover:underline md:text-sm"
        to="/inventory"
      >
        Browse all inventory →
      </Link>
    </article>

    <article className={`${metricCardClass} hidden bg-white md:flex`}>
      <span className="text-sm font-semibold text-[var(--color-carbon-700)]">Available now</span>
      <strong className="mt-3 font-[var(--font-display)] text-[28px] tracking-[-0.04em] tabular-nums">
        {overview.availableInventory} {overview.availableInventory === 1 ? 'unit' : 'units'}
      </strong>
      <p className="m-0 mt-1 text-sm text-[var(--color-carbon-700)]">Ready for the next decision</p>
    </article>
  </section>
)
