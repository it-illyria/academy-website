# Supabase Setup for Lika Academy

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project named "lika-academy"
3. Copy the Project URL and anon key from Settings > API

## Step 2: Create Database Table

Go to SQL Editor and run:

```sql
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('enrollment', 'contact', 'newsletter', 'referral')),
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon (for form submissions)
CREATE POLICY "Allow public insert" ON submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow all for service role (for admin)
CREATE POLICY "Allow service role all" ON submissions
  FOR ALL TO service_role
  USING (true);

-- Index for faster queries
CREATE INDEX idx_submissions_type ON submissions(type);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);
```

## Step 3: Add to Environment

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_KEY=eyJhbGci...
```

The service key is at Settings > API > service_role key (keep secret!).

## Step 4: Create CMS Tables

Go to SQL Editor and run:

```sql
-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('kids', 'future', 'adults')),
  icon TEXT NOT NULL DEFAULT 'Code2',
  color TEXT NOT NULL DEFAULT 'purple',
  duration TEXT NOT NULL DEFAULT '2 months',
  total_hours INTEGER NOT NULL DEFAULT 40,
  weeks INTEGER NOT NULL DEFAULT 8,
  price INTEGER NOT NULL DEFAULT 149,
  name_sq TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_sq TEXT,
  description_en TEXT,
  modules JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tutorials', 'career', 'news', 'tips')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time INTEGER NOT NULL DEFAULT 5,
  title_sq TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_sq TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_sq TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Schedule/Cohorts table
CREATE TABLE cohorts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  spots_per_class INTEGER NOT NULL DEFAULT 12,
  spots_taken INTEGER NOT NULL DEFAULT 0,
  is_first BOOLEAN NOT NULL DEFAULT false,
  timetable JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies for CMS tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read active courses" ON courses FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow service role all on courses" ON courses FOR ALL TO service_role USING (true);

CREATE POLICY "Allow public read published posts" ON blog_posts FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Allow service role all on blog_posts" ON blog_posts FOR ALL TO service_role USING (true);

CREATE POLICY "Allow public read active cohorts" ON cohorts FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow service role all on cohorts" ON cohorts FOR ALL TO service_role USING (true);
```
