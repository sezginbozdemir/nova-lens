import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import Image from "next/image"

export default async function FeaturedProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const types = ["new", "sale"]

  return (
    <div className="overflow-hidden">
      <div className="h2 uppercase text-white content-container">
        Unlock exclusive offers
      </div>

      <ul className="relative overflow-hidden">
        <Image
          src="/decors/main-decor.png"
          width={664}
          height={664}
          alt="Nova  Lens"
          className="z-[0] absolute left-[-12rem] top-0"
        />
        <Image
          src="/decors/main-decor.png"
          width={269}
          height={269}
          alt="Nova  Lens"
          className="z-[0] absolute left-[40%] top-[15%]"
        />
        <Image
          src="/decors/main-decor.png"
          width={549}
          height={549}
          alt="Nova  Lens"
          className="z-[0] absolute right-[-12rem] top-[5rem]"
        />
        <Image
          src="/decors/main-decor.png"
          width={458}
          height={458}
          alt="Nova  Lens"
          className="z-[0] absolute left-[40%] bottom-0"
        />
        <Image
          src="/decors/main-decor.png"
          width={137}
          height={137}
          alt="Nova  Lens"
          className="z-[0] absolute left-[20%] bottom-[3rem]"
        />
        <Image
          src="/decors/main-decor.png"
          width={227}
          height={227}
          alt="Nova  Lens"
          className="absolute right-[-3rem] bottom-[5rem]"
        />
        {types.map((type) => (
          <li key={type}>
            <ProductRail type={type} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
