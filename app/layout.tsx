import "./globals.css"

import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import ModalProvider from "@/components/providers/modal-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import ToastProvider from "@/components/providers/toast-provider"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const inter = Inter({ subsets: ["latin"] })

const { SITE_NAME } = process.env

export const metadata: Metadata = {
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  description: "A simple e-commerce site built with Next.js and Tailwind CSS.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider />
          <ModalProvider />
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
          <Footer />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
