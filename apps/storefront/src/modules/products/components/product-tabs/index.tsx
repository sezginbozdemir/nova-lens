"use client"
import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Description",
      component: <StyleTab product={product} />,
    },
    {
      label: "Style",
      component: <ProductInfoTab product={product} />,
    },
  ]
  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            className="menu-body text-white"
            key={i}
            title={tab.label}
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const brandTag = product.tags?.find((tag) => tag.value.startsWith("brand:"))
  const frameTag = product.tags?.find((tag) => tag.value.startsWith("frame:"))
  return (
    <div className="body py-3">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Collection</span>
            <p>{product.collection ? product.collection.title : "-"}</p>
          </div>

          <div>
            <span className="font-semibold">Brand</span>
            <p className="capitalize">
              {brandTag ? brandTag.value.split(":")[1] : "-"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Frame</span>
            <p className="capitalize">
              {frameTag ? frameTag.value.split(":")[1] : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p className="capitalize">
              {product.type ? product.type.value : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyleTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="body text-white opacity-[0.8] py-3">
      {product.description}
    </div>
  )
}

export default ProductTabs
