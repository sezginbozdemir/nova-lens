"use client"
import { HttpTypes } from "@medusajs/types"
import ProductInfo from "@modules/products/templates/product-info"
import ProductTabs from "../product-tabs"
import ProductActions from "../product-actions"
import { useState } from "react"

type Props = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const StateWrapper: React.FC<Props> = ({ product, region }) => {
  const [variant, setVariant] = useState<
    HttpTypes.StoreProductVariant | undefined
  >()

  return (
    <>
      <ProductInfo variant={variant} product={product} />
      <ProductTabs product={product} />
      <ProductActions
        setVariant={setVariant}
        disabled={false}
        product={product}
        region={region}
      />
    </>
  )
}

export default StateWrapper
