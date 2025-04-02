"use client"
import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import MobileActions from "./mobile-actions"
import Image from "next/image"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
  setVariant: (variant: HttpTypes.StoreProductVariant | undefined) => void
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
  setVariant,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const [quantity, setQuantity] = useState<number>(1)

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])
  useEffect(() => {
    if (selectedVariant) {
      setVariant(selectedVariant)
    }
  }, [selectedVariant, setVariant])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
    setQuantity(1)
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: quantity,
      countryCode,
    })
    setQuantity(1)
    setIsAdding(false)
  }
  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        {(product.variants?.length ?? 0) > 1 && (
          <div>
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          </div>
        )}
        <div className="flex gap-[2rem] items-center justify-start">
          <div className="border rounded-[100px] w-[100px] h-[45px] flex justify-around items-center body text-white px-[1rem]">
            <button
              disabled={!selectedVariant}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="cursor-pointer"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              disabled={!selectedVariant}
              onClick={() =>
                setQuantity((prev) =>
                  Math.min(selectedVariant?.inventory_quantity ?? 1, prev + 1)
                )
              }
              className="cursor-pointer"
            >
              +
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            variant="primary"
            className="w-[190px] flex gap-3 h-[60px] rounded-[100px]  bg-[#FCFAFF] body text-[var(--accent)] hover:bg-white"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            {!isAdding && (
              <>
                {selectedVariant === undefined && options.length === undefined
                  ? "Select variant"
                  : !inStock || !isValidVariant
                  ? "Out of stock"
                  : "Add to cart"}
                <Image
                  src="/icons/cart-gradient.png"
                  width={20}
                  height={20}
                  alt="Nova Lens"
                />
              </>
            )}{" "}
          </Button>
        </div>

        <div className="text-white cart-price opacity-[0.8] mt-[2rem]">
          Delivery in 3-6 working days. Free shipping over $150
        </div>
        <div className="bg-white opacity-[0.8] w-full h-[1px]" />
        <div className="flex justify-between mt-3">
          <div className="text-white cart-price">Pay safetly with</div>
          <div className="flex gap-3">
            <Image
              src="/icons/paypal.png"
              width={25}
              height={25}
              alt="Nova Lens"
            />
            <Image
              src="/icons/visa.png"
              width={25}
              height={25}
              alt="Nova Lens"
            />
            <Image
              src="/icons/mastercard.png"
              width={25}
              height={25}
              alt="Nova Lens"
            />
          </div>
        </div>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
