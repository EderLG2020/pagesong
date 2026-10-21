import { useAsync } from '../../../hooks/useAsync'
import { getPlans } from '../../../services/data'
import { AsyncContent } from '../../ui/AsyncContent'
import { Section } from '../../ui/Section'
import { PlanCard } from './PlanCard'
import './Pricing.css'

export function Pricing() {
  const plans = useAsync(getPlans)

  return (
    <Section
      id="precios"
      eyebrow="Precios"
      title="Elige tu membresía"
      lead="Ahorra en cada compra y disfruta beneficios exclusivos."
    >
      <AsyncContent state={plans}>
        {(data) => (
          <div className="plans">
            {data.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        )}
      </AsyncContent>
    </Section>
  )
}
