import { Link } from '@tanstack/react-router'
import { Notification } from 'iconsax-reactjs'

import { GlobalInventorySearch } from './global-inventory-search'

export interface ApplicationHeaderProps {
  eyebrow?: string
  title?: string
}

export const ApplicationHeader = ({
  eyebrow = 'Manager workspace · current inventory',
  title = 'Inventory Intelligence',
}: ApplicationHeaderProps): React.JSX.Element => (
  <header className="application-header">
    <span className="application-header__mobile-brand">
      <img
        src="/keyloop-logo-slate-transparent.png"
        alt="Keyloop"
        width="640"
        height="171"
      />
    </span>
    <div className="application-header__title-lockup">
      <span className="application-header__product-mark" aria-hidden="true">IN</span>
      <div className="application-header__identity">
        <p className="application-header__title">{title}</p>
        <p className="application-header__eyebrow">{eyebrow}</p>
      </div>
    </div>
    <div className="application-header__actions">
      <GlobalInventorySearch variant="header" />
      <button className="application-header__icon-button" type="button" aria-label="Notifications">
        <Notification size={21} variant="Linear" aria-hidden="true" />
      </button>
      <Link className="button button--primary application-header__review-link" to="/inventory" search={{ age: 'aging' }}>
        Review aging units
      </Link>
    </div>
  </header>
)
