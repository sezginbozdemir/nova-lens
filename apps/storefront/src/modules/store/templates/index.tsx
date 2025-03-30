"use client"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"
import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"

type ProductWithPrice = {
  product: HttpTypes.StoreProduct
  cheapestPrice: VariantPrice | null
}

const StoreTemplate = ({
  headers,
  region,
  products,
  count,
  page,
  sortBy,
  filters,
  options,
  customer,
}: {
  filters?: string
  customer: HttpTypes.StoreCustomer | null
  sortBy?: SortOptions
  page: number
  countryCode: string
  region: HttpTypes.StoreRegion
  products: ProductWithPrice[]
  headers: Record<string, string>
  count: number
  options: { [key: string]: Set<string> }
}) => {
  const sort = sortBy || "created_at"
  return (
    <>
      <Text className="h5 text-[var(--white)] text-center mt-[3rem] mb-[2rem]">
        SUNGLASSES
      </Text>
      <div className="content-container mb-[5rem]">
        <div
          className="min-h-[70vh] flex overflow-hidden flex-col py-6 content-container bg-[#1B1037CC] backdrop-blur-[20px] rounded-[20px]"
          data-testid="category-container"
        >
          <RefinementList
            options={options}
            filters={filters}
            sortBy={sort}
            count={count}
          />
          <div className="w-full">
            <Suspense fallback={<SkeletonProductGrid />}>
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

export default StoreTemplate
