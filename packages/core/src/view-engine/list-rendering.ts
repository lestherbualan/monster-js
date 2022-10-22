import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export function listRendering(
    context: ComponentInstanceInterface,
    elementCaller: (index?: number) => HTMLElement,
    valueCaller: () => any[],
    forUpdate: () => void = () => {}
): DocumentFragment {
    forUpdate = forUpdate.bind(context);
    const fragment = document.createDocumentFragment();
    const comment = document.createComment('For');
    let elements: HTMLElement[] = [];
    fragment.appendChild(comment);

    const watcher: WatcherInterface = {
        val: {
            oldValue: [],
            newValue: []
        },
        isConnected: () => comment.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.val.oldValue.length !== newValue.length) {
                watcher.val.newValue = newValue;
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
            watcher.val.oldValue = newValue;
            delete watcher.val.newValue;
            forUpdate();
        }
    };

    watcher.val.newValue = valueCaller();
    watcher.update(watcher.val);

    context.$wrapper.changeDetection.addWatcher(watcher, true);

    return fragment;
}