import { HookKeys } from "../enums/hook-keys.enum";
import { CustomObject } from "../interfaces/custom-object.interface";

/**
 * This function is used to set props from the parent component to child.
 * The `this` context is the child component
 * 
 * @param props The properties that will be passed to the component from the parent
 */
export function setProps(props: CustomObject) {
    for (const [key, value] of Object.entries(props)) {
        this.props[key] = value;
    }
    this.hooks.run(HookKeys.onPropsChange, [this.props])
    if (this.isConnected) {
        this.detectChanges();
    }
}
