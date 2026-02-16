-- Insert default social links
INSERT INTO site_config (key, value)
VALUES
    ('social_instagram', 'https://www.instagram.com/xboy.bx/'),
    ('social_spotify', 'https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp'),
    ('social_apple', 'https://music.apple.com/in/artist/x-boy/1800881639'),
    ('social_soundcloud', 'https://soundcloud.com/xboybx'),
    ('social_amazon', 'https://music.amazon.in/artists/B0F13HMSYF/x-boy?referrer=https://xboyartist.netlify.app/'),
    ('social_youtube', 'https://www.youtube.com/@xboybx/')

ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;
