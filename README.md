# Pagesong

Landing page para una tienda de audio: hero con audífonos, membresías, catálogo de productos y sección "Nosotros". Hecha con **React 18 + Vite + TypeScript**, sin librerías de UI.

**Demo:** https://pagesong.netlify.app

![Vista previa](public/og-image.jpg)

## Características

- **Hero fiel al diseño** con menú lateral vertical que resalta la sección visible.
- **Secciones**: Precios (membresías), Productos y Nosotros, con scroll suave.
- **Datos híbridos**: los productos toman precio, descuento, rating e imagen en vivo de la API gratuita [DummyJSON](https://dummyjson.com); los textos en español vienen de JSON local.
- **Caché**: peticiones deduplicadas en memoria y respuesta de la API guardada en `localStorage` con TTL. Si la API falla se usa la copia guardada o el JSON local.
- **Animaciones ligeras**: solo `opacity`/`transform`, un único `IntersectionObserver`, contador tipo odómetro en las cifras. Todo se desactiva con `prefers-reduced-motion`.
- **Responsive**: menú hamburguesa y productos a 2 columnas en móvil.

## Empezar

Requisitos: Node 18+ (recomendado 22).

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Revisa tipos y genera `dist/` |
| `npm run preview` | Sirve el build de producción en local |

## Variables de entorno

Todas son opcionales y públicas (Vite las incluye en el bundle; no pongas secretos aquí). Los valores por defecto están en `vite.config.ts` (`ENV_DEFAULTS`) y también se usan en `index.html` (`%VITE_*%`).

| Variable | Por defecto | Descripción |
|---|---|---|
| `VITE_SITE_URL` | `https://pagesong.netlify.app` | URL pública, sin `/` final. Se usa en canonical, Open Graph y JSON-LD. |
| `VITE_HERO_IMAGE` | `/images/headphones.webp` | Imagen del hero. Ruta en `public/` o URL absoluta. Mejor WebP con fondo transparente. Si falla, se muestra un placeholder. |
| `VITE_BRAND_NAME` | `Pagesong` | Nombre en la barra superior y el pie. |
| `VITE_CONTACT_PHONE` | `+01 800 25923857` | Teléfono del hero. |
| `VITE_CONTACT_ADDRESS` | `100 Main St, New York…` | Dirección del hero. |
| `VITE_PRODUCTS_SOURCE` | `api` | `api` = DummyJSON + textos locales; `json` = solo `products.json`. |
| `VITE_CACHE_TTL_MINUTES` | `30` | Minutos que se guarda la respuesta de la API en `localStorage`. |

Tras cambiar el `.env`, reinicia `npm run dev`.

## Editar el contenido

El contenido vive en `public/data/` y se puede editar sin tocar código:

- `products.json` — nombre, marca y descripción en español. El `id` debe coincidir con el de DummyJSON (categoría `mobile-accessories`) para recibir datos en vivo.
- `plans.json` — membresías de la sección Precios. `"highlighted": true` marca el plan destacado.
- `about.json` — historia, cifras (se animan solas: `"50k"`, `"4.8"`, `"10+"`…) y valores.

Las imágenes van en `public/images/`.

## SEO y rendimiento

- **Meta etiquetas**: título descriptivo, description, canonical y `theme-color`.
- **Redes sociales**: Open Graph y Twitter Card con `public/og-image.jpg` (1200×630).
- **Datos estructurados (JSON-LD)**: `Organization` en `index.html` e `ItemList` de `Product` generado con los productos cargados.
- **`robots.txt` y `sitemap.xml`** en `public/`. Si cambias de dominio, actualiza también estos dos archivos.
- **LCP**: la imagen del hero se precarga con `fetchpriority="high"`, es WebP (~17 KB) y su animación de entrada no parte de opacidad 0.
- **Fuentes propias**: Roboto se sirve desde el sitio con `@fontsource/roboto` (sin Google Fonts bloqueando el render).
- **CLS**: todas las imágenes declaran `width`/`height`.
- **Contraste**: textos secundarios ≥ 4.5:1 (WCAG AA).

## Estructura

```
src/
├── config/        env.ts (variables) · navigation.ts (secciones del menú)
├── lib/           cache.ts · format.ts
├── services/      data.ts (API + JSON)
├── hooks/         useAsync · useActiveSection · useReveal
├── styles/        global.css · motion.css
└── components/
    ├── ui/        Section · AsyncContent · Odometer · Icons
    ├── layout/    Topbar · SideNav · SiteFooter
    └── sections/  Hero · Pricing · Products · About
```

Cada componente tiene su CSS junto al `.tsx`.

## Despliegue

Desplegado en **Netlify**. `netlify.toml` define el build (`npm run build` → `dist/`), las variables `VITE_*` y cabeceras de caché:

- `/assets/*` — 1 año, `immutable` (archivos con hash).
- `/images/*` — 7 días.
- `/data/*` — siempre revalida, para que los cambios de JSON se vean al desplegar.

Cada push a `main` vuelve a desplegar si el sitio está conectado al repositorio.
