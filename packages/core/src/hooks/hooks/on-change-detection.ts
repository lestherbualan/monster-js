import { HookKeys } from "../enums/hook-keys.enum";
import { ComponentInstance } from "../interfaces/component-instance.interface";

export function onChangeDetection(context: ComponentInstance, handler: () => void, isActive: () => boolean = () => true) {
    context.hooks.set(HookKeys.onChangeDetection, {
        isActive,
        hook: handler
    })
}
