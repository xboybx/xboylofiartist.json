import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from '../lib/firebase';
import { MusicRelease } from '../types';

export interface SiteConfig {
    key: string;
    value: string;
}

export const getMusicReleases = async (): Promise<MusicRelease[]> => {
    try {
        const q = query(collection(db, "music_releases"), orderBy("releaseDate", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<MusicRelease, 'id'>)
        }));
    } catch (error) {
        console.error('Error fetching music releases:', error);
        throw error;
    }
};

export const getHomeEmbedCode = async (): Promise<string | null> => {
    try {
        const docRef = doc(db, "site_config", "home_embed_code");
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().value : null;
    } catch (error: any) {
        console.warn('Error fetching home embed code:', error.message);
        return null;
    }
};

export const updateHomeEmbedCode = async (code: string): Promise<void> => {
    const docRef = doc(db, "site_config", "home_embed_code");
    await setDoc(docRef, { value: code }, { merge: true });
};

export const createMusicRelease = async (release: Omit<MusicRelease, 'id'>): Promise<MusicRelease | null> => {
    const docRef = await addDoc(collection(db, "music_releases"), {
        title: release.title,
        releaseDate: release.releaseDate,
        coverImage: release.coverImage,
        description: release.description,
        links: release.links || {},
        featured: release.featured || false,
        latest: release.latest || false,
        embedCode: release.embedCode || ''
    });

    return {
        id: docRef.id,
        ...release
    };
};

export const updateMusicRelease = async (release: MusicRelease): Promise<void> => {
    const docRef = doc(db, "music_releases", release.id);
    const dataToUpdate = { ...release };
    // @ts-ignore
    delete dataToUpdate.id; // remove id from update data just in case
    await updateDoc(docRef, dataToUpdate);
};

export const deleteMusicRelease = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "music_releases", id));
};

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
            for (const r of data.musicReleases) {
                await addDoc(collection(db, "music_releases"), {
                    title: r.title,
                    releaseDate: r.releaseDate,
                    coverImage: r.coverImage,
                    description: r.description,
                    links: r.links || {},
                    featured: r.featured || false,
                    latest: r.latest || false,
                    embedCode: r.embedCode || ''
                });
            }
        }

        // Seed News
        try {
            const q = query(collection(db, "news_items"), limit(1));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                await addDoc(collection(db, "news_items"), {
                    text: "Welcome to the new site!",
                    date: new Date().toISOString().split('T')[0],
                    created_at: new Date().toISOString()
                });
            }
        } catch (e) { console.error('Error seeding news', e) }

        // Seed About
        try {
            const q = query(collection(db, "about_page"), limit(1));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                await addDoc(collection(db, "about_page"), {
                    content: "Hello, I'm X Boy, a lo-fi music producer creating dreamy, tranquil soundscapes that drift between space, sleep, and emotion. Based in India, I draw inspiration from late-night silence, early morning stillness, and the quiet feelings we all carry within.",
                    imageUrl: "/profile.gif",
                    location: "Hyderabad, India",
                    email: "j.jaswanth@icloud.com"
                });
            }
        } catch (e) { console.error('Error seeding about', e) }

        // Seed Config
        const defaultConfigs = [
            { key: 'social_instagram', value: 'https://www.instagram.com/xboy.bx/' },
            { key: 'social_spotify', value: 'https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp' },
            { key: 'social_apple', value: 'https://music.apple.com/in/artist/x-boy/1800881639' },
            { key: 'social_soundcloud', value: 'https://soundcloud.com/xboybx' },
            { key: 'social_amazon', value: 'https://music.amazon.in/artists/B0F13HMSYF/x-boy?referrer=https://xboyartist.netlify.app/' },
            { key: 'social_youtube', value: 'https://www.youtube.com/@xboybx/' }
        ];

        for (const conf of defaultConfigs) {
            await setDoc(doc(db, "site_config", conf.key), { value: conf.value }, { merge: true });
        }


        alert('Database seeded successfully! (Firestore)');
        window.location.reload();
    } catch (err) {
        console.error('Seeding failed:', err);
        alert('Seeding failed. Check console.');
    }
};

// --- NEWS ---

export const getNewsItems = async () => {
    const q = query(collection(db, "news_items"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as any[];
};

export const createNewsItem = async (item: { text: string; date: string }) => {
    const docRef = await addDoc(collection(db, "news_items"), {
        ...item,
        created_at: new Date().toISOString()
    });
    return {
        id: docRef.id,
        ...item,
        created_at: new Date().toISOString()
    };
};

export const deleteNewsItem = async (id: string) => {
    await deleteDoc(doc(db, "news_items", id));
};

// --- ABOUT ---

export const getAboutData = async () => {
    const q = query(collection(db, "about_page"), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    return {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
    } as any;
};

export const updateAboutPage = async (data: { content: string; imageUrl: string; location: string; email: string }) => {
    const existing = await getAboutData();

    if (existing && existing.id) {
        await updateDoc(doc(db, "about_page", existing.id), {
            content: data.content,
            imageUrl: data.imageUrl,
            location: data.location,
            email: data.email
        });
    } else {
        await addDoc(collection(db, "about_page"), {
            content: data.content,
            imageUrl: data.imageUrl,
            location: data.location,
            email: data.email
        });
    }
};

// --- TEXT BLOCKS (Home Page Text) ---

export const getTextBlock = async (blockKey: string): Promise<string> => {
    try {
        const docRef = doc(db, "site_config", blockKey);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().value : '';
    } catch (error: any) {
        console.warn(`Error fetching text block ${blockKey}:`, error);
        return '';
    }
};

export const updateTextBlock = async (blockKey: string, text: string): Promise<void> => {
    await setDoc(doc(db, "site_config", blockKey), { value: text }, { merge: true });
};
