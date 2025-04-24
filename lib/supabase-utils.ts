// This file is a utility to help determine which Supabase client to use
// It should be imported by pages/ components

import {
  getSupabaseServerClient as getPagesServerClient,
  getSupabaseBrowserClient as getPagesBrowserClient,
} from "./supabase-pages"

export const getSupabaseServerClient = getPagesServerClient
export const getSupabaseBrowserClient = getPagesBrowserClient
