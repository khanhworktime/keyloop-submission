import { EmptyState, ErrorState, LoadingState } from '../../../components/ui'
import { useOverviewQuery } from '../overview-queries'
import { OverviewPriorityQueue } from './overview-priority-queue'
import { OverviewSummary } from './overview-summary'

export const OverviewPage = (): React.JSX.Element => {
  const overviewQuery = useOverviewQuery()

  if (overviewQuery.isPending) {
    return <LoadingState label="Loading inventory overview" />
  }

  if (overviewQuery.isError) {
    return (
      <ErrorState
        title="Overview unavailable"
        message={overviewQuery.error.message}
        onRetry={() => void overviewQuery.refetch()}
      />
    )
  }

  if (overviewQuery.data.totalInventory === 0) {
    return (
      <EmptyState
        title="No inventory yet"
        message="Inventory summary will appear after the first unit is received."
      />
    )
  }

  return (
    <div className="grid gap-3 md:gap-4">
      <header className="max-w-3xl">
        <p className="m-0 text-xs font-bold tracking-[0.14em] text-[var(--color-carbon-700)] uppercase">
          Operational overview
        </p>
        <h1 className="m-0 mt-1 text-[26px] leading-[1.08] font-bold tracking-[-0.045em] md:text-[30px]">
          Inventory requiring attention
        </h1>
        <p className="m-0 mt-1.5 max-w-2xl text-xs leading-relaxed text-[var(--color-carbon-700)] md:text-[13px]">
          Start with long-held stock, then move directly into the next manager decision.
        </p>
      </header>

      <OverviewSummary overview={overviewQuery.data} />
      <OverviewPriorityQueue items={overviewQuery.data.priorityUnits} />
    </div>
  )
}
