import type React from "react"
import { Logo } from "@/components/logo"
import { ThemeProvider } from "@/components/theme-provider"
import { PWARegister } from "./pwa-register"
import "@/app/globals.css"

export const metadata = {
  title: "LinkPro - AI-Powered CV Analysis & Job Matching",
  description:
    "Upload your CV and let our AI match you with relevant job opportunities. Save time and apply to jobs that align with your skills and experience.",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LinkPro",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PWARegister />
          <header className="border-b">
            <div className="container flex items-center justify-between py-4">
              <Logo />
              <nav className="flex items-center space-x-4">
                <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </a>
                <a href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                  Dashboard
                </a>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t py-6">
            <div className="container">
              <div className="flex items-center justify-between">
                <Logo size="sm" />
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Powered by Unimedium Digital. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
