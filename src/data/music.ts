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

export const pageSections: Record<string, PageSection[]> = {
  home: [
    {
      id: 'hero',
      title: 'Welcome',
      backgroundImage: '/hero.gif',
      mobileBackgroundImage: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5venkzY2NxbnBqNzF6dGphcXVtMGx0NmJocGVhN2xvaWxiOGNmMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1yld7nW3oQ2IyRubUm/giphy.gif'
    },
    {
      id: 'navigation',
      title: 'Navigation',
      backgroundImage: '/forest.webp',
      mobileBackgroundImage: 'https://media.giphy.com/media/f4Oqzx1qsEyyKqSx8A/giphy.gif?cid=ecf05e47tos2o2hkeg0ljr7unc6dkwgnt2czii933hpdafwv&ep=v1_gifs_search&rid=giphy.gif&ct=g'
    },  {
      id: '',
      title: '',
      backgroundImage:"",
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