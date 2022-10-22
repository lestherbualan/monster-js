import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export function doCreateWatcher(
    valueCaller: () => any,
    element: HTMLElement,
    iComponentWrapper: ComponentWrapperInstanceInterface,
    updateCallback: (value: any) => void,
    isConditionWatcher: boolean = false
) {
    let value = valueCaller();
    const watcher: WatcherInterface = {
        isConnected: () => element.isConnected,
        val: value,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.val !== newValue) {
                watcher.val = newValue;
                return true;
            }
            return false;
        },
        update: (newValue: any) => updateCallback(newValue)
    };
    iComponentWrapper.changeDetection.addWatcher(watcher, isConditionWatcher);
}
