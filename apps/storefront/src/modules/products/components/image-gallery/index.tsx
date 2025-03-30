import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative w-full h-full">
      <div className="flex flex-col h-full w-full">
        {images.map((image, index) => {
          return (
            <div
              key={image.id}
              className="bg-gradient-to-b from-[#9C52F2] to-[#FFFFFF] rounded-[10px] p-[1px] w-full h-full shadow-[0px_18px_27px_0px_rgba(156,82,242,0.2)]"
            >
              <Container
                className="backdrop-blur-[14px] relative aspect-[1/1] rounded-[10px]  w-full h-full overflow-hidden  bg-[#4b405f]"
                id={image.id}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index <= 2 ? true : false}
                    className="absolute inset-0 rounded-[10px]"
                    alt={`Product image ${index + 1}`}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                )}
              </Container>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
