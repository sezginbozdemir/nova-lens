import { clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <div
          className="details line-through text-ui-fg-muted"
          data-testid="original-price"
        >
          {price.original_price}
        </div>
      )}
      <div
        className={clx(
          "text-ui-fg-muted",
          "details",
          "text-[var(--white-body)]",
          {
            "text-ui-fg-interactive": price.price_type === "sale",
          }
        )}
        data-testid="price"
      >
        {price.calculated_price}
      </div>
    </>
  )
}
