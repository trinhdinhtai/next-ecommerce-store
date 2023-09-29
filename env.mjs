// https://env.t3.gg/docs/nextjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_API_URL: z.string().url().min(1),
    SITE_NAME: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    SITE_NAME: process.env.SITE_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
