import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ArtistModule } from "./artist/artist.module";
import { HomeModule } from "./home/home.module";

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule, HomeModule, ArtistModule]
})
export class FeaturesModule {}
