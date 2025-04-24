import { getSupabaseServerClient } from "@/lib/supabase"
import { getResumesByUserId } from "@/app/actions/resume-actions"
import { getJobMatches } from "@/app/actions/job-actions"
import { getJobApplications } from "@/app/actions/job-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResumeUpload } from "@/components/resume/resume-upload"
import Link from "next/link"
import { FileText, Briefcase, ClipboardList, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient()

  // Get current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  // Get user data
  const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  // Get user's resumes
  const resumes = await getResumesByUserId(session.user.id)

  // Get job matches
  const matches = await getJobMatches(session.user.id)

  // Get job applications
  const applications = await getJobApplications(session.user.id)

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
            <p className="text-xs text-muted-foreground">
              {resumes.length === 0
                ? "No resumes uploaded"
                : `${resumes.length} resume${resumes.length > 1 ? "s" : ""} uploaded`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matches.length}</div>
            <p className="text-xs text-muted-foreground">
              {matches.length === 0
                ? "No job matches found"
                : `${matches.length} job match${matches.length > 1 ? "es" : ""} found`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              {applications.length === 0
                ? "No applications submitted"
                : `${applications.length} application${applications.length > 1 ? "s" : ""} submitted`}
            </p>
          </CardContent>
        </Card>
      </div>

      {resumes.length === 0 ? (
        <ResumeUpload userId={session.user.id} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Matches</CardTitle>
              <CardDescription>Jobs that match your skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              {matches.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No job matches found yet.</p>
                  <Button asChild className="mt-4">
                    <Link href="/dashboard/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.slice(0, 3).map((match: any) => (
                    <div key={match.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{match.jobs.title}</p>
                        <p className="text-sm text-muted-foreground">{match.jobs.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{match.match_score}%</span>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/jobs/${match.job_id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" asChild className="w-full mt-2">
                    <Link href="/dashboard/jobs">View All Jobs</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No applications submitted yet.</p>
                  <Button asChild className="mt-4">
                    <Link href="/dashboard/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 3).map((application: any) => (
                    <div key={application.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{application.jobs.title}</p>
                        <p className="text-sm text-muted-foreground">{application.jobs.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href="/dashboard/applications">
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" asChild className="w-full mt-2">
                    <Link href="/dashboard/applications">View All Applications</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-muted-foreground">Powered by Unimedium Digital</div>
    </div>
  )
}
