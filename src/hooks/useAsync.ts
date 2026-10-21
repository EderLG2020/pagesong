import { useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T }

/**
 * `load` must be stable (module-level function or memoized). Requests are
 * shared through the cache, so on unmount we ignore the result instead of
 * aborting a fetch other components may be waiting on.
 */
export function useAsync<T>(load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })

  useEffect(() => {
    let active = true
    load()
      .then((data) => active && setState({ status: 'success', data }))
      .catch((error: Error) => active && setState({ status: 'error', error }))
    return () => {
      active = false
    }
  }, [load])

  return state
}
