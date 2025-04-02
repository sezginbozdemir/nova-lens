import { Label, RadioGroup, clx } from "@medusajs/ui"
import Image from "next/image"

type FilterRadioGroupProps = {
  toggleRadioGroup: () => void
  isOpen: boolean
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  icon: string
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  icon,
  handleChange,
  toggleRadioGroup,
  isOpen,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  const iconSrc = `/icons/${icon}.png`
  return (
    <div className="relative flex gap-x-3 flex-col gap-y-3">
      <div
        className="flex gap-[0.7rem] hover:cursor-pointer"
        onClick={toggleRadioGroup}
      >
        <div className="menu-body text-[var(--white)]">{title}</div>
        <Image
          src={iconSrc}
          width={15}
          height={27}
          alt="Nova Lens"
          className=" object-contain"
        />
      </div>
      {isOpen && (
        <RadioGroup
          className="absolute top-[2.5rem] left-[-7rem] z-[5000] bg-white rounded-[10px] w-[200px] py-[1.5rem] px-[1rem]"
          data-testid={dataTestId}
          onValueChange={handleChange}
        >
          {items?.map((i) => {
            return (
              <div
                key={i.value}
                className={clx("flex gap-x-2 items-center", {})}
              >
                <RadioGroup.Item
                  className="hidden peer"
                  id={i.value}
                  value={i.value}
                />
                <Label
                  htmlFor={i.value}
                  className={clx(
                    "body text-[var(--black)] !transform-none hover:cursor-pointer",
                    {
                      "text-[var(--accent)]": (value ?? "")
                        .split(",")
                        .includes(i.value),
                    }
                  )}
                  data-testid="radio-label"
                  data-active={i.value === value}
                >
                  {i.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      )}
    </div>
  )
}

export default FilterRadioGroup
