
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Music Releases Table
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

-- Site Config Table for Home Page Embed
create table if not exists site_config (
  key text primary key,
  value text
);

-- Enable RLS (Row Level Security)
alter table music_releases enable row level security;
alter table site_config enable row level security;

-- DROP ALL EXISTING POLICIES TO START FRESH
drop policy if exists "Public releases are viewable by everyone." on music_releases;
drop policy if exists "Public config is viewable by everyone." on site_config;
drop policy if exists "Authenticated users can modify releases." on music_releases;
drop policy if exists "Authenticated users can modify config." on site_config;
drop policy if exists "Enable insert for ALL" on music_releases;
drop policy if exists "Enable update for ALL" on music_releases;
drop policy if exists "Enable delete for ALL" on music_releases;
drop policy if exists "Enable insert for ALL" on site_config;
drop policy if exists "Enable update for ALL" on site_config;
drop policy if exists "Enable delete for ALL" on site_config;

-- --- POLICIES ---

-- 1. READ ACCESS (Open to everyone)
create policy "Public releases are viewable by everyone."
  on music_releases for select
  using (true);

create policy "Public config is viewable by everyone."
  on site_config for select
  using (true);

-- 2. WRITE ACCESS (Open to everyone for this Portfolio App)
-- Since the Admin UI has a simple password check, we allow the 'anon' role to write.
create policy "Enable insert for ALL" on music_releases for insert with check (true);
create policy "Enable update for ALL" on music_releases for update using (true);
create policy "Enable delete for ALL" on music_releases for delete using (true);

create policy "Enable insert for ALL" on site_config for insert with check (true);
create policy "Enable update for ALL" on site_config for update using (true);
create policy "Enable delete for ALL" on site_config for delete using (true);
