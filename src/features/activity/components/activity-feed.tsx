import { EmptyState, StatusBadge } from '../../../components/ui'
import type { ActivityPage } from '../../../domain/inventory-types'
import { ActivityEventRow } from './activity-event-row'

interface ActivityFeedProps {
  data: ActivityPage
  filtered: boolean
  onReset: () => void
  unitFilters?: string[]
}

export const ActivityFeed = ({ data, filtered, onReset, unitFilters }: ActivityFeedProps): React.JSX.Element => {
  const focusedItem = unitFilters?.length === 1 ? data.items.find(({ unit }) => unit.stockNumber === unitFilters[0]) : undefined
  const title = focusedItem
    ? `${focusedItem.master.make} ${focusedItem.master.model} ${focusedItem.master.variant}`
    : 'Recent operational events'
  const hasManagerAction = data.items.some(({ activity }) => activity.eventType === 'manager-action')

  return (
    <article className="activity-feed" aria-labelledby="activity-results-title">
      <header className="activity-feed__header">
        <div>
          <p>{unitFilters?.length ? `${unitFilters.length} inventory units` : 'All inventory'}</p>
          <h2 id="activity-results-title">{title}</h2>
        </div>
        <div className="activity-feed__meta">
          <span className="activity-feed__count">{data.meta.total} {data.meta.total === 1 ? 'event' : 'events'}</span>
          {unitFilters?.length === 1 && hasManagerAction ? <StatusBadge tone="ready">Action recorded</StatusBadge> : null}
        </div>
      </header>
      <p className="sr-only" role="status">{data.meta.total} {data.meta.total === 1 ? 'event' : 'events'}</p>

      {data.items.length === 0 ? (
        <EmptyState
          title="No activity matches these filters"
          message="Try another inventory unit or reset the current filters."
          action={filtered ? <button className="button button--secondary" type="button" onClick={onReset}>Reset filters</button> : undefined}
        />
      ) : (
        <ol className="activity-event-list" aria-label="Operational events">
          {data.items.map(({ activity, unit }) => (
            <ActivityEventRow key={activity.id} activity={activity} unit={unit} />
          ))}
        </ol>
      )}
    </article>
  )
}
