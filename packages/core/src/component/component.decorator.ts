import { Directives } from "../directives/directives.decorator";
import { ViewDirective } from "../directives/view.directive";
import { ComponentInterface } from "../interfaces/component-interface";
import { checkComponentDataSource } from "./utils/check-component-data-source";

export function Component(selector: string) {
    return function(target: ComponentInterface) {
        target.selector = selector;

        checkComponentDataSource(target);

        target.definedComponents = {
            name: target.name,
            components: {}
        };
        target.isMonsterComponent = true;

        // Apply default directives
        Directives(ViewDirective)(target);
    }
}
