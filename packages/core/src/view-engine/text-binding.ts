import { ComponentInstance } from "../interfaces/component-instance.interface";
import { Watcher } from "../interfaces/watcher.interface";

export function textBinding(context: ComponentInstance, valueCaller: () => any): Text {
    const val = valueCaller();
    const text = document.createTextNode(val);

    const watcher: Watcher = {
        val,
        isConnected: () => text.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.val !== newValue) {
                watcher.val = newValue;
                return true;
            }
            return false;
        },
        update: (newValue: any) => text.textContent = newValue
    };

    context.watchers.push(watcher);

    return text;
}