export const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'precios', label: 'Precios' },
  { id: 'productos', label: 'Productos' },
  { id: 'nosotros', label: 'Nosotros' },
] as const

export type SectionId = (typeof NAV_ITEMS)[number]['id']

export const SECTION_IDS: readonly SectionId[] = NAV_ITEMS.map((item) => item.id)
