import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'contextual' | 'danger' | 'quiet'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  loadingLabel?: string
  variant?: ButtonVariant
}

export const Button = ({
  children,
  className = '',
  disabled,
  isLoading = false,
  loadingLabel = 'Saving…',
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: ButtonProps): React.JSX.Element => (
  <button
    {...buttonProps}
    className={`button button--${variant} ${className}`.trim()}
    type={type}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
  >
    <span className="button__content" data-hidden={isLoading || undefined}>
      {children}
    </span>
    {isLoading ? <span className="button__loading-label">{loadingLabel}</span> : null}
  </button>
)
