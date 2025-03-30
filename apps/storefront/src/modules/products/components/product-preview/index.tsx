import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { VariantPrice } from "types/global"

export default function ProductPreview({
  product,
  isFeatured,
  cheapestPrice,
  headers,
  customer,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  headers: Record<string, string>
  region: HttpTypes.StoreRegion
  cheapestPrice: VariantPrice | null
  customer?: HttpTypes.StoreCustomer | null
}) {
  const variantId = product.variants && product.variants[0]?.id
  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          customer={customer}
          headers={headers}
          variantId={variantId}
          thumbnail={product.thumbnail}
          created_at={product.created_at}
          cheapestPrice={cheapestPrice}
          images={product.images}
          size="square"
          isFeatured={isFeatured}
        />
        <div className="flex-col txt-compact-medium mt-4 justify-between">
          <div className="flex text-[var(--white-body)] details items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <div
            className="name-tag text-[--white-body]"
            data-testid="product-title"
          >
            {product.title}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
