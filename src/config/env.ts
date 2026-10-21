// Defaults for every variable live in vite.config.ts (ENV_DEFAULTS).
const env = import.meta.env

export const config = {
  siteUrl: env.VITE_SITE_URL,
  heroImage: env.VITE_HERO_IMAGE.trim() || null,
  brandName: env.VITE_BRAND_NAME,
  phone: env.VITE_CONTACT_PHONE,
  address: env.VITE_CONTACT_ADDRESS,
  productsSource: env.VITE_PRODUCTS_SOURCE === 'json' ? 'json' : 'api',
  cacheTtlMs: (Number(env.VITE_CACHE_TTL_MINUTES) || 30) * 60_000,
} as const
