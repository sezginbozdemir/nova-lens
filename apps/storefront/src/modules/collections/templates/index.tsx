"use client"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"
type ProductWithPrice = {
  product: HttpTypes.StoreProduct
  cheapestPrice: VariantPrice | null
}

export default function CollectionTemplate({
  products,
  count,
  region,
  sortBy,
  collection,
  headers,
  page,
  options,
  filters,
  customer,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page: number
  countryCode: string
  count: number
  region: HttpTypes.StoreRegion
  products: ProductWithPrice[]
  headers: Record<string, string>
  filters?: string
  options: { [key: string]: Set<string> }
  customer?: HttpTypes.StoreCustomer | null
}) {
  const sort = sortBy || "created_at"

  return (
    <>
      <div className="h5 text-[var(--white)] text-center mt-[3rem] mb-[2rem]">
        SUNGLASSES
      </div>

      <div className="content-container mb-[5rem]">
        <div className="min-h-[70vh] flex overflow-hidden flex-col py-6 content-container bg-[#1B1037CC] backdrop-blur-[20px] rounded-[20px]">
          <RefinementList
            count={count}
            sortBy={sort}
            options={options}
            filters={filters}
          />
          <div className="w-full">
            <div className="mb-8 text-white">
              <h1 className="price-title">{collection.title} x NovaLens</h1>
            </div>
            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={collection.products?.length}
                />
              }
            >
              <PaginatedProducts
                customer={customer}
                headers={headers}
                products={products}
                region={region}
                count={count}
                page={page}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
