"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { getResumeAnalysis } from "@/app/actions/resume-actions"
import type { ResumeAnalysis } from "@/types/database"

interface ResumeAnalysisViewProps {
  resumeId: string
}

export function ResumeAnalysisView({ resumeId }: ResumeAnalysisViewProps) {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const data = await getResumeAnalysis(resumeId)
        setAnalysis(data)
      } catch (err: any) {
        setError(err.message || "Failed to load resume analysis")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, [resumeId])

  if (isLoading) {
    return <ResumeAnalysisSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resume Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Please try uploading your resume again.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resume Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p>Your resume is still being analyzed.</p>
            <p className="text-sm text-muted-foreground mt-2">
              This process may take a few minutes. Please check back soon.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Analysis</CardTitle>
        <CardDescription>AI-powered analysis of your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <p>{analysis.summary}</p>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-4">
            <div className="space-y-4">
              {analysis.experience.map((exp, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{exp.title}</h3>
                    <span className="text-sm text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                  <p className="mt-2 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-4">
            <div className="space-y-4">
              {analysis.education.map((edu, index) => (
                <div key={index} className="border rounded-md p-4">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ResumeAnalysisSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Analysis</CardTitle>
        <CardDescription>AI-powered analysis of your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <Skeleton className="h-[100px] w-full" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
