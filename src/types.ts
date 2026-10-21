export type Product = {
  id: number
  name: string
  brand: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  image: string
}

export type Plan = {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export type About = {
  title: string
  paragraphs: string[]
  stats: { value: string; label: string }[]
  values: { title: string; text: string }[]
}
