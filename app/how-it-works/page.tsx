import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Zap, Briefcase, ClipboardList, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">How LinkPro Works</h1>
        <p className="text-center text-muted-foreground mb-12">
          Our AI-powered platform helps you find the perfect job match in just a few steps
        </p>

        <div className="space-y-12">
          <div className="relative">
            <div className="absolute left-9 top-10 bottom-0 border-l-2 border-dashed border-muted-foreground/30" />

            <div className="relative flex gap-6">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Step 1: Upload Your CV</h2>
                  <p className="text-muted-foreground mb-4">
                    Start by uploading your CV to our platform. We accept PDF and Word documents.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Quick and easy upload process</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Secure and private</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Upload multiple CVs for different job types</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="relative flex gap-6 mt-8">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Step 2: AI Analysis</h2>
                  <p className="text-muted-foreground mb-4">
                    Our advanced AI analyzes your CV to extract key information and identify your skills and experience.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Identifies key skills and competencies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Extracts work experience and education</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Creates a comprehensive profile for job matching</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="relative flex gap-6 mt-8">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10">
                <Briefcase className="h-10 w-10 text-blue-600" />
              </div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Step 3: Job Matching</h2>
                  <p className="text-muted-foreground mb-4">
                    Our intelligent algorithm matches your profile with available job opportunities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Matches based on skills, experience, and qualifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Provides match scores to help you prioritize applications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Continuously updates as new jobs become available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="relative flex gap-6 mt-8">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10">
                <ClipboardList className="h-10 w-10 text-blue-600" />
              </div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Step 4: Apply and Track</h2>
                  <p className="text-muted-foreground mb-4">
                    Apply to jobs directly through our platform and track your application status.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>One-click application process</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Track application status and updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Receive notifications for interview invitations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Job Match?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of job seekers who have found their dream jobs using LinkPro.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">Powered by Unimedium Digital</div>
      </div>
    </div>
  )
}
