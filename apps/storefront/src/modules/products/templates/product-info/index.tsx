"use client"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import ProductPrice from "@modules/products/components/product-price"
import { useEffect, useMemo, useState } from "react"
import { isEqual } from "lodash"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])
  const optionsAsKeymap = (
    variantOptions: HttpTypes.StoreProductVariant["options"]
  ) => {
    return variantOptions?.reduce(
      (acc: Record<string, string>, varopt: any) => {
        acc[varopt.option_id] = varopt.value
        return acc
      },
      {}
    )
  }
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

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
        <ProductPrice product={product} variant={selectedVariant} />
      </div>
    </div>
  )
}

export default ProductInfo
