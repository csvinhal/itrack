import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ArtistTrackComponent } from "./artist-track.component";

describe("ArtistTrackComponent", () => {
  let component: ArtistTrackComponent;
  let fixture: ComponentFixture<ArtistTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistTrackComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTrackComponent);
    component = fixture.componentInstance;

    component.track = {
      id: 1,
      name: "música",
      albumId: 15,
      artistName: "Felipe",
      coverImage: "url",
      timeMillis: "1246748"
    };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
