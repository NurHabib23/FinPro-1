import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"

// Create a single supabase client for the entire session for browser
let browserClient: ReturnType<typeof createClient> | null = null

// Server-side Supabase client for Pages Router API routes
export function getSupabaseServerClient(
  context?:
    | {
        req: NextApiRequest
        res: NextApiResponse
      }
    | GetServerSidePropsContext,
) {
  // For Pages Router, we need to create a basic client
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
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
