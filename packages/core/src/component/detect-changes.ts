import { HookKeys } from "../enums/hook-keys.enum";
import { evaluateWatchers } from "./evaluate-watchers";

/**
 * This function is use to run change detection of the component.
 * The `this` context is the component that change detection will run
 * 
 * @returns void
 */
export function detectChanges() {
    if (this.isChangeDetectionRunning) {
        return;
    }
    this.isChangeDetectionRunning = true;

    let hasViewChanges = evaluateWatchers(this);

    this.hooks.run(HookKeys.onChangeDetection);
    if (hasViewChanges) {
        this.hooks.run(HookKeys.onViewChange);
    }

    this.isChangeDetectionRunning = false;
}
