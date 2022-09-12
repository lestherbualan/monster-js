import { ComponentInstance } from "../interfaces/component-instance.interface";
import { Watcher } from "../interfaces/watcher.interface";

export function textBinding(context: ComponentInstance, valueCaller: () => any): Text {
    const value = valueCaller();
    const text = document.createTextNode(value);

    const watcher: Watcher = {
        currentValue: value,
        isConnected: () => text.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.currentValue !== newValue) {
                watcher.currentValue = newValue;
                return true;
            }
            return false;
        },
        update: (newValue: any) => text.textContent = newValue
    };

    context.watchers.push(watcher);

    return text;
}