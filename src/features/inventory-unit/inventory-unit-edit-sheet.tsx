import { Drawer } from '@base-ui/react/drawer'
import { Edit2 } from 'iconsax-reactjs'
import { useRef, useState, type FormEvent } from 'react'

import { Button, SelectField } from '../../components/ui'
import {
  INVENTORY_STATUSES,
  type InventoryStatus,
  type InventoryUnit,
} from '../../domain/inventory-types'
import { useUpdateInventoryUnitMutation } from '../inventory/inventory-queries'
import { formatStatus } from './inventory-unit-formatters'
import { useDesktopDrawer } from './use-desktop-drawer'

interface InventoryUnitEditSheetProps {
  unit: InventoryUnit
  onSaved: (message: string) => void
}

const inputClass =
  'min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-control-boundary)] bg-white px-3 text-base text-[var(--color-carbon-900)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-info-border)] focus-visible:ring-offset-2'

export const InventoryUnitEditSheet = ({
  unit,
  onSaved,
}: InventoryUnitEditSheetProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [vin, setVin] = useState(unit.vin)
  const [stockNumber, setStockNumber] = useState(unit.stockNumber)
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatus>(unit.inventoryStatus)
  const [zoneSlot, setZoneSlot] = useState(unit.zoneSlot ?? '')
  const [validationError, setValidationError] = useState('')
  const errorRef = useRef<HTMLDivElement>(null)
  const mutation = useUpdateInventoryUnitMutation()
  const isDesktop = useDesktopDrawer()

  const handleOpenChange = (nextOpen: boolean): void => {
    setOpen(nextOpen)
    if (nextOpen) {
      setVin(unit.vin)
      setStockNumber(unit.stockNumber)
      setInventoryStatus(unit.inventoryStatus)
      setZoneSlot(unit.zoneSlot ?? '')
      setValidationError('')
      mutation.reset()
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!vin.trim() || !stockNumber.trim()) {
      setValidationError('VIN and stock number are required.')
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }

    setValidationError('')
    try {
      const result = await mutation.mutateAsync({
        unitId: unit.id,
        vin: vin.trim(),
        stockNumber: stockNumber.trim(),
        inventoryStatus,
        zoneSlot: zoneSlot.trim() || undefined,
      })
      setOpen(false)
      if (result.activity) onSaved(`${result.unit.unit.stockNumber} details were updated.`)
    } catch {
      requestAnimationFrame(() => errorRef.current?.focus())
    }
  }

  const errorMessage = validationError || mutation.error?.message

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} swipeDirection={isDesktop ? 'right' : 'down'}>
      <Drawer.Trigger
        render={
          <Button variant="secondary" className="min-h-10 px-3" aria-label={`Edit Inventory Unit ${unit.stockNumber}`}>
            <Edit2 size={18} aria-hidden="true" />
            Edit
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
              <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-info-text)]">Inventory Unit</p>
              <Drawer.Title className="mt-2 text-2xl font-bold">Edit unit details</Drawer.Title>
              <Drawer.Description className="mt-1 text-sm text-[var(--color-carbon-700)]">
                Update the VIN-specific stock record. Vehicle Master and inventory age stay unchanged.
              </Drawer.Description>

              <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
                {errorMessage ? (
                  <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-control)] border border-[var(--color-error-border)] bg-[var(--color-error-surface)] p-3 text-sm text-[var(--color-error-text)]">
                    <strong>Unit not saved.</strong> {errorMessage}
                  </div>
                ) : null}

                <label className="block text-sm font-semibold" htmlFor="unit-stock-number">
                  Stock No.
                  <input id="unit-stock-number" className={`${inputClass} mt-2`} value={stockNumber} onChange={(event) => setStockNumber(event.target.value)} maxLength={40} required />
                </label>

                <label className="block text-sm font-semibold" htmlFor="unit-vin">
                  VIN
                  <input id="unit-vin" className={`${inputClass} mt-2 font-mono`} value={vin} onChange={(event) => setVin(event.target.value)} maxLength={64} required />
                </label>

                <SelectField
                  label="Status"
                  labelClassName="mb-2 block text-sm font-semibold"
                  value={inventoryStatus}
                  options={INVENTORY_STATUSES.map((value) => ({ value, label: formatStatus(value) }))}
                  onValueChange={(value) => value && setInventoryStatus(value as InventoryStatus)}
                />

                <label className="block text-sm font-semibold" htmlFor="unit-zone-slot">
                  Zone / Slot <span className="font-normal text-[var(--color-carbon-700)]">Optional</span>
                  <input id="unit-zone-slot" className={`${inputClass} mt-2`} value={zoneSlot} onChange={(event) => setZoneSlot(event.target.value)} maxLength={80} placeholder="For example, North · N-04" />
                </label>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" isLoading={mutation.isPending} loadingLabel="Saving unit…">Save changes</Button>
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
