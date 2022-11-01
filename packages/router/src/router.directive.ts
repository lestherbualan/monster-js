import {
  AllDirectives,
  AllDirectivesArgInterface,
  createWatcher,
  Directive,
  DirectiveArgInterface,
  OnDestroy,
} from "@monster-js/core";
import { fromEvent, Subscription } from "rxjs";
import { RouterService } from "./router.service";

@Directive("router")
export class RouterDirective implements AllDirectives, OnDestroy {

  private subscriptions: Subscription[] = [];
  private allDirectivesParam: AllDirectivesArgInterface = null!;

  constructor(private routerService: RouterService) {
    this.checkRouterLinkActive = this.checkRouterLinkActive.bind(this);
  }

  onDestroy(): void {
      this.subscriptions.forEach(item => item.unsubscribe());
  }

  allDirectives(param: AllDirectivesArgInterface): void {
    this.allDirectivesParam = param;
    this.active();
  }

  $link(param: DirectiveArgInterface) {
    const valueCaller = param.directive.get;
    const initialValue = valueCaller();

    fromEvent(param.element, 'click').subscribe(event => {
      event.preventDefault();
      this.routerService.navigate(valueCaller());
    });

    if (param.element.localName === "a") {
      param.element.setAttribute("href", initialValue);

      createWatcher(
        () => valueCaller(),
        param.element,
        param.component.$wrapper,
        (newValue) => {
          param.element.setAttribute("href", newValue);
          this.active();
        }
      );
    }
  }

  private active(): void {
    const { directives, element } = this.allDirectivesParam;
    if (!directives["linkActive"]) {
      return;
    }

    if (element.localName === "a") {
      this.subscriptions.push(
        this.routerService.onRouteChange.subscribe(this.checkRouterLinkActive)
      );

      this.checkRouterLinkActive();
    }
  }

  private checkRouterLinkActive() {
    const { element, directives } = this.allDirectivesParam;
    const href = directives["link"].get();
    const valueCaller = directives["linkActive"].get;
    const pathname = location.pathname;
    const linkActiveExactCaller = directives["linkActiveExact"]?.get;
    let exact = false;

    if (linkActiveExactCaller) {
      const linkActiveExactValue = linkActiveExactCaller();
      if (!!linkActiveExactValue || linkActiveExactValue === "") {
        exact = true;
      }
    }

    if (!exact) {
      pathname.indexOf(href) === 0 ? element.classList.add(valueCaller()) : element.classList.remove(valueCaller());
    } else {
      pathname === href ? element.classList.add(valueCaller()) : element.classList.remove(valueCaller());
    }
  }
}
