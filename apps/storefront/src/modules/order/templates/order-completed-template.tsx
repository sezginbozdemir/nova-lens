import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function OrderCompletedTemplate() {
  return (
    <div className="bg-gradient-to-b from-[rgba(34,13,55,255)] to-[rgba(21,13,56,255)] py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col xsmall:flex-row justify-center items-center h-full w-full">
        <div
          className="flex flex-col gap-[4rem] max-w-4xl h-full w-full py-10"
          data-testid="order-complete-container"
        >
          <div className="flex flex-col text-white  gap-[2rem]">
            <h1 className="h5 uppercase">oRDER CONFIRMED</h1>
            <span className="body">Thank you for choosing NovaLens! </span>
            <span className="body xsmall:w-2/3">
              Your order has been received, and an email with your order details
              has been sent to you. If you have any questions feel free to
              contact our customer support team.
            </span>
          </div>
          <LocalizedClientLink
            href="/store"
            className="w-[210px] h-[60px] rounded-[100px] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] p-[3px] block"
          >
            <button className="bg-[#1c0d38] text-white menu-body w-full h-full rounded-[100px]">
              Back to shopping
            </button>
          </LocalizedClientLink>
        </div>
        <div>
          <Image
            src="/images/order-confirm.png"
            width={530}
            height={530}
            alt="Nova Lens"
          />
        </div>
      </div>
    </div>
  )
}
