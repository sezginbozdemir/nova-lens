import { getCategoryByHandle } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "./get-product-price"

interface MinPricedProduct extends HttpTypes.StoreProduct {
  _minPrice?: number
}
async function getCategories(filters: string) {
  const shapeFilters = (filters || "")
    .split(",")
    .map((filter) => filter.trim())
    .filter((filter) => filter.startsWith("shape-"))
    .map((filter) => filter.replace("shape-", ""))

  const categoryPromises = shapeFilters.map((shape) =>
    getCategoryByHandle([shape])
  )
  const categoryResults = await Promise.all(categoryPromises)
  return categoryResults.filter((cat) => cat !== undefined)
}
function getActiveFilters(filters: string): string[] {
  const filterArray = filters.split(",").map((filter) => filter.trim())
  const activeFilters: string[] = []

  if (filterArray.includes("new")) {
    activeFilters.push("new")
  }
  if (filterArray.includes("sale")) {
    activeFilters.push("sale")
  }

  return activeFilters
}

export async function filterProducts(
  products: HttpTypes.StoreProduct[],
  filters: string
): Promise<HttpTypes.StoreProduct[]> {
  const today = new Date()
  const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7))
  let filteredProducts = products as MinPricedProduct[]

  const productCategories = await getCategories(filters)
  const activeFilters = getActiveFilters(filters)

  if (!filters) return filteredProducts

  if (productCategories.length > 0) {
    const allCategoryProducts = productCategories
      .flatMap((category) => category.products)
      .filter((product): product is MinPricedProduct => product !== undefined)

    filteredProducts = filteredProducts.filter((product) =>
      allCategoryProducts.some(
        (categoryProduct) => categoryProduct.id === product.id
      )
    )
  }
  if (activeFilters.includes("new")) {
    filteredProducts = filteredProducts.filter((product) => {
      const createdAt = product.created_at
      if (createdAt) {
        const productCreatedAt = new Date(createdAt)
        return productCreatedAt >= sevenDaysAgo
      }
      return false
    })
  }
  if (activeFilters.includes("sale")) {
    filteredProducts = filteredProducts.filter((product) => {
      const { cheapestPrice } = getProductPrice({ product })
      return cheapestPrice?.price_type === "sale"
    })
  }
  const filterGroups: Record<string, any[]> = {}

  const filterArray = filters.split(",").map((filter) => filter.trim())

  filterArray.forEach((filter) => {
    const parts = filter.split("-")
    const category = parts[0]

    if (!filterGroups[category]) {
      filterGroups[category] = []
    }

    if (category === "price" && parts.length === 3) {
      const minPrice = Number(parts[1])
      const maxPrice = Number(parts[2])
      filterGroups[category].push({ min: minPrice, max: maxPrice })
    } else if (parts.length > 1) {
      filterGroups[category].push(parts[1])
    }
  })

  return filteredProducts.filter((product) => {
    return Object.entries(filterGroups).every(([category, values]) => {
      switch (category) {
        case "collection":
          return values.some((value) =>
            value
              .toLowerCase()
              .startsWith(product.collection?.handle.toLowerCase())
          )

        case "brand":
          return values.some((value) =>
            product.tags?.some((tag) => tag.value.startsWith(`brand:${value}`))
          )

        case "frame":
          return values.some((value) =>
            product.tags?.some((tag) => tag.value.startsWith(`frame:${value}`))
          )

        case "price":
          return values.some((priceRange) => {
            return product.variants?.some((variant) => {
              const price = variant.calculated_price?.calculated_amount || 0

              const matches = price >= priceRange.min && price <= priceRange.max
              return matches
            })
          })
        case "lens":
          return values.some((value) => product.type?.value.startsWith(value))

        default:
          return true
      }
    })
  })
}
