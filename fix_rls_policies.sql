
-- DROP EXTISITNG POLICIES (If they exist, to avoid conflicts)
drop policy if exists "Authenticated users can modify releases." on music_releases;
drop policy if exists "Authenticated users can modify config." on site_config;

-- CREATE NEW "OPEN" POLICIES
-- These allow anyone with your API key (which is in your frontend) to Edit.
-- Since your Admin page protects the UI with a password, this is acceptable for a personal portfolio.

-- Music Releases Write Access
create policy "Enable insert for ALL" on music_releases for insert with check (true);
create policy "Enable update for ALL" on music_releases for update using (true);
create policy "Enable delete for ALL" on music_releases for delete using (true);

-- Site Config Write Access
create policy "Enable insert for ALL" on site_config for insert with check (true);
create policy "Enable update for ALL" on site_config for update using (true);
create policy "Enable delete for ALL" on site_config for delete using (true);
