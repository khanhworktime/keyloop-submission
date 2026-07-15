import { Autocomplete } from '@base-ui/react/autocomplete'
import { Dialog } from '@base-ui/react/dialog'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight2, CloseCircle, SearchNormal1 } from 'iconsax-reactjs'
import { useEffect, useId, useState } from 'react'

import type { UnitListItem } from '../../domain/inventory-types'
import { useGlobalInventorySearchQuery } from '../../features/inventory/inventory-queries'
import { formatInventoryStatus } from '../../features/inventory/components/inventory-formatters'

const resultLabel = (item: UnitListItem): string =>
  `${item.unit.stockNumber} ${item.unit.vin} ${item.master.id} ${item.master.make} ${item.master.model} ${item.master.variant}`

export interface GlobalInventorySearchProps {
  variant?: 'header' | 'navigation'
}

const GlobalInventorySearchContent = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const navigate = useNavigate()
  const descriptionId = useId()
  const query = useGlobalInventorySearchQuery(debouncedSearch)
  const hasInput = searchValue.trim().length > 0
  const isWaiting = hasInput && searchValue.trim() !== debouncedSearch
  const items = query.data?.items ?? []

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchValue.trim()), 180)
    return () => window.clearTimeout(timer)
  }, [searchValue])

  const openUnit = (item: UnitListItem): void => {
    onClose()
    void navigate({ to: '/inventory/$unitId', params: { unitId: item.unit.id } })
  }

  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-[var(--z-overlay)] bg-[#0f1b20]/45 transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <Dialog.Viewport className="fixed inset-0 z-[var(--z-overlay)] flex items-start justify-center overflow-y-auto px-3 pb-3 pt-[max(4rem,10dvh)]">
        <Dialog.Popup
          className="flex max-h-[min(36rem,calc(100dvh-5rem))] w-full max-w-[36rem] flex-col overflow-hidden rounded-[16px] border border-[var(--color-control-boundary)] bg-white text-[var(--color-carbon-900)] shadow-[var(--shadow-overlay)] transition-[transform,opacity] duration-150 data-[ending-style]:-translate-y-3 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-3 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
          aria-label="Search inventory"
        >
          <Autocomplete.Root
            open
            inline
            items={items}
            value={searchValue}
            onValueChange={setSearchValue}
            itemToStringValue={resultLabel}
            filter={null}
            autoHighlight="always"
            keepHighlight
          >
            <div className="flex min-h-14 items-center gap-3 border-b border-[var(--color-stone-900)] px-4">
              <SearchNormal1 size={22} aria-hidden="true" />
              <Autocomplete.Input
                autoFocus
                className="global-inventory-search__input min-h-14 min-w-0 flex-1 border-0 bg-transparent text-base outline-none placeholder:text-[#71858f]"
                aria-label="Search inventory"
                aria-describedby={descriptionId}
                placeholder="Search unit, Stock No., VIN or Vehicle Master…"
              />
              <Dialog.Close
                className="grid h-11 w-11 flex-none place-items-center rounded-[var(--radius-control)] border-0 bg-transparent text-[var(--color-carbon-700)] hover:bg-[#edf4f7]"
                aria-label="Close search"
              >
                <CloseCircle size={22} aria-hidden="true" />
              </Dialog.Close>
            </div>

            <ScrollArea.Root className="relative flex min-h-28 flex-1 overflow-hidden" aria-busy={isWaiting || query.isLoading || undefined}>
              <ScrollArea.Viewport className="min-h-0 flex-1 overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-focus)]">
                <ScrollArea.Content style={{ minWidth: '100%' }}>
                  {!hasInput ? (
                    <p className="m-0 px-4 py-8 text-center text-sm text-[#617681]">Start typing to search all Inventory Units.</p>
                  ) : isWaiting || query.isLoading ? (
                    <Autocomplete.Status><p className="m-0 px-4 py-8 text-center text-sm text-[#617681]">Searching inventory…</p></Autocomplete.Status>
                  ) : query.isError ? (
                    <div className="px-4 py-6 text-center" role="alert">
                      <p className="m-0 text-sm font-semibold">Inventory search is unavailable.</p>
                      <button className="mt-3 min-h-11 rounded-[var(--radius-control)] border border-[var(--color-control-boundary)] bg-white px-4 text-sm font-bold" type="button" onClick={() => void query.refetch()}>Try again</button>
                    </div>
                  ) : (
                    <>
                      <Autocomplete.Empty>
                        <p className="m-0 px-4 py-8 text-center text-sm text-[#617681]">No Inventory Units match “{debouncedSearch}”.</p>
                      </Autocomplete.Empty>
                      <Autocomplete.List className="m-0 list-none p-2">
                        {(item: UnitListItem) => (
                          <Autocomplete.Item
                            key={item.unit.id}
                            value={item}
                            onClick={() => openUnit(item)}
                            className="group grid min-h-[68px] cursor-default grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-[10px] px-2.5 py-2 outline-none data-[highlighted]:bg-[#e8f4fb]"
                          >
                            <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#edf1f3] text-sm font-bold text-[#315164]" aria-hidden="true">{item.master.model.slice(0, 2)}</span>
                            <span className="min-w-0">
                              <strong className="block truncate text-sm">{item.unit.stockNumber} · {item.master.make} {item.master.model} {item.master.variant}</strong>
                              <span className="mt-1 block truncate text-xs text-[#526a76]">{item.unit.vin} · {item.master.id} · {formatInventoryStatus(item.unit.inventoryStatus)}</span>
                            </span>
                            <ArrowRight2 size={18} className="text-[#526a76]" aria-hidden="true" />
                          </Autocomplete.Item>
                        )}
                      </Autocomplete.List>
                    </>
                  )}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar className="flex w-2 justify-center bg-[#edf1f3]">
                <ScrollArea.Thumb className="w-1 rounded-full bg-[#71858f]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            <div className="flex items-center justify-between border-t border-[var(--color-stone-900)] px-4 py-2.5 text-xs text-[#617681]">
              <span id={descriptionId}>Use arrow keys to browse and Enter to open.</span>
              <kbd className="rounded border border-[#c8d5db] bg-[#f4f6f7] px-2 py-1 font-mono">Esc</kbd>
            </div>
          </Autocomplete.Root>
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  )
}

export const GlobalInventorySearch = ({
  variant = 'navigation',
}: GlobalInventorySearchProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const openFromShortcut = (event: KeyboardEvent): void => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey) && !event.altKey) {
        const desktopQuery = window.matchMedia?.('(min-width: 1200px)')
        const ownsShortcut = desktopQuery
          ? desktopQuery.matches === (variant === 'navigation')
          : variant === 'navigation'

        if (!ownsShortcut) return
        event.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', openFromShortcut)
    return () => document.removeEventListener('keydown', openFromShortcut)
  }, [variant])

  const isHeaderTrigger = variant === 'header'

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={isHeaderTrigger
          ? 'application-header__icon-button global-inventory-search__header-trigger'
          : 'primary-navigation__link global-inventory-search__trigger'}
        type="button"
        aria-label="Search inventory"
        aria-keyshortcuts="Meta+K Control+K"
      >
        <SearchNormal1
          className={isHeaderTrigger ? undefined : 'primary-navigation__icon'}
          size={isHeaderTrigger ? 21 : 24}
          aria-hidden="true"
        />
        {isHeaderTrigger ? null : <span className="global-inventory-search__label">Search</span>}
      </Dialog.Trigger>
      {open ? <GlobalInventorySearchContent onClose={() => setOpen(false)} /> : null}
    </Dialog.Root>
  )
}
