import { useEffect, useRef, type CSSProperties } from 'react'

// One observer for the whole page; each element is dropped once revealed.
let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  return observer
}

/** Attach the ref to an element with the `reveal` class to fade it in on scroll. */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = getObserver()
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  return ref
}

/** Staggers siblings: pass the item index. */
export const revealDelay = (index: number, stepMs = 80): CSSProperties =>
  ({ '--reveal-delay': `${index * stepMs}ms` }) as CSSProperties
