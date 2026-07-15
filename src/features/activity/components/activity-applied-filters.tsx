import { Button } from "../../../components/ui";
import {
  withoutFilter,
  type ActivityUrlFilters,
} from "../activity-filter-state";
import { activityEventLabels } from "./activity-formatters";

interface ActivityAppliedFiltersProps {
  filters: ActivityUrlFilters;
  onChange: (filters: ActivityUrlFilters) => void;
}

const chipClass =
  "min-h-11 rounded-full border border-[var(--color-info-border)] bg-[var(--color-info-surface)] px-3 text-sm font-semibold";

export const ActivityAppliedFilters = ({
  filters,
  onChange,
}: ActivityAppliedFiltersProps): React.JSX.Element => {
  const removeDates = (): void =>
    onChange({ ...filters, from: undefined, to: undefined, page: undefined });

  return (
    <div className="activity-applied-filters" aria-label="Applied filters">
      {filters.units?.map((unit) => (
        <button
          key={unit}
          type="button"
          className={chipClass}
          onClick={() => {
            const units = filters.units?.filter((item) => item !== unit);
            onChange({
              ...filters,
              units: units?.length ? units : undefined,
              page: undefined,
            });
          }}
        >
          {unit} ×
        </button>
      ))}
      {filters.search ? (
        <button
          type="button"
          className={chipClass}
          onClick={() => onChange(withoutFilter(filters, "search"))}
        >
          Search: {filters.search} ×
        </button>
      ) : null}
      {filters.eventType ? (
        <button
          type="button"
          className={chipClass}
          onClick={() => onChange(withoutFilter(filters, "eventType"))}
        >
          Event: {activityEventLabels[filters.eventType]} ×
        </button>
      ) : null}
      {filters.actor ? (
        <button
          type="button"
          className={chipClass}
          onClick={() => onChange(withoutFilter(filters, "actor"))}
        >
          Actor: {filters.actor} ×
        </button>
      ) : null}
      {filters.from || filters.to ? (
        <button type="button" className={chipClass} onClick={removeDates}>
          Date: {filters.from ?? "Any"} – {filters.to ?? "Today"} ×
        </button>
      ) : null}
      <Button variant="quiet" onClick={() => onChange({})}>
        Reset all
      </Button>
    </div>
  );
};
