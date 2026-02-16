export interface MusicRelease {
  id: string;
  title: string;
  releaseDate: string;
  coverImage: string;
  description: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    youtube?: string;
  };
  featured: boolean;
  latest: boolean;
  embedCode: string;
}

export interface NewsItem {
  id: string;
  text: string;
  date: string;
}

export interface AboutData {
  id?: string;
  content: string;
  imageUrl: string;
  email: string;
  location: string;
}

export interface PageSection {
  id: string;
  title: string;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
}