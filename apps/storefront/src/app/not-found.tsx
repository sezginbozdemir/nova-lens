import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className=" relative items-center flex justify-center  min-h-[100vh] bg-gradient-to-b from-[rgba(34,13,55,255)] to-[rgba(21,13,56,255)]">
      <Image src="/decors/account-decor.png" fill alt="Nova Lens" />
      <div className="rounded-[15px] z-[8000] bg-gradient-to-b from-[#9C52F2] to-[#4C52FB] p-[1px] w-[920px] h-[770px]">
        <div className="w-full h-full bg-[#1A1037] rounded-[15px] items-center flex justify-center flex-col gap-4 ">
          <Image src="/images/404.png" width={260} height={130} alt="404" />
          <div className="h2 text-white uppercase">Oh now!</div>
          <div className="w-2/3 h2 text-white uppercase text-center">
            Your old sunglasses got broken
          </div>
          <div className="price-title text-white text-center">
            buy a better one
          </div>
          <Link
            className="border rounded-[100px] py-[0.5rem] px-[1.5rem] flex gap-x-1 items-center group"
            href="/"
          >
            <Text className="text-white">Go to frontpage</Text>
            <ArrowUpRightMini className="text-white group-hover:rotate-45 ease-in-out duration-150" />
          </Link>
        </div>
      </div>
    </div>
  )
}
