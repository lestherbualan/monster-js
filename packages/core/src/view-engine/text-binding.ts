import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export function textBinding(context: ComponentInstanceInterface, valueCaller: () => any): Text {
    const val = valueCaller();
    const text = document.createTextNode(val);

    const watcher: WatcherInterface = {
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

    context.$wrapper.changeDetection.addWatcher(watcher);

    return text;
}