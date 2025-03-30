"use client"
import { useState } from "react"
import Image from "next/image"

type CheckboxRadioGroupProps = {
  clear: () => void
  toggleRadioGroup: () => void
  isOpen: boolean
  title: string
  items: { [key: string]: Set<string> }
  value?: string
  icon: string
  handleChange: (value: string) => void
  "data-testid"?: string
  count: number
}

const CheckboxRadioGroup = ({
  title,
  count,
  clear,
  items,
  value,
  icon,
  handleChange,
  toggleRadioGroup,
  isOpen,
  "data-testid": dataTestId,
}: CheckboxRadioGroupProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const iconSrc = `/icons/${icon}.png`

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category))
  }

  const isFilterSelected = (category: string, filterValue: string) => {
    const filterString = Array.isArray(value) ? value.join(",") : value ?? ""

    return filterString
      .split(",")
      .some((v) => v === `${category}-${filterValue}`)
  }

  console.log(value)
  return (
    <div className="relative flex flex-col gap-y-3">
      <div
        className="flex gap-[0.7rem] cursor-pointer items-center"
        onClick={toggleRadioGroup}
      >
        <span className="text-white">{title}</span>
        <Image
          src={iconSrc}
          width={15}
          height={7}
          alt="Filter icon"
          className="object-contain"
        />
      </div>

      {isOpen && (
        <div
          className="absolute top-[2.5rem] left-[-14rem] flex flex-col gap-2 z-50 bg-white rounded-[10px] w-[300px]  pb-[1.5rem] pt-2 px-[1rem]"
          data-testid={dataTestId}
        >
          <div className="w-full justify-between flex">
            <div></div>
            <span onClick={toggleRadioGroup} className="cursor-pointer">
              <Image
                src="/icons/xmark.png"
                width={25}
                height={25}
                alt="Nova Lens"
              />
            </span>
          </div>

          <div className="w-full justify-between flex mb-5">
            <div>
              FILTERS{" "}
              <span className="bg-gradient-to-b from-[#9c52f2] to-[#4c52fb] bg-clip-text text-transparent">
                ({value ? value.split(",").length : 0})
              </span>
            </div>
            {value && value.split(",").length > 0 && (
              <span
                onClick={clear}
                className="cursor-pointer bg-gradient-to-b from-[#9c52f2] to-[#4c52fb] bg-clip-text text-transparent"
              >
                CLEAR ALL
              </span>
            )}
          </div>

          {Object.entries(items).map(([category, options]) => {
            const categoryFilterCount = value
              ? value
                  .split(",")
                  .filter((item) => item.startsWith(`${category}-`)).length
              : 0

            return (
              <div key={category} className="border-b last:border-b-0">
                <div
                  className="mb-1 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <span className="body text-[var(--black)] capitalize">
                    {category}
                    {categoryFilterCount > 0 && (
                      <span className="ml-1 bg-gradient-to-b from-[#9c52f2] to-[#4c52fb] bg-clip-text text-transparent">
                        ({categoryFilterCount})
                      </span>
                    )}
                  </span>
                  <span className="body">
                    {openCategory === category ? "-" : "+"}
                  </span>
                </div>

                {openCategory === category && (
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from(options).map((option) => {
                      const isChecked = isFilterSelected(category, option)

                      return (
                        <div key={option} className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            id={`${category}-${option}`}
                            checked={isChecked}
                            onChange={() =>
                              handleChange(`${category}-${option}`)
                            }
                            className="transition duration-150 ease-in-out"
                          />
                          <div className="body capitalize">{option}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          {value !== undefined && (
            <div className="flex flex-col items-center mt-5">
              <div className="w-[80%] bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] h-[50px] rounded-[100px] p-[2px]">
                <div className="w-full h-full flex items-center justify-center rounded-[100px] bg-white">
                  <span className="body opacity-[0.6]">
                    {count} results for your search
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CheckboxRadioGroup
