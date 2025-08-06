import { MusicRelease, PageSection } from '../types';

// export const musicReleases: MusicRelease[] = [
//   {
//     id: 'release-1',
//     title: 'Midnight Dreams',
//     releaseDate: '2023-12-15',
//     coverImage: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'A collection of ambient lofi beats designed for late night studying and relaxation.',
//     links: {
//       spotify: 'https://spotify.com',
//       appleMusic: 'https://music.apple.com',
//       soundcloud: 'https://soundcloud.com',
//       youtube: 'https://youtube.com'
//     }
//   },
//   {
//     id: 'release-2',
//     title: 'Rainy Day Sessions',
//     releaseDate: '2023-09-22',
//     coverImage: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'The perfect soundtrack for those gray, rainy afternoons.',
//     links: {
//       spotify: 'https://spotify.com',
//       appleMusic: 'https://music.apple.com',
//       youtube: 'https://youtube.com'
//     }
//   },
//   {
//     id: 'release-3',
//     title: 'Urban Nostalgia',
//     releaseDate: '2023-06-10',
//     coverImage: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'An exploration of city life through lofi beats.',
//     links: {
//       spotify: 'https://spotify.com',
//       soundcloud: 'https://soundcloud.com',
//       youtube: 'https://youtube.com'
//     }
//   },
//   {
//     id: 'release-4',
//     title: 'Morning Brew',
//     releaseDate: '2023-03-05',
//     coverImage: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'Start your day with these uplifting lofi tracks.',
//     links: {
//       spotify: 'https://spotify.com',
//       appleMusic: 'https://music.apple.com',
//       soundcloud: 'https://soundcloud.com'
//     }
//   }
// ];

const backgroundImages = [
  "https://wallpapercave.com/wp/wp9749583.jpg",
  "https://wallpapercave.com/wp/wp9749467.jpg",
  "https://wallpapercave.com/wp/wp9749624.jpg",
  "https://wallpapercave.com/wp/wp9749663.jpg",
  "https://wallpapercave.com/wp/wp9749585.jpg",
  "https://wallpapercave.com/wp/wp9749586.jpg",
  " https://i.pinimg.com/1200x/7e/e1/2a/7ee12a4a3769f5f4c8cc0b1c730dbdb7.jpg",
  "https://i.pinimg.com/1200x/99/1a/ed/991aed12e721d00354b128d4b28840fb.jpg"
];
const mobileBackgroundImages = [
  "https://rare-gallery.com/thumbnail/1390408-Lofi-Chillhop-Raccoon-Night-Camping-Bonfire-Digital.jpg",
  "https://rare-gallery.com/thumbnail/1394377-Digital-Art-Lofi-Bedroom-Raccoon.jpg",
  "https://i.pinimg.com/1200x/c0/90/19/c09019723801b0c61af6f91c3f91a04d.jpg",
  "https://i.pinimg.com/736x/e9/de/4f/e9de4f00f746b2fb52ab2f6334b12d04.jpg",
  "https://i.pinimg.com/1200x/45/5d/86/455d86a51234ce8d73a892e0956f884e.jpg"
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
        text: "New track out She's Blossom.",
      date: "04-08-2025"
    },
    {
      id: 2,
        text: "New Album dropping soon! Stay tuned for more dreamy vibes.",
      date: "SEPTEMBER"
     
    }

  ]
};