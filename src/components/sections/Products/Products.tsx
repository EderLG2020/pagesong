import { useAsync } from '../../../hooks/useAsync'
import { getProducts } from '../../../services/data'
import { AsyncContent } from '../../ui/AsyncContent'
import { Section } from '../../ui/Section'
import { ProductCard } from './ProductCard'
import { ProductsJsonLd } from './ProductsJsonLd'
import './Products.css'

export function Products() {
  const products = useAsync(getProducts)

  return (
    <Section
      id="productos"
      eyebrow="Productos"
      title="Sonido para cada momento"
      lead="Audífonos y bocinas seleccionados por nuestro equipo."
      alt
    >
      <AsyncContent state={products}>
        {(data) => (
          <>
            <div className="products">
              {data.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            <ProductsJsonLd products={data} />
          </>
        )}
      </AsyncContent>
    </Section>
  )
}
