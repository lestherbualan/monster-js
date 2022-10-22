import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export function ifCondition(context: ComponentInstanceInterface, elementCaller: () => HTMLElement, valueCaller: () => any) {
    const fragment = document.createDocumentFragment();
    const comment = document.createComment('If');
    let element: HTMLElement = null;
    fragment.appendChild(comment);

    const watcher: WatcherInterface = {
        val: !!valueCaller(),
        isConnected: () => comment.isConnected,
        isUpdated: () => {
            const newValue = !!valueCaller();
            if (watcher.val !== newValue) {
                watcher.val = newValue;
                return true;
            }
            return false;
        },
        update: (newValue: boolean) => {
            if (newValue) {
                element = elementCaller();
                comment.after(element);
            } else {
                element.remove();
                element = null;
            }
        }
    };

    if (watcher.val) {
        element = elementCaller();
        fragment.appendChild(element);
    }

    context.$wrapper.changeDetection.addWatcher(watcher, true);

    return fragment;
}