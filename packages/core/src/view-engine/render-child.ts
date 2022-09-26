import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export function renderChild(
    tag: string,
    attributes: { [key: string]: any; },
    children: (HTMLElement | Text)[],
    context: ComponentInstance,
    props: { [key: string]: () => any; }
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
            val: {},
            isConnected: () => element.isConnected,
            isUpdated: () => {
                let hasChanges = false;
                for (const [key, value] of Object.entries(props)) {
                    const newValue = value();
                    if (watcher.val[key] !== newValue) {
                        hasChanges = true;
                    }
                    watcher.val[key] = newValue;
                }
                return hasChanges;
            },
            update: (newValue: { [key: string]: any; }) => {
                (element as unknown as ComponentInstance).setProps(newValue);
            }
        };
        watcher.isUpdated();
        watcher.update(watcher.val);
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