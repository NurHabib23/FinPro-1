"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import type { Job, JobMatch, JobApplication } from "@/types/database"
import { revalidatePath } from "next/cache"
import { getResumeAnalysis } from "./resume-actions"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function getJobs(filters?: {
  title?: string
  location?: string
  remote?: boolean
  jobType?: string
}) {
  const supabase = getSupabaseServerClient()
  let query = supabase.from("jobs").select("*")

  if (filters) {
    if (filters.title) {
      query = query.ilike("title", `%${filters.title}%`)
    }
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`)
    }
    if (filters.remote !== undefined) {
      query = query.eq("remote", filters.remote)
    }
    if (filters.jobType) {
      query = query.eq("job_type", filters.jobType)
    }
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching jobs:", error)
    return []
  }

  return data as Job[]
}

export async function getJobById(jobId: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("jobs").select("*").eq("id", jobId).single()

  if (error) {
    console.error("Error fetching job:", error)
    return null
  }

  return data as Job
}

export async function matchJobsWithResume(userId: string, resumeId: string) {
  const supabase = getSupabaseServerClient()

  try {
    // Get resume analysis
    const analysis = await getResumeAnalysis(resumeId)
    if (!analysis) {
      throw new Error("Resume analysis not found")
    }

    // Get all jobs
    const jobs = await getJobs()

    // Match jobs with resume
    const matches = await Promise.all(
      jobs.map(async (job) => {
        const matchScore = await calculateMatchScore(analysis, job)
        return {
          user_id: userId,
          job_id: job.id,
          resume_id: resumeId,
          match_score: matchScore.score,
          match_reasons: matchScore.reasons,
        }
      }),
    )

    // Store matches in database
    const { data, error } = await supabase
      .from("job_matches")
      .upsert(matches, { onConflict: "user_id,job_id,resume_id" })
      .select()

    if (error) {
      throw error
    }

    revalidatePath("/dashboard/jobs")
    return data as JobMatch[]
  } catch (error) {
    console.error("Error matching jobs:", error)
    throw error
  }
}

async function calculateMatchScore(analysis: any, job: Job) {
  // Use AI to calculate match score
  const prompt = `
    Calculate how well a candidate's resume matches a job posting.
    
    Resume skills: ${JSON.stringify(analysis.skills)}
    Resume experience: ${JSON.stringify(analysis.experience)}
    Resume education: ${JSON.stringify(analysis.education)}
    Resume summary: ${analysis.summary}
    
    Job title: ${job.title}
    Job company: ${job.company}
    Job description: ${job.description}
    Job requirements: ${JSON.stringify(job.requirements)}
    
    Return a JSON object with:
    1. A match score from 0 to 100
    2. A list of reasons for the match, including specific skills that match
    
    Format:
    {
      "score": 85,
      "reasons": [
        {"skill": "JavaScript", "relevance": 9},
        {"skill": "Project Management", "relevance": 7}
      ]
    }
  `

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: prompt,
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing AI response:", error)
    // Fallback
    return {
      score: 50,
      reasons: [{ skill: "General match", relevance: 5 }],
    }
  }
}

export async function getJobMatches(userId: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("job_matches")
    .select(`
      *,
      jobs:job_id (*)
    `)
    .eq("user_id", userId)
    .order("match_score", { ascending: false })

  if (error) {
    console.error("Error fetching job matches:", error)
    return []
  }

  return data
}

export async function applyToJob(userId: string, jobId: string, resumeId: string, notes?: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("job_applications")
    .insert([
      {
        user_id: userId,
        job_id: jobId,
        resume_id: resumeId,
        status: "applied",
        notes,
        applied_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error applying to job:", error)
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/applications")
  return data as JobApplication
}

export async function getJobApplications(userId: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("job_applications")
    .select(`
      *,
      jobs:job_id (*),
      resumes:resume_id (*)
    `)
    .eq("user_id", userId)
    .order("applied_at", { ascending: false })

  if (error) {
    console.error("Error fetching job applications:", error)
    return []
  }

  return data
}

export async function updateJobApplication(applicationId: string, updates: Partial<JobApplication>) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("job_applications")
    .update(updates)
    .eq("id", applicationId)
    .select()
    .single()

  if (error) {
    console.error("Error updating job application:", error)
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/applications")
  return data as JobApplication
}
