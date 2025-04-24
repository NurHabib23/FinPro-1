# LinkPro - AI-Driven CV Analysis and Job Matching Platform

LinkPro is a full-stack progressive web application that uses AI to analyze CVs and match job seekers with relevant job opportunities.

## Features

- AI-powered CV analysis
- Intelligent job matching
- Application tracking
- User authentication with Supabase
- Progressive Web App (PWA) support
- Responsive design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)
- AI SDK for CV analysis and job matching
- shadcn/ui Components
- Vercel (Deployment)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key for AI features

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/linkpro.git
   cd linkpro
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_API_URL=your_app_url
   OPENAI_API_KEY=your_openai_api_key
   \`\`\`

4. Set up the database:
   Run the SQL script in your Supabase SQL editor to create the necessary tables:
   \`\`\`sql
   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     username TEXT UNIQUE NOT NULL,
     full_name TEXT,
     bio TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create resumes table
   CREATE TABLE IF NOT EXISTS resumes (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     file_url TEXT NOT NULL,
     file_name TEXT NOT NULL,
     file_type TEXT NOT NULL,
     analyzed BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create resume_analysis table
   CREATE TABLE IF NOT EXISTS resume_analysis (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
     skills JSONB,
     experience JSONB,
     education JSONB,
     summary TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create jobs table
   CREATE TABLE IF NOT EXISTS jobs (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     company TEXT NOT NULL,
     location TEXT,
     description TEXT NOT NULL,
     requirements JSONB,
     salary_range TEXT,
     job_type TEXT,
     remote BOOLEAN DEFAULT FALSE,
     url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create job_applications table
   CREATE TABLE IF NOT EXISTS job_applications (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
     resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
     status TEXT NOT NULL DEFAULT 'applied',
     notes TEXT,
     applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create job_matches table
   CREATE TABLE IF NOT EXISTS job_matches (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
     resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
     match_score FLOAT NOT NULL,
     match_reasons JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create notifications table
   CREATE TABLE IF NOT EXISTS notifications (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     message TEXT NOT NULL,
     read BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   \`\`\`

5. Set up Supabase Storage:
   - Create a new bucket called "resumes" for storing uploaded CV files
   - Set the appropriate permissions for the bucket

6. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel.

3. Add the environment variables in the Vercel dashboard.

4. Deploy the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [AI SDK](https://sdk.vercel.ai/)
- [Unimedium Digital](https://unimedium.digital/)
\`\`\`

The LinkPro application is now fully functional and ready for deployment. It includes all the necessary features for AI-driven CV analysis and job matching, while maintaining the original LinkPro branding under Unimedium Digital.

Key features implemented:
1. CV upload and AI analysis
2. Job matching based on skills and experience
3. Application tracking
4. User authentication and profile management
5. Responsive design for all devices
6. PWA support for mobile use

The application is built with Next.js, TypeScript, Tailwind CSS, and Supabase, making it scalable and maintainable. The AI features are implemented using the AI SDK with OpenAI integration.

To deploy the application, simply push the code to a GitHub repository, connect it to Vercel, add the environment variables, and deploy.
