import {PageSection } from '../types';

const backgroundImages = [
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/991aed12e721d00354b128d4b28840fb.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749624.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749663.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749586.webp",
];
const mobileBackgroundImages = [
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/991aed12e721d00354b128d4b28840fb.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749585.webp",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749624.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749663.jpg",
"https://ik.imagekit.io/mtkm3escy/X_LOFI_MUSIC%20site%20Bg%20images/wp9749586.webp",
];
function getRandomImage() {
  return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
}
function getRandomMobileImage() {
  return mobileBackgroundImages[Math.floor(Math.random() * mobileBackgroundImages.length)];
}
export const pageSections: Record<string, PageSection[]> = {
  home: [
    {
      id: 'hero',
      title: 'Welcome',
      backgroundImage: getRandomImage(),
      mobileBackgroundImage: getRandomMobileImage()
    },
    {
      id: 'navigation',
      title: 'Navigation',
      backgroundImage: getRandomImage(),
      mobileBackgroundImage: getRandomMobileImage()
    },  {
      id: '',
      title: '',
      backgroundImage: "",
      mobileBackgroundImage: ""
    }
  ],
  music: [
    {
      id: 'releases',
      title: 'Music Releases',
      backgroundImage: ''
    }
  ],
  about: [
    {
      id: 'bio',
      title: 'About Me',
      backgroundImage: ''
    },
    {
      id: 'contact',
      title: 'Get In Touch',
      backgroundImage: ''
    }
  ]
};
export const updatesData = {
  latestRelease: {
    title: "Midnight Dreams",
    date: "2023-12-15",
    description: "A collection of ambient lofi beats designed for late night studying and relaxation.",
    coverImage: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    links: {
      spotify: "https://spotify.com",
      appleMusic: "https://music.apple.com",
      soundcloud: "https://soundcloud.com",
      youtube: "https://youtube.com"
    }
  },
  news: [
    {
      id: 1,
        text: "New Album out Antler Valley Horizon",
      date: "14-09-2025"
    },
    {
      id: 2,
        text: "New Album dropping soon! Stay tuned for more dreamy vibes.",
      date: "SOON"
     
    }

  ]
};