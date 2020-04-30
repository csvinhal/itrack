import { Injectable, NgModule } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  Routes
} from "@angular/router";
import { Observable } from "rxjs";
import { ArtistService } from "../../shared/services/artist.service";
import { ArtistComponent } from "./artist.component";

@Injectable({ providedIn: "root" })
export class ArtistDataResolver implements Resolve<any> {
  constructor(private artistService: ArtistService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get("id");
    return this.artistService.getArtist(Number(id));
  }
}

const routes: Routes = [
  {
    path: "artist/:id",
    component: ArtistComponent,
    resolve: {
      artist: ArtistDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ArtistDataResolver]
})
export class ArtistRoutingModule {}
