import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getRegion } from "@lib/data/regions"
import { listCollections } from "@lib/data/collections"
import Collections from "@modules/home/components/collections"
import Categories from "@modules/home/components/categories"
import { listCategories } from "@lib/data/categories"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
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

  return (
    <>
      <Categories categories={categories} />
      <Collections collections={collections} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts region={region} />
        </ul>
      </div>
    </>
  )
}
