import Image from "next/image"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import LogoIcon from "@/components/icons/logo"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-3">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/auth-layout.webp"
          alt="A skateboarder doing a high drop"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/60 md:to-black/40" />
        <Link
          href="/"
          className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
        >
          <LogoIcon className="h-8 fill-white" />
        </Link>
      </AspectRatio>

      <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center lg:static lg:top-0 lg:col-span-2 lg:flex lg:translate-y-0">
        {children}
      </main>
    </div>
  )
}
