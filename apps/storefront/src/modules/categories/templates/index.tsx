"use client"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"

type ProductWithPrice = {
  product: HttpTypes.StoreProduct
  cheapestPrice: VariantPrice | null
}

export default function CategoryTemplate({
  products,
  count,
  region,
  category,
  sortBy,
  page,
  headers,
  countryCode,
  options,
  filters,
  customer,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page: number
  countryCode: string
  region: HttpTypes.StoreRegion
  products: ProductWithPrice[]
  count: number
  headers: Record<string, string>
  options: { [key: string]: Set<string> }
  filters?: string
  customer?: HttpTypes.StoreCustomer | null
}) {
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <>
      <div className="h5 text-[var(--white)] text-center mt-[3rem] mb-[2rem]">
        SUNGLASSES
      </div>
      <div className="content-container mb-[5rem]">
        <div
          className="min-h-[70vh] flex overflow-hidden flex-col py-6 content-container bg-[#1B1037CC] backdrop-blur-[20px] rounded-[20px]"
          data-testid="category-container"
        >
          <RefinementList
            count={count}
            filters={filters}
            options={options}
            sortBy={sort}
            data-testid="sort-by-container"
          />
          <div className="w-full">
            <div className="flex flex-row mb-8 text-2xl-semi gap-4">
              {parents &&
                parents.map((parent) => (
                  <span key={parent.id} className="text-white price-title">
                    <LocalizedClientLink
                      className="mr-4"
                      href={`/categories/${parent.handle}`}
                      data-testid="sort-by-link"
                    >
                      {parent.name}
                    </LocalizedClientLink>
                    /
                  </span>
                ))}
              <h1
                className="text-white price-title"
                data-testid="category-page-title"
              >
                {category.name}
              </h1>
            </div>
            {category.description && (
              <div className="mb-8 text-white body">
                <p>{category.description}</p>
              </div>
            )}
            {category.category_children && (
              <div className="mb-8 text-white body">
                <ul className="grid grid-cols-1 gap-2">
                  {category.category_children?.map((c) => (
                    <li key={c.id}>
                      <InteractiveLink href={`/categories/${c.handle}`}>
                        {c.name}
                      </InteractiveLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={category.products?.length ?? 8}
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
