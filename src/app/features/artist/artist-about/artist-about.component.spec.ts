import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ArtistAboutComponent } from "./artist-about.component";

describe("ArtistAboutComponent", () => {
  let component: ArtistAboutComponent;
  let fixture: ComponentFixture<ArtistAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ArtistAboutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAboutComponent);
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
