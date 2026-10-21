/// <reference types="vite/client" />

// Always defined: defaults are filled in by vite.config.ts.
interface ImportMetaEnv {
  /** Public site URL without trailing slash; also used in index.html */
  readonly VITE_SITE_URL: string
  readonly VITE_HERO_IMAGE: string
  readonly VITE_BRAND_NAME: string
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_CONTACT_ADDRESS: string
  /** "api" (DummyJSON + local copy) or "json" (local only) */
  readonly VITE_PRODUCTS_SOURCE: string
  /** Minutes the DummyJSON response is kept in localStorage */
  readonly VITE_CACHE_TTL_MINUTES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
