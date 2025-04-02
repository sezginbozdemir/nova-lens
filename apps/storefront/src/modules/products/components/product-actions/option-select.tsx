import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isColor = (value: string) => {
    const s = new Option().style
    s.color = value
    return s.color !== ""
  }
  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-white body">Select {title}</span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          return isColor(v) ? (
            <div
              key={v}
              onClick={() => updateOption(option.id, v)}
              className={clx("w-5 h-5 rounded-full border cursor-pointer", {
                "ring-2 ring-offset-2 ring-gray-600": v === current,
              })}
              style={{ backgroundColor: v }}
              data-testid="color-option"
            />
          ) : (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border details text-white h-10 rounded-full p-2 flex-1 bg-transparent",
                {
                  "bg-white": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              <span
                className={clx({
                  "bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] bg-clip-text text-transparent":
                    v === current,
                })}
              >
                {v}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
