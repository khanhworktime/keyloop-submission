import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'iconsax-reactjs'
import { useState } from 'react'

import { ErrorState, LoadingState } from '../../components/ui'
import { useInventoryUnitQuery } from '../inventory/inventory-queries'
import { ActionSaveToast } from './action-save-toast'
import { InventoryActionDrawer } from './inventory-action-drawer'
import { InventoryUnitActivity } from './inventory-unit-activity'
import { InventoryUnitEditSheet } from './inventory-unit-edit-sheet'
import { actionLabels } from './inventory-unit-formatters'
import { InventoryUnitSummary } from './inventory-unit-summary'

interface InventoryUnitPageProps {
  unitId: string
}

export const InventoryUnitPage = ({ unitId }: InventoryUnitPageProps): React.JSX.Element => {
  const query = useInventoryUnitQuery(unitId)
  const [liveMessage, setLiveMessage] = useState('')
  const latestActionNote = query.data?.unit.latestAction?.note?.trim()
  const lifecycleStatus = query.data?.unit.inventoryStatus
  const isUnavailable = lifecycleStatus === 'reserved' || lifecycleStatus === 'sold'
  const lifecycleLabel = lifecycleStatus === 'reserved' ? 'Reserved' : 'Sold'

  return (
    <div>
      {liveMessage ? <ActionSaveToast message={liveMessage} onDismiss={() => setLiveMessage('')} /> : null}

      <Link
        to="/inventory"
        className="mb-2 inline-flex min-h-12 items-center gap-2 rounded-md pr-2 font-semibold text-[var(--color-info-text)] no-underline sm:hidden"
      >
        <ArrowLeft size={20} aria-hidden="true" />
        Back to inventory
      </Link>

      {query.data ? (
        <nav aria-label="Inventory unit context" className="mb-2 hidden min-h-11 items-center gap-2 text-[13px] sm:flex">
          <Link to="/inventory" className="font-semibold text-[var(--color-info-text)] no-underline">Inventory</Link>
          <span aria-hidden="true">›</span>
          <strong>Stock no. {query.data.unit.stockNumber}</strong>
        </nav>
      ) : null}

      {query.isLoading ? <LoadingState label="Loading Inventory Unit" /> : null}
      {query.isError ? <ErrorState title="Inventory Unit unavailable" message={query.error.message} onRetry={() => void query.refetch()} /> : null}
      {query.data ? (
        <div className="grid gap-2.5 md:grid-cols-[minmax(0,1fr)_270px] xl:grid-cols-[minmax(0,1.35fr)_minmax(290px,.65fr)]">
          <InventoryUnitSummary
            detail={query.data}
            editControl={<InventoryUnitEditSheet unit={query.data.unit} onSaved={setLiveMessage} />}
          />

          <aside className="order-2 flex min-w-0 flex-col rounded-[14px] border border-[var(--color-stone-900)] bg-white p-3.5 md:col-start-2 md:row-span-2 md:row-start-1 md:p-3.5 lg:p-4">
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-info-text)]">Manager decision</p>
            <h2 className="mb-0 mt-1 text-xl font-bold">
              {query.data.isAging
                ? 'Resolve the aging signal.'
                : isUnavailable
                  ? `${lifecycleLabel} inventory.`
                  : 'No action needed yet.'}
            </h2>
            <p className="mb-3.5 mt-1.5 text-sm leading-[1.45] text-[#617681]">
              {query.data.isAging
                ? 'Record the next step while the unit, Master, and Slot context remain visible.'
                : isUnavailable
                  ? `${lifecycleLabel} units do not enter aging review. Inventory age remains visible for context.`
                  : `Actions become available after 90 days in stock. This unit is currently ${query.data.daysInStock} days old.`}
            </p>

            <div className="rounded-[11px] bg-[#edf4f7] p-3">
              <span className="block text-[11px] font-bold uppercase text-[#617681]">Current proposed action</span>
              <strong className="mt-1 block break-words text-sm">
                {query.data.unit.latestAction ? actionLabels[query.data.unit.latestAction.type] : 'Not recorded'}
              </strong>
              {latestActionNote ? (
                <p className="mb-0 mt-2 break-words border-t border-[#c8d5db] pt-2 text-[13px] leading-[1.45] text-[#526a76]">
                  {latestActionNote}
                </p>
              ) : null}
            </div>

            <p className="mb-0 mt-2.5 flex gap-2 text-xs leading-[1.45] text-[#6b3c35]">
              <span className="text-[var(--color-attention-text)]" aria-hidden="true">◆</span>
              <span>
                {query.data.isAging
                  ? `This unit is ${query.data.daysInStock - 90} days beyond the threshold. Exactly 90 days is not aging.`
                  : isUnavailable
                    ? 'Only Available inventory can enter aging review.'
                    : 'Exactly 90 days is not aging.'}
              </span>
            </p>

            <Link to="/activity" search={{ units: [query.data.unit.stockNumber] }} className="mt-3 hidden min-h-11 items-center self-start px-1 text-[13px] font-bold text-[var(--color-info-text)] no-underline sm:inline-flex">
              Review activity history
            </Link>

            {query.data.isAging ? (
              <div className="mt-3 md:mt-auto">
                <InventoryActionDrawer
                  unitId={unitId}
                  stockNumber={query.data.unit.stockNumber}
                  vehicleLabel={`${query.data.master.make} ${query.data.master.model} ${query.data.master.variant}`}
                  initialAction={query.data.unit.latestAction?.type}
                  onSaved={setLiveMessage}
                />
              </div>
            ) : null}
          </aside>

          <div className="order-3 md:contents">
            <InventoryUnitActivity
              activities={query.data.activities}
              stockNumber={query.data.unit.stockNumber}
              unitId={query.data.unit.id}
            />
          </div>
        </div>
      ) : null}
      {!query.isLoading && !query.isError && !query.data ? <ErrorState title="Inventory Unit unavailable" message="This unit could not be found." /> : null}
    </div>
  )
}
