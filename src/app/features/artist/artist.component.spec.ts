import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ArtistAboutComponent } from "./artist-about/artist-about.component";
import { ArtistAlbumComponent } from "./artist-album/artist-album.component";
import { ArtistFeaturedComponent } from "./artist-featured/artist-featured.component";
import { ArtistHeaderComponent } from "./artist-header/artist-header.component";
import { ArtistTrackComponent } from "./artist-track/artist-track.component";
import { ArtistComponent } from "./artist.component";

describe("ArtistComponent", () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArtistComponent,
        ArtistHeaderComponent,
        ArtistFeaturedComponent,
        ArtistTrackComponent,
        ArtistAboutComponent,
        ArtistAlbumComponent
      ],
      imports: [CommonModule, HttpClientModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;

    component.artist = {
      id: 1,
      name: "Test",
      genreId: 10,
      genreName: "Romance",
      url: ""
    };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
