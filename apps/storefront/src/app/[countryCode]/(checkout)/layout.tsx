import Nav from "@modules/layout/templates/nav"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative small:min-h-screen">
      <Nav />
      <div
        className="bg-gradient-to-b from-[rgba(34,13,55,255)] to-[rgba(21,13,56,255)] relative"
        data-testid="checkout-container"
      >
        {children}
      </div>
    </div>
  )
}
