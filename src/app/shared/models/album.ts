import { Track } from "./track";

export interface Album {
  id: number;
  name: string;
  url: string;
  coverImage: string;
  tracks?: Track[];
}
