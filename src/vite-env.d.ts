/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HERO_IMAGE?: string
  readonly VITE_BRAND_NAME?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_CONTACT_ADDRESS?: string
  /** "api" (DummyJSON + local copy, default) or "json" (local only) */
  readonly VITE_PRODUCTS_SOURCE?: string
  /** Minutes the DummyJSON response is kept in localStorage (default 30) */
  readonly VITE_CACHE_TTL_MINUTES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
