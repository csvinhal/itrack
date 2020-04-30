import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Album } from "../models/album";
import { Artist } from "../models/artist";
import { Track } from "../models/track";

@Injectable({ providedIn: "root" })
export class ArtistService {
  private baseURL = "//itunes.apple.com";

  constructor(private httpClient: HttpClient) {}

  /**
   * Retorna todos os artistas de acordo com o termo.
   */
  public getArtists(term: string, quantity = 10): Observable<Artist[]> {
    return this.httpClient
      .jsonp(
        `${this.baseURL}/search?entity=musicArtist&attribute=allArtistTerm&term=${term}&limit=${quantity}`,
        "callback"
      )
      .pipe(
        map(
          (response: any) =>
            response && response.results.map(this.parseArtistInfo)
        )
      );
  }

  /**
   * Retorna todas as informações do artista
   */
  public getArtist(id: number): Observable<Artist> {
    return this.getArtistInfo(id).pipe(
      mergeMap((artist: Artist) =>
        this.getComplementArtistInfo(artist.name).pipe(
          map((info: any) => ({ ...artist, ...info } as Artist))
        )
      )
    );
  }

  /**
   * Retorna as informações principais do artista.
   */
  public getArtistInfo(id: number): Observable<Artist> {
    return this.httpClient
      .jsonp(`${this.baseURL}/lookup?id=${id}`, "callback")
      .pipe(
        map(
          (response: any) =>
            response && this.parseArtistInfo(response.results[0])
        )
      );
  }

  /**
   * Retorna as informações adicionais do artista.
   * Foi necessário utilizar outra API foi a do ITunes
   * não retornava alguns dados do artista, como a imagem e a bio.
   */
  public getComplementArtistInfo(artistName: string): Observable<Artist> {
    const name = artistName.replace("&", "e");
    return this.httpClient
      .jsonp(
        `//ws.audioscrobbler.com/2.0/?format=json&api_key=${environment.apiKey}&method=artist.getInfo&artist=${name}`,
        "callback"
      )
      .pipe(
        map((response: any) => this.parseComplementArtistInfo(response.artist))
      );
  }

  /**
   * Retorna os albuns de um determinado artista.
   */
  public getAlbuns(id: number, quantity = 10): Observable<Album[]> {
    return this.httpClient
      .jsonp(
        `${this.baseURL}//lookup?id=${id}&entity=album&limit=${quantity}`,
        "callback"
      )
      .pipe(
        map(
          (response: any) =>
            response &&
            response.results
              .filter((data: any) => data.wrapperType === "collection")
              .map(this.parseAlbumInfo)
        )
      );
  }

  /**
   * Retorna as músicas de um ou mais albuns.
   * Havendo mais de um albuns, esses devem vir separados por ",".
   * Exemplo.: "1453,1458"
   */
  public getTracksByAlbum(ids: string, quantity = 200): Observable<Track[]> {
    return this.httpClient
      .jsonp(
        `${this.baseURL}/lookup?id=${ids}&entity=song&limit=${quantity}`,
        "callback"
      )
      .pipe(
        map(
          (response: any) =>
            response &&
            response.results
              .filter((data: any) => data.wrapperType === "track")
              .map(this.parseTrackInfo)
        )
      );
  }

  /**
   * Converte o dados do artista retornados da API.
   */
  private parseArtistInfo(info: any): Artist {
    const {
      artistId,
      artistName,
      primaryGenreId,
      primaryGenreName,
      artistLinkUrl
    } = info;
    const artist = {
      id: artistId,
      name: artistName,
      genreId: primaryGenreId,
      genreName: primaryGenreName,
      url: artistLinkUrl
    };

    return artist;
  }

  /**
   * Converte o dados adicionais do artista retornados da API.
   */
  private parseComplementArtistInfo(info: any): Artist {
    const artist: Partial<Artist> = {};

    if (info.bio) {
      artist.bio = this.getBio(info.bio.content);
    }
    artist.profileImage = this.getLastImageArtist(info.image);

    if (info.similar && info.similar.artist) {
      artist.featuredArtists = info.similar.artist.map(
        (featureArtist: any) => ({
          ...featureArtist,
          profileImage: this.getLastImageArtist(featureArtist.image)
        })
      );
    }

    return artist as Artist;
  }

  /**
   * Remove a tag aplicada pela API .
   */
  private getBio(bio: string): string {
    return bio.substring(0, bio.lastIndexOf("<a") - 1);
  }

  /**
   * Retorna a maior imagem do artista
   */
  private getLastImageArtist(imagesProp: any[]) {
    if (imagesProp && imagesProp.length) {
      const images = imagesProp.filter(image => image["#text"]);
      if (!images.length) {
        return "";
      }

      return images[images.length - 1]["#text"];
    }
  }

  /**
   * Converte o dados do album retornados da API.
   */
  private parseAlbumInfo(info: any): Album {
    const {
      collectionId,
      collectionName,
      collectionViewUrl,
      artworkUrl100
    } = info;
    const album = {
      id: collectionId,
      name: collectionName,
      url: collectionViewUrl,
      coverImage: artworkUrl100
    };
    return album;
  }

  /**
   * Converte o dados da música retornada da API.
   */
  private parseTrackInfo(info: any): Track {
    const {
      trackId,
      collectionId,
      trackName,
      artistName,
      artworkUrl60,
      trackTimeMillis
    } = info;

    const track = {
      id: trackId,
      albumId: collectionId,
      name: trackName,
      coverImage: artworkUrl60,
      artistName,
      timeMillis: trackTimeMillis
    };

    return track;
  }
}
