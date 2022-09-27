import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { ViewDirective } from "../directives/interfaces/view-directive.interface";

export function viewDirective(context: ComponentInstance, element: HTMLElement, directives: ViewDirective[]) {

    directives.forEach(directive => {
        if (!context.dirs[directive.namespace]) {
            console.error(`The directive with namespace ${directive.namespace} is not registered in module.`);
            return;
        }
        context.dirs[directive.namespace]({
            context,
            directives: directive.directives,
            element
        });
    });

    return element;
}