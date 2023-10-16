import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import ModalProvider from "@/components/providers/modal-provider"
import ThemeProvider from "@/components/providers/theme-provider"
import ToasterProvider from "@/components/providers/toaster-provider"
import TailwindIndicator from "@/components/tailwind-indicator"

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.variable,
            "relative flex min-h-screen flex-col font-sans"
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ModalProvider />
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
