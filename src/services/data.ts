import { config } from '../config/env'
import { cached } from '../lib/cache'
import type { About, Plan, Product } from '../types'

const DUMMYJSON_CATEGORY_URL =
  'https://dummyjson.com/products/category/mobile-accessories?limit=0&select=price,discountPercentage,rating,thumbnail'

type DummyProduct = Pick<Product, 'id' | 'price' | 'discountPercentage' | 'rating'> & {
  thumbnail: string
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${url}`)
  return res.json() as Promise<T>
}

// Local JSON is memory-cached only, so edits show up on the next reload.
const getLocal = <T>(file: string) =>
  cached(`local:${file}`, () => getJson<T>(`${import.meta.env.BASE_URL}data/${file}`))

// The external API is also persisted to localStorage for `cacheTtlMs`.
const getRemoteProducts = () =>
  cached(
    'dummyjson:mobile-accessories',
    () => getJson<{ products: DummyProduct[] }>(DUMMYJSON_CATEGORY_URL).then((r) => r.products),
    { ttl: config.cacheTtlMs },
  )

/**
 * Spanish copy lives in /data/products.json. When the source is "api",
 * live price, discount, rating and image come from DummyJSON; if the API
 * is down (and nothing is cached) we fall back to the local JSON as-is.
 */
async function loadProducts(): Promise<Product[]> {
  const local = await getLocal<Product[]>('products.json')
  if (config.productsSource !== 'api') return local

  try {
    const remote = new Map((await getRemoteProducts()).map((p) => [p.id, p]))
    return local.map((p) => {
      const r = remote.get(p.id)
      return r
        ? { ...p, price: r.price, discountPercentage: r.discountPercentage, rating: r.rating, image: r.thumbnail }
        : p
    })
  } catch (err) {
    console.warn('[products] API no disponible, usando JSON local', err)
    return local
  }
}

export const getProducts = () => cached('products', loadProducts)

export const getPlans = () => getLocal<Plan[]>('plans.json')

export const getAbout = () => getLocal<About>('about.json')
