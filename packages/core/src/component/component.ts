import { FunctionComponent } from "./interfaces/function-component.interface";

export function component(fnComponent: FunctionComponent, selector: string, superClass?: CustomElementConstructor) {
    fnComponent.selector = selector;
    fnComponent.super = superClass || HTMLElement;
    return fnComponent;
}