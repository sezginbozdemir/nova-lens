import { ContactTemplate } from "@modules/contact/templates"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us",
}

export default async function ContactPage() {
  return <ContactTemplate />
}
