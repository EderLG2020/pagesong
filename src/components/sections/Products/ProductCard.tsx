import { revealDelay, useReveal } from '../../../hooks/useReveal'
import { formatPrice } from '../../../lib/format'
import type { Product } from '../../../types'

type Props = { product: Product; index: number }

export function ProductCard({ product, index }: Props) {
  const ref = useReveal<HTMLElement>()
  const discount = Math.round(product.discountPercentage)
  const rating = product.rating.toFixed(1)

  return (
    <article ref={ref} className="product reveal" style={revealDelay(index)}>
      <div className="product__media">
        {discount > 0 && <span className="product__discount">-{discount}%</span>}
        <img src={product.image} alt={product.name} width={300} height={300} loading="lazy" decoding="async" />
      </div>
      <span className="product__brand">{product.brand}</span>
      <h3 className="product__name">{product.name}</h3>
      <p className="product__description">{product.description}</p>
      <div className="product__footer">
        <span className="product__price">{formatPrice(product.price)}</span>
        <span className="product__rating" aria-label={`Calificación ${rating} de 5`}>
          ★ {rating}
        </span>
      </div>
    </article>
  )
}
