import { getAuthHeaders } from "@lib/data/cookies"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  region,
  types,
}: {
  region: HttpTypes.StoreRegion
  types: string[]
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      fields: "*variants.calculated_price",
    } as HttpTypes.FindParams,
  })
  if (!pricedProducts) {
    return null
  }
  const productsWithPrices = pricedProducts.map((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    return { product, cheapestPrice }
  })
  const currentDate = new Date()
  const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7))
  const getFilteredProducts = (type: string) => {
    switch (type) {
      case "sale":
        return productsWithPrices
          .filter(({ cheapestPrice }) => cheapestPrice?.price_type === "sale")
          .slice(0, 3)
      case "new":
        return productsWithPrices
          .filter(({ product }) => {
            if (!product.created_at) {
              return false
            }
            const productCreatedDate = new Date(product.created_at)
            return productCreatedDate >= sevenDaysAgo
          })
          .slice(0, 3)
      default:
        return []
    }
  }
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "SALE"
      case "new":
        return "NEW"
      default:
        return type.toUpperCase()
    }
  }
  const filteredProducts = getFilteredProducts(types[0])
  const headers = {
    ...(await getAuthHeaders()),
  }

  return (
    <div className="content-container py-12 small:py-24">
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36">
        {types[0] === "sale" && (
          <li className="flex flex-col gap-[1rem] items-center justify-center text-center">
            <div
              className="h4"
              style={{
                background: "var(--gradient-accent)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {getTypeLabel(types[0])}
            </div>
            <InteractiveLink href={`/store`}>View all</InteractiveLink>
          </li>
        )}
        {filteredProducts.map(({ product, cheapestPrice }) => (
          <li key={product.id}>
            <ProductPreview
              headers={headers}
              product={product}
              region={region}
              cheapestPrice={cheapestPrice}
              isFeatured
            />
          </li>
        ))}
        {types[0] === "new" && (
          <li className="flex flex-col gap-[1rem] items-center justify-center text-center">
            <div
              className="h4"
              style={{
                background: "var(--gradient-accent)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {getTypeLabel(types[0])}
            </div>
            <InteractiveLink href={`/store`}>View all</InteractiveLink>
          </li>
        )}
      </ul>
    </div>
  )
}
