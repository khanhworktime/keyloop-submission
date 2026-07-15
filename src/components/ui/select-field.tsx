import { Select } from '@base-ui/react/select'
import { ArrowDown2 } from 'iconsax-reactjs'
import type { ReactNode } from 'react'

const EMPTY_VALUE = '__keyloop_select_empty__'

export interface SelectFieldOption {
  label: ReactNode
  value: string
}

export interface SelectFieldProps {
  className?: string
  disabled?: boolean
  emptyOptionLabel?: ReactNode
  invalid?: boolean
  label: ReactNode
  labelClassName?: string
  onValueChange: (value: string | null) => void
  options: readonly SelectFieldOption[]
  placeholder?: ReactNode
  popupClassName?: string
  triggerClassName?: string
  value: string | null
}

const selectedIcon = (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4 stroke-current stroke-[2]">
    <path d="m3.25 8.25 3 3 6.5-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const SelectField = ({
  className,
  disabled = false,
  emptyOptionLabel,
  invalid = false,
  label,
  labelClassName = 'mb-1 block text-xs font-semibold text-[var(--color-carbon-700)]',
  onValueChange,
  options,
  placeholder,
  popupClassName = '',
  triggerClassName = '',
  value,
}: SelectFieldProps): React.JSX.Element => {
  const selectableOptions = emptyOptionLabel === undefined
    ? options
    : [{ value: EMPTY_VALUE, label: emptyOptionLabel }, ...options]
  const selectedValue = value ?? (emptyOptionLabel === undefined ? null : EMPTY_VALUE)

  return (
    <div className={className}>
      <Select.Root
        disabled={disabled}
        items={selectableOptions}
        value={selectedValue}
        onValueChange={(nextValue) => onValueChange(nextValue === EMPTY_VALUE ? null : nextValue)}
      >
        <Select.Label className={labelClassName}>{label}</Select.Label>
        <Select.Trigger
          aria-invalid={invalid || undefined}
          className={`group flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-control)] border bg-white px-3 text-left text-base font-medium text-[var(--color-carbon-900)] outline-none transition-colors duration-200 hover:bg-[var(--color-info-surface)] focus-visible:ring-2 focus-visible:ring-[var(--color-info-border)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${invalid ? 'border-[var(--color-error-border)]' : 'border-[var(--color-control-boundary)]'} ${triggerClassName}`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="flex shrink-0 items-center text-[var(--color-carbon-900)] transition-transform duration-200 group-data-[popup-open]:rotate-180">
            <ArrowDown2 size={19} aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            align="start"
            alignItemWithTrigger={false}
            sideOffset={6}
            className="z-[70]"
          >
            <Select.Popup className={`w-[var(--anchor-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[12px] border border-[var(--color-stone-900)] bg-white p-1.5 shadow-[var(--shadow-overlay)] outline-none ${popupClassName}`}>
              <Select.List className="max-h-[min(20rem,var(--available-height))] overflow-y-auto">
                {selectableOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="grid min-h-11 cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-2 rounded-[7px] px-3 text-base text-[var(--color-carbon-900)] outline-none transition-colors duration-150 data-[highlighted]:bg-[var(--color-info-surface)] data-[selected]:font-semibold"
                  >
                    <span className="flex items-center justify-center text-[var(--color-carbon-900)]">
                      <Select.ItemIndicator>{selectedIcon}</Select.ItemIndicator>
                    </span>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
