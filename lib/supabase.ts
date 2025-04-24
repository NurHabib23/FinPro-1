import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a single supabase client for the entire session for browser
let browserClient: ReturnType<typeof createClient> | null = null
let serverClient: ReturnType<typeof createClient> | null = null

// Server-side Supabase client (for use in Server Components and Server Actions)
export function getSupabaseServerClient() {
  if (typeof window !== "undefined") {
    // We're on the client side, use the browser client
    return getSupabaseBrowserClient()
  }

  if (!serverClient) {
    // Create a new server client
    serverClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        },
      },
    )
  }

  return serverClient
}

// Browser-side Supabase client (for use in Client Components)
export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient

  browserClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return browserClient
}
