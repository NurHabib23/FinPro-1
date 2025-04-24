import { getSupabaseServerClient } from "@/lib/supabase"
import { getResumesByUserId } from "@/app/actions/resume-actions"
import { ResumeUpload } from "@/components/resume/resume-upload"
import { ResumeList } from "@/components/resume/resume-list"

export default async function ResumesPage() {
  const supabase = getSupabaseServerClient()

  // Get current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  // Get user's resumes
  const resumes = await getResumesByUserId(session.user.id)

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Resumes</h1>

      <div className="space-y-6">
        <ResumeUpload userId={session.user.id} />
        <ResumeList resumes={resumes} userId={session.user.id} />
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">Powered by Unimedium Digital</div>
    </div>
  )
}
