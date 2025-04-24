"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import type { Resume, ResumeAnalysis } from "@/types/database"
import { revalidatePath } from "next/cache"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function uploadResume(userId: string, file: File) {
  const supabase = getSupabaseServerClient()

  // Upload file to Supabase Storage
  const fileName = `${userId}-${Date.now()}-${file.name}`
  const { data: uploadData, error: uploadError } = await supabase.storage.from("resumes").upload(fileName, file)

  if (uploadError) {
    console.error("Error uploading resume:", uploadError)
    throw new Error(uploadError.message)
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("resumes").getPublicUrl(fileName)

  // Create resume record in database
  const { data: resumeData, error: resumeError } = await supabase
    .from("resumes")
    .insert([
      {
        user_id: userId,
        file_url: publicUrl,
        file_name: file.name,
        file_type: file.type,
        analyzed: false,
      },
    ])
    .select()
    .single()

  if (resumeError) {
    console.error("Error creating resume record:", resumeError)
    throw new Error(resumeError.message)
  }

  // Trigger analysis in the background
  analyzeResume(resumeData.id, publicUrl).catch((error) => console.error("Error analyzing resume:", error))

  revalidatePath("/dashboard")
  return resumeData as Resume
}

export async function analyzeResume(resumeId: string, fileUrl: string) {
  const supabase = getSupabaseServerClient()

  try {
    // Get resume content (this would need to be implemented based on file type)
    const resumeContent = await fetchResumeContent(fileUrl)

    // Use AI to analyze the resume
    const analysis = await analyzeResumeWithAI(resumeContent)

    // Store analysis results
    const { data, error } = await supabase
      .from("resume_analysis")
      .insert([
        {
          resume_id: resumeId,
          skills: analysis.skills,
          experience: analysis.experience,
          education: analysis.education,
          summary: analysis.summary,
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    // Mark resume as analyzed
    await supabase.from("resumes").update({ analyzed: true }).eq("id", resumeId)

    revalidatePath("/dashboard")
    return data as ResumeAnalysis
  } catch (error) {
    console.error("Error analyzing resume:", error)
    throw error
  }
}

async function fetchResumeContent(fileUrl: string): Promise<string> {
  // This is a simplified implementation
  // In a real application, you would need to handle different file types (PDF, DOCX, etc.)
  const response = await fetch(fileUrl)
  const text = await response.text()
  return text
}

async function analyzeResumeWithAI(resumeContent: string) {
  // Use AI SDK to analyze the resume
  const prompt = `
    Analyze the following resume and extract:
    1. A list of skills
    2. Work experience details (title, company, duration, description)
    3. Education details (degree, institution, year)
    4. A brief professional summary

    Resume:
    ${resumeContent}

    Format your response as a JSON object with the following structure:
    {
      "skills": ["skill1", "skill2", ...],
      "experience": [
        {
          "title": "Job Title",
          "company": "Company Name",
          "duration": "Start Date - End Date",
          "description": "Job description"
        },
        ...
      ],
      "education": [
        {
          "degree": "Degree Name",
          "institution": "Institution Name",
          "year": "Graduation Year"
        },
        ...
      ],
      "summary": "Professional summary"
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
    // Fallback with empty structure
    return {
      skills: [],
      experience: [],
      education: [],
      summary: "Could not analyze resume properly.",
    }
  }
}

export async function getResumesByUserId(userId: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resumes:", error)
    return []
  }

  return data as Resume[]
}

export async function getResumeAnalysis(resumeId: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("resume_analysis").select("*").eq("resume_id", resumeId).single()

  if (error) {
    console.error("Error fetching resume analysis:", error)
    return null
  }

  return data as ResumeAnalysis
}
