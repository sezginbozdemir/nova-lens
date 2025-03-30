import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getAuthHeaders } from "@lib/data/cookies"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import WishlistTemplate from "@modules/account/templates/wishlist-template"
export const metadata: Metadata = {
  title: "Wishlist",
  description: "View and edit your wishlist.",
}

type PaginatedProductsParams = {
  limit: number
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function Wishlist(props: Params) {
  const customer = await retrieveCustomer()
  const params = await props.params
  const countryCode = params.countryCode

  const queryParams: PaginatedProductsParams = {
    limit: 9999,
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProducts({
    queryParams,
    countryCode,
  })
  const productsWithPrices = products.map((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    return { product, cheapestPrice }
  })

  const headers = {
    ...(await getAuthHeaders()),
  }

  return (
    <WishlistTemplate
      customer={customer}
      products={productsWithPrices}
      headers={headers}
      count={count}
      region={region}
    />
  )
}
