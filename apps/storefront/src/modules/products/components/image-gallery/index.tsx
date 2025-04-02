"use client"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const currentImage = images[currentImageIndex]
  return (
    <div className="flex items-start relative w-full h-full">
      <div className="flex flex-col h-full w-full">
        <div className="bg-gradient-to-b from-[#9C52F2] to-[#FFFFFF] rounded-[10px] p-[1px] w-full h-full shadow-[0px_18px_27px_0px_rgba(156,82,242,0.2)]">
          <Container
            className="relative backdrop-blur-[14px] relative aspect-[1/1] rounded-[10px]  w-full h-full overflow-hidden  bg-[#4b405f]"
            id={currentImage.id}
          >
            <div className="absolute bottom-12 left-1/2 flex gap-[10rem] transform -translate-x-1/2 z-[9999]">
              <Image
                alt="Nova Lens"
                src="/icons/double-arrow.png"
                width={20}
                height={20}
                onClick={handlePrevClick}
                className="rotate-180 cursor-pointer"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-[15px] h-[6px] rounded-full ${
                      currentImageIndex === index
                        ? "bg-[#D9D9D9] w-[30px]"
                        : "bg-[#D9D9D9A6]"
                    }`}
                  />
                ))}
              </div>
              <Image
                alt="Nova Lens"
                src="/icons/double-arrow.png"
                width={20}
                height={20}
                onClick={handleNextClick}
                className="cursor-pointer"
              />
            </div>
            {!!currentImage.url && (
              <Image
                src={currentImage.url}
                priority
                className="absolute inset-0 rounded-[10px]"
                alt={`Product image ${currentImageIndex + 1}`}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
