"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Eye, Download, Loader2 } from "lucide-react"
import { ResumeAnalysisView } from "@/components/resume/resume-analysis"
import type { Resume } from "@/types/database"
import { format } from "date-fns"

interface ResumeListProps {
  resumes: Resume[]
  userId: string
}

export function ResumeList({ resumes, userId }: ResumeListProps) {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  if (resumes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p>You haven't uploaded any resumes yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Upload your resume to get started with AI-powered job matching.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Resumes</CardTitle>
          <CardDescription>Manage your uploaded resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{resume.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded on {format(new Date(resume.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.analyzed ? (
                    <Button variant="outline" size="sm" onClick={() => setSelectedResumeId(resume.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Analysis
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" asChild>
                    <a href={resume.file_url} target="_blank" rel="noopener noreferrer" download>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedResumeId} onOpenChange={(open) => !open && setSelectedResumeId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Resume Analysis</DialogTitle>
            <DialogDescription>AI-powered analysis of your resume</DialogDescription>
          </DialogHeader>
          {selectedResumeId && <ResumeAnalysisView resumeId={selectedResumeId} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
