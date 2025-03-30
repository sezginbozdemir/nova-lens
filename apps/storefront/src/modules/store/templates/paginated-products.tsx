import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"

const PRODUCT_LIMIT = 12
type ProductWithPrice = {
  product: HttpTypes.StoreProduct
  cheapestPrice: VariantPrice | null
}
export default function PaginatedProducts({
  page,
  products,
  count,
  region,
  headers,
  wishlist,
  customer,
}: {
  page: number
  region: HttpTypes.StoreRegion
  products: ProductWithPrice[]
  count: number
  headers: Record<string, string>
  wishlist?: boolean
  customer?: HttpTypes.StoreCustomer | null
}) {
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-[2rem] gap-y-8 "
        data-testid="products-list"
      >
        {products?.map(({ product, cheapestPrice }) => {
          return (
            <li key={product.id}>
              <ProductPreview
                customer={customer}
                headers={headers}
                product={product}
                cheapestPrice={cheapestPrice}
                region={region}
              />
            </li>
          )
        })}
      </ul>
      {!wishlist && totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          count={count}
          productLimit={PRODUCT_LIMIT}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
