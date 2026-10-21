# Pagesong

Landing page para una tienda de audio: hero con audífonos, membresías, catálogo de productos y sección "Nosotros". Hecha con **React 18 + Vite + TypeScript**, sin librerías de UI.

![Vista previa](public/images/headphones.png)

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

Todas son opcionales y públicas (Vite las incluye en el bundle; no pongas secretos aquí).

| Variable | Por defecto | Descripción |
|---|---|---|
| `VITE_HERO_IMAGE` | — (muestra un placeholder) | Imagen del hero. Ruta en `public/` (`/images/headphones.png`) o URL absoluta. Mejor PNG/WebP con fondo transparente. |
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
