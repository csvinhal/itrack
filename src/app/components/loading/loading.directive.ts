import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { LoadingComponent } from "./loading.component";

@Directive({ selector: "[appLoading]" })
export class LoadingDirective implements AfterViewInit {
  private loading = false;
  private loadingComponent: ComponentRef<LoadingComponent>;

  constructor(
    private vc: ViewContainerRef,
    private template: TemplateRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  public ngAfterViewInit() {
    this.createComponent();
  }

  private createComponent() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      LoadingComponent
    );
    this.loadingComponent = this.vc.createComponent(factory);
    this.loadingComponent.instance.contents = this.template;
    this.loadingComponent.instance.loading = this.appLoading;
    this.cdr.detectChanges();
  }

  @Input()
  public set appLoading(active: boolean) {
    this.loading = active;
  }

  public get appLoading() {
    return this.loading;
  }
}
