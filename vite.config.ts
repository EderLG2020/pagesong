import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Single source of defaults for every VITE_* variable, so both the app code
// and the %VITE_*% placeholders in index.html always get a value.
const ENV_DEFAULTS: Record<string, string> = {
  VITE_SITE_URL: 'https://pagesong.netlify.app',
  VITE_HERO_IMAGE: '/images/headphones.webp',
  VITE_BRAND_NAME: 'Pagesong',
  VITE_CONTACT_PHONE: '+01 800 25923857',
  VITE_CONTACT_ADDRESS: '100 Main St, New York NY 10002, USA',
  VITE_PRODUCTS_SOURCE: 'api',
  VITE_CACHE_TTL_MINUTES: '30',
}

export default defineConfig(({ mode }) => {
  // process.env outranks .env files in Vite, so only fill keys that
  // neither the .env files nor the host environment define.
  const defined = loadEnv(mode, process.cwd(), 'VITE_')
  for (const [key, value] of Object.entries(ENV_DEFAULTS)) {
    if (!defined[key]) process.env[key] = value
  }

  return {
    plugins: [react()],
  }
})
