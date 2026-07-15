import { Link } from "@tanstack/react-router";
import { Activity, Box, Element3 } from "iconsax-reactjs";

import { GlobalInventorySearch } from "./global-inventory-search";

const navigationItems = [
  { label: "Overview", to: "/", icon: Element3, exact: true },
  { label: "Inventory", to: "/inventory", icon: Box, exact: false },
  { label: "Activity", to: "/activity", icon: Activity, exact: true },
] as const;

export const PrimaryNavigation = (): React.JSX.Element => (
  <nav className="primary-navigation" aria-label="Primary navigation">
    <ul className="primary-navigation__list">
      <li className="primary-navigation__search-item">
        <GlobalInventorySearch variant="navigation" />
      </li>
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.to}>
            <Link
              className="primary-navigation__link"
              to={item.to}
              activeOptions={{ exact: item.exact }}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="primary-navigation__icon"
                    size={24}
                    variant={isActive ? "Bold" : "Linear"}
                    aria-hidden="true"
                  />
                  <span className="primary-navigation__label">
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);
