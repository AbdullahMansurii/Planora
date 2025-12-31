# Planora AI - Business Planning Tool
<!-- Deployment trigger -->

A full-stack AI SaaS application that converts startup ideas into comprehensive market research and business planning documents using Hugging Face's open-source models.

## Features

- 🤖 **AI-Powered Planning**: Uses Mistral-7B-Instruct for generating structured business plans
- 🔐 **Authentication**: Secure user authentication with Supabase
- 💾 **Save & Manage Plans**: Store and retrieve your generated plans
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Professional UI**: Clean, modern interface with Planora brand colors
- ⚡ **Fast Generation**: Optimized prompts and performance limits for quick results

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Hugging Face Inference API (Mistral-7B-Instruct-v0.2)
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- A Hugging Face account and API token

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Planora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and fill in your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   HUGGING_FACE_API_TOKEN=your-hugging-face-token
   ```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase project:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the query

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Planora/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── generate-plan/   # Plan generation endpoint
│   │   └── save-plan/       # Plan saving endpoint
│   ├── dashboard/           # User dashboard
│   ├── generate/            # Plan generation page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── plan/[id]/           # Individual plan view
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── generate/            # Plan generation components
│   │   ├── PlanSection.tsx  # Generic section renderer
│   │   └── sectionConfig.ts # Section configuration
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── SkeletonLoader.tsx
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── lib/
│   ├── huggingface.ts       # Hugging Face API integration
│   └── supabase.ts          # Supabase client and helpers
├── supabase/
│   └── schema.sql           # Database schema
└── tailwind.config.ts       # Tailwind configuration
```

## How It Works

1. **User Input**: Users describe their startup idea in 2-3 lines with optional details
2. **AI Generation**: The app sends a structured prompt to Mistral-7B-Instruct via Hugging Face
3. **JSON Validation**: Response is validated and repaired if needed using Zod schema
4. **Display**: All 11 sections are rendered dynamically using a generic component
5. **Save**: Authenticated users can save plans to Supabase database
6. **Manage**: Users can view, delete, and regenerate plans from their dashboard

## Generated Plan Sections

1. **Overview** - Executive summary and value proposition
2. **Name Suggestions** - 6 creative startup names
3. **Target Audience** - Customer demographics and behaviors
4. **UI Design** - Interface and UX recommendations
5. **Database Schema** - Technical architecture suggestions
6. **Typography** - Font recommendations
7. **Color Palette** - Brand color suggestions
8. **User Pain Points** - Problems the product solves
9. **Required Features** - Essential functionality
10. **Competitors** - Market analysis
11. **Industry Insights** - Trends and projections

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `HUGGING_FACE_API_TOKEN`

## Performance Optimizations

- **Max Tokens**: Limited to 2048 for faster responses
- **Temperature**: Set to 0.4 for consistent, focused output
- **Request Timeout**: 40 seconds to prevent hanging
- **JSON Repair**: Automatic repair of common JSON formatting issues
- **Skeleton Loaders**: Smooth loading experience during generation

## Security Features

- **Row Level Security (RLS)**: Strict database policies ensure users can only access their own data
- **Authentication Required**: Protected routes redirect unauthenticated users
- **API Separation**: Generation and database operations are separate endpoints
- **Input Validation**: All user inputs are validated before processing

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
