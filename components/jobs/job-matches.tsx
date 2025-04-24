"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Building, DollarSign, Clock, ArrowRight } from "lucide-react"
import { getJobMatches } from "@/app/actions/job-actions"
import Link from "next/link"

interface JobMatchesProps {
  userId: string
}

export function JobMatches({ userId }: JobMatchesProps) {
  const [matches, setMatches] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await getJobMatches(userId)
        setMatches(data)
      } catch (err: any) {
        setError(err.message || "Failed to load job matches")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [userId])

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
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Matches</CardTitle>
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

  if (matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p>No job matches found.</p>
            <p className="text-sm text-muted-foreground mt-2">Upload your resume to get matched with jobs.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Card key={match.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{match.jobs.title}</CardTitle>
                <CardDescription>{match.jobs.company}</CardDescription>
              </div>
              <Badge variant={getMatchBadgeVariant(match.match_score)}>{match.match_score}% Match</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Progress value={match.match_score} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{match.jobs.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{match.jobs.company}</span>
                </div>
                {match.jobs.salary_range && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{match.jobs.salary_range}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{match.jobs.job_type}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Matching Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {match.match_reasons.slice(0, 5).map((reason: any, index: number) => (
                    <Badge key={index} variant="outline">
                      {reason.skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="line-clamp-3 text-sm text-muted-foreground">{match.jobs.description}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/dashboard/jobs/${match.jobs.id}`}>
                View Job <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function getMatchBadgeVariant(score: number) {
  if (score >= 80) return "success"
  if (score >= 60) return "default"
  if (score >= 40) return "secondary"
  return "outline"
}
