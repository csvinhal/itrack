import { Component, Input } from "@angular/core";
import { Artist } from "src/app/shared/models/artist";

@Component({
  selector: "app-artist-header",
  templateUrl: "./artist-header.component.html",
  styleUrls: ["./artist-header.component.scss"]
})
export class ArtistHeaderComponent {
  @Input()
  public artist: Artist;

  constructor() {}
}
