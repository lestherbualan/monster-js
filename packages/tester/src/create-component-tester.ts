import { ComponentInterface, getSelector } from "@monster-js/core";
import { bootstrapModule, Module, ModuleConfigInterface } from "@monster-js/core/module";
import { ComponentWrapperInstanceInterface } from "@monster-js/core/src/interfaces/component-wrapper-instance.interface";

interface RenderReturnInterface<T> {
    host: HTMLElement;
    element: HTMLElement;
    component: T;
    detectChanges: () => any;
}

export function createComponentTester<T>(component: { new(...args: any): T }, options: ModuleConfigInterface = {}) {
    const fakeModule = class {};
    const componentClass: ComponentInterface = component as any;

    Module({
        ...options,
        root: componentClass
    })(fakeModule);
    bootstrapModule(fakeModule);

    const selector = getSelector(componentClass);

    return {
        selector,
        render: (): RenderReturnInterface<T> => {
            const defined = customElements.get(selector);
            const instance: ComponentWrapperInstanceInterface = (new defined(true) as any);
            document.body.appendChild(instance);
            return {
                host: instance,
                element: instance.element,
                component: instance.componentInstance as any,
                detectChanges: () => instance.changeDetection.__evaluate()
            };
        }
    };
}
