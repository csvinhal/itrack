import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, Input } from "@angular/core";
import { Artist } from "../../../shared/models/artist";

@Component({
  selector: "app-artist-about",
  templateUrl: "./artist-about.component.html",
  styleUrls: ["./artist-about.component.scss"],
  animations: [
    trigger("expandBio", [
      state(
        "true",
        style({
          height: "100px",
          overflow: "hidden"
        })
      ),
      state(
        "false",
        style({
          height: "*",
          overflow: "hidden"
        })
      ),
      transition(
        "true <=> false",
        animate("400ms cubic-bezier(0.86, 0, 0.7, 1)")
      )
    ])
  ]
})
export class ArtistAboutComponent {
  @Input()
  public artist: Artist;
  public isCollapsed = true;
  public collapseLabel = "Mostrar menos";
  public expandLabel = "Mostrar mais";

  constructor() {}

  public onToggleBio(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
