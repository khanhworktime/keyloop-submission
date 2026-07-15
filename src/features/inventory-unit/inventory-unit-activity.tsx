import { Link } from '@tanstack/react-router'

import { EmptyState } from '../../components/ui'
import type { Activity } from '../../domain/inventory-types'
import { ActivityEventRow } from '../activity/components/activity-event-row'

interface InventoryUnitActivityProps {
  activities: Activity[]
  stockNumber: string
  unitId: string
}

export const InventoryUnitActivity = ({
  activities,
  stockNumber,
  unitId,
}: InventoryUnitActivityProps): React.JSX.Element => (
  <section className="min-w-0 overflow-hidden rounded-[14px] border border-[var(--color-stone-900)] bg-white md:col-start-1 md:row-start-2" aria-labelledby="unit-activity-title">
    <header className="flex min-h-14 items-center justify-between gap-3 px-3">
      <h2 id="unit-activity-title" className="m-0 text-xl font-bold">Recent activity</h2>
      <Link to="/activity" search={{ units: [stockNumber] }} className="inline-flex min-h-11 items-center px-1 text-[13px] font-bold text-[var(--color-info-text)] no-underline">
        View activity
      </Link>
    </header>
    {activities.length === 0 ? (
      <div className="border-t border-[var(--color-stone-900)]">
        <EmptyState title="No activity yet" message="Events for this unit will appear here." />
      </div>
    ) : (
      <ol className="activity-event-list border-t border-[var(--color-stone-900)]" aria-label="Recent operational events">
        {activities.slice(0, 2).map((activity, index) => (
          <ActivityEventRow
            key={activity.id}
            activity={activity}
            unit={{ id: unitId, stockNumber }}
            hideOnMobile={index > 0}
          />
        ))}
      </ol>
    )}
  </section>
)
