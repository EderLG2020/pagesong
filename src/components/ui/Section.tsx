import type { ReactNode } from 'react'
import type { SectionId } from '../../config/navigation'
import { useReveal } from '../../hooks/useReveal'
import './Section.css'

type Props = {
  id: SectionId
  eyebrow: string
  title?: ReactNode
  lead?: ReactNode
  alt?: boolean
  children: ReactNode
}

export function Section({ id, eyebrow, title, lead, alt = false, children }: Props) {
  const headerRef = useReveal<HTMLElement>()

  return (
    <section id={id} className={`section ${alt ? 'section--alt' : ''}`}>
      <header ref={headerRef} className="section__header reveal">
        <span className="section__eyebrow">{eyebrow}</span>
        {title && <h2 className="section__title">{title}</h2>}
        {lead && <p className="section__lead">{lead}</p>}
      </header>
      {children}
    </section>
  )
}
