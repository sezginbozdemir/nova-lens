import Image from "next/image"

interface Review {
  id: number
  name: string
  review: string
}

const ClientReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Alena Kenter",
      review:
        "Love these NovaView sunglasses! Stylish design, great comfort, and excellent UV protection.",
    },
    {
      id: 2,
      name: "Wilson Workman",
      review:
        "NovaView sunglasses stand out! Eye-catching colors, comfortable fit, and unmatched style",
    },
    {
      id: 3,
      name: "Lydia Siphron",
      review:
        "Obsessed with my NovaView shades! Modern design, clear lenses, and super comfy fit.",
    },
  ]

  return (
    <div className="content-container mt-[3rem]">
      <h2 className="text-white uppercase h2 mb-8">clients reviews</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-5 bg-[var(--accent-half)] p-[32px] rounded-[10px]"
          >
            <Image
              src="/icons/5star.png"
              width={140}
              height={25}
              alt="Nova Lens"
            />
            <p className="text-white review-body opacity-[0.8]">
              "{review.review}"
            </p>
            <h3 className="review-body text-white">{review.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientReviews
