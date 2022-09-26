import { HookKeys } from "../hooks/enums/hook-keys.enum";
import { ComponentInstance } from "./interfaces/component-instance.interface";

export function setProps(props: { [key: string]: any; }, context: ComponentInstance) {
    for (const [key, value] of Object.entries(props)) {
        context.props[key] = value;
    }
    context.hooks.run(HookKeys.onPropsChange, [this.props])
    if (context.isConnected) {
        context.detectChanges();
    }
}