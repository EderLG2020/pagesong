import { config } from '../../../config/env'
import type { Product } from '../../../types'

type Props = { products: Product[] }

/** schema.org ItemList of products so search engines can show rich results. */
export function ProductsJsonLd({ products }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        brand: { '@type': 'Brand', name: product.brand },
        offers: {
          '@type': 'Offer',
          price: product.price.toFixed(2),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${config.siteUrl}/#productos`,
        },
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      // escape "<" so text from the external API can't close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
