import { currentUser } from "@clerk/nextjs"

export default async function HomePage() {
  const user = await currentUser()
  return <div>HomePage</div>
}
