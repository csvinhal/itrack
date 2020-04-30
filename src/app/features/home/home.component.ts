import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { debounceTime, mergeMap, tap } from "rxjs/operators";
import { Artist } from "../../shared/models/artist";
import { ArtistService } from "../../shared/services/artist.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild("search", { static: false })
  public search: ElementRef;

  public isSearching = false;

  constructor(private artistService: ArtistService, private router: Router) {
    this.onSearch = this.onSearch.bind(this);
  }

  public ngAfterViewInit(): void {
    this.search.nativeElement.focus();
  }

  public formatter(artist: Artist) {
    return artist.name;
  }

  public onSearch(text$: Observable<string>): Observable<Artist> {
    return text$.pipe(
      tap(() => (this.isSearching = true)),
      debounceTime(500),
      mergeMap((term: string) =>
        term.length < 2 ? [] : this.artistService.getArtists(term)
      ),
      tap(() => (this.isSearching = false))
    );
  }

  public onSelectItem(event: { item: Artist; preventDefautl: any }): void {
    const { item } = event;
    this.router.navigate(["artist", item && item.id]);
  }
}
