import CheckboxRadioGroup from "@modules/common/components/checkbox-radio-group"

type FilterProductsProps = {
  setQueryParams: (name: string, value: string) => void
  filters?: string
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  setIsOpenSort: (state: boolean) => void
  isOpenSort: boolean
  options: { [key: string]: Set<string> }
  clear: () => void
  count: number
}

const FilterProducts = ({
  clear,
  options,
  isOpen,
  setIsOpen,
  isOpenSort,
  setIsOpenSort,
  filters,
  setQueryParams,
  count,
}: FilterProductsProps) => {
  const toggleRadioGroup = () => {
    if (isOpenSort) {
      setIsOpenSort(false)
    }
    setIsOpen(!isOpen)
  }

  const handleChange = (value: string) => {
    setQueryParams(`filters`, value)
  }

  return (
    <CheckboxRadioGroup
      count={count}
      clear={clear}
      icon="filter"
      title="Filter by"
      items={options}
      value={filters}
      handleChange={handleChange}
      toggleRadioGroup={toggleRadioGroup}
      isOpen={isOpen}
    />
  )
}

export default FilterProducts
