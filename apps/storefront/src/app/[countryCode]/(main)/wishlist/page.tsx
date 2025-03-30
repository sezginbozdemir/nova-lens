import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getAuthHeaders } from "@lib/data/cookies"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import WishlistPageTemplate from "@modules/account/templates/wishlist-template"
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

export default async function WishlistPage(props: Params) {
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
    <div className="content-container min-h-[70vh] py-6 bg-[#1B1037CC] backdrop-blur-[20px] rounded-[20px] mb-[4rem] mt-[2rem]">
      <WishlistPageTemplate
        customer={customer}
        products={productsWithPrices}
        headers={headers}
        count={count}
        region={region}
      />
    </div>
  )
}
