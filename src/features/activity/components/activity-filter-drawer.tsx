import { Drawer } from '@base-ui/react/drawer'
import { ArrowRight2, Filter } from 'iconsax-reactjs'
import { useState, type FormEvent } from 'react'

import type { ActivityFacets, ActivityEventType } from '../../../domain/inventory-types'
import { Button, SelectField } from '../../../components/ui'
import { countAdvancedFilters, type ActivityUrlFilters } from '../activity-filter-state'
import { activityEventLabels } from './activity-formatters'
import { ActivityUnitCombobox } from './activity-unit-combobox'
import { useDesktopDrawer } from './use-desktop-drawer'

interface ActivityFilterDrawerProps {
  facets: ActivityFacets
  filters: ActivityUrlFilters
  onApply: (filters: ActivityUrlFilters) => void
}

const fieldClass = 'min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-control-boundary)] bg-white px-3'

export const ActivityFilterDrawer = ({ facets, filters, onApply }: ActivityFilterDrawerProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<ActivityUrlFilters>(filters)
  const [error, setError] = useState('')
  const isDesktop = useDesktopDrawer()
  const activeCount = countAdvancedFilters(filters)

  const handleOpenChange = (nextOpen: boolean): void => {
    setOpen(nextOpen)
    if (nextOpen) { setDraft(filters); setError('') }
  }

  const apply = (event: FormEvent): void => {
    event.preventDefault()
    if (draft.from && draft.to && draft.from > draft.to) {
      setError('To date must be on or after From date.')
      return
    }
    onApply({ ...draft, page: undefined })
    setOpen(false)
  }

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} swipeDirection={isDesktop ? 'right' : 'down'}>
      <Drawer.Trigger
        render={
          <Button variant="secondary" className="activity-advanced-trigger">
            <Filter size={18} className="activity-advanced-trigger__icon" aria-hidden="true" />
            <span className="activity-advanced-trigger__desktop"><strong>Advanced filters</strong><small>Event type, date, and actor</small></span>
            <span className="activity-advanced-trigger__mobile">Filters</span>
            {activeCount ? <span className="activity-advanced-trigger__count">{activeCount}</span> : null}
            <ArrowRight2 size={16} className="activity-advanced-trigger__direction" aria-hidden="true" />
          </Button>
        }
      />
      <Drawer.VirtualKeyboardProvider>
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 z-50 bg-[rgb(17_24_28/45%)] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Drawer.Viewport className="fixed inset-0 z-50 flex items-end justify-end md:items-stretch">
            <Drawer.Popup className="max-h-[92dvh] w-full overflow-y-auto rounded-t-[var(--radius-sheet)] bg-white shadow-[var(--shadow-overlay)] transition-transform duration-300 data-[swipe-direction=down]:[transform:translateY(var(--drawer-swipe-movement-y))] data-[swipe-direction=right]:[transform:translateX(var(--drawer-swipe-movement-x))] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full md:h-full md:max-h-none md:max-w-[460px] md:rounded-none md:data-[ending-style]:translate-x-full md:data-[ending-style]:translate-y-0 md:data-[starting-style]:translate-x-full md:data-[starting-style]:translate-y-0">
              <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[var(--color-stone-900)] md:hidden" aria-hidden="true" />
              <Drawer.Content className="p-5 md:p-8">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-info-text)]">Activity history</p>
                <Drawer.Title className="mt-2 text-2xl font-bold">Advanced filters</Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-[var(--color-carbon-700)]">Narrow global evidence by unit, event type, date, or actor.</Drawer.Description>
                <form className="mt-7 space-y-5" onSubmit={apply}>
                  {error ? <p role="alert" className="rounded-[var(--radius-control)] border border-[var(--color-error-border)] bg-[var(--color-error-surface)] p-3 text-sm text-[var(--color-error-text)]">{error}</p> : null}
                  <label className="block text-sm font-semibold">Search activity<input className={`${fieldClass} mt-2 block`} type="search" maxLength={100} placeholder="Stock Number, VIN or model" value={draft.search ?? ''} onChange={(event) => setDraft({ ...draft, search: event.target.value || undefined })} /></label>
                  <ActivityUnitCombobox id="activity-unit-drawer" units={facets.units} value={draft.units} onChange={(units) => setDraft({ ...draft, units: units.length ? units : undefined })} label="Inventory units (optional)" />
                  <SelectField label="Event type" labelClassName="mb-2 block text-sm font-semibold" value={draft.eventType ?? null} emptyOptionLabel="All events" options={facets.eventTypes.map((type) => ({ label: activityEventLabels[type], value: type }))} onValueChange={(eventType) => setDraft({ ...draft, eventType: (eventType ?? undefined) as ActivityEventType | undefined })} />
                  <div className="grid grid-cols-2 gap-3"><label className="text-sm font-semibold">From<input className={`${fieldClass} mt-2 block`} type="date" value={draft.from ?? ''} onChange={(event) => setDraft({ ...draft, from: event.target.value || undefined })} /></label><label className="text-sm font-semibold">To<input className={`${fieldClass} mt-2 block`} type="date" value={draft.to ?? ''} onChange={(event) => setDraft({ ...draft, to: event.target.value || undefined })} /></label></div>
                  <SelectField label="Actor" labelClassName="mb-2 block text-sm font-semibold" value={draft.actor ?? null} emptyOptionLabel="Anyone" options={facets.actors.map((actor) => ({ label: actor, value: actor }))} onValueChange={(actor) => setDraft({ ...draft, actor: actor ?? undefined })} />
                  <button type="button" className="min-h-11 font-semibold text-[var(--color-info-text)]" onClick={() => { setDraft({ units: filters.units, search: filters.search }); setError('') }}>Reset advanced filters</button>
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Apply filters</Button></div>
                </form>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.VirtualKeyboardProvider>
    </Drawer.Root>
  )
}
