type FilterTabsProps = {
  setQueryParams: (name: string, value: string) => void
}
const FilterTabs = ({ setQueryParams }: FilterTabsProps) => {
  const items = ["All", "New", "Sale"]

  return (
    <div className="flex justify-between gap-[1rem]">
      {items.map((item) => (
        <div
          onClick={() => setQueryParams("filters", item)}
          key={item}
          className="relative cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/70 to-blue-500/70"></div>
          <div className="relative rounded-full bg-[var(--dark-purple)] m-0.5 py-[5px] px-[20px]">
            <span className="text-white body">{item}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default FilterTabs
