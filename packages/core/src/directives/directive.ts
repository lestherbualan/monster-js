import { FunctionDirective } from "./function-directive.interface";

export function directive(fnDirective: FunctionDirective, selector: string) {
    fnDirective.selector = selector;
    return directive;
}