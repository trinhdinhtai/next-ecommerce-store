// https://env.t3.gg/docs/nextjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    STORE_ID: z.string().min(1),
    SITE_NAME: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    STORE_ID: process.env.STORE_ID,
    SITE_NAME: process.env.SITE_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
