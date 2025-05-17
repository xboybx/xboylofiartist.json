import React from 'react';
import { motion } from 'framer-motion';
import { MusicRelease } from '../../types';
import { RiSoundcloudFill, RiYoutubeFill, RiSpotifyFill, RiAppleFill, RiAmazonFill } from "@remixicon/react";

interface MusicCardProps {
  release: MusicRelease;
}

const MusicCard: React.FC<MusicCardProps> = ({ release }) => {
  return (
    <div className="">
      <motion.div 
        className="w-full h-40 relative overflow-hidden rounded-lg "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="w-full h-full" 
          dangerouslySetInnerHTML={{ __html: release.embedCode || '' }}
        />
      </motion.div>
      
      <motion.div 
        className="bg-white/5 backdrop-blur-sm border-t border-white/10 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-col">
          <div className="flex-1 min-w-0 mb-4">
            <h3 className="text-sm text-white font-bold mb-1 truncate">{release.title}</h3>
            <p className="text-xs text-gray-400 line-clamp-2">{release.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {release.links.spotify && (
              <a href={release.links.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-white/70 hover:text-white transition-colors">
                <RiSpotifyFill size={20} />
              </a>
            )}
            {release.links.appleMusic && (
              <a href={release.links.appleMusic} target="_blank" rel="noopener noreferrer" aria-label="Apple Music" className="text-white/70 hover:text-white transition-colors">
                <RiAppleFill size={20} />
              </a>
            )}
            {release.links.amazon && (
              <a href={release.links.amazon} target="_blank" rel="noopener noreferrer" aria-label="Amazon" className="text-white/70 hover:text-white transition-colors">
                <RiAmazonFill size={20} />
              </a>
            )}
            {release.links.soundcloud && (
              <a href={release.links.soundcloud} target="_blank" rel="noopener noreferrer" aria-label="SoundCloud" className="text-white/70 hover:text-white transition-colors">
                <RiSoundcloudFill size={20} />
              </a>
            )}
            {release.links.youtube && (
              <a href={release.links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/70 hover:text-white transition-colors">
                <RiYoutubeFill size={20} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicCard;