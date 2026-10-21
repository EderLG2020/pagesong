import { useState } from 'react'

type Props = { src: string | null; alt: string }

export function HeroImage({ src, alt }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="hero-image__placeholder" role="img" aria-label="Imagen pendiente">
        <span>Tu foto aquí</span>
        <small>Define VITE_HERO_IMAGE en .env</small>
      </div>
    )
  }

  return <img className="hero-image__img" src={src} alt={alt} onError={() => setFailed(true)} />
}
