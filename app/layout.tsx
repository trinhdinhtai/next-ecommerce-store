import "./globals.css"

import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import ModalProvider from "@/components/providers/modal-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import ToasterProvider from "@/components/providers/toaster-provider"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import { TailwindIndicator } from "@/components/tailwind-indicator"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: env.SITE_NAME,
    template: `%s - ${env.SITE_NAME}`,
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
      <body
        className={cn(
          inter.variable,
          "relative flex min-h-screen flex-col font-sans"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <ModalProvider />
          <Navbar />
          <Suspense>
            <main className="flex-1">{children}</main>
          </Suspense>
          <Footer />
          <ScrollToTopButton />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
