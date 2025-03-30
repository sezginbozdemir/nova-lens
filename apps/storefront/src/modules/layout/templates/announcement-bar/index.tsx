"use client"
import CountrySelect from "@modules/layout/components/country-select"
import { useToggleState } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

const AnnouncementBar = ({
  regions,
}: {
  regions: HttpTypes.StoreRegion[] | null
}) => {
  const toggleState = useToggleState()
  return (
    <header className="bg-white w-full h-[45px] items-center flex">
      <div className="content-container flex justify-between items-center body">
        <div>FQA</div>
        <div>-15% FOR THE FIRST ORDER </div>
        <div onMouseEnter={toggleState.open} onMouseLeave={toggleState.close}>
          {regions && (
            <CountrySelect
              position="bottom"
              toggleState={toggleState}
              regions={regions}
            />
          )}
        </div>
      </div>
    </header>
  )
}
export default AnnouncementBar
