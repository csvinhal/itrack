import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading.component";
import { LoadingDirective } from "./loading.directive";

@NgModule({
  declarations: [LoadingComponent, LoadingDirective],
  exports: [LoadingComponent, LoadingDirective],
  imports: [CommonModule],
  entryComponents: [LoadingComponent]
})
export class LoadingModule {}
