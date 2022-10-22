import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentInterface } from "../interfaces/component-interface";
import { GlobalComponents } from "../component/global-components";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { kebabToCamel } from "../utils/kebab-to-camel";

export function renderChild(
    tag: string,
    attributes: { [key: string]: any; },
    children: (HTMLElement | Text)[],
    context: ComponentInstanceInterface,
    props: { [key: string]: () => any; }
): HTMLElement {

    const { definedComponents } = (context.constructor as ComponentInterface);


    // $definedComponents is used for fake define components
    if (!definedComponents.components[tag] && !((context as any).$definedComponents?.components || {})[tag]) {
        const global = new GlobalComponents();
        if (!global.get(tag)) {
            throw `The component '${tag}' is not defined in ${definedComponents!.name} and is not defined as a global component.`;
        }
    }


    const child = customElements.get(tag);
    const element = new child();


    /**
     * Add props watcher if there are props
     */
    if (Object.keys(props).length > 0) {
        const watcher: WatcherInterface = {
            val: {},
            isConnected: () => element.isConnected,
            isUpdated: () => {
                let hasChanges = false;
                for (const [key, value] of Object.entries(props)) {
                    const newValue = value();
                    if (watcher.val[kebabToCamel(key)] !== newValue) hasChanges = true;
                    watcher.val[kebabToCamel(key)] = newValue;
                }
                return hasChanges;
            },
            update: (newValue: { [key: string]: any; }) => (element as unknown as ComponentWrapperInstanceInterface).setProps(newValue)
        };
        watcher.isUpdated();
        watcher.update(watcher.val);
        context.$wrapper.changeDetection.addWatcher(watcher);
    }


    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);

    element.append(...children);
    return element;
}
