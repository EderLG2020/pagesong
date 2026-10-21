import { revealDelay, useReveal } from '../../../hooks/useReveal'
import { formatPrice } from '../../../lib/format'
import type { Plan } from '../../../types'

type Props = { plan: Plan; index: number }

export function PlanCard({ plan, index }: Props) {
  const ref = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      className={`plan reveal ${plan.highlighted ? 'plan--highlighted' : ''}`}
      style={revealDelay(index, 100)}
    >
      {plan.highlighted && <span className="plan__badge">Más popular</span>}
      <h3 className="plan__name">{plan.name}</h3>
      <p className="plan__description">{plan.description}</p>
      <p className="plan__price">
        {plan.price === 0 ? 'Gratis' : formatPrice(plan.price)}
        <span>/ {plan.period}</span>
      </p>
      <ul className="plan__features">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <a href="#" className={`btn ${plan.highlighted ? 'btn--light' : ''}`}>{plan.cta}</a>
    </article>
  )
}
