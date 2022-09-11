import { FunctionComponent } from "../interfaces/function-component.interface";
import { FunctionDirective } from "../interfaces/function-directive.interface";

export function directives(component: FunctionComponent, directiveList: FunctionDirective[]) {
    if (!component.directives) {
        component.directives = {};
    }
    directiveList.forEach(directive => component.directives[directive.selector] = directive);
    return component;
}