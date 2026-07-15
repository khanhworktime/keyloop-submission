import type { ReactNode } from 'react'

export type StatusBadgeTone = 'ready' | 'attention' | 'info' | 'pending' | 'error' | 'neutral'

export interface StatusBadgeProps {
  children: ReactNode
  tone?: StatusBadgeTone
}

export const StatusBadge = ({
  children,
  tone = 'neutral',
}: StatusBadgeProps): React.JSX.Element => (
  <span className={`status-badge status-badge--${tone}`}>
    <span className="status-badge__marker" aria-hidden="true" />
    <span>{children}</span>
  </span>
)
