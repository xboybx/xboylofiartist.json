import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';
import MusicCard from '../components/Music/MusicCard';
import { pageSections } from '../data/music';
import { MusicRelease } from '../types';

const Music: React.FC = () => {
  const [musicReleases, setMusicReleases] = useState<MusicRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/musicData.json')
      .then(res => res.json())
      .then(data => {
        setMusicReleases(data.musicReleases);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading music data:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="relative  h-screen bg-[url(/cst.gif)] bg-cover bg-bottom ">
      <NavLink 
        to="/" 
        className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="text-white" size={24} />
      </NavLink>  

      <PageLayout section={pageSections.music[0]}>
        <div className="absolute inset-0 px-4 sm:px-8 lg:px-16 z-10 bg-opacity-30 flex flex-col justify-center">
          <div className="p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 "
            >
              <p className="text-gray-100 mb-8 text-lg italic">
                LOFI SPOT
              </p>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto h-[70vh] overflow-y-auto no-scrollbar ">
                {musicReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative z-20 "
                  >
                    <MusicCard release={release} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Music;