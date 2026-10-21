import { useState } from 'react'
import { config } from '../../config/env'
import { NAV_ITEMS } from '../../config/navigation'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../ui/Icons'
import './Topbar.css'

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Twitter', href: '#', Icon: TwitterIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
]

type Props = { active: string }

export function Topbar({ active }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="topbar enter">
        <div className="topbar__left">
          <button
            className={`burger ${menuOpen ? 'burger--open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <a href="#inicio" className="brand">{config.brandName}</a>
        </div>

        <nav className="social" aria-label="Redes sociales">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a key={label} href={href} aria-label={label}>
              <Icon />
            </a>
          ))}
        </nav>
      </header>

      {menuOpen && (
        <nav className="mobile-menu" aria-label="Menú principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={item.id === active ? 'is-active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </>
  )
}
