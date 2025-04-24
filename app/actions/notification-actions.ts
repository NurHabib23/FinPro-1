"use server"

import { getSupabaseServerClient } from "@/lib/supabase"

export async function subscribeToNotifications(userId: string, subscription: PushSubscription) {
  const supabase = getSupabaseServerClient()

  try {
    // Store the subscription in the database
    const { error } = await supabase.from("push_subscriptions").insert({
      user_id: userId,
      subscription: JSON.stringify(subscription),
    })

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error subscribing to notifications:", error)
    return { success: false, error }
  }
}

export async function unsubscribeFromNotifications(userId: string, endpoint: string) {
  const supabase = getSupabaseServerClient()

  try {
    // Remove the subscription from the database
    const { error } = await supabase
      .from("push_subscriptions")
      .delete()
      .match({ user_id: userId })
      .filter("subscription->endpoint", "eq", endpoint)

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error unsubscribing from notifications:", error)
    return { success: false, error }
  }
}
