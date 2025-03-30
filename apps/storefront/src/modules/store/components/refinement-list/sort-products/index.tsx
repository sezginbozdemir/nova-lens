"use client"
import { useState } from "react"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  setIsOpenFilter: (state: boolean) => void
  isOpenFilter: boolean
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Newest",
  },
  {
    value: "price_asc",
    label: "Price (High-Low)",
  },
  {
    value: "price_desc",
    label: "Price (Low-High)",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
  setIsOpen,
  isOpen,
  setIsOpenFilter,
  isOpenFilter,
}: SortProductsProps) => {
  const toggleRadioGroup = () => {
    if (isOpenFilter) {
      setIsOpenFilter(false)
    }
    setIsOpen(!isOpen)
  }

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
    toggleRadioGroup()
  }

  return (
    <FilterRadioGroup
      icon="chevron"
      title="Sort by"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
      toggleRadioGroup={toggleRadioGroup}
      isOpen={isOpen}
    />
  )
}

export default SortProducts
