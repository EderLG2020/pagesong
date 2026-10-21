const env = import.meta.env

export const config = {
  heroImage: env.VITE_HERO_IMAGE?.trim() || null,
  brandName: env.VITE_BRAND_NAME?.trim() || 'Pagesong',
  phone: env.VITE_CONTACT_PHONE?.trim() || '+01 800 25923857',
  address: env.VITE_CONTACT_ADDRESS?.trim() || '100 Main St, New York NY 10002, USA',
  productsSource: env.VITE_PRODUCTS_SOURCE?.trim() === 'json' ? 'json' : 'api',
  cacheTtlMs: (Number(env.VITE_CACHE_TTL_MINUTES) || 30) * 60_000,
} as const
