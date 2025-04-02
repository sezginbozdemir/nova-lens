"use client"
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import css from "./Thumbnail.module.css"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import { VariantPrice } from "types/global"
import { usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Cookies from "js-cookie"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

type WishlistItem = {
  id: string
  product_variant_id: string
}

type ThumbnailProps = {
  variantId: string | null
  created_at: string | null
  thumbnail?: string | null
  // TODO: Fix image typings
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
  cheapestPrice: VariantPrice | null
  headers: Record<string, string>
  customer?: HttpTypes.StoreCustomer | null
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  headers,
  variantId,
  created_at,
  cheapestPrice,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
  customer,
}) => {
  const initialImage = thumbnail || images?.[0]?.url
  const currentDate = new Date()
  const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7))
  const pathname = usePathname()
  const isWishlistPage = pathname.includes("/wishlist")

  const [wishlistData, setWishlistData] = useState<WishlistItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
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

        if (!response.ok) return

        const data = await response.json()
        setWishlistData(data.wishlist?.items || [])
      } catch (error) {
        console.error("Error fetching wishlist:", error)
      }
    }

    fetchWishlist()
  }, [])

  const handleWishlistClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    if (!customer) {
      if (!variantId) {
        return
      }

      let updatedWishlist: string[] = Cookies.get("wishlist")
        ? JSON.parse(Cookies.get("wishlist") as string)
        : []

      if (updatedWishlist.includes(variantId)) {
        updatedWishlist = updatedWishlist.filter(
          (id: string) => id !== variantId
        )
      } else {
        updatedWishlist.push(variantId)
      }

      setWishlist(updatedWishlist)
      Cookies.set("wishlist", JSON.stringify(updatedWishlist))
      return
    }
    try {
      let res = await fetch(`${BACKEND_URL}/store/customers/me/wishlists`, {
        method: "GET",
        headers: {
          ...headers,
          "x-publishable-api-key": PUBLISHABLE_API_KEY!,
        },
      })

      if (res.status === 404) {
        res = await fetch(`${BACKEND_URL}/store/customers/me/wishlists`, {
          method: "POST",
          headers: {
            ...headers,
            "x-publishable-api-key": PUBLISHABLE_API_KEY!,
          },
          body: JSON.stringify({}),
        })

        if (!res.ok) {
          throw new Error("Failed to create wishlist")
        }
      } else if (!res.ok) {
        throw new Error("Failed to fetch wishlist")
      }

      res = await fetch(`${BACKEND_URL}/store/customers/me/wishlists`, {
        method: "GET",
        headers: {
          ...headers,
          "x-publishable-api-key": PUBLISHABLE_API_KEY!,
        },
      })

      const wishlistData = await res.json()
      const wishlistItems = wishlistData?.wishlist?.items || []

      const existingItem = wishlistItems.find(
        (item: { product_variant_id: string }) =>
          item.product_variant_id === variantId
      )

      if (existingItem) {
        await fetch(
          `${BACKEND_URL}/store/customers/me/wishlists/items/${existingItem.id}`,
          {
            method: "DELETE",
            headers: {
              ...headers,
              "x-publishable-api-key": PUBLISHABLE_API_KEY!,
            },
          }
        )

        setWishlistData((prev) =>
          prev.filter((item) => item.id !== existingItem.id)
        )
      } else {
        await fetch(`${BACKEND_URL}/store/customers/me/wishlists/items`, {
          method: "POST",
          headers: {
            ...headers,
            "x-publishable-api-key": PUBLISHABLE_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ variant_id: variantId }),
        })
      }

      res = await fetch(`${BACKEND_URL}/store/customers/me/wishlists`, {
        method: "GET",
        headers: {
          ...headers,
          "x-publishable-api-key": PUBLISHABLE_API_KEY!,
        },
      })

      const updatedWishlist = await res.json()
      setWishlistData(updatedWishlist?.wishlist?.items || [])
    } catch (err) {
      console.error("Error handling wishlist:", err)
    }
  }
  const heartImage = !isClient
    ? "/icons/heart.png"
    : customer
    ? wishlistData.some(
        (item: WishlistItem) => item.product_variant_id === variantId
      )
      ? "/icons/heart-full.png"
      : "/icons/heart.png"
    : wishlist.includes(variantId!)
    ? "/icons/heart-full.png"
    : "/icons/heart.png"

  return (
    <Container
      className={clx(
        "w-full overflow-hidden shadow-[0px_18px_27px_0px_rgba(156,82,242,0.2)] rounded-[15px] bg-gradient-to-b from-[#9C52F2] to-[#FFFFFF] p-[1px]",
        css.container,
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1.2]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <div className="relative group w-full h-full bg-[#4b405f] hover:bg-[#09080a]  rounded-[15px] backdrop-blur-[14px]">
        {!isWishlistPage && (
          <div className="transform -translate-x-[50%] w-[130px] h-[30px] absolute  body bottom-[0.5rem] xmsall:bottom-[1.5rem] left-[50%] border rounded-[100px] bg-transparent hidden group-hover:flex items-center justify-center text-white capitalize">
            View Details
          </div>
        )}
        <ImageOrPlaceholder image={initialImage} size={size} />
        <Image
          src={heartImage}
          width={25}
          height={23}
          alt="Nova Lens"
          className={css.heart}
          onClick={handleWishlistClick}
        />
        {!isWishlistPage &&
          created_at &&
          (new Date(created_at) >= sevenDaysAgo ||
            cheapestPrice?.price_type === "sale") && (
            <div
              onClick={(e) => {
                e.preventDefault()
              }}
              className={`absolute right-[8%] top-[8%] rounded-full p-2 ${
                cheapestPrice?.price_type === "sale"
                  ? "bg-[#4C52FB] text-white"
                  : "bg-white"
              }`}
            >
              {cheapestPrice?.price_type === "sale"
                ? `${cheapestPrice.percentage_diff}%`
                : "NEW"}
            </div>
          )}
      </div>
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 object-contain object-center"
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
