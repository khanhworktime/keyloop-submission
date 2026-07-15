import { Drawer } from '@base-ui/react/drawer'
import { Edit2 } from 'iconsax-reactjs'
import { useRef, useState, type FormEvent } from 'react'

import { INVENTORY_ACTION_TYPES, type InventoryActionType } from '../../domain/inventory-types'
import { Button, SelectField } from '../../components/ui'
import { useRecordActionMutation } from '../inventory/inventory-queries'
import { actionLabels } from './inventory-unit-formatters'
import { useDesktopDrawer } from './use-desktop-drawer'

interface InventoryActionDrawerProps {
  initialAction?: InventoryActionType
  stockNumber: string
  unitId: string
  vehicleLabel: string
  onSaved: (message: string) => void
}

const inputClass =
  'min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-control-boundary)] bg-white px-3 text-left text-[var(--color-carbon-900)]'

export const InventoryActionDrawer = ({
  initialAction,
  stockNumber,
  unitId,
  vehicleLabel,
  onSaved,
}: InventoryActionDrawerProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<InventoryActionType | null>(initialAction ?? null)
  const [note, setNote] = useState('')
  const [validationError, setValidationError] = useState('')
  const errorRef = useRef<HTMLDivElement>(null)
  const mutation = useRecordActionMutation()
  const isDesktop = useDesktopDrawer()

  const handleOpenChange = (nextOpen: boolean): void => {
    setOpen(nextOpen)
    if (nextOpen) {
      setAction(initialAction ?? null)
      setNote('')
      setValidationError('')
      mutation.reset()
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!action) {
      setValidationError('Choose a proposed action before saving.')
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }
    if (note.length > 500) {
      setValidationError('Manager note must be 500 characters or fewer.')
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }

    setValidationError('')
    try {
      await mutation.mutateAsync({ unitId, action, note: note.trim() || undefined })
      setOpen(false)
      onSaved(`${actionLabels[action]} was added to ${stockNumber} activity.`)
    } catch {
      requestAnimationFrame(() => errorRef.current?.focus())
    }
  }

  const errorMessage = validationError || mutation.error?.message

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} swipeDirection={isDesktop ? 'right' : 'down'}>
      <Drawer.Trigger
        render={
          <Button className="w-full !border-[var(--color-ready-border)] !bg-[var(--color-ready-border)]" aria-label={`Record proposed action for ${stockNumber}`}>
            <Edit2 size={19} aria-hidden="true" />
            Record proposed action
          </Button>
        }
      />
      <Drawer.VirtualKeyboardProvider>
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 z-50 bg-[rgb(17_24_28/45%)] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Drawer.Viewport className="fixed inset-0 z-50 flex items-end justify-end md:items-stretch">
            <Drawer.Popup className="max-h-[92dvh] w-full overflow-y-auto rounded-t-[var(--radius-sheet)] bg-white shadow-[var(--shadow-overlay)] transition-transform duration-300 data-[swipe-direction=down]:[transform:translateY(var(--drawer-swipe-movement-y))] data-[swipe-direction=right]:[transform:translateX(var(--drawer-swipe-movement-x))] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full md:h-full md:max-h-none md:max-w-[440px] md:rounded-none md:data-[ending-style]:translate-x-full md:data-[ending-style]:translate-y-0 md:data-[starting-style]:translate-x-full md:data-[starting-style]:translate-y-0">
              <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[var(--color-stone-900)] md:hidden" aria-hidden="true" />
              <Drawer.Content className="p-5 md:p-8">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-info-text)]">Manager decision</p>
                <Drawer.Title className="mt-2 text-2xl font-bold">Record proposed action</Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-[var(--color-carbon-700)]">
                  {stockNumber} · {vehicleLabel}
                </Drawer.Description>

                <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
                  {errorMessage ? (
                    <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-control)] border border-[var(--color-error-border)] bg-[var(--color-error-surface)] p-3 text-sm text-[var(--color-error-text)]">
                      <strong>Action not saved.</strong> {errorMessage}
                    </div>
                  ) : null}

                  <SelectField
                    label="Proposed action"
                    labelClassName="mb-2 block text-sm font-semibold"
                    value={action}
                    placeholder="Choose an action"
                    options={INVENTORY_ACTION_TYPES.map((value) => ({ value, label: actionLabels[value] }))}
                    onValueChange={(value) => setAction(value as InventoryActionType | null)}
                  />

                  <label className="block text-sm font-semibold" htmlFor="manager-note">
                    Manager note <span className="font-normal text-[var(--color-carbon-700)]">Optional</span>
                  </label>
                  <textarea id="manager-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={501} rows={5} className={`${inputClass} resize-y py-3`} placeholder="Add context for the next manager" aria-describedby="note-count" />
                  <p id="note-count" className={`-mt-3 text-right text-xs ${note.length > 500 ? 'text-[var(--color-error-text)]' : 'text-[var(--color-carbon-700)]'}`}>
                    {note.length}/500 characters
                  </p>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" isLoading={mutation.isPending} loadingLabel="Saving action…">Save proposed action</Button>
                  </div>
                </form>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.VirtualKeyboardProvider>
    </Drawer.Root>
  )
}
