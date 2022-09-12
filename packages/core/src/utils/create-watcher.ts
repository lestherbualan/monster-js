import { ComponentInstance } from "../interfaces/component-instance.interface";
import { Watcher } from "../interfaces/watcher.interface";

export function createWatcher(context: ComponentInstance, element: HTMLElement, valueCaller: () => any, updateCallback: (newValue?: any) => void) {
    const watcher: Watcher = {
        currentValue: valueCaller(),
        isConnected: () => element.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.currentValue !== newValue) {
                watcher.currentValue = newValue;
                return true;
            }
            return false;
        },
        update: updateCallback
    };
    context.watchers.push(watcher);
}
