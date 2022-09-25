import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export function evaluateWatchers(context: ComponentInstance): boolean {
    let hasViewChanges = false;
    [...context.cWatchers, ...context.watchers].forEach(watcher => {
        if (watcher.isUpdated() && watcher.isConnected()) {
            hasViewChanges = true;
            watcher.update(watcher.val);
        }
    });

    // cleanup watchers
    context.cWatchers = context.cWatchers.filter(watcher => watcher.isConnected());
    context.watchers = context.watchers.filter(watcher => watcher.isConnected());

    return hasViewChanges;
}