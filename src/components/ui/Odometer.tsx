import type { CSSProperties } from 'react'
import './Odometer.css'

// Two full cycles so each digit visibly spins once before landing.
const STRIP = [...'01234567890123456789']

type Props = { value: string }

/**
 * Rolls each digit of `value` (e.g. "50k", "4.8", "10+") vertically into place
 * once an ancestor gets the `is-visible` class (see useReveal). Non-digits
 * stay static. Pure CSS transforms, no per-frame JS.
 */
export function Odometer({ value }: Props) {
  const chars = [...value]
  let digitIndex = 0

  return (
    <span className="odometer">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="odometer__track">
        {chars.map((char, i) => {
          if (!/\d/.test(char)) {
            return <span key={i} className="odometer__static">{char}</span>
          }
          // rightmost digits spin a bit longer, like a real counter
          const style = {
            '--target': 10 + Number(char),
            '--duration': `${1.4 + digitIndex++ * 0.25}s`,
          } as CSSProperties
          return (
            <span key={i} className="odometer__digit">
              <span className="odometer__strip" style={style}>
                {STRIP.map((d, j) => (
                  <span key={j}>{d}</span>
                ))}
              </span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
