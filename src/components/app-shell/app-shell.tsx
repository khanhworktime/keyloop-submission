import type { ReactNode } from "react";

import { ApplicationHeader } from "./application-header";
import { PrimaryNavigation } from "./primary-navigation";

export interface AppShellProps {
  children: ReactNode;
  liveMessage?: string;
}

export const AppShell = ({
  children,
  liveMessage = "",
}: AppShellProps): React.JSX.Element => (
  <div className="app-shell">
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>

    <aside className="app-shell__sidebar" aria-label="Application navigation">
      <span className="app-shell__compact-brand">
        <img
          src="/keyloop-mobile-logo.jpeg"
          alt="Keyloop"
          width="400"
          height="400"
        />
      </span>
      <div className="app-shell__brand">
        <img
          className="app-shell__brand-logo"
          src="/keyloop-logo.svg"
          alt="Keyloop"
          width="160"
          height="43"
        />
        <p className="app-shell__brand-note">Keyloop-aligned submission</p>
      </div>
      <PrimaryNavigation />
    </aside>

    <section
      className="app-shell__workspace"
      aria-label="Inventory Intelligence workspace"
    >
      <ApplicationHeader />

      <main id="main-content" className="app-shell__main" tabIndex={-1}>
        <div className="app-shell__content">{children}</div>
      </main>
    </section>

    <div
      className="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {liveMessage}
    </div>
  </div>
);
