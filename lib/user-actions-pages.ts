import { getSupabaseServerClient } from "@/lib/supabase-utils"
import type { User } from "@/types/database"

export async function createUser(userData: {
  id: string
  email: string
  username: string
  full_name?: string
  bio?: string
  avatar_url?: string
}) {
  const supabase = getSupabaseServerClient()

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("*").eq("id", userData.id).single()

    if (existingUser) {
      // User already exists, update instead
      return updateUser(userData.id, userData)
    }

    // Create new user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: userData.id,
          email: userData.email,
          username: userData.username,
          full_name: userData.full_name || null,
          bio: userData.bio || null,
          avatar_url: userData.avatar_url || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating user:", error)
      throw new Error(error.message)
    }

    return data as User
  } catch (error: any) {
    console.error("Error in createUser:", error)
    throw new Error(error.message || "Failed to create user")
  }
}

export async function updateUser(
  userId: string,
  updates: {
    username?: string
    full_name?: string
    bio?: string
    avatar_url?: string
  },
) {
  const supabase = getSupabaseServerClient()

  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating user:", error)
      throw new Error(error.message)
    }

    return data as User
  } catch (error: any) {
    console.error("Error in updateUser:", error)
    throw new Error(error.message || "Failed to update user")
  }
}
