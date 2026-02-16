

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Plus, Save, X, Database } from 'lucide-react';
import { MusicRelease, NewsItem, AboutData } from '../types';
import {
    getMusicReleases,
    createMusicRelease,
    updateMusicRelease,
    deleteMusicRelease,
    getHomeEmbedCode,
    updateHomeEmbedCode,
    seedDatabaseFromJSON,
    getNewsItems,
    createNewsItem,
    deleteNewsItem,
    getAboutData,
    updateAboutPage,
    getTextBlock, // New function for getting text blocks
    updateTextBlock // New function for updating text blocks
} from '../services/musicService';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'releases' | 'home' | 'news' | 'about' | 'socials'>('releases');

    // Data State
    const [releases, setReleases] = useState<MusicRelease[]>([]);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [aboutData, setAboutData] = useState<AboutData>({ content: '', imageUrl: '', location: '', email: '' });
    const [homeEmbed, setHomeEmbed] = useState<string>('');

    // Home Page Text State
    const [homeHeroTitle, setHomeHeroTitle] = useState('');
    const [homeHeroSubtitle, setHomeHeroSubtitle] = useState('');
    const [homeHeroDesc, setHomeHeroDesc] = useState('');

    // Background Images State
    const [heroBgDesktop, setHeroBgDesktop] = useState('');
    const [heroBgMobile, setHeroBgMobile] = useState('');
    const [sec2BgDesktop, setSec2BgDesktop] = useState('');
    const [sec2BgMobile, setSec2BgMobile] = useState('');

    // Social Links State
    const [socials, setSocials] = useState({
        instagram: '',
        spotify: '',
        apple: '',
        soundcloud: '',
        amazon: '',
        youtube: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Edit State
    const [editingRelease, setEditingRelease] = useState<Partial<MusicRelease> | null>(null);
    const [isNewRelease, setIsNewRelease] = useState(false);
    const [newNewsText, setNewNewsText] = useState('');
    const [newNewsDate, setNewNewsDate] = useState('');

    const [loadedTabs, setLoadedTabs] = useState({ releases: false, news: false, about: false, home: false, socials: false });

    useEffect(() => {
        if (!isAuthenticated) return;

        if (activeTab === 'releases' && !loadedTabs.releases) {
            fetchReleasesData();
        } else if (activeTab === 'news' && !loadedTabs.news) {
            fetchNewsData();
        } else if (activeTab === 'about' && !loadedTabs.about) {
            fetchAboutData();
        } else if (activeTab === 'home' && !loadedTabs.home) {
            fetchHomeData();
        } else if (activeTab === 'socials' && !loadedTabs.socials) {
            fetchSocialsData();
        }
    }, [isAuthenticated, activeTab, loadedTabs]);

    const fetchReleasesData = async () => {
        setIsLoading(true);
        try {
            const fetchedReleases = await getMusicReleases();
            setReleases(fetchedReleases);
            setLoadedTabs(prev => ({ ...prev, releases: true }));
        } catch (err) {
            console.error(err);
            setError('Failed to load releases');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchNewsData = async () => {
        setIsLoading(true);
        try {
            const fetchedNews = await getNewsItems();
            setNews(fetchedNews || []);
            setLoadedTabs(prev => ({ ...prev, news: true }));
        } catch (err) {
            console.error(err);
            setError('Failed to load news');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAboutData = async () => {
        setIsLoading(true);
        try {
            const fetchedAbout = await getAboutData();
            if (fetchedAbout) {
                setAboutData({
                    content: fetchedAbout.content,
                    imageUrl: fetchedAbout.image_url,
                    location: fetchedAbout.location,
                    email: fetchedAbout.email,
                    id: fetchedAbout.id
                });
            }
            setLoadedTabs(prev => ({ ...prev, about: true }));
        } catch (err) {
            console.error(err);
            setError('Failed to load about data');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHomeData = async () => {
        setIsLoading(true);
        try {
            const [fetchedEmbed, title, subtitle, desc, heroDesktop, heroMobile, sec2Desktop, sec2Mobile] = await Promise.all([
                getHomeEmbedCode(),
                getTextBlock('home_hero_title'),
                getTextBlock('home_hero_subtitle'),
                getTextBlock('home_hero_desc'),
                getTextBlock('home_hero_bg_desktop'),
                getTextBlock('home_hero_bg_mobile'),
                getTextBlock('home_sec2_bg_desktop'),
                getTextBlock('home_sec2_bg_mobile')
            ]);

            setHomeEmbed(fetchedEmbed || '');
            setHomeHeroTitle(title || 'X.BOY');
            setHomeHeroSubtitle(subtitle || 'Lofi Music Producer');
            setHomeHeroDesc(desc || 'Crafting tranquil, dreamy lo-fi soundscapes that soothe the soul and slow down time.');

            // Helper to format array string to newline separated for display
            const formatForDisplay = (val: string | null) => {
                if (!val) return '';
                try {
                    const parsed = JSON.parse(val);
                    if (Array.isArray(parsed)) return parsed.join('\n');
                    return val;
                } catch {
                    return val;
                }
            };

            setHeroBgDesktop(formatForDisplay(heroDesktop));
            setHeroBgMobile(formatForDisplay(heroMobile));
            setSec2BgDesktop(formatForDisplay(sec2Desktop));
            setSec2BgMobile(formatForDisplay(sec2Mobile));

            setLoadedTabs(prev => ({ ...prev, home: true }));
        } catch (err) {
            console.error(err);
            setError('Failed to load home data');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSocialsData = async () => {
        setIsLoading(true);
        try {
            const [instagram, spotify, apple, soundcloud, amazon, youtube] = await Promise.all([
                getTextBlock('social_instagram'),
                getTextBlock('social_spotify'),
                getTextBlock('social_apple'),
                getTextBlock('social_soundcloud'),
                getTextBlock('social_amazon'),
                getTextBlock('social_youtube')
            ]);
            setSocials({
                instagram: instagram || '',
                spotify: spotify || '',
                apple: apple || '',
                soundcloud: soundcloud || '',
                amazon: amazon || '',
                youtube: youtube || ''
            });
            setLoadedTabs(prev => ({ ...prev, socials: true }));
        } catch (err) {
            console.error(err);
            setError('Failed to load socials');
        } finally {
            setIsLoading(false);
        }
    };

    // Keep loadData for seed function, but it will just refresh the current tab
    const loadData = () => {
        // Reset loaded flags to force re-fetch of everything eventually, or specific tab
        setLoadedTabs({ releases: false, news: false, about: false, home: false, socials: false });
        // Trigger fetch for current tab immediately
        if (activeTab === 'releases') fetchReleasesData();
        else if (activeTab === 'news') fetchNewsData();
        else if (activeTab === 'about') fetchAboutData();
        else if (activeTab === 'home') fetchHomeData();
        else if (activeTab === 'socials') fetchSocialsData();
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple password for now
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleSaveRelease = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRelease) return;

        try {
            if (isNewRelease) {
                // Create
                // Need to add basic validation/defaults
                const newRelease = await createMusicRelease(editingRelease as Omit<MusicRelease, 'id'>);
                if (newRelease) setReleases([newRelease, ...releases]);
            } else {
                // Update
                if (!editingRelease.id) return;
                await updateMusicRelease(editingRelease as MusicRelease);
                setReleases(releases.map(r => r.id === editingRelease.id ? (editingRelease as MusicRelease) : r));
            }
            setEditingRelease(null);
            setIsNewRelease(false);
        } catch (err) {
            console.error(err);
            alert('Failed to save release');
        }
    };

    const handleDeleteRelease = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this release?')) return;
        try {
            await deleteMusicRelease(id);
            setReleases(releases.filter(r => r.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete release');
        }
    };

    const handleSaveHomeEmbed = async () => {
        try {
            await updateHomeEmbedCode(homeEmbed);
            alert('Home embed updated!');
        } catch (err) {
            console.error(err);
            alert('Failed to update home embed');
        }
    };

    const handleSaveHomeText = async () => {
        try {
            // Helper to format newline separated string to JSON array
            const formatForSave = (val: string) => {
                if (!val.trim()) return '';
                const lines = val.split('\n').map(s => s.trim()).filter(s => s);
                if (lines.length > 1) return JSON.stringify(lines);
                if (lines.length === 1) return JSON.stringify([lines[0]]); // Always save as array for consistency if user intends list
                return '';
            };

            await Promise.all([
                updateTextBlock('home_hero_title', homeHeroTitle),
                updateTextBlock('home_hero_subtitle', homeHeroSubtitle),
                updateTextBlock('home_hero_desc', homeHeroDesc),
                updateTextBlock('home_hero_bg_desktop', formatForSave(heroBgDesktop)),
                updateTextBlock('home_hero_bg_mobile', formatForSave(heroBgMobile)),
                updateTextBlock('home_sec2_bg_desktop', formatForSave(sec2BgDesktop)),
                updateTextBlock('home_sec2_bg_mobile', formatForSave(sec2BgMobile))
            ]);
            alert('Home text updated!');
        } catch (e) {
            console.error(e);
            alert('Failed to update home text');
        }
    };

    const handleAddNews = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const added = await createNewsItem({ text: newNewsText, date: newNewsDate || new Date().toISOString().split('T')[0] });
            if (added) {
                setNews([added, ...news]);
                setNewNewsText('');
                setNewNewsDate('');
            }
        } catch (e) {
            console.error(e);
            alert('Failed to add news');
        }
    };

    const handleDeleteNews = async (id: string) => {
        if (!window.confirm('Delete this news item?')) return;
        try {
            await deleteNewsItem(id);
            setNews(news.filter(n => n.id !== id));
        } catch (e) {
            console.error(e);
            alert('Failed to delete news');
        }
    }

    const handleSaveAbout = async () => {
        try {
            await updateAboutPage(aboutData);
            alert('About page updated!');
        } catch (e) {
            console.error(e);
            alert('Failed to update About page');
        }
    }

    const handleSaveSocials = async () => {
        try {
            await Promise.all([
                updateTextBlock('social_instagram', socials.instagram),
                updateTextBlock('social_spotify', socials.spotify),
                updateTextBlock('social_apple', socials.apple),
                updateTextBlock('social_soundcloud', socials.soundcloud),
                updateTextBlock('social_amazon', socials.amazon),
                updateTextBlock('social_youtube', socials.youtube)
            ]);
            alert('Social links updated!');
        } catch (e) {
            console.error(e);
            alert('Failed to update social links');
        }
    };

    const handleSeed = async () => {
        if (!window.confirm("This will attempt to populate the database from public/musicData.json. Use only if DB is empty!")) return;
        await seedDatabaseFromJSON();
        loadData();
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-xl">
                    <h2 className="text-2xl mb-4 font-bold">Admin Access</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 mb-4"
                        placeholder="Password"
                    />
                    <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-4">
                        Admin Dashboard
                        {isLoading && <span className="text-sm font-normal text-blue-400 animate-pulse">Loading...</span>}
                    </h1>
                    <div className="flex gap-4">
                        <button onClick={handleSeed} className="flex items-center gap-2 bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500 text-sm">
                            <Database size={16} /> Seed Data
                        </button>
                        <button onClick={() => setIsAuthenticated(false)} className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 text-sm">
                            Logout
                        </button>
                    </div>
                </header>

                {error && <div className="bg-red-500/20 text-red-200 p-4 rounded mb-4">{error}</div>}

                <div className="flex gap-4 mb-6 border-b border-gray-700 overflow-x-auto">
                    {(['releases', 'news', 'about', 'home', 'socials'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 px-4 capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
                        >
                            {tab === 'home' ? 'Home settings' : tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'releases' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl">Releases ({releases.length})</h2>
                            <button
                                onClick={() => {
                                    setEditingRelease({
                                        title: '', releaseDate: '', coverImage: '', description: '',
                                        links: {}, featured: false, latest: false, embedCode: ''
                                    });
                                    setIsNewRelease(true);
                                }}
                                className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded hover:bg-green-500"
                            >
                                <Plus size={16} /> Add Release
                            </button>
                        </div>

                        {/* List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {releases.map((release) => (
                                <motion.div layout key={release.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative group">
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => { setEditingRelease(release); setIsNewRelease(false); }} className="p-1 bg-blue-600 rounded hover:bg-blue-500"><Edit2 size={14} /></button>
                                        <button onClick={() => handleDeleteRelease(release.id)} className="p-1 bg-red-600 rounded hover:bg-red-500"><Trash2 size={14} /></button>
                                    </div>
                                    <img src={release.coverImage} alt={release.title} className="w-full h-40 object-cover rounded mb-3 bg-gray-700" />
                                    <h3 className="font-bold text-lg truncate">{release.title}</h3>
                                    <p className="text-sm text-gray-400">{release.releaseDate}</p>
                                    <div className="mt-2 flex gap-2">
                                        {release.featured && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded">Featured</span>}
                                        {release.latest && <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Latest</span>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'news' && (
                    <div className="max-w-2xl">
                        <h2 className="text-xl mb-4">News Updates</h2>
                        <form onSubmit={handleAddNews} className="bg-gray-800 p-4 rounded mb-6 border border-gray-700">
                            <h3 className="text-sm font-bold mb-2">Add News Item</h3>
                            <div className="flex gap-2 mb-2">
                                <input
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-sm"
                                    placeholder="Enter news text..."
                                    value={newNewsText}
                                    onChange={e => setNewNewsText(e.target.value)}
                                    required
                                />
                                <input
                                    className="w-32 bg-gray-700 border border-gray-600 rounded p-2 text-sm"
                                    placeholder="Date (optional)"
                                    value={newNewsDate}
                                    onChange={e => setNewNewsDate(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="bg-blue-600 px-4 py-1.5 rounded text-sm hover:bg-blue-500">Add News</button>
                        </form>

                        <div className="space-y-3">
                            {news.map(item => (
                                <div key={item.id} className="bg-gray-800 p-3 rounded flex justify-between items-center border border-gray-700">
                                    <div>
                                        <p className="text-sm">{item.text}</p>
                                        <span className="text-xs text-gray-400">{item.date}</span>
                                    </div>
                                    <button onClick={() => handleDeleteNews(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                </div>
                            ))}
                            {news.length === 0 && <p className="text-gray-500 italic">No news items found.</p>}
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="max-w-2xl">
                        <h2 className="text-xl mb-4">Edit About Page</h2>
                        <div className="bg-gray-800 p-6 rounded border border-gray-700 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Profile Image URL</label>
                                <input
                                    value={aboutData.imageUrl}
                                    onChange={e => setAboutData({ ...aboutData, imageUrl: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Location</label>
                                <input
                                    value={aboutData.location}
                                    onChange={e => setAboutData({ ...aboutData, location: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    value={aboutData.email}
                                    onChange={e => setAboutData({ ...aboutData, email: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Bio / Story (Use new lines for paragraphs)</label>
                                <textarea
                                    value={aboutData.content}
                                    onChange={e => setAboutData({ ...aboutData, content: e.target.value })}
                                    className="w-full h-64 bg-gray-700 border border-gray-600 rounded p-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">Tip: Separate paragraphs with a blank line.</p>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleSaveAbout} className="bg-green-600 px-6 py-2 rounded hover:bg-green-500 font-bold flex items-center gap-2">
                                    <Save size={16} /> Save About Page
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'socials' && (
                    <div className="max-w-2xl">
                        <h2 className="text-xl mb-4">Social Media Links</h2>
                        <div className="bg-gray-800 p-6 rounded border border-gray-700 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Instagram</label>
                                <input
                                    value={socials.instagram}
                                    onChange={e => setSocials({ ...socials, instagram: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Spotify</label>
                                <input
                                    value={socials.spotify}
                                    onChange={e => setSocials({ ...socials, spotify: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Apple Music</label>
                                <input
                                    value={socials.apple}
                                    onChange={e => setSocials({ ...socials, apple: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">SoundCloud</label>
                                <input
                                    value={socials.soundcloud}
                                    onChange={e => setSocials({ ...socials, soundcloud: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Amazon Music</label>
                                <input
                                    value={socials.amazon}
                                    onChange={e => setSocials({ ...socials, amazon: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">YouTube</label>
                                <input
                                    value={socials.youtube}
                                    onChange={e => setSocials({ ...socials, youtube: e.target.value })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleSaveSocials} className="bg-green-600 px-6 py-2 rounded hover:bg-green-500 font-bold flex items-center gap-2">
                                    <Save size={16} /> Save Links
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'home' && (
                    <div className="max-w-2xl">
                        <h2 className="text-xl mb-4">Home Page Settings</h2>

                        <div className="bg-gray-800 p-6 rounded border border-gray-700 space-y-4 mb-8">
                            <h3 className="font-bold border-b border-gray-700 pb-2 mb-4">Text Content</h3>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Hero Title</label>
                                <input
                                    value={homeHeroTitle}
                                    onChange={(e) => setHomeHeroTitle(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Hero Subtitle</label>
                                <input
                                    value={homeHeroSubtitle}
                                    onChange={(e) => setHomeHeroSubtitle(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Hero Description</label>
                                <textarea
                                    value={homeHeroDesc}
                                    onChange={(e) => setHomeHeroDesc(e.target.value)}
                                    className="w-full h-24 bg-gray-700 border border-gray-600 rounded p-2"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded border border-gray-700 space-y-4 mb-8">
                            <h3 className="font-bold border-b border-gray-700 pb-2 mb-4">Background Images</h3>
                            <p className="text-xs text-gray-400 mb-4">Enter one Image URL per line. The site will randomly pick one on refresh.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Hero Desktop BG</label>
                                    <textarea
                                        value={heroBgDesktop}
                                        onChange={(e) => setHeroBgDesktop(e.target.value)}
                                        className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 text-xs font-mono whitespace-nowrap"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Hero Mobile BG</label>
                                    <textarea
                                        value={heroBgMobile}
                                        onChange={(e) => setHeroBgMobile(e.target.value)}
                                        className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 text-xs font-mono whitespace-nowrap"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Section 2 Desktop BG</label>
                                    <textarea
                                        value={sec2BgDesktop}
                                        onChange={(e) => setSec2BgDesktop(e.target.value)}
                                        className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 text-xs font-mono whitespace-nowrap"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Section 2 Mobile BG</label>
                                    <textarea
                                        value={sec2BgMobile}
                                        onChange={(e) => setSec2BgMobile(e.target.value)}
                                        className="w-full h-32 bg-gray-700 border border-gray-600 rounded p-2 text-xs font-mono whitespace-nowrap"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button onClick={handleSaveHomeText} className="bg-green-600 px-6 py-2 rounded hover:bg-green-500 flex items-center gap-2">
                                    <Save size={16} /> Save Settings
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded border border-gray-700 space-y-4">
                            <h3 className="font-bold border-b border-gray-700 pb-2 mb-4">Featured Embed</h3>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-400 mb-1">Embed Code (Iframe)</label>
                                <textarea
                                    value={homeEmbed}
                                    onChange={(e) => setHomeEmbed(e.target.value)}
                                    className="w-full h-48 bg-gray-900 border border-gray-600 rounded p-3 text-sm font-mono"
                                />
                            </div>
                            <button onClick={handleSaveHomeEmbed} className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-500 flex items-center gap-2">
                                <Save size={16} /> Save Embed
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal (Releases) */}
            <AnimatePresence>
                {editingRelease && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-800 w-full max-w-2xl rounded-xl shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold">{isNewRelease ? 'New Release' : 'Edit Release'}</h3>
                                <button onClick={() => setEditingRelease(null)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                            </div>
                            <form onSubmit={handleSaveRelease} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">Title</label>
                                    <input required value={editingRelease.title} onChange={e => setEditingRelease({ ...editingRelease, title: e.target.value })} className="w-full bg-gray-700 rounded p-2 border border-gray-600" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Date (YYYY-MM-DD)</label>
                                    <input type="date" value={editingRelease.releaseDate} onChange={e => setEditingRelease({ ...editingRelease, releaseDate: e.target.value })} className="w-full bg-gray-700 rounded p-2 border border-gray-600" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Cover Image URL</label>
                                    <input value={editingRelease.coverImage} onChange={e => setEditingRelease({ ...editingRelease, coverImage: e.target.value })} className="w-full bg-gray-700 rounded p-2 border border-gray-600" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                                    <textarea value={editingRelease.description} onChange={e => setEditingRelease({ ...editingRelease, description: e.target.value })} className="w-full bg-gray-700 rounded p-2 border border-gray-600 h-20" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">Embed Code</label>
                                    <textarea value={editingRelease.embedCode} onChange={e => setEditingRelease({ ...editingRelease, embedCode: e.target.value })} className="w-full bg-gray-700 rounded p-2 border border-gray-600 h-24 font-mono text-xs" />
                                </div>

                                <h4 className="md:col-span-2 text-gray-300 font-semibold mt-2 border-t border-gray-700 pt-2">Links</h4>
                                <div>
                                    <label className="block text-xs text-gray-400">Spotify Data Link</label>
                                    <input value={editingRelease.links?.spotify || ''} onChange={e => setEditingRelease({ ...editingRelease, links: { ...editingRelease.links, spotify: e.target.value } })} className="w-full bg-gray-700 rounded p-2 border border-gray-600 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400">Apple Music Link</label>
                                    <input value={editingRelease.links?.appleMusic || ''} onChange={e => setEditingRelease({ ...editingRelease, links: { ...editingRelease.links, appleMusic: e.target.value } })} className="w-full bg-gray-700 rounded p-2 border border-gray-600 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400">YouTube Link</label>
                                    <input value={editingRelease.links?.youtube || ''} onChange={e => setEditingRelease({ ...editingRelease, links: { ...editingRelease.links, youtube: e.target.value } })} className="w-full bg-gray-700 rounded p-2 border border-gray-600 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400">SoundCloud Link</label>
                                    <input value={editingRelease.links?.soundcloud || ''} onChange={e => setEditingRelease({ ...editingRelease, links: { ...editingRelease.links, soundcloud: e.target.value } })} className="w-full bg-gray-700 rounded p-2 border border-gray-600 text-sm" />
                                </div>

                                <div className="md:col-span-2 flex gap-6 mt-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={editingRelease.featured || false} onChange={e => setEditingRelease({ ...editingRelease, featured: e.target.checked })} className="w-4 h-4 rounded bg-gray-700 border-gray-600" />
                                        <span className="text-sm">Featured</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={editingRelease.latest || false} onChange={e => setEditingRelease({ ...editingRelease, latest: e.target.checked })} className="w-4 h-4 rounded bg-gray-700 border-gray-600" />
                                        <span className="text-sm">Is Latest Release</span>
                                    </label>
                                </div>

                                <div className="md:col-span-2 flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
                                    <button type="button" onClick={() => setEditingRelease(null)} className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 font-bold flex items-center gap-2">
                                        <Save size={16} /> Save Release
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
