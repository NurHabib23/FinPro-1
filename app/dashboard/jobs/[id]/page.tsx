import { getJobById } from "@/app/actions/job-actions"
import { getResumesByUserId } from "@/app/actions/resume-actions"
import { JobDetail } from "@/components/jobs/job-detail"
import { notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase"

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient()

  // Get current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return notFound()
  }

  // Get job details
  const job = await getJobById(params.id)
  if (!job) {
    return notFound()
  }

  // Get user's resumes
  const resumes = await getResumesByUserId(session.user.id)

  return (
    <div className="container py-6">
      <JobDetail job={job} userId={session.user.id} resumes={resumes} />
    </div>
  )
}
