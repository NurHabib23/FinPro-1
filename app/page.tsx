import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Briefcase, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="flex-1 w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find Your Perfect Job Match with AI
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Upload your CV and let our AI match you with relevant job opportunities. Save time and apply to jobs
                  that align with your skills and experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-[300px] h-[500px] mx-auto overflow-hidden rounded-xl border bg-background shadow-xl md:w-[350px]">
                <div className="flex h-full w-full flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6">
                  <div className="flex-1 overflow-auto space-y-6">
                    <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Upload CV</h3>
                          <p className="text-sm text-gray-500">Step 1</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Upload your CV and our AI will analyze your skills and experience.
                      </p>
                    </div>

                    <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">AI Analysis</h3>
                          <p className="text-sm text-gray-500">Step 2</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Our AI identifies your key skills, experience, and qualifications.
                      </p>
                    </div>

                    <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Job Matching</h3>
                          <p className="text-sm text-gray-500">Step 3</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Get matched with jobs that align with your skills and experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to streamline your job search
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-50">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">CV Analysis</h3>
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                AI-powered analysis of your CV to identify skills, experience, and qualifications
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-50">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Job Matching</h3>
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                Intelligent matching algorithm to find jobs that align with your profile
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-50">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Application Tracking</h3>
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                Track your job applications, interviews, and outcomes in one place
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center py-8 text-sm text-muted-foreground">Powered by Unimedium Digital</div>
    </div>
  )
}
