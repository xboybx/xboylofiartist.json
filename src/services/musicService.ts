
import { supabase } from '../lib/supabase';
import { MusicRelease } from '../types';

export interface SiteConfig {
    key: string;
    value: string;
}

export const getMusicReleases = async (): Promise<MusicRelease[]> => {
    const { data, error } = await supabase
        .from('music_releases')
        .select('*')
        .order('release_date', { ascending: false });

    if (error) {
        console.error('Error fetching music releases:', error);
        throw error;
    }

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        releaseDate: item.release_date,
        coverImage: item.cover_image,
        description: item.description,
        links: item.links,
        featured: item.featured,
        latest: item.latest,
        embedCode: item.embed_code
    }));
};

export const getHomeEmbedCode = async (): Promise<string | null> => {
    const { data, error } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', 'home_embed_code')
        .single();

    if (error) {
        console.warn('Error fetching home embed code:', error.message);
        return null;
    }

    return data?.value || null;
};

export const updateHomeEmbedCode = async (code: string): Promise<void> => {
    const { error } = await supabase
        .from('site_config')
        .upsert({ key: 'home_embed_code', value: code });

    if (error) throw error;
};

export const createMusicRelease = async (release: Omit<MusicRelease, 'id'>): Promise<MusicRelease | null> => {
    const { data, error } = await supabase
        .from('music_releases')
        .insert([{
            title: release.title,
            release_date: release.releaseDate,
            cover_image: release.coverImage,
            description: release.description,
            links: release.links,
            featured: release.featured,
            latest: release.latest,
            embed_code: release.embedCode
        }])
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        title: data.title,
        releaseDate: data.release_date,
        coverImage: data.cover_image,
        description: data.description,
        links: data.links,
        featured: data.featured,
        latest: data.latest,
        embedCode: data.embed_code
    };
};

export const updateMusicRelease = async (release: MusicRelease): Promise<void> => {
    const { error } = await supabase
        .from('music_releases')
        .update({
            title: release.title,
            release_date: release.releaseDate,
            cover_image: release.coverImage,
            description: release.description,
            links: release.links,
            featured: release.featured,
            latest: release.latest,
            embed_code: release.embedCode
        })
        .eq('id', release.id);

    if (error) throw error;
};

export const deleteMusicRelease = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('music_releases')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Seed function
// Seed function
export const seedDatabaseFromJSON = async () => {
    try {
        const response = await fetch('/musicData.json');
        const data = await response.json();

        // Seed Home Embed
        if (data.embedCode) {
            await updateHomeEmbedCode(data.embedCode);
        }

        // Seed Releases
        if (data.musicReleases && Array.isArray(data.musicReleases)) {
            const { error } = await supabase.from('music_releases').insert(
                data.musicReleases.map((r: any) => ({
                    title: r.title,
                    release_date: r.releaseDate,
                    cover_image: r.coverImage,
                    description: r.description,
                    links: r.links,
                    featured: r.featured,
                    latest: r.latest,
                    embed_code: r.embedCode
                }))
            );
            if (error) console.error('Error seeding releases:', error);
        }

        // Seed News
        try {
            const { count } = await supabase.from('news_items').select('*', { count: 'exact', head: true });
            if (count === 0) {
                await createNewsItem({ text: "Welcome to the new site!", date: new Date().toISOString().split('T')[0] });
            }
        } catch (e) { console.error('Error seeding news', e) }

        // Seed About
        try {
            const { count: aboutCount } = await supabase.from('about_page').select('*', { count: 'exact', head: true });
            if (aboutCount === 0) {
                await updateAboutPage({
                    content: "Hello, I'm X Boy, a lo-fi music producer creating dreamy, tranquil soundscapes that drift between space, sleep, and emotion. Based in India, I draw inspiration from late-night silence, early morning stillness, and the quiet feelings we all carry within.",
                    imageUrl: "/profile.gif",
                    location: "Hyderabad, India",
                    email: "j.jaswanth@icloud.com"
                });
            }
        } catch (e) { console.error('Error seeding about', e) }


        alert('Database seeded successfully!');
        window.location.reload();
    } catch (err) {
        console.error('Seeding failed:', err);
        alert('Seeding failed. Check console.');
    }
};

// --- NEWS ---

export const getNewsItems = async () => {
    const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

export const createNewsItem = async (item: { text: string; date: string }) => {
    const { data, error } = await supabase
        .from('news_items')
        .insert([item])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteNewsItem = async (id: string) => {
    const { error } = await supabase.from('news_items').delete().eq('id', id);
    if (error) throw error;
};

// --- ABOUT ---

export const getAboutData = async () => {
    const { data, error } = await supabase
        .from('about_page')
        .select('*')
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error(error);
        return null;
    }
    return data;
};

export const updateAboutPage = async (data: { content: string; imageUrl: string; location: string; email: string }) => {
    const existing = await getAboutData();

    if (existing) {
        const { error } = await supabase
            .from('about_page')
            .update({
                content: data.content,
                image_url: data.imageUrl,
                location: data.location,
                email: data.email
            })
            .eq('id', existing.id);
        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('about_page')
            .insert([{
                content: data.content,
                image_url: data.imageUrl,
                location: data.location,
                email: data.email
            }]);
        if (error) throw error;
    }
};
// --- TEXT BLOCKS (Home Page Text) ---

export const getTextBlock = async (blockKey: string): Promise<string> => {
    const { data, error } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', blockKey)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.warn(`Error fetching text block ${blockKey}:`, error);
        return '';
    }
    return data?.value || '';
};

export const updateTextBlock = async (blockKey: string, text: string): Promise<void> => {
    const { error } = await supabase
        .from('site_config')
        .upsert({ key: blockKey, value: text });

    if (error) throw error;
};
