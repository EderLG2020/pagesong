import { NAV_ITEMS } from '../../config/navigation'
import './SideNav.css'

type Props = { active: string }

export function SideNav({ active }: Props) {
  return (
    <nav className="side-nav" aria-label="Secciones">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`side-nav__item ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'location' : undefined}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
