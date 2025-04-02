import React from "react"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div
      className="relative min-h-[80vh] bg-gradient-to-b from-[rgba(34,13,55,255)] to-[rgba(21,13,56,255)] flex-1 small:py-12"
      data-testid="account-page"
    >
      {!customer && (
        <Image src="/decors/account-decor.png" fill alt="Nova Lens" />
      )}
      <div className="flex-1 content-container h-full max-w-5xl mx-auto flex flex-col">
        <div
          className={`grid grid-cols-1 ${
            customer ? "small:grid-cols-[300px_1fr]" : "small:grid-cols-[1fr]"
          } py-12`}
        >
          {customer && (
            <div>
              <AccountNav customer={customer} />
            </div>
          )}
          <div
            className={`flex-1 z-[7000] ${
              !customer ? "mx-auto w-full small:px-[8rem] px-0" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
