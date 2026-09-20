import { auth } from '@/lib/auth/server'
import DashboardContent from './dashboard-content'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const { data: session } = await auth.getSession()
  const userName = session?.user?.name?.trim() || 'there'

  return <DashboardContent userName={userName} />
}
