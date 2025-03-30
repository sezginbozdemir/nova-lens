import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import SortProducts, { SortOptions } from "./sort-products"
import FilterProducts from "./filter-products"
import FilterTabs from "./filter-tabs"

type RefinementListProps = {
  sortBy: SortOptions
  filters?: string
  search?: boolean
  "data-testid"?: string
  options: { [key: string]: Set<string> }
  count: number
}

const RefinementList = ({
  options,
  sortBy,
  filters,
  count,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.delete("filters")
    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (name === "filters") {
        let existingFilters = params.get(name)?.split(",") || []

        if (existingFilters.includes(value)) {
          existingFilters = existingFilters.filter((item) => item !== value)
        } else {
          existingFilters.push(value)
        }

        if (existingFilters.length > 0) {
          params.set(name, existingFilters.join(","))
        } else {
          params.delete(name)
        }
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )
  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }
  const [isOpenSort, setIsOpenSort] = useState(false)
  const [isOpenFilter, setIsOpenFilter] = useState(false)

  return (
    <div className="flex justify-between py-4 mb-8 small:px-0 pl-6 mr-[3rem] ml-[3rem]">
      <FilterTabs setQueryParams={setQueryParams} />

      <div className="flex gap-12 justify-between">
        <SortProducts
          isOpenFilter={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
          isOpen={isOpenSort}
          setIsOpen={setIsOpenSort}
          sortBy={sortBy}
          setQueryParams={setQueryParams}
          data-testid={dataTestId}
        />
        <FilterProducts
          count={count}
          clear={clearAllFilters}
          options={options}
          isOpenSort={isOpenSort}
          setIsOpenSort={setIsOpenSort}
          filters={filters}
          setQueryParams={setQueryParams}
          isOpen={isOpenFilter}
          setIsOpen={setIsOpenFilter}
        />
      </div>
    </div>
  )
}

export default RefinementList
