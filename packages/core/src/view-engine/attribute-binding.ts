import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export function attributeBinding(context: ComponentInstance, element: HTMLElement, attributes: { [key: string]: () => any; }) {

    const watcher: Watcher = {
        val: {},
        isConnected: () => element.isConnected,
        isUpdated: () => {
            let isUpdated = false;

            for (const [key, value] of Object.entries(attributes)) {
                const newValue = value();
                if (watcher.val[key] !== newValue) {
                    isUpdated = true;
                }
                watcher.val[key] = newValue;
            }

            return isUpdated;
        },
        update: ((newValue: { [key: string]: any }) => {
            for (const [key, value] of Object.entries(newValue)) {
                element.setAttribute(key, value);
            }
        })
    };

    for (const [key, value] of Object.entries(attributes)) {
        const currentValue = value();
        watcher.val[key] = currentValue;
        element.setAttribute(key, currentValue);
    }

    context.watchers.push(watcher);
    return element;
}