
-- 1. Create News Table
create table if not exists news_items (
  id uuid default uuid_generate_v4() primary key,
  text text not null,
  date text, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create About Page Table
create table if not exists about_page (
  id uuid default uuid_generate_v4() primary key,
  content text, 
  image_url text,
  email text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS
alter table news_items enable row level security;
alter table about_page enable row level security;

-- 4. OPEN ACCESS POLICIES (No Supabase Login needed, relying on Admin Page Password)
drop policy if exists "Enable all for news_items" on news_items;
create policy "Enable all for news_items" on news_items for all using (true) with check (true);

drop policy if exists "Enable all for about_page" on about_page;
create policy "Enable all for about_page" on about_page for all using (true) with check (true);
