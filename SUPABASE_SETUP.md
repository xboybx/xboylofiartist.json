# Supabase Setup Guide

## 1. Create a Supabase Project
Go to [supabase.com](https://supabase.com) and create a new project.

## 2. Get Credentials
In **Project Settings > API**, copy:
- **Project URL**
- **anon public key**

Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Create Tables & Policies (Important!)
Since you want to edit data **without** complex user authentication (using only the Admin Page password), you must run this **Exact SQL** to allow the application to write to the database.

1. Go to the **SQL Editor** in your Supabase dashboard.
2. Copy and paste the code below:

```sql
-- 1. Enable UUIDs
create extension if not exists "uuid-ossp";

-- 2. Create Tables
create table if not exists music_releases (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  release_date text,
  cover_image text,
  description text,
  links jsonb default '{}'::jsonb,
  featured boolean default false,
  latest boolean default false,
  embed_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists site_config (
  key text primary key,
  value text
);

-- 3. Enable Security
alter table music_releases enable row level security;
alter table site_config enable row level security;

-- 4. OPEN ACCESS POLICIES (Fixes "row-level security" error)
-- This allows your Admin page to Edit/Delete without Supabase Login.
drop policy if exists "Enable all for music_releases" on music_releases;
create policy "Enable all for music_releases" on music_releases for all using (true) with check (true);

drop policy if exists "Enable all for site_config" on site_config;
create policy "Enable all for site_config" on site_config for all using (true) with check (true);
```

3. Click **Run**.

## 4. Import Your Data
1. Start the app: `npm run dev`
2. Go to: `http://localhost:5173/admin`
3. Login with password: `admin123`
4. Click the **Values** (Database) icon button or "Seed Data" button to import your existing `musicData.json` into Supabase.

## 5. Verify
The "Music Releases" list in the Admin panel should now show your songs.
