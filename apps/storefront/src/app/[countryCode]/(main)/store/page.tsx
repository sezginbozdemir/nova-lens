import { Metadata } from "next"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { getRegion } from "@lib/data/regions"
import { listProductsWithSort } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { getAuthHeaders } from "@lib/data/cookies"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    filters?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { filters, sortBy, page } = searchParams
  const pageNumber = page ? parseInt(page) : 1
  const countryCode = params.countryCode
  const headers = {
    ...(await getAuthHeaders()),
  }
  let collectionId
  let categoryId
  let productsIds

  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count, filterOptions },
  } = await listProductsWithSort({
    page: pageNumber,
    queryParams,
    sortBy,
    countryCode,
    filters,
  })
  const productsWithPrices = products.map((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    return { product, cheapestPrice }
  })
  const customer = await retrieveCustomer()
  return (
    <StoreTemplate
      customer={customer}
      options={filterOptions}
      headers={headers}
      filters={filters}
      region={region}
      page={pageNumber}
      products={productsWithPrices}
      count={count}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}
