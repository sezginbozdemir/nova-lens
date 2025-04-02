"use client"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import ProductPrice from "@modules/products/components/product-price"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  variant: HttpTypes.StoreProductVariant | undefined
}

const ProductInfo = ({ product, variant }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 mx-auto">
        <Heading
          level="h2"
          className="h5 text-white uppercase"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
        <ProductPrice product={product} variant={variant} />
      </div>
    </div>
  )
}

export default ProductInfo
