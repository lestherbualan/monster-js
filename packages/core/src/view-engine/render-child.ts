import { ComponentInstance } from "../interfaces/component-instance.interface";
import { CustomObject } from "../interfaces/custom-object.interface";
import { Watcher } from "../interfaces/watcher.interface";

export function renderChild(
    tag: string,
    attributes: CustomObject,
    children: (HTMLElement | Text)[],
    context: ComponentInstance,
    props: CustomObject<() => any>
): HTMLElement {
    const child = customElements.get(tag);
    if (!child) {
        console.error(`The component ${tag} is not defined.`);
        return;
    }
    const element = new child();

    if (Object.keys(props).length > 0) {
        /**
         * Add props watcher is there is a props
         */
        const watcher: Watcher = {
            currentValue: {},
            isConnected: () => element.isConnected,
            isUpdated: () => {
                let hasChanges = false;
                for (const [key, value] of Object.entries(props)) {
                    const newValue = value();
                    if (watcher.currentValue[key] !== newValue) {
                        hasChanges = true;
                    }
                    watcher.currentValue[key] = newValue;
                }
                return hasChanges;
            },
            update: (newValue: CustomObject) => {
                (element as unknown as ComponentInstance).setProps(newValue);
            }
        };
        watcher.isUpdated();
        watcher.update(watcher.currentValue);
        if (context.watchers && Array.isArray(context.watchers)) {
            context.watchers.push(watcher);
        }
    }


    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.append(...children);
    return element;
}
