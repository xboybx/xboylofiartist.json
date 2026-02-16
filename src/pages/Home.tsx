import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { pageSections } from '../data/music';
import Footer from '../components/Layout/Footer';
// import { updatesData } from '../data/music'; // Removed as we use dynamic data
import { Settings, X } from 'lucide-react';

const Home: React.FC = () => {
  const [musicReleases, setMusicReleases] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]); // Added news state
  const [showUpdates, setShowUpdates] = useState(false);
  const [showDev, setShowDev] = useState(false);

  // Hero Text State
  const [heroTitle, setHeroTitle] = useState('X.BOY');
  const [heroSubtitle, setHeroSubtitle] = useState('Lofi Music Producer');
  const [heroDescription, setHeroDescription] = useState('Crafting tranquil, dreamy lo-fi soundscapes that soothe the soul and slow down time.');

  // Background Images State
  const [heroBgDesktop, setHeroBgDesktop] = useState(pageSections.home[0].backgroundImage);
  const [heroBgMobile, setHeroBgMobile] = useState(pageSections.home[0].mobileBackgroundImage);
  const [sec2BgDesktop, setSec2BgDesktop] = useState(pageSections.home[1].backgroundImage);
  const [sec2BgMobile, setSec2BgMobile] = useState(pageSections.home[1].mobileBackgroundImage);

  // Derived state
  const latestRelease = musicReleases.find((release: any) => release.latest);
  // Also pass the full list as 'embedData' usage in original code filtered it
  const embedData = { musicReleases };

  useEffect(() => {
    import('../services/musicService').then(({ getMusicReleases, getNewsItems, getTextBlock }) => {

      const getRandomBg = (val: string | null): string | null => {
        if (!val) return null;
        try {
          // Attempt to parse as JSON array
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed[Math.floor(Math.random() * parsed.length)];
          }
          return val; // If not array, return as is
        } catch {
          return val; // If JSON parse fails, return as is
        }
      };

      // Fetch both releases and news
      Promise.all([
        getMusicReleases(),
        getNewsItems(),
        getTextBlock('home_hero_title'),
        getTextBlock('home_hero_subtitle'),
        getTextBlock('home_hero_desc'),
        getTextBlock('home_hero_bg_desktop'),
        getTextBlock('home_hero_bg_mobile'),
        getTextBlock('home_sec2_bg_desktop'),
        getTextBlock('home_sec2_bg_mobile')
      ]).then(([releases, newsItems, title, subtitle, desc, heroDesktop, heroMobile, sec2Desktop, sec2Mobile]) => {
        setMusicReleases(releases);
        setNews(newsItems || []);
        if (title) setHeroTitle(title);
        if (subtitle) setHeroSubtitle(subtitle);
        if (desc) setHeroDescription(desc);

        // Parse and set backgrounds
        const finalHeroDesktop = getRandomBg(heroDesktop);
        const finalHeroMobile = getRandomBg(heroMobile);
        const finalSec2Desktop = getRandomBg(sec2Desktop);
        const finalSec2Mobile = getRandomBg(sec2Mobile);

        if (finalHeroDesktop) setHeroBgDesktop(finalHeroDesktop);
        if (finalHeroMobile) setHeroBgMobile(finalHeroMobile);
        if (finalSec2Desktop) setSec2BgDesktop(finalSec2Desktop);
        if (finalSec2Mobile) setSec2BgMobile(finalSec2Mobile);

      }).catch(err => {
        console.error('Error loading music data:', err);
      });
    });
  }, []);


  //FOr now not used -check in future if may be useful
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const secondSection = document.getElementById('second-section');
  //     if (secondSection) {
  //       const rect = secondSection.getBoundingClientRect();
  //       setIsSecondSection(rect.top <= window.innerHeight && rect.bottom >= 0);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   handleScroll();
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>
      <PageLayout section={{
        ...pageSections.home[0],
        backgroundImage: window.innerWidth < 768 ? heroBgMobile : heroBgDesktop,
      }}>
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)] relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-1">
              {heroTitle}
            </h1>
            <p className='text-sm text-white/70 mb-4'>{heroSubtitle}</p>
            <p className='text-white italic text-light'>{heroDescription}</p>
            <button
              aria-label="Show updates"
              className="mt-4 flex flex-col items-center mx-auto focus:outline-none"
              onClick={() => setShowUpdates(v => !v)}
            >
              <span className=" text-xs  text-gray-200 ">
                New Updates</span>
              {/* <span className=" text-xs  text-gray-300 bg-gradient-to-r from-white via-slate-600 to-white bg-200% bg-clip-text  text-transparent animate-gradient-loader [text-fill-color:transparent] [-webkit-text-fill-color:transparent][-webkit-background-clip:text]">
                New Updates</span> */}

              <svg className={`w-6 h-6 mt-1 text-white transition-transform duration-300 ${showUpdates ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showUpdates && (
              <div className="mt-4 bg-white/10 border border-white/20 rounded-lg p-4 w-full max-w-md mx-auto shadow-lg backdrop-blur-sm relative text-left">
                <div className="absolute top-2 right-2">
                  <motion.button
                    onClick={() => setShowDev(v => !v)}
                    className="text-white/70 hover:text-white block"
                    animate={{ rotate: showDev ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showDev ? <X size={16} /> : <Settings size={16} />}
                  </motion.button>
                  {showDev && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-full md:left-full right-full md:right-auto mr-1 md:mr-0 md:ml-1 mb-1 bg-white/10 border border-white/20 rounded-lg p-2 w-auto shadow-lg backdrop-blur-sm"
                    >
                      <a href="https://dev-profile-eta-five.vercel.app/" target="__main" className="text-white text-xs whitespace-nowrap">Know Me</a>
                    </motion.div>
                  )}
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Latest Release</h3>
                {latestRelease ? (
                  <div className="mb-4">
                    <div className="w-full rounded-lg overflow-hidden border border-white/20">
                      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: latestRelease.embedCode }} />
                    </div>
                    <div className="text-white font-bold mt-2">{latestRelease.title}</div>
                    <div className="text-white text-xs">{latestRelease.releaseDate}</div>
                    <div className="text-white text-sm mt-1">{latestRelease.description}</div>
                  </div>
                ) : (
                  <div className="text-white text-sm">No latest release found.</div>
                )}
                <h4 className="text-white text-md font-semibold mt-4 mb-2">News</h4>
                <ul className="list-disc pl-5">
                  {news.map(newsItem => (
                    <li key={newsItem.id} className="text-white text-sm mb-1">{newsItem.text} <span className="text-xs text-gray-300">({newsItem.date})</span></li>
                  ))}
                  {news.length === 0 && (
                    <li className="text-white text-sm mb-1">No news yet.</li>
                  )}
                </ul>
              </div>
            )}
          </motion.div>
          <Footer />
        </div>
      </PageLayout>

      <PageLayout section={{
        ...pageSections.home[1],
        backgroundImage: window.innerWidth < 768 ? sec2BgMobile : sec2BgDesktop,
      }} >
        <div id="second-section" className="min-h-[calc(100vh-8rem)] max-w-5xl mx-auto px-4 mt-20 ">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8 min-h-[180px]">
            <div className="flex flex-col items-start w-full sm:w-1/2">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">Latest Release</h2>
              <div className="flex flex-col gap-4 w-full">
                {embedData.musicReleases?.filter((release: any) => release.latest).map((release: any) => (
                  <div key={release.id} className="w-full  rounded-lg overflow-hidden border border-white/20">
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: release.embedCode }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start w-full sm:w-1/2 ">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">Featured Music</h2>
              <div className="flex flex-col gap-4 w-full">
                {embedData.musicReleases?.filter((release: any) => release.featured).map((release: any) => (
                  <div key={release.id} className="w-full  rounded-lg overflow-hidden border border-white/20">
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: release.embedCode }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 sm:gap-8 mt-48 ">
            <Link
              to="/music"
              className="flex items-center justify-center transition-all duration-300 group"
            >
              <span className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-white px-8 sm:px-20 py-5 rounded-full border border-white text-sm group-hover:scale-105 transition-transform duration-300">
                Music
              </span>
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-center transition-all duration-300 group"
            >
              <span className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-sm text-white px-8 sm:px-20 py-5 rounded-full border border-white group-hover:scale-105 transition-transform duration-300">
                About
              </span>
            </Link>
          </div>
        </div>
      </PageLayout>

      {/* <div className="min-h-[calc(100vh-8rem)] relative flex items-center justify-center bg-[url(/dad.gif)] bg-bottom">
          <p className="italic text-white py-32 px-4 text-center text-xl relative z-10">
            "Myself isn't Loud. Me is Music. Intuition is the only Listener"
          </p>
      </div> */}

    </>
  );
};

export default Home;