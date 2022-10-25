import { ComponentInterface, detectChanges, getSelector } from "@monster-js/core";
import { bootstrapModule, Module, ModuleConfigInterface } from "@monster-js/core/module";
import { ComponentWrapperInstanceInterface } from "@monster-js/core/src/interfaces/component-wrapper-instance.interface";

export function createComponentTester(component: ComponentInterface, options: ModuleConfigInterface) {
    const fakeModule = class {};

    Module({
        ...options,
        root: component
    })(fakeModule);
    bootstrapModule(fakeModule);

    const selector = getSelector(component);

    return {
        selector,
        render: () => {
            const defined = customElements.get(selector);
            const instance: ComponentWrapperInstanceInterface = (new defined(true) as any);
            return {
                host: instance,
                element: instance.element,
                component: instance.componentInstance,
                detectChanges: () => instance.changeDetection.__evaluate()
            };
        }
    };
}
