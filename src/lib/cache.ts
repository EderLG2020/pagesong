type StoredEntry<T> = { value: T; expires: number }

const STORAGE_PREFIX = 'pagesong:cache:'
const inFlight = new Map<string, Promise<unknown>>()

// Storage can throw (private mode, quota, blocked cookies): treat as a miss.
function readStored<T>(key: string): StoredEntry<T> | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    return raw ? (JSON.parse(raw) as StoredEntry<T>) : null
  } catch {
    return null
  }
}

function writeStored<T>(key: string, entry: StoredEntry<T>) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry))
  } catch {
    /* ignore */
  }
}

type Options = {
  /** Persist to localStorage for this many ms. Omit for memory-only (per page load). */
  ttl?: number
}

/**
 * Memoizes `load` by key: concurrent and repeated calls share one promise.
 * With `ttl`, the value also survives reloads; if a refresh fails, a stale
 * stored value is served instead of the error.
 */
export function cached<T>(key: string, load: () => Promise<T>, { ttl }: Options = {}): Promise<T> {
  const existing = inFlight.get(key)
  if (existing) return existing as Promise<T>

  const stored = ttl ? readStored<T>(key) : null
  const promise =
    stored && stored.expires > Date.now()
      ? Promise.resolve(stored.value)
      : load()
          .then((value) => {
            if (ttl) writeStored(key, { value, expires: Date.now() + ttl })
            return value
          })
          .catch((err: unknown) => {
            if (stored) return stored.value
            inFlight.delete(key) // allow a retry on next call
            throw err
          })

  inFlight.set(key, promise)
  return promise
}
