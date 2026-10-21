import { useState } from 'react'

// Intrinsic size of the default image; only reserves layout space (CLS).
const WIDTH = 358
const HEIGHT = 370

// React 18 doesn't know `fetchPriority` yet; the lowercase attribute passes through.
const highPriority = { fetchpriority: 'high' } as Record<string, string>

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

  return (
    <img
      className="hero-image__img"
      src={src}
      alt={alt}
      width={WIDTH}
      height={HEIGHT}
      decoding="async"
      {...highPriority}
      onError={() => setFailed(true)}
    />
  )
}
