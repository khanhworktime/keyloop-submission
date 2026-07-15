import { useState, type FormEvent } from 'react'
import { SearchNormal1 } from 'iconsax-reactjs'

import type { InventoryFacets } from '../../../domain/inventory-types'
import { Button, SelectField, type SelectFieldOption } from '../../../components/ui'
import {
  type InventorySearch,
  updateInventorySearch,
} from '../inventory-filter-state'

interface InventoryFiltersProps {
  facets?: InventoryFacets
  onChange: (search: InventorySearch) => void
  search: InventorySearch
}

const ageOptions = [
  { label: 'All units', value: undefined },
  { label: 'Aging inventory', value: 'aging' },
  { label: 'Not aging', value: 'not-aging' },
] as const

export const InventoryFilters = ({
  facets,
  onChange,
  search,
}: InventoryFiltersProps): React.JSX.Element => {
  const [searchDraft, setSearchDraft] = useState(search.search ?? '')
  const showAgeCounts = !search.make && !search.model && !search.search
  const makeOptions: SelectFieldOption[] = (facets?.makes ?? []).map((make) => ({ label: make, value: make }))
  const modelOptions: SelectFieldOption[] = (facets?.models ?? []).map((model) => ({ label: model, value: model }))

  if (search.make && !makeOptions.some((option) => option.value === search.make)) {
    makeOptions.unshift({ label: search.make, value: search.make })
  }
  if (search.model && !modelOptions.some((option) => option.value === search.model)) {
    modelOptions.unshift({ label: search.model, value: search.model })
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onChange(updateInventorySearch(search, { search: searchDraft || undefined }))
  }

  const resetFilters = (): void => {
    setSearchDraft('')
    onChange({})
  }

  return (
    <section className="rounded-[var(--radius-widget)] border border-[var(--color-stone-900)] bg-white p-3" aria-label="Inventory filters">
      <form className="grid grid-cols-2 gap-2.5 md:grid-cols-[1fr_1fr_auto] lg:grid-cols-[minmax(15rem,1.4fr)_1fr_1fr_auto]" role="search" onSubmit={submitSearch}>
        <label className="col-span-2 grid gap-1 text-xs font-semibold text-[var(--color-carbon-700)] md:col-span-3 lg:col-span-1">
          Search inventory
          <span className="flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-control-boundary)] bg-white px-3 text-[var(--color-carbon-700)]">
            <SearchNormal1 size={20} aria-hidden="true" />
            <input
              className="min-h-10 min-w-0 flex-1 border-0 bg-transparent text-sm text-[var(--color-carbon-900)] outline-none"
              name="inventory-search"
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              placeholder="Unit name, Stock No., VIN or Vehicle Master"
              maxLength={100}
            />
          </span>
        </label>

        <SelectField
          className="min-w-0"
          label="Make"
          value={search.make ?? null}
          emptyOptionLabel="All makes"
          options={makeOptions}
          onValueChange={(make) => onChange(updateInventorySearch(search, { make: make ?? undefined }))}
        />

        <SelectField
          className="min-w-0"
          label="Model"
          value={search.model ?? null}
          emptyOptionLabel="All models"
          options={modelOptions}
          onValueChange={(model) => onChange(updateInventorySearch(search, { model: model ?? undefined }))}
        />

        <div className="col-span-2 flex items-end gap-2 md:col-span-1">
          <Button className="min-w-24 flex-1 lg:flex-none" type="submit">Search</Button>
          <Button className="min-w-20 flex-1 lg:flex-none" variant="quiet" onClick={resetFilters}>Reset</Button>
        </div>
      </form>

      <fieldset className="mt-3 border-0 p-0">
        <legend className="mb-1.5 text-xs font-semibold text-[var(--color-carbon-700)]">Inventory age</legend>
        <div className="flex flex-wrap gap-2">
          {ageOptions.map((option) => {
            const selected = search.age === option.value || (!search.age && option.value === undefined)
            const count = showAgeCounts
              ? option.value === 'aging'
                ? facets?.ages.aging
                : option.value === 'not-aging'
                  ? facets?.ages.notAging
                  : facets?.ages.all
              : undefined
            return (
              <button
                key={option.label}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${selected ? 'border-[var(--color-info-border)] bg-[var(--color-info-surface)] text-[var(--color-info-text)]' : 'border-[var(--color-stone-900)] bg-white text-[var(--color-carbon-700)] hover:border-[var(--color-control-boundary)]'}`}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(updateInventorySearch(search, { age: option.value }))}
              >
                {option.label}{count === undefined ? '' : ` · ${count}`}
              </button>
            )
          })}
        </div>
      </fieldset>
    </section>
  )
}
