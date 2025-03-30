import { ArrowUpRightMini } from "@medusajs/icons"

const Newsletter = () => {
  return (
    <div className="w-full h-[490px] gap-[2rem] flex flex-col items-center justify-center text-center bg-[var(--accent-half)]">
      <div className="flex flex-col">
        <div className="h2 text-white uppercase">Join the</div>
        <div className="h2 text-white uppercase">novalens community</div>
        <div className="h3 text-white uppercase opacity-[0.8]">
          0% SPAM. 100% NovaLens.
        </div>
      </div>
      <div className="flex flex-col body  text-white opacity-[0.8]">
        <div>
          For a clutter-free inbox, we send only the essentials: unmissable
        </div>
        <div>promotions and mind-blowing news.</div>
      </div>
      <div className="group relative xsmall:w-[370px]">
        <input
          placeholder="email"
          className="text-white p-[1rem] pr-[3rem] w-full h-[30px] rounded-full border border-white bg-transparent focus:outline-none"
        />
        <ArrowUpRightMini
          className="absolute right-4 top-1/2 -translate-y-1/2 group-hover:rotate-45 ease-in-out duration-150"
          color="var(--accent)"
        />
      </div>
    </div>
  )
}
export default Newsletter
