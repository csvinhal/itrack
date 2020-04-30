import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("loadingApp", [
      transition("void => *", [
        style({ opacity: 0 }),
        animate("0.5s ease", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  public loading: boolean;

  constructor(private router: Router) {}

  public ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
