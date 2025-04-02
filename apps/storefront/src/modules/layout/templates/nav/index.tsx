import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import { retrieveCustomer } from "@lib/data/customer"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const customer = await retrieveCustomer()

  return (
    <div className="top-0 inset-x-0 group">
      <header className="relative h-16 mx-auto duration-200">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex xsmall:hidden items-center">
            <div className="h-full z-[9999]">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="xsmall:flex items-center h-full hidden">
            <LocalizedClientLink
              className="z-[90000]"
              href="/"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/logo.png"
                width={100}
                height={28}
                alt="Nova Lens"
              />
            </LocalizedClientLink>
          </div>
          <div className="xsmall:flex hidden justify-between items-center gap-5">
            <LocalizedClientLink href="/" className="text-white menu-body">
              Home
            </LocalizedClientLink>
            <LocalizedClientLink href="/store" className="text-white menu-body">
              Products
            </LocalizedClientLink>
            <LocalizedClientLink href="/" className="text-white menu-body">
              Contact
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full">
            <LocalizedClientLink
              className="z-[9000]"
              href={customer ? "/account/wishlist" : "/wishlist"}
              data-testid="nav-account-link"
            >
              <Image
                src="/icons/heart.png"
                width={20}
                height={18}
                alt="Nova Lens"
              />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 text-white"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <Image
                    src="/icons/cart.png"
                    width={20}
                    height={24}
                    alt="Nova Lens"
                  />{" "}
                  (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="z-[9999]"
                href="/account"
                data-testid="nav-account-link"
              >
                <Image
                  src="/icons/account.png"
                  width={20}
                  height={24}
                  alt="Nova Lens"
                />
              </LocalizedClientLink>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
