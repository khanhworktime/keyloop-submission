import { Link } from '@tanstack/react-router'
import { Activity as ActivityIcon, ArrowRight2, Edit2 } from 'iconsax-reactjs'

import type { Activity, InventoryUnit } from '../../../domain/inventory-types'
import { activityEventLabels, formatActivityDateParts } from './activity-formatters'

interface ActivityEventRowProps {
  activity: Activity
  unit: Pick<InventoryUnit, 'id' | 'stockNumber'>
  hideOnMobile?: boolean
}

export const ActivityEventRow = ({
  activity,
  unit,
  hideOnMobile = false,
}: ActivityEventRowProps): React.JSX.Element => {
  const timestamp = formatActivityDateParts(activity.timestamp)
  const managerAction = activity.eventType === 'manager-action'

  return (
    <li className={`activity-event ${hideOnMobile ? 'max-sm:!hidden' : ''}`}>
      <time dateTime={activity.timestamp} title={timestamp.full}>
        <span>{timestamp.date}</span>
        <strong>{timestamp.time}</strong>
      </time>
      <span className={`activity-event__marker ${managerAction ? 'activity-event__marker--ready' : ''}`}>
        {managerAction ? <Edit2 size={16} aria-hidden="true" /> : <ActivityIcon size={16} aria-hidden="true" />}
      </span>
      <div className="activity-event__body">
        <p>{activityEventLabels[activity.eventType]}</p>
        <h3>{activity.title}</h3>
        <span>{managerAction ? `Proposed action recorded by ${activity.actor}.` : activity.detail}</span>
        {activity.note ? <small>{activity.note}</small> : null}
      </div>
      <Link
        to="/inventory/$unitId"
        params={{ unitId: unit.id }}
        className="activity-event__link"
        aria-label={`Open Inventory Unit ${unit.stockNumber}`}
      >
        <strong>{unit.stockNumber}</strong>
        <ArrowRight2 size={16} aria-hidden="true" />
      </Link>
    </li>
  )
}
