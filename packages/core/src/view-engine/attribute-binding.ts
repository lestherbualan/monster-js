import { ComponentInstance } from "../interfaces/component-instance.interface";
import { CustomObject } from "../interfaces/custom-object.interface";
import { Watcher } from "../interfaces/watcher.interface";

export function attributeBinding(context: ComponentInstance, element: HTMLElement, attributes: CustomObject<() => any>) {

    const watcher: Watcher = {
        currentValue: {},
        isConnected: () => element.isConnected,
        isUpdated: () => {
            let isUpdated = false;

            for (const [key, value] of Object.entries(attributes)) {
                const newValue = value();
                if (watcher.currentValue[key] !== newValue) {
                    isUpdated = true;
                }
                watcher.currentValue[key] = newValue;
            }

            return isUpdated;
        },
        update: ((newValue: CustomObject) => {
            for (const [key, value] of Object.entries(newValue)) {
                element.setAttribute(key, value);
            }
        })
    };

    for (const [key, value] of Object.entries(attributes)) {
        const currentValue = value();
        watcher.currentValue[key] = currentValue;
        element.setAttribute(key, currentValue);
    }

    context.watchers.push(watcher);
    return element;
}
