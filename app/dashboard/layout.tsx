import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { getSupabaseServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = getSupabaseServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth/login")
  }

  // Get user data
  const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  if (!userData) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={userData} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
