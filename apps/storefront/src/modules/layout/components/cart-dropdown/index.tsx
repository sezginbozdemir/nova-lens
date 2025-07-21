"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-[9000]"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="text-white flex gap-2"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <Image src="/icons/cart.png" width={20} height={24} alt="Cart" />
            {`(${totalItems})`}
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className=" hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white w-[575px] rounded-[10px] p-[2rem] z-[9999]"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex">
              <h3 className="h3 uppercase">Your Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="flex border-b gap-x-4 pb-[15px]"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24"
                        >
                          <Image
                            src={item.thumbnail!}
                            width={130}
                            height={100}
                            alt="Nova Lens"
                          />
                        </LocalizedClientLink>
                        <div className="flex justify-between flex-1">
                          <div className="flex flex-col justify-between">
                            <h3 className="menu-body overflow-hidden text-ellipsis">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.subtitle}
                              </LocalizedClientLink>
                            </h3>
                            {/* <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                /> */}
                            <div className="flex justify-start">
                              <LineItemPrice
                                preview="true"
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <span
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                            >
                              Quantity: {item.quantity}
                            </span>
                            <DeleteButton
                              preview="true"
                              id={item.id}
                              className="mt-1"
                              data-testid="cart-item-remove-button"
                            >
                              Remove Item
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4">
                  <div className="flex items-center justify-between w-[70%]">
                    <span className="details">
                      Subtotal <span className="details">(excl. taxes)</span>
                    </span>
                    <span
                      className="details"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <div className="flex gap-3 justify-between w-full">
                    <LocalizedClientLink
                      className="w-[80%] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] rounded-[100px] p-[3px] h-[60px]"
                      href="/cart"
                      passHref
                    >
                      <button
                        className="w-full rounded-[100px] bg-white h-full text-[#040008] border-0"
                        data-testid="go-to-cart-button"
                      >
                        Go to cart
                      </button>
                    </LocalizedClientLink>
                    <LocalizedClientLink
                      className="w-full"
                      href="/checkout?step=address"
                      passHref
                    >
                      <button
                        className="w-full rounded-[100px] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] h-full text-white border-0"
                        data-testid="go-to-cart-button"
                      >
                        Proceed to checkout
                      </button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button
                          className="hover:bg-transparent bg-transparent text-dark-500 rounded-[100px] border"
                          onClick={close}
                        >
                          Explore products
                        </Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
