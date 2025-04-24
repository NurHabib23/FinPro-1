"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { User, FileText, Briefcase, ClipboardList, Settings, Menu, LogOut } from "lucide-react"
import type { User as UserType } from "@/types/database"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface SidebarProps {
  user: UserType
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const routes = [
    {
      label: "Profile",
      icon: User,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Resumes",
      icon: FileText,
      href: "/dashboard/resumes",
      active: pathname === "/dashboard/resumes",
    },
    {
      label: "Jobs",
      icon: Briefcase,
      href: "/dashboard/jobs",
      active: pathname === "/dashboard/jobs" || pathname.startsWith("/dashboard/jobs/"),
    },
    {
      label: "Applications",
      icon: ClipboardList,
      href: "/dashboard/applications",
      active: pathname === "/dashboard/applications",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-card border-r">
        <div className="flex flex-col h-full py-4">
          <div className="px-6 py-2">
            <Logo />
          </div>
          <div className="mt-6 flex flex-col px-3 flex-1">
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant={route.active ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="mr-2 h-5 w-5" />
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="px-3 py-2 mt-auto">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground">
                {user.full_name ? user.full_name[0] : user.username[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.full_name || user.username}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[140px]">{user.email}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleSignOut}>
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Logo />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full py-4">
              <div className="px-6 py-2">
                <Logo />
              </div>
              <div className="mt-6 flex flex-col px-3 flex-1">
                <ScrollArea className="flex-1">
                  <div className="space-y-1">
                    {routes.map((route) => (
                      <Button
                        key={route.href}
                        variant={route.active ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href={route.href}>
                          <route.icon className="mr-2 h-5 w-5" />
                          {route.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="px-3 py-2 mt-auto">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground">
                    {user.full_name ? user.full_name[0] : user.username[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.full_name || user.username}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[140px]">{user.email}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start mt-2" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
