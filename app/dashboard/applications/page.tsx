import { getSupabaseServerClient } from "@/lib/supabase"
import { ApplicationList } from "@/components/applications/application-list"

export default async function ApplicationsPage() {
  const supabase = getSupabaseServerClient()

  // Get current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>

      <ApplicationList userId={session.user.id} />

      <div className="mt-8 text-center text-sm text-muted-foreground">Powered by Unimedium Digital</div>
    </div>
  )
}
