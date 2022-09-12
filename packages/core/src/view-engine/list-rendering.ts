import { ComponentInstance } from "../interfaces/component-instance.interface";
import { Watcher } from "../interfaces/watcher.interface";

export function listRendering(context: ComponentInstance, elementCaller: (index?: number) => HTMLElement, valueCaller: () => any[]): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const comment = document.createComment('For');
    let elements: HTMLElement[] = [];
    fragment.appendChild(comment);

    const watcher: Watcher = {
        currentValue: {
            oldValue: [],
            newValue: []
        },
        isConnected: () => comment.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.currentValue.oldValue.length !== newValue.length) {
                watcher.currentValue.newValue = newValue;
                return true;
            }
            return false;
        },
        update: ({ oldValue, newValue }: { oldValue: any[]; newValue: any[]; }) => {
            const min = Math.min(oldValue.length, newValue.length);
            const max = Math.max(oldValue.length, newValue.length);

            for (let i = min; i < max; i++) {
                if (oldValue[i] === undefined) {
                    // create element
                    const before = elements[elements.length - 1] || comment;
                    elements[i] = elementCaller(i);
                    before.after(elements[i]);
                }
                if (newValue[i] === undefined) {
                    // remove element
                    elements[i].remove();
                    elements[i] = null;
                }
            }

            elements = elements.filter(element => !!element);
            watcher.currentValue.oldValue = newValue;
            delete watcher.currentValue.newValue;
        }
    };

    watcher.currentValue.newValue = valueCaller();
    watcher.update(watcher.currentValue);

    context.conditionWatchers.push(watcher);

    return fragment;
}