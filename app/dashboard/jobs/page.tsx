import { getSupabaseServerClient } from "@/lib/supabase"
import { getResumesByUserId } from "@/app/actions/resume-actions"
import { JobSearch } from "@/components/jobs/job-search"
import { JobMatches } from "@/components/jobs/job-matches"

export default async function JobsPage() {
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
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>

      <div className="space-y-6">
        <JobSearch />

        {resumes.length > 0 ? (
          <JobMatches userId={session.user.id} />
        ) : (
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="mb-2">Upload your resume to get matched with jobs</p>
            <p className="text-sm text-muted-foreground">
              Our AI will analyze your resume and match you with relevant job opportunities.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">Powered by Unimedium Digital</div>
    </div>
  )
}
