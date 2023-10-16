import { Shell } from "@/components/ui/shell"
import Billboard from "@/components/billboards"
import { getBillboardsAction } from "@/app/_actions/billboard"

export default async function HomePage() {
  const responses = await Promise.all([getBillboardsAction()])
  const billboards = responses[0]
  return (
    <Shell>
      <Billboard billboards={billboards} />
    </Shell>
  )
}
