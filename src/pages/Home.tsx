import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import { pageSections } from '../data/music';
import Footer from '../components/Layout/Footer';
import MusicPlayer from '../components/MusicPlayer';
import { RiSpotifyFill,RiAppleFill,RiSoundcloudFill } from '@remixicon/react';
import LofiVisualizer from '../components/LofiVisualizer';

const Home: React.FC = () => {
  const [embedData, setEmbedData] = React.useState<{embedCode?: string, embedType?: 'spotify' | 'soundcloud' | undefined, musicReleases?: any[]}>({});

  React.useEffect(() => {
    fetch('/musicData.json')
      .then(res => res.json())
      .then(data => setEmbedData(data))
      .catch(err => console.error('Error loading music data:', err));
  }, []);

  return (
    <>
      <PageLayout section={{
        ...pageSections.home[0],
        backgroundImage: window.innerWidth < 768 ? pageSections.home[0].mobileBackgroundImage : pageSections.home[0].backgroundImage
      }} className="border-r-red-600">
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
        backgroundImage: window.innerWidth < 768 ? pageSections.home[1].mobileBackgroundImage : pageSections.home[1].backgroundImage
      }}>
        <div className="min-h-[calc(100vh-8rem)] max-w-5xl mx-auto px-4  mt-52">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            {embedData.musicReleases?.map((release: any) => {
              if (!release.featured && !release.latest) return null;
              return (
                <div key={release.id} className="flex flex-col items-center w-full sm:w-auto">
                  <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
                    {release.featured ? 'Featured Music' : 'Latest Release'}
                  </h2>
                  <div className="relative w-60 sm:w-56 h-44 sm:h-44 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex flex-col items-center justify-center group cursor-pointer ">
                    <img 
                      src={release.coverImage} 
                      alt={release.title} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-center items-center text-white p-4">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{release.title}</h3>
                      {/* <p className="text-xs sm:text-sm mb-4">{release.description}</p> */}
                      <div className="flex space-x-4">
                        {Object.entries(release.links).map(([platform, url]) => {
                          let icon;
                          if (platform.toLowerCase() === 'spotify') {
                            icon = (
                             <RiSpotifyFill/>
                            );
                          } else if (platform.toLowerCase() === 'apple music' || platform.toLowerCase() === 'applemusic') {
                            icon = (
                            < RiAppleFill/>
                            );
                          }  else if (platform.toLowerCase() === 'soundcloud' || platform.toLowerCase() === 'applemusic') {
                            icon = (
                            < RiSoundcloudFill/>
                            );
                          }
                          else {
                            icon = "";  
                          }
                          return (
                            <a 
                              key={platform}
                              href={url as string} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-white hover:text-gray-300 transition-colors"
                            >
                              {icon}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 sm:gap-8">
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

      <MusicPlayer 
  embedCode={embedData.embedCode} 
  embedType={embedData.embedType}
  isFeatured={true}
/>
    </>
  );
};

export default Home;