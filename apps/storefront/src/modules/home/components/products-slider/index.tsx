"use client"
import { useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Link from "next/link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  mini: { breakpoint: { max: 1024, min: 0 }, items: 3 },
}

type ProductsSliderProps = {
  products: HttpTypes.StoreProduct[]
}
const CustomDot = ({
  onClick,
  active,
}: {
  onClick?: () => void
  active?: boolean
}) => (
  <button
    onClick={onClick}
    className={`w-[14px] h-[5px] rounded-[7px] rounded-full mx-1 transition-all duration-300 ${
      active ? "bg-[#D9D9D9] w-[33px]" : "bg-[#D9D9D9A6]"
    }`}
  />
)
const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-1/2 bottom-[8rem] transform xsmall:-translate-x-[200px] -translate-x-[150px] -translate-y-1/2 z-10 shadow-lg"
    >
      <Image
        src="/icons/double-arrow.png"
        width={25}
        height={35}
        alt="Left Arrow"
        className="rotate-180"
      />
    </button>
  )
}
const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 bottom-[8rem] transform xsmall:translate-x-[200px] translate-x-[150px]  -translate-y-1/2 z-10 shadow-lg"
    >
      <Image
        src="/icons/double-arrow.png"
        width={25}
        height={35}
        alt="Right Arrow"
      />
    </button>
  )
}

export default function ProductsSlider({ products }: ProductsSliderProps) {
  if (!products || products.length === 0) return null

  const [currentSlide, setCurrentSlide] = useState(0)
  const [indexHandle, setIndexHandle] = useState<string>(
    products[0]?.handle || ""
  )
  const [itemsInView, setItemsInView] = useState(3)

  const updateItemsInView = () => {
    const width = window.innerWidth
    if (width >= 1024) setItemsInView(5)
    else if (width <= 1023) setItemsInView(3)
  }

  useEffect(() => {
    updateItemsInView()
    window.addEventListener("resize", updateItemsInView)
    return () => window.removeEventListener("resize", updateItemsInView)
  }, [])

  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center text-center pt-[5rem] mb-[-3rem]">
        <Image
          src="/images/header.png"
          width={630}
          height={132}
          alt="Nova Lens"
          className="w-[300px] xsmall:w-[630px]"
        />

        <div className="body opacity-[0.8] xsmall:w-1/3 w-2/3 text-white z-[5000]">
          Experience cutting-edge designs, vibrant colors, and unparalleled
          comfort. Elevate your look and embrace innovation with NovaLens
        </div>
      </div>

      <div className="relative flex flex-col overflow-hidden xsmall:h-[750px] h-[600px] ">
        <Carousel
          showDots={true}
          dotListClass="absolute top-1/2 transform-1/2 translate-y-[5rem]"
          customDot={<CustomDot />}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          responsive={responsive}
          customTransition="all 1s cubic-bezier(0.45, 0, 0.15, 1)"
          containerClass="relative"
          itemClass="transition-all duration-1000"
          className="!items-start h-full"
          beforeChange={(nextSlide) => {
            setCurrentSlide(nextSlide)
            setIndexHandle(
              products[
                (nextSlide + Math.floor(itemsInView / 2)) % products.length
              ]?.handle || ""
            )
          }}
          ssr={true}
          swipeable={false}
          draggable={false}
        >
          {products.map((product, index) => {
            const relativeIndex =
              (index - currentSlide + products.length) % products.length
            let translateX = ""
            let translateY = "translate-y-[20rem]" // Default lowest
            let size = "xsmall:w-full w-[130%]"
            let shadow = "shadow-[0px_4px_50px_6px_#4C39AF8C]"
            let background =
              "linear-gradient(178.47deg, rgba(156, 82, 242, 0.45) 1.3%, rgba(76, 82, 251, 0.45) 98.77%)"

            if (itemsInView === 3) {
              if (relativeIndex === 0 || relativeIndex === 2)
                translateY = "translate-y-[8rem]"
              if (relativeIndex === 1) {
                translateY = "translate-y-0"
                size = " w-[160%] translate-x-[-15%]"
                shadow = "shadow-[0px_4px_35px_5px_#4226748C]"
                background =
                  "linear-gradient(178.47deg, rgba(156, 82, 242, 0.7) 1.3%, rgba(76, 82, 251, 0.7) 98.77%)"
              }
              if (relativeIndex === 0) {
                translateX = "translate-x-[-6rem]"
              } else if (relativeIndex === 2) {
                translateX = "translate-x-[6rem]"
              }
              if (relativeIndex === products.length - 1) {
                translateX = "translate-x-[-6rem]"
              }
            } else {
              if (relativeIndex === 1 || relativeIndex === 3)
                translateY = "translate-y-[8rem]"
              if (relativeIndex === 2) {
                translateY = "translate-y-0"
                size = "w-[120%] translate-x-[-10%]"
                shadow = "shadow-[0px_4px_35px_5px_#4226748C]"
                background =
                  "linear-gradient(178.47deg, rgba(156, 82, 242, 0.7) 1.3%, rgba(76, 82, 251, 0.7) 98.77%)"
              }
              if (relativeIndex < 2) {
                translateX = "translate-x-[-6rem]"
              } else if (relativeIndex > 2) {
                translateX = "translate-x-[6rem]"
              }
              if (relativeIndex === products.length - 1) {
                translateX = "translate-x-[-6rem]"
              }
            }

            return (
              <div
                key={product.id}
                style={{
                  transform: `${translateX}`,
                  transition:
                    "transform 1s cubic-bezier(0.45, 0, 0.15, 1), width 1s",
                }}
                className={`${size} ${translateX} flex items-center justify-center`}
              >
                <Link
                  style={{
                    background,
                    transform: `${translateY}`,
                    transition:
                      "transform 1s cubic-bezier(0.45, 0, 0.15, 1), background-color 1s linear",
                  }}
                  className={`${translateY} w-full aspect-square  ${shadow} flex items-center justify-center rounded-full  overflow-hidden transition-all duration-1000 ease-out`}
                  href={`ro/products/${product.handle}`}
                >
                  <Image
                    src={product.thumbnail!}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="aspect-square object-contain"
                  />
                </Link>
              </div>
            )
          })}
        </Carousel>

        <Link
          href={`ro/products/${indexHandle}`}
          className="group absolute w-[200px] h-[60px] flex items-center justify-center text-center bottom-[7rem]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-gradient-to-b from-[#9C52F2] to-[#4C52FB] bg-white rounded-full shadow-lg body"
        >
          <span className="uppercase bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] text-transparent bg-clip-text group-hover:text-white">
            View Product
          </span>
        </Link>
      </div>
    </>
  )
}
