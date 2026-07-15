import { Calendar, Clock, Gallery, Location, TickCircle } from 'iconsax-reactjs'
import type { ReactNode } from 'react'

import { StatusBadge } from '../../components/ui'
import type { InventoryUnitDetail } from '../../domain/inventory-types'
import { formatDate, formatStatus } from './inventory-unit-formatters'

interface InventoryUnitSummaryProps {
  detail: InventoryUnitDetail
  editControl?: ReactNode
}

const Fact = ({
  attention = false,
  icon,
  label,
  value,
}: {
  attention?: boolean
  icon: React.ReactNode
  label: string
  value: string
}): React.JSX.Element => (
  <div className="min-h-[78px] min-w-0 bg-white p-2.5">
    <dt className="flex items-center gap-2 text-[11px] font-bold uppercase text-[#617681]">
      <span
        className={`grid h-7 w-7 flex-none place-items-center rounded-lg ${attention ? 'bg-[var(--color-attention-surface)] text-[var(--color-attention-text)]' : 'bg-[#edf4f7] text-[#315164]'}`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </dt>
    <dd className={`ml-9 mt-1.5 break-words text-sm font-bold ${attention ? 'text-[var(--color-attention-text)]' : ''}`}>
      {value}
    </dd>
  </div>
)

export const InventoryUnitSummary = ({ detail, editControl }: InventoryUnitSummaryProps): React.JSX.Element => {
  const vehicleLabel = `${detail.master.make} ${detail.master.model} ${detail.master.variant}`
  const placementLabel = detail.unit.zoneSlot ?? 'Not assigned'
  const lifecycleStatus = formatStatus(detail.unit.inventoryStatus)

  return (
    <article className="min-w-0 border-0 bg-transparent sm:rounded-[14px] sm:border sm:border-[var(--color-stone-900)] sm:bg-white md:col-start-1 md:row-start-1">
      <header className="grid grid-cols-1 gap-2.5 rounded-[13px] border border-[var(--color-stone-900)] bg-white p-3 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-3 sm:rounded-none sm:border-0 sm:border-b sm:p-3 xl:grid-cols-[122px_minmax(0,1fr)] xl:gap-3.5 xl:p-3.5">
        <figure className="m-0 min-w-0">
          <div
            className="grid min-h-[104px] place-content-center justify-items-center rounded-[10px] border border-[#c8d5db] bg-[#edf4f7] text-center text-[#526a76] xl:min-h-28"
            role="img"
            aria-label="Vehicle image pending"
          >
            <Gallery size={28} aria-hidden="true" />
            <span className="mt-2 text-xs font-bold">Vehicle image</span>
            <small className="mt-1 text-[11px] text-[#71858f]">Asset pending</small>
          </div>
        </figure>

        <div className="min-w-0">
          <div className="flex min-h-11 items-center justify-between gap-3">
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-info-text)]">Inventory Unit</p>
            {editControl}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="m-0 text-2xl font-bold leading-[1.15] tracking-[-0.03em]">{vehicleLabel}</h1>
            <StatusBadge
              tone={detail.isAging
                ? 'attention'
                : detail.unit.inventoryStatus === 'reserved'
                  ? 'pending'
                  : detail.unit.inventoryStatus === 'sold'
                    ? 'neutral'
                    : 'ready'}
            >
              {detail.unit.inventoryStatus === 'available'
                ? `${detail.daysInStock} days · ${detail.isAging ? 'Aging' : 'Current'}`
                : lifecycleStatus}
            </StatusBadge>
          </div>
          <dl className="mt-2 grid grid-cols-[90px_minmax(0,1fr)] gap-2 sm:flex sm:flex-wrap sm:gap-x-4">
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase text-[#617681]">Stock no.</dt>
              <dd className="mt-0.5 break-all font-mono text-[13px] font-semibold text-[#315164]">{detail.unit.stockNumber}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase text-[#617681]">VIN</dt>
              <dd className="mt-0.5 break-all font-mono text-[13px] font-semibold text-[#315164]">{detail.unit.vin}</dd>
            </div>
          </dl>
          <p className="mb-0 mt-2 hidden max-w-[560px] text-[13px] leading-[1.45] text-[#617681] xl:block">
            {detail.unit.zoneSlot
              ? 'VIN-specific stock connected to one reusable Vehicle Master and current Slot.'
              : 'VIN-specific stock connected to one reusable Vehicle Master.'}
          </p>
        </div>

      </header>

      <section
        aria-label="Vehicle Master"
        className="mx-0 my-2 flex min-w-0 flex-col gap-1 rounded-xl bg-[#edf4f7] p-3 sm:m-2.5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 lg:m-3"
      >
        <div className="min-w-0">
          <span className="block text-[11px] font-bold uppercase text-[#617681]">Vehicle Master</span>
          <strong className="mt-1 block break-words text-sm">{detail.master.id} · {detail.master.model} {detail.master.variant}</strong>
        </div>
        <small className="text-xs leading-[1.35] text-[#617681] sm:text-right">{detail.master.type} · reusable definition</small>
      </section>

      <dl className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-[11px] border border-[var(--color-stone-900)] bg-[var(--color-stone-900)] sm:m-2.5 sm:mt-0 lg:m-3 lg:mt-0">
        <Fact attention={detail.isAging} label="Inventory age" value={`${detail.daysInStock} days`} icon={<Clock size={17} aria-hidden="true" />} />
        <Fact label="Arrival date" value={formatDate(detail.unit.arrivalDate)} icon={<Calendar size={17} aria-hidden="true" />} />
        <Fact label="Zone / Slot" value={placementLabel} icon={<Location size={17} aria-hidden="true" />} />
        <Fact label="Status" value={lifecycleStatus} icon={<TickCircle size={17} aria-hidden="true" />} />
      </dl>
    </article>
  )
}
