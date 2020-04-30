import { async, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { LoadingModule } from "./components/loading/loading.module";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, LoadingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));
});
