import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Watcher } from "./interfaces/watcher.interface";

export function createWatcher(context: ComponentInstance, element: HTMLElement, valueCaller: () => any, updateCallback: (newValue?: any) => void) {
    const watcher: Watcher = {
        val: valueCaller(),
        isConnected: () => element.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.val !== newValue) {
                watcher.val = newValue;
                return true;
            }
            return false;
        },
        update: updateCallback
    };
    context.watchers.push(watcher);
}