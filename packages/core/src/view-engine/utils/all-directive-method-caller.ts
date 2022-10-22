import { ComponentInstanceInterface } from "../../interfaces/component-instance.interface";
import { AllDirectivesArgInterface } from "../../interfaces/all-directives-arg.interface";
import { ViewDirectiveInterface } from "../../interfaces/view-directive.interface";

export function allDirectiveMethodCaller(
    directive: ViewDirectiveInterface["directives"],
    instance: any,
    context: ComponentInstanceInterface,
    element: HTMLElement
) {
    const param: AllDirectivesArgInterface = {
        element,
        directives: directive,
        component: context
    };
    const method = `allDirectives`;
    if (instance[method] && typeof instance[method] === 'function') {
        instance[method](param);
    }
}