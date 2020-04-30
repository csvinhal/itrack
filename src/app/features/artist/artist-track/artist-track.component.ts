import { Component, Input } from "@angular/core";
import { Track } from "src/app/shared/models/track";

@Component({
  selector: "app-artist-track",
  templateUrl: "./artist-track.component.html",
  styleUrls: ["./artist-track.component.scss"]
})
export class ArtistTrackComponent {
  @Input()
  public track: Track;
  @Input()
  public index: number;

  constructor() {}
}
