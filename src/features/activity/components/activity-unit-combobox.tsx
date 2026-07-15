import { Combobox } from "@base-ui/react/combobox";
import { ArrowDown2, CloseCircle, SearchNormal1 } from "iconsax-reactjs";

import type { ActivityFacets } from "../../../domain/inventory-types";

type ActivityUnitOption = ActivityFacets["units"][number];

interface ActivityUnitComboboxProps {
  id: string;
  label?: string;
  onChange: (stockNumbers: string[]) => void;
  units: ActivityUnitOption[];
  value?: string[];
}

const matchesUnit = (item: ActivityUnitOption, query: string): boolean =>
  `${item.stockNumber} ${item.vin} ${item.label}`
    .toLocaleLowerCase()
    .includes(query.toLocaleLowerCase());

const avatarFallback = (unit: ActivityUnitOption): string => {
  const identity = unit.label.trim().split(/\s+/);
  return (identity[1] ?? identity[0] ?? "IN").slice(0, 2).toLocaleUpperCase();
};

const selectedIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="none"
    className="h-4 w-4 stroke-current stroke-[2]"
  >
    <path
      d="m3.25 8.25 3 3 6.5-7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ActivityUnitCombobox = ({
  id,
  label = "Inventory unit",
  onChange,
  units,
  value,
}: ActivityUnitComboboxProps): React.JSX.Element => {
  const selected = units.filter((unit) => value?.includes(unit.stockNumber));

  return (
    <Combobox.Root
      items={units}
      multiple
      value={selected}
      onValueChange={(selectedUnits) =>
        onChange(selectedUnits.map((unit) => unit.stockNumber))
      }
      isItemEqualToValue={(item, current) => item.id === current.id}
      itemToStringLabel={(item) => `${item.stockNumber} · ${item.label}`}
      itemToStringValue={(item) => item.stockNumber}
      filter={matchesUnit}
    >
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <Combobox.InputGroup className="flex min-h-12 w-full cursor-text items-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-control-boundary)] bg-white px-3 focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-[var(--color-focus)]">
        <SearchNormal1
          size={19}
          className="pointer-events-none shrink-0 text-[var(--color-carbon-700)]"
          aria-hidden="true"
        />
        <Combobox.Input
          id={id}
          placeholder="Search inventory units"
          className="h-11 min-w-0 flex-1 border-0 bg-transparent p-0 text-sm font-normal text-[var(--color-carbon-900)] outline-none placeholder:text-[var(--color-control-boundary)] any-pointer-coarse:text-base"
        />
        <Combobox.Clear
          className="grid h-11 w-8 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[var(--color-carbon-700)] hover:text-[var(--color-carbon-900)]"
          aria-label="Clear inventory units"
        >
          <CloseCircle size={18} aria-hidden="true" />
        </Combobox.Clear>
        <Combobox.Trigger
          className="flex h-11 w-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[var(--color-carbon-700)] hover:text-[var(--color-carbon-900)]"
          aria-label="Open inventory units"
        >
          <ArrowDown2 size={18} aria-hidden="true" />
        </Combobox.Trigger>
      </Combobox.InputGroup>
      {selected.length ? (
        <Combobox.Chips
          className="mt-2 flex min-w-0 flex-wrap items-center gap-1.5"
          aria-label="Selected inventory units"
        >
          {selected.map((unit) => (
            <Combobox.Chip
              key={unit.id}
              className="flex max-w-full items-center gap-1 rounded-full bg-[var(--color-info-surface)] px-2.5 py-1 text-xs font-semibold text-[var(--color-info-text)]"
            >
              <span className="truncate">{unit.stockNumber}</span>
              <Combobox.ChipRemove
                className="grid h-5 w-5 shrink-0 place-items-center border-0 bg-transparent p-0 text-current"
                aria-label={`Remove ${unit.stockNumber}`}
              >
                <CloseCircle size={15} aria-hidden="true" />
              </Combobox.ChipRemove>
            </Combobox.Chip>
          ))}
        </Combobox.Chips>
      ) : null}
      <Combobox.Portal>
        <Combobox.Positioner
          sideOffset={4}
          align="start"
          className="z-[70] outline-none"
        >
          <Combobox.Popup className="max-h-[min(var(--available-height),20rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto overscroll-contain rounded-[var(--radius-control)] border border-[var(--color-stone-900)] bg-white shadow-[var(--shadow-overlay)] transition-[scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <Combobox.Empty className="p-4 text-sm text-[var(--color-carbon-700)]">
              No matching inventory unit.
            </Combobox.Empty>
            <Combobox.List className="m-0 p-0">
              {(unit: ActivityUnitOption) => (
                <Combobox.Item
                  key={unit.id}
                  value={unit}
                  className="group grid min-h-16 cursor-default select-none grid-cols-[40px_minmax(0,1fr)_20px] items-center gap-3 px-3 py-2 outline-none data-[highlighted]:bg-[var(--color-carbon-900)] data-[highlighted]:text-white"
                >
                  <span
                    className="grid h-10 w-10 place-items-center overflow-hidden rounded-[10px] bg-[var(--color-stone-800)] text-xs font-bold text-[var(--color-carbon-700)]"
                    aria-hidden="true"
                  >
                    {avatarFallback(unit)}
                  </span>
                  <span className="min-w-0">
                    <span className="flex min-w-0 items-baseline gap-2 overflow-hidden whitespace-nowrap">
                      <strong className="max-w-[45%] shrink truncate text-sm text-[var(--color-carbon-900)] group-data-[highlighted]:text-white">
                        {unit.stockNumber}
                      </strong>
                      <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-carbon-700)] group-data-[highlighted]:text-white">
                        {unit.label}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-[var(--color-carbon-700)] group-data-[highlighted]:text-white">
                      {unit.vin}
                    </span>
                  </span>
                  <span className="grid h-5 w-5 place-items-center text-[var(--color-info-text)] group-data-[highlighted]:text-white">
                    <Combobox.ItemIndicator>
                      {selectedIcon}
                    </Combobox.ItemIndicator>
                  </span>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
