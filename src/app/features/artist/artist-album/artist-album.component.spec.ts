import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ArtistTrackComponent } from "../artist-track/artist-track.component";
import { ArtistAlbumComponent } from "./artist-album.component";

describe("ArtistAlbumComponent", () => {
  let component: ArtistAlbumComponent;
  let fixture: ComponentFixture<ArtistAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ArtistAlbumComponent, ArtistTrackComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumComponent);
    component = fixture.componentInstance;

    component.album = {
      id: 1,
      name: "Album",
      coverImage: "url",
      url: "url",
      tracks: []
    };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
