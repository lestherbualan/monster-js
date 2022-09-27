import { EXTERNAL_COMPONENTS } from "../component/external-components";
import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export function renderChild(
    tag: string,
    attributes: { [key: string]: any; },
    children: (HTMLElement | Text)[],
    context: ComponentInstance,
    props: { [key: string]: () => any; }
): HTMLElement {


    /**
     * Check if selector is external web component
     * if yes, then return the element
     */
    if (EXTERNAL_COMPONENTS.indexOf(tag) >= 0) {
        // TODO : try to test return new (customElements.get(tag))();
        const child = customElements.get(tag);
        return new child();
    }


    if (context.definedSelectors.indexOf(tag) === -1) {
        console.error(`The component ${tag} is not defined in the module.`);
        return;
    }


    const child = customElements.get(tag);
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