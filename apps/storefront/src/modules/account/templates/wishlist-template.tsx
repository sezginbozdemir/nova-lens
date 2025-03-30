"use client"
import { Suspense, useEffect, useState } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { VariantPrice } from "types/global"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

type WishlistItem = {
  id: string
  product_variant_id: string
}
type ProductWithPrice = {
  product: HttpTypes.StoreProduct
  cheapestPrice: VariantPrice | null
}

const WishlistTemplate = ({
  headers,
  products,
  region,
  count,
  customer,
}: {
  region: HttpTypes.StoreRegion
  products: ProductWithPrice[]
  headers: Record<string, string>
  count: number
  customer: HttpTypes.StoreCustomer | null
}) => {
  const router = useRouter()

  useEffect(() => {
    if (customer) {
      router.push("/account/wishlist")
    } else {
      router.push("/wishlist")
    }
  }, [customer, router])

  const [wishlistData, setWishlistData] = useState<WishlistItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    const wishlistFromCookies = Cookies.get("wishlist")
    if (wishlistFromCookies) {
      setWishlist(JSON.parse(wishlistFromCookies))
    }

    const fetchWishlist = async () => {
      if (!customer) return

      try {
        if (!PUBLISHABLE_API_KEY) {
          console.error("Publishable API Key is missing!")
          return
        }

        const response = await fetch(
          `${BACKEND_URL}/store/customers/me/wishlists`,
          {
            method: "GET",
            headers: {
              ...headers,
              "x-publishable-api-key": PUBLISHABLE_API_KEY,
            },
          }
        )

        if (!response.ok) {
          console.error("Failed to fetch wishlist:", response.status)
          setWishlistData([])
          return
        }

        const data = await response.json()
        setWishlistData(data.wishlist?.items || [])
      } catch (error) {
        console.error("Error fetching wishlist:", error)
      }
    }

    fetchWishlist()
  }, [])
  const filteredProducts = products.filter((product) => {
    const variantId = product.product.variants?.[0]?.id

    if (!customer) {
      return wishlist.includes(variantId!)
    } else {
      return wishlistData.some(
        (wishlistItem) => wishlistItem.product_variant_id === variantId
      )
    }
  })
  return (
    <div className="text-white w-full flex flex-col gap-[3rem] mt-12">
      <div className="flex flex-col gap-[0.7rem]">
        <div className="body">Your wishlist products</div>

        <div className="w-[190px] h-[1px] bg-white opacity-[0.8]" />
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-400">Your wishlist is empty.</div>
      ) : (
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            customer={customer}
            wishlist={true}
            headers={headers}
            products={filteredProducts}
            region={region}
            count={count}
            page={1}
          />
        </Suspense>
      )}
    </div>
  )
}
export default WishlistTemplate
