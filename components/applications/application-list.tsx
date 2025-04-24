"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Briefcase, Calendar, Building, FileText } from "lucide-react"
import { getJobApplications, updateJobApplication } from "@/app/actions/job-actions"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface ApplicationListProps {
  userId: string
}

export function ApplicationList({ userId }: ApplicationListProps) {
  const { toast } = useToast()
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getJobApplications(userId)
        setApplications(data)
      } catch (err: any) {
        setError(err.message || "Failed to load applications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [userId])

  const handleStatusChange = async (applicationId: string, status: string) => {
    try {
      await updateJobApplication(applicationId, { status: status as any })

      // Update local state
      setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status } : app)))

      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const filteredApplications =
    activeTab === "all" ? applications : applications.filter((app) => app.status === activeTab)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p>You haven't applied to any jobs yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Browse jobs and submit applications to track them here.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
          <TabsTrigger value="offered">Offered</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-6">
                  <p>No applications in this category.</p>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle>{application.jobs.title}</CardTitle>
                        <CardDescription>{application.jobs.company}</CardDescription>
                      </div>
                      <Badge className={getStatusBadgeClass(application.status)}>
                        {formatStatus(application.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Applied: {format(new Date(application.applied_at), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{application.jobs.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{application.jobs.job_type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{application.resumes.file_name}</span>
                        </div>
                      </div>

                      {application.notes && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">Notes:</h4>
                          <p className="text-sm text-muted-foreground">{application.notes}</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <Button variant="outline" asChild size="sm">
                          <Link href={`/dashboard/jobs/${application.job_id}`}>View Job</Link>
                        </Button>

                        <div className="flex items-center gap-2">
                          <span className="text-sm">Status:</span>
                          <Select
                            value={application.status}
                            onValueChange={(value) => handleStatusChange(application.id, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="applied">Applied</SelectItem>
                              <SelectItem value="interviewing">Interviewing</SelectItem>
                              <SelectItem value="offered">Offered</SelectItem>
                              <SelectItem value="accepted">Accepted</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "applied":
      return "bg-blue-500"
    case "interviewing":
      return "bg-purple-500"
    case "offered":
      return "bg-green-500"
    case "accepted":
      return "bg-emerald-500"
    case "rejected":
      return "bg-red-500"
    default:
      return ""
  }
}
