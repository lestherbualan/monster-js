import { ComponentInstanceInterface } from "../core";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { kebabToCamel } from "../utils/kebab-to-camel";

export function viewProps(
    context: ComponentInstanceInterface,
    element: ComponentWrapperInstanceInterface,
    props: { [key: string]: () => any; }
) {
    const watcher: WatcherInterface = {
        val: {},
        isConnected: () => element.isConnected,
        isUpdated: () => {
            let hasChanges = false;
            for (const [key, value] of Object.entries(props)) {
                const newValue = value();
                if (watcher.val[kebabToCamel(key)] !== newValue) hasChanges = true;
                watcher.val[kebabToCamel(key)] = newValue;
            }
            return hasChanges;
        },
        update: (newValue: { [key: string]: any; }) => element.setProps(newValue)
    };
    watcher.isUpdated();
    watcher.update(watcher.val);
    context.$wrapper.changeDetection.addWatcher(watcher);

    return element;
}