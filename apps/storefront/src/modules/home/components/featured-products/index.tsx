import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const types = ["new", "sale"]

  return (
    <>
      <div className="h2 uppercase text-white content-container">
        Unlock exclusive offers
      </div>

      <ul>
        {types.map((type) => (
          <li key={type}>
            <ProductRail types={[type]} region={region} />
          </li>
        ))}
      </ul>
    </>
  )
}
