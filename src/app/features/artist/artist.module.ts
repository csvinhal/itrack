import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ArtistAboutComponent } from "./artist-about/artist-about.component";
import { ArtistAlbumComponent } from "./artist-album/artist-album.component";
import { ArtistFeaturedComponent } from "./artist-featured/artist-featured.component";
import { ArtistHeaderComponent } from "./artist-header/artist-header.component";
import { ArtistRoutingModule } from "./artist-routing.module";
import { ArtistTrackComponent } from "./artist-track/artist-track.component";
import { ArtistComponent } from "./artist.component";

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistHeaderComponent,
    ArtistAboutComponent,
    ArtistAlbumComponent,
    ArtistTrackComponent,
    ArtistFeaturedComponent
  ],
  imports: [CommonModule, ArtistRoutingModule, SharedModule]
})
export class ArtistModule {}
