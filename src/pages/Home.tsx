import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { pageSections } from '../data/music';
import Footer from '../components/Layout/Footer';
import MusicPlayer from '../components/MusicPlayer';
import { RiSpotifyFill,RiAppleFill,RiSoundcloudFill } from '@remixicon/react';
import LofiVisualizer from '../components/LofiVisualizer';

const Home: React.FC = () => {
  const [embedData, setEmbedData] = useState<{embedCode?: string, embedType?: 'spotify' | 'soundcloud' | undefined, musicReleases?: any[]}>({});
  const [isSecondSection, setIsSecondSection] = useState(false);

  useEffect(() => {
    fetch('/musicData.json')
      .then(res => res.json())
      .then(data => setEmbedData(data))
      .catch(err => console.error('Error loading music data:', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.getElementById('second-section');
      if (secondSection) {
        const rect = secondSection.getBoundingClientRect();
        setIsSecondSection(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <PageLayout section={{
        ...pageSections.home[0],
        backgroundImage: window.innerWidth < 768 ? pageSections.home[0].mobileBackgroundImage : pageSections.home[0].backgroundImage,
      }}>
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)] relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-4">
              X.BOY
            </h1>
            <p className='text-white italic text-light'>Crafting tranquil, dreamy lo-fi soundscapes that soothe the soul and slow down time.</p>
          </motion.div>
          <Footer/>
        </div>
      </PageLayout>
      
      <PageLayout section={{
        ...pageSections.home[1],
        backgroundImage: window.innerWidth < 768 ? pageSections.home[1].mobileBackgroundImage : pageSections.home[1].backgroundImage,
      }} >
        <div id="second-section" className="min-h-[calc(100vh-8rem)] max-w-5xl mx-auto px-4 mt-5 ">
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
            <div className="flex flex-col items-start w-full sm:w-1/2">
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

      <div className="min-h-[calc(100vh-8rem)] relative flex items-center justify-center bg-[url(/dad.gif)] bg-bottom">
        {/* <LofiVisualizer /> */}
        <p className="italic text-white py-32 px-4 text-center text-xl relative z-10">
          "Myself isn't Loud. Me is Music. Intuition is the only Listener"
        </p>
      </div>

      {/* Removed floating MusicPlayer as it is now in Footer */}
    </>
  );
};

export default Home;
