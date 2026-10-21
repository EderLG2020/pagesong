import { useAsync } from '../../../hooks/useAsync'
import { revealDelay, useReveal } from '../../../hooks/useReveal'
import { getAbout } from '../../../services/data'
import type { About as AboutData } from '../../../types'
import { AsyncContent } from '../../ui/AsyncContent'
import { Odometer } from '../../ui/Odometer'
import { Section } from '../../ui/Section'
import './About.css'

export function About() {
  const about = useAsync(getAbout)

  return (
    <Section id="nosotros" eyebrow="Nosotros" title={about.status === 'success' ? about.data.title : undefined}>
      <AsyncContent state={about}>{(data) => <AboutContent {...data} />}</AsyncContent>
    </Section>
  )
}

function AboutContent({ paragraphs, stats, values }: AboutData) {
  const introRef = useReveal<HTMLDivElement>()

  return (
    <>
      <div ref={introRef} className="about reveal">
        <div className="about__text">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="about__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <dt>{stat.label}</dt>
              <dd>
                <Odometer value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="values">
        {values.map((value, index) => (
          <ValueCard key={value.title} {...value} index={index} />
        ))}
      </div>
    </>
  )
}

function ValueCard({ title, text, index }: AboutData['values'][number] & { index: number }) {
  const ref = useReveal<HTMLElement>()

  return (
    <article ref={ref} className="value reveal" style={revealDelay(index, 100)}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}
