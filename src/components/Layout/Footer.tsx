import React, { useState, useEffect } from 'react';
import { RiSoundcloudFill, RiInstagramFill, RiYoutubeFill, RiSpotifyFill, RiAppleFill, RiAmazonFill } from "@remixicon/react";
import { getTextBlock } from '../../services/musicService';

const Footer: React.FC = () => {
  const [links, setLinks] = useState({
    instagram: 'https://www.instagram.com/xboy.bx/',
    spotify: 'https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp',
    apple: 'https://music.apple.com/in/artist/x-boy/1800881639',
    soundcloud: 'https://soundcloud.com/xboybx',
    amazon: 'https://music.amazon.in/artists/B0F13HMSYF/x-boy?referrer=https://xboyartist.netlify.app/',
    youtube: 'https://www.youtube.com/@xboybx/'
  });

  useEffect(() => {
    Promise.all([
      getTextBlock('social_instagram'),
      getTextBlock('social_spotify'),
      getTextBlock('social_apple'),
      getTextBlock('social_soundcloud'),
      getTextBlock('social_amazon'),
      getTextBlock('social_youtube')
    ]).then(([instagram, spotify, apple, soundcloud, amazon, youtube]) => {
      setLinks(prev => ({
        instagram: instagram || prev.instagram,
        spotify: spotify || prev.spotify,
        apple: apple || prev.apple,
        soundcloud: soundcloud || prev.soundcloud,
        amazon: amazon || prev.amazon,
        youtube: youtube || prev.youtube
      }));
    }).catch(err => console.error("Failed to load social links", err));
  }, []);

  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto w-full mb-12 sm:mb-2 rounded-full flex">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col  space-y-2">
        <div className="md:flex md:items-center md:justify-between w-full items-center space-x-6">
          <div className="flex justify-center space-x-6 w-full">
            <a href={links.instagram} target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
              <RiInstagramFill size={24} />
            </a>
            <a href={links.spotify} target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Spotify">
              <RiSpotifyFill size={24} />
            </a>

            <a href={links.apple} target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Apple Music">
              <RiAppleFill size={24} />
            </a>
            <a href={links.soundcloud} target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="SoundCloud">
              <RiSoundcloudFill size={24} />
            </a>
            <a href={links.amazon} className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="Amazon Music">
              <RiAmazonFill size={24} />
            </a>
            <a href={links.youtube} target='__main' className="icon-marquee text-white hover:text-gray-300 transition-colors" aria-label="YouTube">
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