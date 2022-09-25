import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export function ifCondition(context: ComponentInstance, elementCaller: () => HTMLElement, valueCaller: () => any) {
    const fragment = document.createDocumentFragment();
    const comment = document.createComment('If');
    let element: HTMLElement = null;
    fragment.appendChild(comment);

    const watcher: Watcher = {
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

    context.cWatchers.push(watcher);

    return fragment;
}