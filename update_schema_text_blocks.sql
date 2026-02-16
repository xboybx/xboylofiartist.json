-- Add to existing schema
-- No new tables needed for Site Config, but we should ensure RLS allows updates

-- Ensure site_config has open access for Admin page
drop policy if exists "Enable all for site_config" on site_config;
create policy "Enable all for site_config" on site_config for all using (true) with check (true);

-- Insert default rows if they don't exist (optional, but good for safety)
insert into site_config (key, value) values 
('home_hero_title', 'X.BOY'),
('home_hero_subtitle', 'Lofi Music Producer'),
('home_hero_desc', 'Crafting tranquil, dreamy lo-fi soundscapes that soothe the soul and slow down time.')
on conflict (key) do nothing;
