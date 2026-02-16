-- Insert default background images as JSON arrays
INSERT INTO site_config (key, value)
VALUES
    ('home_hero_bg_desktop', '["https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/991aed12e721d00354b128d4b28840fb.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749624.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749663.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749586.webp"]'),

    ('home_hero_bg_mobile', '["https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/991aed12e721d00354b128d4b28840fb.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749585.webp", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749624.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749663.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749586.webp"]'),

    ('home_sec2_bg_desktop', '["https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/991aed12e721d00354b128d4b28840fb.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749624.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749663.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749586.webp"]'),

    ('home_sec2_bg_mobile', '["https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/991aed12e721d00354b128d4b28840fb.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749585.webp", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749624.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749663.jpg", "https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749586.webp"]')

ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;
