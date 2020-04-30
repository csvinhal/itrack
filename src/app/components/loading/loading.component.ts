import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent {
  @Input()
  public blockWindow;
  public contents: TemplateRef<any>;

  private _loading: boolean;

  constructor() {}

  @Input()
  public set loading(active: boolean) {
    this._loading = active;
  }

  public get loading() {
    return this._loading;
  }
}
