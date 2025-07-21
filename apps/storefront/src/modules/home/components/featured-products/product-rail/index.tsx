import { getAuthHeaders } from "@lib/data/cookies"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  region,
  type,
}: {
  region: HttpTypes.StoreRegion
  type: string
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 9999,
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

  const filteredProducts = getFilteredProducts(type)
  const headers = {
    ...(await getAuthHeaders()),
  }

  return (
    <div className="content-container">
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-24 small:gap-y-36">
        {type === "sale" && (
          <li className="flex flex-col gap-[1rem] items-center justify-center text-center">
            <div
              className="h4 uppercase"
              style={{
                background: "var(--gradient-accent)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {type}
            </div>
            <div className="z-[9999]">
              <InteractiveLink href={`/store`}>View all</InteractiveLink>
            </div>
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
        {type === "new" && (
          <li className="flex flex-col gap-[1rem] items-center justify-center text-center">
            <div
              className="h4 uppercase"
              style={{
                background: "var(--gradient-accent)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {type}
            </div>
            <div className="z-[9999]">
              <InteractiveLink href={`/store`}>View all</InteractiveLink>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
