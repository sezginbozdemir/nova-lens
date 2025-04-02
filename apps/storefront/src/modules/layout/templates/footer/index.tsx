import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/store" },
    { title: "Contact Us", href: "/" },
  ]
  const contactLinks = [
    { title: "FAQ’s", href: "/" },
    { title: "Contact services", href: "/" },
  ]

  return (
    <footer className="w-full mt-[8rem]">
      <div className="content-container gap-[3rem] flex flex-col w-full">
        <div className="flex flex-col xsmall:flex-row items-start justify-between gap-[3rem]">
          <div className="gap-[2rem] flex flex-col">
            <LocalizedClientLink href="/">
              <Image
                src="/images/logo.png"
                width={130}
                height={37}
                alt="Nova Lens"
              />
            </LocalizedClientLink>
            <div className=" flex flex-col body text-white">
              <span>123 Main Street,</span>
              <span>Springfield, Anytown,</span>
              <span>USA, 12345</span>
              <span className="flex gap-[1rem] mt-[1rem]">
                <Image
                  src="/icons/facebook.png"
                  width={25}
                  height={25}
                  alt="Nova Lens"
                />
                <Image
                  src="/icons/instagram.png"
                  width={25}
                  height={25}
                  alt="Nova Lens"
                />
                <Image
                  src="/icons/twitter.png"
                  width={25}
                  height={25}
                  alt="Nova Lens"
                />
              </span>
            </div>
            <div className="flex gap-[1rem]">
              <Image
                src="/icons/paypal.png"
                width={25}
                height={25}
                alt="Nova Lens"
              />
              <Image
                src="/icons/visa.png"
                width={25}
                height={25}
                alt="Nova Lens"
              />
              <Image
                src="/icons/mastercard.png"
                width={25}
                height={25}
                alt="Nova Lens"
              />
            </div>
          </div>
          <div className="gap-10 md:gap-x-16 flex flex-wrap">
            <div className="flex flex-col gap-8">
              <span className="h3 text-white">LINKS</span>
              <ul
                className={clx("grid grid-cols-1 gap-2", {
                  "grid-cols-2": (navLinks?.length || 0) > 3,
                })}
              >
                {navLinks?.map((link) => (
                  <li key={link.title}>
                    <LocalizedClientLink
                      className="hover:text-[var(--accent-half)] body text-white"
                      href={link.href}
                    >
                      {link.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
            {productCategories! && productCategories?.length > 0 && (
              <div className="flex flex-col gap-8">
                <span className="h3 text-white">CATEGORIES</span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li className="flex flex-col gap-2" key={c.id}>
                        <LocalizedClientLink
                          className="body text-white hover:text-[var(--accent-half)]"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-8">
                <span className="h3 text-white">COLLABS</span>
                <ul
                  className={clx("grid grid-cols-1 gap-2", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-[var(--accent-half)] body text-white"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-8">
              <span className="h3 text-white">CONTACT</span>
              <ul
                className={clx("grid grid-cols-1 gap-2", {
                  "grid-cols-2": (contactLinks?.length || 0) > 3,
                })}
              >
                {contactLinks?.map((link) => (
                  <li key={link.title}>
                    <LocalizedClientLink
                      className="hover:text-[var(--accent-half)] body text-white"
                      href={link.href}
                    >
                      {link.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white opacity-[0.6] h-[1px] w-full" />
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted flex-wrap gap-[2rem]">
          <div className="body text-[#7D7C79E5]">
            Copyright NovaLens. ©{new Date().getFullYear()}. All rights
            reserved.
          </div>
          <div className="flex justify-between gap-[3rem] flex-wrap">
            <div className="text-white body">Privacy Policy</div>
            <div className="text-white body">Cookies</div>
            <div className="text-white body">Conditions</div>
            <div className="text-white body">Refunds</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
