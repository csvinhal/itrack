import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Artist } from "../../../shared/models/artist";

@Component({
  selector: "app-artist-featured",
  templateUrl: "./artist-featured.component.html",
  styleUrls: ["./artist-featured.component.scss"],
  animations: [
    trigger("loadingPage", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate("0.5s ease", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ArtistFeaturedComponent {
  @Input()
  public artist: Artist;

  constructor() {}
}
