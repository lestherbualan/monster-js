import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentInterface } from "../interfaces/component-interface";
import { GlobalComponents } from "../component/global-components";

export function renderChild(tag: string, context: ComponentInstanceInterface): HTMLElement {

    const { definedComponents } = (context.constructor as ComponentInterface);


    // $definedComponents is used for fake define components
    if (!definedComponents.components[tag] && !((context as any).$definedComponents?.components || {})[tag]) {
        const global = new GlobalComponents();
        if (!global.get(tag)) throw new Error(`The component '${tag}' is not defined in ${definedComponents.name} and is not defined as a global component.`);
    }


    return new (customElements.get(tag));
}
