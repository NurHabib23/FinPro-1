export type User = {
  id: string
  email: string
  username: string
  full_name?: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Resume = {
  id: string
  user_id: string
  file_url: string
  file_name: string
  file_type: string
  analyzed: boolean
  created_at: string
  updated_at: string
}

export type ResumeAnalysis = {
  id: string
  resume_id: string
  skills: string[]
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  summary: string
  created_at: string
  updated_at: string
}

export type Job = {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary_range?: string
  job_type: string
  remote: boolean
  url?: string
  created_at: string
  updated_at: string
}

export type JobApplication = {
  id: string
  user_id: string
  job_id: string
  resume_id: string
  status: "applied" | "interviewing" | "offered" | "rejected" | "accepted"
  notes?: string
  applied_at: string
  created_at: string
  updated_at: string
}

export type JobMatch = {
  id: string
  user_id: string
  job_id: string
  resume_id: string
  match_score: number
  match_reasons: {
    skill: string
    relevance: number
  }[]
  created_at: string
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  read: boolean
  created_at: string
}

export type Link = {
  id: string
  user_id: string
  title: string
  url: string
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}
