import { HookKeys } from "../enums/hook-keys.enum";
import { ComponentInstance } from "../interfaces/component-instance.interface";

export function onDestroy(context: ComponentInstance, handler: () => void, isActive: () => boolean = () => true) {
    context.hooks.set(HookKeys.onDestroy, {
        isActive,
        hook: handler
    })
}