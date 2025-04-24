export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          file_url: string
          file_name: string
          file_type: string
          analyzed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          file_name: string
          file_type: string
          analyzed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          file_name?: string
          file_type?: string
          analyzed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      resume_analysis: {
        Row: {
          id: string
          resume_id: string
          skills: Json
          experience: Json
          education: Json
          summary: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resume_id: string
          skills: Json
          experience: Json
          education: Json
          summary: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resume_id?: string
          skills?: Json
          experience?: Json
          education?: Json
          summary?: string
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          description: string
          requirements: Json
          salary_range: string | null
          job_type: string
          remote: boolean
          url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          description: string
          requirements: Json
          salary_range?: string | null
          job_type: string
          remote?: boolean
          url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          description?: string
          requirements?: Json
          salary_range?: string | null
          job_type?: string
          remote?: boolean
          url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          user_id: string
          job_id: string
          resume_id: string
          status: string
          notes: string | null
          applied_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          resume_id: string
          status?: string
          notes?: string | null
          applied_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          resume_id?: string
          status?: string
          notes?: string | null
          applied_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      job_matches: {
        Row: {
          id: string
          user_id: string
          job_id: string
          resume_id: string
          match_score: number
          match_reasons: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          resume_id: string
          match_score: number
          match_reasons: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          resume_id?: string
          match_score?: number
          match_reasons?: Json
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}
