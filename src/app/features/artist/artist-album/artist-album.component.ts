import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Album } from "../../../shared/models/album";

@Component({
  selector: "app-artist-album",
  templateUrl: "./artist-album.component.html",
  styleUrls: ["./artist-album.component.scss"],
  animations: [
    trigger("loadingPage", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate("0.5s ease", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ArtistAlbumComponent {
  @Input()
  public album: Album;

  constructor() {}
}
