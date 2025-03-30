import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div
      style={{
        boxShadow: "0px 18px 27px 0px rgba(156, 82, 242, 0.2)",
      }}
      className="block rounded-[20px] bg-gradient-to-r from-[#FFFFFF] to-[#774ADF] p-[1px]"
    >
      <div
        className="p-5 rounded-[20px] bg-[#4c445c] text-white flex flex-col"
        data-testid="order-card"
      >
        <div className="uppercase text-large-semi mb-1">
          #<span data-testid="order-display-id">{order.display_id}</span>
        </div>
        <div className="flex items-center divide-x divide-gray-200 text-small-regular">
          <span className="pr-2" data-testid="order-created-at">
            {new Date(order.created_at).toDateString()}
          </span>
          <span className="px-2" data-testid="order-amount">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </span>
          <span className="pl-2">{`${numberOfLines} ${
            numberOfLines > 1 ? "items" : "item"
          }`}</span>
        </div>
        <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
          {order.items?.slice(0, 3).map((i) => {
            return (
              <div
                key={i.id}
                className="flex flex-col gap-y-2"
                data-testid="order-item"
              >
                <Image
                  src={i.thumbnail!}
                  width={135}
                  height={95}
                  alt="Nova Lens"
                />
                <div className="flex items-center text-small-regular">
                  <span className="" data-testid="item-title">
                    {i.title}
                  </span>
                  <span className="ml-2">x</span>
                  <span data-testid="item-quantity">{i.quantity}</span>
                </div>
              </div>
            )
          })}
          {numberOfProducts > 4 && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-small-regular">+ {numberOfLines - 4}</span>
              <span className="text-small-regular">more</span>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
            <Button
              className="text-white bg-transparent border rounded-[100px] hover:bg-transparent"
              data-testid="order-details-link"
              variant="secondary"
            >
              See details
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
