import { HookKeys } from "../enums/hook-keys.enum";
import { ComponentInstance } from "../interfaces/component-instance.interface";
import { CustomObject } from "../interfaces/custom-object.interface";

export function onPropsChange<T = CustomObject>(context: ComponentInstance, handler: (props?: T) => void, isActive: () => boolean = () => true) {
    context.hooks.set(HookKeys.onPropsChange, {
        isActive,
        hook: handler
    })
}
