import type { ReactNode } from 'react'

import { Button } from './button'

interface StatePanelProps {
  action?: ReactNode
  message: string
  title: string
}

const StatePanel = ({ action, message, title }: StatePanelProps): React.JSX.Element => (
  <div className="async-state__content">
    <h2 className="async-state__title">{title}</h2>
    <p className="async-state__message">{message}</p>
    {action ? <div className="async-state__action">{action}</div> : null}
  </div>
)

export interface LoadingStateProps {
  label?: string
}

export const LoadingState = ({ label = 'Loading' }: LoadingStateProps): React.JSX.Element => (
  <div className="async-state" role="status" aria-label={label} aria-busy="true">
    <span className="sr-only">{label}</span>
    <div className="async-state__skeleton" aria-hidden="true">
      <div className="async-state__skeleton-line" />
      <div className="async-state__skeleton-line" />
      <div className="async-state__skeleton-line" />
    </div>
  </div>
)

export interface EmptyStateProps {
  action?: ReactNode
  message: string
  title: string
}

export const EmptyState = ({ action, message, title }: EmptyStateProps): React.JSX.Element => (
  <section className="async-state" aria-label={title}>
    <StatePanel action={action} message={message} title={title} />
  </section>
)

export interface ErrorStateProps {
  message: string
  onRetry?: () => void
  title?: string
}

export const ErrorState = ({
  message,
  onRetry,
  title = 'Something went wrong',
}: ErrorStateProps): React.JSX.Element => (
  <section className="async-state" role="alert">
    <StatePanel
      action={onRetry ? <Button onClick={onRetry}>Retry</Button> : undefined}
      message={message}
      title={title}
    />
  </section>
)
