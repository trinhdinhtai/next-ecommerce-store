import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"

import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import ThemeProvider from "@/components/providers/theme-provider"
import ToasterProvider from "@/components/providers/toaster-provider"

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
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
