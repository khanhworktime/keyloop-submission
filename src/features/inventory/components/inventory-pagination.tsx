import type { PaginationMeta } from '../../../domain/inventory-types'
import { Button, SelectField } from '../../../components/ui'

interface InventoryPaginationProps {
  meta: PaginationMeta
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export const InventoryPagination = ({
  meta,
  onPageChange,
  onPageSizeChange,
}: InventoryPaginationProps): React.JSX.Element => {
  const firstResult = meta.total === 0 ? 0 : (meta.page - 1) * meta.pageSize + 1
  const lastResult = Math.min(meta.page * meta.pageSize, meta.total)

  return (
    <footer className="flex flex-col gap-3 rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] bg-white p-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Inventory pagination">
      <p className="m-0 text-sm text-[var(--color-carbon-700)] tabular-nums">
        <strong className="text-[var(--color-carbon-900)]">{firstResult}–{lastResult}</strong> of {meta.total} results
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <SelectField
          className="flex min-h-11 items-center gap-2"
          label="Per page"
          labelClassName="text-sm font-semibold text-[var(--color-carbon-700)]"
          triggerClassName="!min-h-11 !w-20"
          value={String(meta.pageSize)}
          options={[10, 25, 50].map((pageSize) => ({ label: String(pageSize), value: String(pageSize) }))}
          onValueChange={(pageSize) => pageSize && onPageSizeChange(Number(pageSize))}
        />
        <span className="min-w-20 text-center text-sm font-semibold tabular-nums">
          {meta.page} / {meta.totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
          aria-label="Previous inventory page"
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          disabled={meta.page >= meta.totalPages}
          onClick={() => onPageChange(meta.page + 1)}
          aria-label="Next inventory page"
        >
          Next
        </Button>
      </div>
    </footer>
  )
}
