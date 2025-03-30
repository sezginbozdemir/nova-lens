"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"
import { filterProducts } from "@lib/util/filter-products"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          ...queryParams,
        },
        headers,
        //next,
        //cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
  filters,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
  filters?: string
}): Promise<{
  response: {
    products: HttpTypes.StoreProduct[]
    count: number
    filterOptions: any
  }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 16

  // Fetch products without pagination first
  const {
    response: { products },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 999, // Get all products without pagination for filtering
    },
    countryCode,
  })

  // Apply filters
  const sortedProducts = sortProducts(products, sortBy)
  const filteredProducts =
    filters && filters.length > 0
      ? await filterProducts(sortedProducts, filters)
      : sortedProducts

  // Get the count of filtered products
  const count = filteredProducts.length

  // Pagination logic
  const pageParam = (page - 1) * limit
  const nextPage = count > pageParam + limit ? pageParam + limit : null
  const paginatedProducts = filteredProducts.slice(pageParam, pageParam + limit)

  const filterOptions = {
    brand: new Set<string>(),
    price: new Set<string>(),
    promotions: new Set<string>(),
    lens: new Set<string>(),
    shape: new Set<string>(),
    color: new Set<string>(),
    frame: new Set<string>(),
    collection: new Set<string>(),
  }

  const shapes = ["rounded-shape", "cat-eye-shape", "square-shape"]
  const priceRanges = ["0-100", "100-200", "200-300", "300-400"]

  shapes.forEach((shape) => filterOptions.shape.add(shape))
  priceRanges.forEach((price) => filterOptions.price.add(price))

  products.forEach((product) => {
    product.tags?.forEach((tag) => {
      if (tag.value.startsWith("brand:")) {
        const brand = tag.value.split(":")[1]
        filterOptions.brand.add(brand)
      }
      if (tag.value.startsWith("frame:")) {
        const frame = tag.value.split(":")[1]
        filterOptions.frame.add(frame)
      }
    })

    if (product.collection) {
      filterOptions.collection.add(product.collection.title)
    }
    if (product.type) {
      filterOptions.lens.add(product.type.value)
    }
  })

  return {
    response: {
      products: paginatedProducts,
      count, // This count is now filtered
      filterOptions,
    },
    nextPage,
    queryParams,
  }
}
