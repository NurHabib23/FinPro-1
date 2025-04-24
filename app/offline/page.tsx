import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <Logo size="lg" className="mb-8" />
      <h1 className="text-3xl font-bold mb-4">You're offline</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        It looks like you're currently offline. Please check your internet connection and try again.
      </p>
      <Button asChild>
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  )
}
