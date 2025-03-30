import InteractiveLink from "@modules/common/components/interactive-link"
import Image from "next/image"

const Collections = ({ collections }: { collections: any[] }) => {
  if (!collections || collections.length === 0) return null

  return (
    <div className="flex flex-col gap-8 content-container">
      <div className="flex flex-col gap-5">
        <span className="h2 text-white uppercase">Our collaborations</span>
        <span className="body opacity-[0.8] text-white w-1/2">
          NovaLens proudly collaborates with the world's leading artists,
          athletes, streamers, and brands to create exclusive and limited-time
          collections.
        </span>
      </div>

      <ul className="flex flex-col gap-8">
        {collections.map((c, index) => {
          const backgroundColors = ["#9C52F2", "#4C52FB"]
          const blurImages = ["/images/blur-01.png", "/images/blur-02.png"]
          const descriptions = [
            "“A fusion of iconic style and futuristic flair” ",
            "“Sunglasses that redefine eyewear fashion”",
            "“Sunglasses that exude confidence and style”",
          ]

          const bgColor = backgroundColors[index % backgroundColors.length]
          const blurImage = blurImages[index % blurImages.length]
          const description = descriptions[index % descriptions.length]

          return (
            <li
              key={c.id}
              className="overflow-hidden flex-col xsmall:flex-row flex justify-between items-center w-full xsmall:h-[400px] h-[610px] rounded-[30px]"
              style={{ backgroundColor: bgColor }}
            >
              <div
                className={`relative order-2 xsmall:self-center ${
                  index % 2 === 1 ? "self-end" : "self-start"
                } ${index % 2 === 1 ? "xsmall:order-2" : "xsmall:order-1"}`}
              >
                <Image
                  src={`/images/${c.handle}.png`}
                  width={410}
                  height={470}
                  alt="Nova Lens"
                  className="relative z-[5] xsmall:w-[410px] xsmall:h-[470px] w-[240px] h-[285px]"
                />
                <Image
                  src={blurImage}
                  width={470}
                  height={470}
                  alt="Nova Lens"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"
                />
              </div>

              <div
                className={`relative order-1 flex flex-col gap-[5rem] items-center pt-[2rem] xsmall:pt-0 px-[1rem] xsmall:px-[5rem] ${
                  index % 2 === 1 ? "xsmall:order-1" : "xsmall:order-2"
                }`}
              >
                <span className="relative z-[5] h2 text-white">
                  {c.title} x NovaLens
                </span>
                <div className="relative z-[5]">
                  <InteractiveLink href={`/collections/${c.handle}`}>
                    SEE COLLECTION
                  </InteractiveLink>
                </div>
                <span className="relative z-[5] body text-white">
                  {description}
                </span>
                <Image
                  src={`/images/${c.handle}-01.png`}
                  width={350}
                  height={350}
                  alt="Nova Lens"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Collections
