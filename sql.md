# 🗄️ DevShare SQL Query History

This file maintains a complete history of all SQL scripts and queries executed on the Supabase database. 

---

## 🏗️ Phase 2: The Project Hub & Exploration Integration

### 1. Projects Table & RLS Policies (Executed: May 31, 2026)
This script creates the `projects` table to store developer portfolios and sets up Row Level Security (RLS) policies for authenticated operations.

```sql
-- Create the projects table
CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    repo_url TEXT,
    status VARCHAR(50) DEFAULT 'In Progress',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone (authenticated) to view all projects
CREATE POLICY "Allow public read access to projects" 
ON public.projects FOR SELECT 
TO authenticated 
USING (true);

-- Policy to allow authenticated users to insert their own projects
CREATE POLICY "Allow individual write access to own projects" 
ON public.projects FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Policy to allow authenticated users to update their own projects
CREATE POLICY "Allow individual update access to own projects" 
ON public.projects FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Policy to allow authenticated users to delete their own projects
CREATE POLICY "Allow individual delete access to own projects" 
ON public.projects FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
```


---

## 🏗️ Phase 3: The Explore Page (Discovery Engine)

### 1. Posts Expansion: Categorization, Showcase Titles, and Custom Gradients (Executed: May 31, 2026)
This script expands the `posts` table schema to support standard text/code updates as well as premium visual/code Showcase Gems. It introduces the `type` column (differentiating Posts and Gems), `title`, and `image_gradient` columns.

```sql
-- Add type, title, and image_gradient columns to the posts table
ALTER TABLE public.posts ADD COLUMN type VARCHAR(50) DEFAULT 'post';
ALTER TABLE public.posts ADD COLUMN title VARCHAR(255);
ALTER TABLE public.posts ADD COLUMN image_gradient VARCHAR(100);
```

---

## 🗃️ Previous Queries

### Query 1: Initial Tables (Profiles, Posts) & New User Trigger
This script sets up the primary user profile schema, posts schema, and a database trigger that automatically syncs newly registered Supabase auth users to our public profile table.

```sql
-- 1. Create a Profiles table to store public user data
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security (RLS) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to automatically create a profile for new users when they sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Create the Posts table for the Feed
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  code_snippet TEXT,
  tags TEXT[],
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on RLS for posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by everyone." ON posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts." ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

### Query 2: Feed Extensibility & Social Engagement (Likes, Comments)
This script introduces post repositories (`repo_url`), likes tracking (`post_likes` with uniqueness constraints), comment capability (`post_comments`), and corresponding row-level security logic.

```sql
-- 1. Add repo_url to the posts table
ALTER TABLE posts ADD COLUMN repo_url TEXT;

-- 2. Create the Likes table
CREATE TABLE post_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id) -- Ensures a user can only like a post once
);

-- 3. Create the Comments table
CREATE TABLE post_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable RLS on the new tables (Highly Recommended)
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes are viewable by everyone." ON post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like." ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike." ON post_likes FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are viewable by everyone." ON post_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment." ON post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

### Query 3: Onboarding System Extensions
This extension adapts the `profiles` table to accommodate custom user onboarding states, tech stack tags, and linked developers' GitHub portfolios.

```sql
ALTER TABLE profiles ADD COLUMN onboarded BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN favorite_tags TEXT[];
ALTER TABLE profiles ADD COLUMN github_url TEXT;
```

---

### Query 4: Identity & Gender Profile Customization
This update adds the `gender` column to profiles, resolving user demographics selections from onboarding forms.

```sql
ALTER TABLE profiles ADD COLUMN gender TEXT;
```

