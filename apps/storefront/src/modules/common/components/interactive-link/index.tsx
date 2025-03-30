import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="group flex gap-x-1 items-center group rounded-full border px-[1.5rem] py-[0.5rem] hover:bg-white"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="group-hover:bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] bg-clip-text group-hover:text-transparent text-white hover body">
        {children}
      </Text>
      <ArrowUpRightMini className=" group-hover:rotate-45 group-hover:text-[#4C52FB] text-white ease-in-out duration-150" />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
