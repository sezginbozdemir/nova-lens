import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-[6rem] ">
      <div className="w-full flex flex-col">
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
        <CartTotals totals={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary
