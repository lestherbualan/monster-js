import { FunctionDirective } from "../interfaces/function-directive.interface";

export function directive(directive: FunctionDirective, selector: string) {
    directive.selector = selector;
    return directive;
}
