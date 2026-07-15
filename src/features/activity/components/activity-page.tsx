import { useEffect, useState } from "react";

import { Button, ErrorState, LoadingState } from "../../../components/ui";
import { useActivityQuery } from "../activity-queries";
import {
  countAdvancedFilters,
  toActivityQueryFilters,
  withoutFilter,
  type ActivityUrlFilters,
} from "../activity-filter-state";
import { ActivityFeed } from "./activity-feed";
import { ActivityFilterDrawer } from "./activity-filter-drawer";
import { activityEventLabels } from "./activity-formatters";
import { ActivityUnitCombobox } from "./activity-unit-combobox";

interface ActivityPageProps {
  filters: ActivityUrlFilters;
  onFiltersChange: (filters: ActivityUrlFilters, replace?: boolean) => void;
}

export const ActivityPage = ({
  filters,
  onFiltersChange,
}: ActivityPageProps): React.JSX.Element => (
  <ActivityPageContent
    key={(filters.units ?? []).join("\u0000")}
    filters={filters}
    onFiltersChange={onFiltersChange}
  />
);

const ActivityPageContent = ({
  filters,
  onFiltersChange,
}: ActivityPageProps): React.JSX.Element => {
  const query = useActivityQuery(toActivityQueryFilters(filters));
  const filtered = Boolean(
    filters.units?.length || filters.search || countAdvancedFilters(filters),
  );
  const [draftUnits, setDraftUnits] = useState(filters.units ?? []);
  const appliedUnitsKey = (filters.units ?? []).join("\u0000");
  const draftUnitsKey = draftUnits.join("\u0000");

  useEffect(() => {
    if (!query.data) return;

    const canonicalUnits = filters.units?.map(
      (unit) =>
        query.data.facets.units.find(
          ({ stockNumber }) =>
            stockNumber.toLocaleLowerCase() === unit.toLocaleLowerCase(),
        )?.stockNumber ?? unit,
    );
    const canonicalPage =
      query.data.meta.page > 1 ? query.data.meta.page : undefined;

    if (
      canonicalUnits?.join() !== filters.units?.join() ||
      canonicalPage !== filters.page
    ) {
      onFiltersChange(
        { ...filters, units: canonicalUnits, page: canonicalPage },
        true,
      );
    }
  }, [filters, onFiltersChange, query.data]);

  return (
    <div className="activity-page">
      <header className="max-w-3xl">
        <p className="m-0 text-xs font-bold tracking-[0.14em] text-[var(--color-carbon-700)] uppercase">
          Activity
        </p>
        <h1 className="m-0 mt-1 text-[26px] leading-[1.08] font-bold tracking-[-0.045em] md:text-[30px]">
          Operational activity
        </h1>
        <p className="m-0 mt-1.5 max-w-2xl text-xs leading-relaxed text-[var(--color-carbon-700)] md:text-[13px]">
          Review manager actions, location changes, and system events across all
          inventory.
        </p>
      </header>

      {query.isLoading ? (
        <LoadingState label="Loading global activity" />
      ) : null}
      {query.isError ? (
        <ErrorState
          title="Activity unavailable"
          message={query.error.message}
          onRetry={() => void query.refetch()}
        />
      ) : null}
      {query.data ? (
        <section className="activity-layout" aria-label="Operational activity">
          <aside
            className="activity-filter-panel"
            aria-label="Activity filters"
          >
            <div className="activity-filter-panel__desktop">
              <h2>Filters</h2>
              <ActivityUnitCombobox
                id="activity-unit"
                units={query.data.facets.units}
                value={draftUnits}
                onChange={setDraftUnits}
              />
              <Button
                className="w-full"
                disabled={draftUnitsKey === appliedUnitsKey}
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    units: draftUnits.length ? draftUnits : undefined,
                    page: undefined,
                  })
                }
              >
                Apply filter
              </Button>
            </div>

            <div
              className="activity-mobile-filters"
              aria-label="Current activity filters"
            >
              <button
                type="button"
                aria-pressed={Boolean(filters.units?.length)}
                onClick={() =>
                  filters.units?.length &&
                  onFiltersChange(withoutFilter(filters, "units"))
                }
              >
                {filters.units?.length
                  ? `${filters.units.length} inventory units`
                  : "All inventory"}
              </button>
              <button
                type="button"
                aria-pressed={Boolean(filters.eventType)}
                onClick={() =>
                  filters.eventType &&
                  onFiltersChange(withoutFilter(filters, "eventType"))
                }
              >
                {filters.eventType
                  ? activityEventLabels[filters.eventType]
                  : "All activity"}
              </button>
            </div>

            <ActivityFilterDrawer
              facets={query.data.facets}
              filters={filters}
              onApply={onFiltersChange}
            />
            {/* {filtered ? <ActivityAppliedFilters filters={filters} onChange={onFiltersChange} /> : null} */}
          </aside>

          <div className="activity-feed-stack">
            <ActivityFeed
              data={query.data}
              filtered={filtered}
              unitFilters={filters.units}
              onReset={() => onFiltersChange({})}
            />
            {query.data.meta.totalPages > 1 ? (
              <nav
                className="activity-pagination"
                aria-label="Activity pagination"
              >
                <Button
                  variant="secondary"
                  disabled={query.data.meta.page <= 1}
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      page: Math.max(1, query.data!.meta.page - 1),
                    })
                  }
                >
                  Previous
                </Button>
                <span>
                  Page {query.data.meta.page} of {query.data.meta.totalPages}
                </span>
                <Button
                  variant="secondary"
                  disabled={query.data.meta.page >= query.data.meta.totalPages}
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      page: query.data!.meta.page + 1,
                    })
                  }
                >
                  Next
                </Button>
              </nav>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
};
