import { HookKeys } from "../enums/hook-keys.enum";
import { ComponentInstance } from "../interfaces/component-instance.interface";

export function onViewChange(context: ComponentInstance, handler: () => void, isActive: () => boolean = () => true) {
    context.hooks.set(HookKeys.onViewChange, {
        isActive,
        hook: handler
    })
}
