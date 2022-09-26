import { HookKeys } from "../hooks/enums/hook-keys.enum";
import { evaluateWatchers } from "../watcher/evaluate-watcher";
import { ComponentInstance } from "./interfaces/component-instance.interface";

export function detectChanges(context: ComponentInstance) {
    if (context.isCDRunning) {
        return;
    }
    context.isCDRunning = true;

    let hasViewChanges = evaluateWatchers(context);

    context.hooks.run(HookKeys.onChangeDetection);
    if (hasViewChanges) {
        context.hooks.run(HookKeys.onViewChange);
    }

    context.isCDRunning = false;
}