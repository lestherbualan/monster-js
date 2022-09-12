import { ComponentInstance } from "../interfaces/component-instance.interface";
import { ViewDirective } from "../interfaces/view-directive.interface";

export function viewDirective(context: ComponentInstance, element: HTMLElement, directives: ViewDirective[]) {

    directives.forEach(directive => {
        if (!context.directives[directive.namespace]) {
            console.error(`The directive with namespace ${directive.namespace} is not registered.`);
            return;
        }
        context.directives[directive.namespace]({
            context,
            directives: directive.directives,
            element
        });
    });

    return element;
}