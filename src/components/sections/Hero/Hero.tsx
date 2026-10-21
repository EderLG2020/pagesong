import type { CSSProperties } from 'react'
import { config } from '../../../config/env'
import { telHref } from '../../../lib/format'
import { Topbar } from '../../layout/Topbar'
import { HeroImage } from './HeroImage'
import './Hero.css'

const enterDelay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

type Props = { active: string }

export function Hero({ active }: Props) {
  return (
    <section id="inicio" className="hero-section">
      <Topbar active={active} />

      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title enter" style={enterDelay(100)}>
            Ritmo y sonido
            <br />
            por todo el mundo
          </h1>
          <p className="hero__text enter" style={enterDelay(220)}>
            Ofrecemos mejores soluciones para tus clientes.
            <br />
            El mejor diseño para tu negocio y para tu vida está aquí.
            <br />
            Ven a conocerlo y enamórate.
          </p>
          {/* wrapper keeps the entrance transform off the button's hover transform */}
          <div className="enter" style={enterDelay(340)}>
            <a href="#productos" className="btn">Ver más</a>
          </div>
        </div>

        <div className="hero-image enter enter--scale" style={enterDelay(150)}>
          <HeroImage src={config.heroImage} alt="Audífonos inalámbricos negros" />
        </div>
      </div>

      <footer className="contact enter" style={enterDelay(460)}>
        <a className="contact__phone" href={telHref(config.phone)}>
          {config.phone}
        </a>
        <span className="contact__address">{config.address}</span>
      </footer>
    </section>
  )
}
