import React from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import { HttpTypes } from "@medusajs/types"
import FeaturedProducts from "@modules/home/components/featured-products"
import ClientReviews from "../components/client-reviews"
import { notFound } from "next/navigation"
import StateWrapper from "../components/state-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  console.log(product)
  if (!product || !product.id) {
    return notFound()
  }
  return (
    <>
      <div className="opacity-[0.8] content-container body text-white mt-[3rem] mb-[1rem]">
        Products / {product.title}
      </div>
      <div className="bg-[var(--dark-purple)] w-full h-full">
        <div
          className="gap-[5rem] py-[5rem] content-container w-full flex flex-col justify-between small:flex-row small:items-start relative"
          data-testid="product-container"
        >
          <div className="w-full h-full relative">
            <ImageGallery images={product?.images || []} />
          </div>
          <div className="flex flex-col w-full gap-[5rem]">
            <StateWrapper product={product} region={region} />
          </div>
        </div>
      </div>
      <ClientReviews />
      <div
        className="my-16 small:my-32"
        data-testid="related-products-container"
      >
        <FeaturedProducts region={region} />
      </div>
    </>
  )
}

export default ProductTemplate
