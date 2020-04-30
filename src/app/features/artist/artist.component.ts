import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Album } from "../../shared/models/album";
import { Artist } from "../../shared/models/artist";
import { Track } from "../../shared/models/track";
import { ArtistService } from "../../shared/services/artist.service";

@Component({
  selector: "app-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.scss"]
})
export class ArtistComponent implements OnInit, OnDestroy {
  public artist: Artist;
  private ngUnsubscribe$: Subject<void> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private artistiService: ArtistService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data: { artist: Artist }) => {
        const { artist } = data;
        this.artist = artist;
        this.setAlbunsAndTracks();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onClick(): void {
    this.route.navigate(["/"]);
  }

  private setAlbunsAndTracks(): void {
    this.artistiService
      .getAlbuns(this.artist.id, 10)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((albuns: Album[]) => {
        const ids = albuns
          .map((album: Album) => {
            return album.id;
          })
          .join(",");

        this.artistiService
          .getTracksByAlbum(ids)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe((tracks: Track[]) => {
            this.artist.albuns = albuns
              .map((album: Album) => ({
                ...album,
                tracks: tracks.filter(
                  (track: Track) => track.albumId === album.id
                )
              }))
              .filter((album: Album) => album.tracks.length);
          });
      });
  }
}
