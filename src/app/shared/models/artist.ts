import { Album } from "./album";
import { FeaturedArtist } from "./featured-artist";

export interface Artist {
  id: number;
  name: string;
  genreId: number;
  genreName: string;
  url: string;
  bio?: string;
  profileImage?: string;
  albuns?: Album[];
  featuredArtists?: FeaturedArtist[];
}
