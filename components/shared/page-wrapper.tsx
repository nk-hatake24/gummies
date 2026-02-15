import type { ReactNode } from "react"
import { HeaderWrapper } from "@/components/layout/header.server"
import { Footer } from "@/components/layout/footer"
import PageWrapperClient from "./page-wrapper.client"

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderWrapper />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <PageWrapperClient />
    </>
  )
}
