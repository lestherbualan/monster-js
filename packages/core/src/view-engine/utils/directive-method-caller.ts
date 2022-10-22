import { DirectiveArgInterface } from "../../interfaces/directive-arg.interface";
import { ComponentInstanceInterface } from "../../interfaces/component-instance.interface";
import { kebabToCamel } from "../../utils/kebab-to-camel";

export function directiveMethodCaller(
    key: string,
    directive: { get: () => any, set?: (val?: any) => void; },
    instance: any,
    component: ComponentInstanceInterface,
    element: HTMLElement
) {
    const param: DirectiveArgInterface = {
        element,
        directive,
        component
    };
    const method = `$${kebabToCamel(key)}`;
    if (instance[method] && typeof instance[method] === 'function') {
        instance[method](param);
    }
}