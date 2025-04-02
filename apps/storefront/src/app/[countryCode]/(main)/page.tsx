import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getRegion } from "@lib/data/regions"
import { listCollections } from "@lib/data/collections"
import Collections from "@modules/home/components/collections"
import Categories from "@modules/home/components/categories"
import ProductsSlider from "@modules/home/components/products-slider"
import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Nova Lens",
  description: "Nova Lens",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const { collections } = await listCollections({
    fields: "*products",
  })
  const categories = await listCategories()
  const {
    response: { products },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      limit: 12,
    },
    countryCode,
  })
  return (
    <div className="relative">
      <div className="absolute top-[-4rem] left-0 xsmall:w-[30rem] xsmall:h-[30rem] w-[20rem] h-[20rem]">
        <Image
          src="/decors/corner-decor-01.png"
          sizes="(max-width: 768px) 20rem, 30rem"
          fill
          alt="Nova Lens"
        />
      </div>
      <div className="absolute top-[-4rem] right-0 xsmall:w-[30rem] xsmall:h-[30rem] w-[20rem] h-[20rem]">
        <Image
          src="/decors/corner-decor-02.png"
          fill
          sizes="(max-width: 768px) 20rem, 30rem"
          alt="Nova Lens"
        />
      </div>
      <ProductsSlider products={products} />
      <Categories categories={categories} />
      <Collections collections={collections} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts region={region} />
        </ul>
      </div>
    </div>
  )
}
