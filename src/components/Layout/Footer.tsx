import React from 'react';
import { RiSoundcloudFill,RiInstagramFill,RiYoutubeFill,RiSpotifyFill,RiAppleFill,RiAmazonFill } from "@remixicon/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto w-full mb-12 sm:mb-2 rounded-full flex">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col  space-y-2">
        <div className="md:flex md:items-center md:justify-between w-full items-center space-x-6">
          <div className="flex justify-center space-x-6 w-full">
           <a href="https://www.instagram.com/xboy.bx/" target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
              <RiInstagramFill size={24} />
            </a>
            <a href="https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp" target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <RiSpotifyFill size={24} />
            </a>
           
            <a href="https://music.apple.com/in/artist/x-boy/1800881639" target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="SoundCloud">
              <RiAppleFill size={24} />
            </a>
             <a href="https://soundcloud.com/xboybx" target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <RiSoundcloudFill size={24} />
            </a>
            <a href="https://music.amazon.in/artists/B0F13HMSYF/x-boy?referrer=https://xboyartist.netlify.app/" className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
              <RiAmazonFill size={24} />
            </a>
            <a href="https://www.youtube.com/@xboybx/" target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
              <RiYoutubeFill size={24} />
            </a>
          </div>
          
        </div>
        
      
          <p className="text-center text-white/70 text-[8px] max-w-md mx-auto ">Click any music platform above to experience the soothing lofi beats of X.BOY.</p>
      
      </div>
    </footer>
  );
};

export default Footer;