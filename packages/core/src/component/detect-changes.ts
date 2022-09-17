import { HookKeys } from "../enums/hook-keys.enum";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { evaluateWatchers } from "./evaluate-watchers";

/**
 * This function is use to run change detection of the component.
 * The context is the component that change detection is running
 * 
 * @returns void
 */
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
