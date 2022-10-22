import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export function attributeBinding(context: ComponentInstanceInterface, element: HTMLElement, attributes: { [key: string]: () => any; }) {

    const watcher: WatcherInterface = {
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

    context.$wrapper.changeDetection.addWatcher(watcher);
    return element;
}