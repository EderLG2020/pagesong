import type { ReactNode } from 'react'
import type { AsyncState } from '../../hooks/useAsync'

type Props<T> = {
  state: AsyncState<T>
  children: (data: T) => ReactNode
}

/** Renders loading / error feedback, or the children once data is ready. */
export function AsyncContent<T>({ state, children }: Props<T>) {
  switch (state.status) {
    case 'loading':
      return <p className="section-status" aria-busy="true">Cargando…</p>
    case 'error':
      return (
        <p className="section-status section-status--error" role="alert">
          No pudimos cargar esta sección. {state.error.message}
        </p>
      )
    case 'success':
      return <>{children(state.data)}</>
  }
}
