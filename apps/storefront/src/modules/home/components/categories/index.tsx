"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const Categories = ({ categories }: { categories: any[] }) => {
  if (!categories || categories.length === 0) return null
  const scrollRef = useRef<HTMLUListElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
      setScrollProgress(progress)
    }

    scrollRef.current?.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => scrollRef.current?.removeEventListener("scroll", handleScroll)
  }, [])
  const activeIndex = scrollProgress
    ? scrollProgress < 33
      ? 0
      : scrollProgress < 66
      ? 1
      : 2
    : 0

  return (
    <div className="overflow-x-scroll overflow-y-hidden no-scrollbar w-full">
      <div className="relative flex flex-col items-center justify-between content-container w-full gap-[4rem] mt-[5rem] mb-[5rem]">
        <Image
          src="/decors/main-decor.png"
          width={368}
          height={368}
          alt="Nova Lens"
          className="absolute top-[-2rem] left-[-9rem]"
        />
        <Image
          src="/decors/main-decor.png"
          width={305}
          height={305}
          alt="Nova Lens"
          className="absolute  bottom-[-7rem] left-[20%]"
        />
        <Image
          src="/decors/main-decor.png"
          width={350}
          height={350}
          alt="Nova Lens"
          className="absolute hidden xsmall:block top-[-4rem] right-[20%]"
        />
        <Image
          src="/decors/main-decor.png"
          width={493}
          height={493}
          alt="Nova Lens"
          className="absolute bottom-[-8rem] right-[-18rem] hidden xsmall:block"
        />
        <span className="h2 text-white uppercase">Futuristic collections</span>

        <ul
          ref={scrollRef}
          className="flex gap-12 justify-between w-full h-[460px] overflow-x-scroll no-scrollbar min-w-full"
        >
          {categories.map((c) => {
            return (
              <li
                className="w-[350px] flex-shrink-0 p-[1px] rounded-[20px]  bg-gradient-to-b from-[#774ADF] to-[#FFFFFF]"
                key={c.id}
              >
                <Link href={`/categories/${c.handle}`}>
                  <div className="group backdrop-blur-[20px] shadow-[0px_18px_27px_0px_rgba(156,82,242,0.2)] flex h-full w-full items-center justify-center bg-[#4b405f] hover:bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] rounded-[20px] px-[13px] py-[70px]">
                    <div className="flex flex-col items-center justify-center h-full gap-[6rem]">
                      <Image
                        src={`/images/${c.handle}.png`}
                        width={280}
                        height={151}
                        alt="Nova Lens"
                      />

                      <div className="h-[59px] p-[3px] group-hover:p-0 rounded-[100px]  bg-[linear-gradient(178.47deg,_rgba(156,_82,_242,_0.7)_1.3%,_rgba(76,_82,_251,_0.7)_98.77%)]">
                        <div className="flex items-center justify-center body h-full w-full text-white uppercase  rounded-[100px] pt-[16px] pr-[32px] pb-[16px] pl-[32px] border-white bg-[#4b405f] group-hover:bg-gradient-to-b from-[#9C52F2] to-[#4C52FB]">
                          {c.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="xsmall:hidden flex self-start mt-[-1.5rem] gap-2 w-[150px]">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? "42px" : "18px",
                background: index === activeIndex ? "#D9D9D9" : "#D9D9D9A6",
                height: "7px",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
