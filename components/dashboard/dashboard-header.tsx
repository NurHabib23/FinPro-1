"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"
import { SocialShare } from "@/components/social-share"

type DashboardHeaderProps = {
  username?: string
}

export function DashboardHeader({ username = "yourname" }: DashboardHeaderProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const profileUrl = `${process.env.NEXT_PUBLIC_API_URL}/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Your profile URL has been copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Logo size="sm" />
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your LinkPro profile</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 md:w-80">
          <Input value={profileUrl} readOnly className="pr-20" />
          <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full" onClick={copyToClipboard}>
            <Copy size={16} className="mr-1" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        <SocialShare url={profileUrl} title={`Check out my LinkPro profile: ${username}`} />

        <Button variant="outline" size="icon" asChild>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} />
          </a>
        </Button>
      </div>
    </div>
  )
}
