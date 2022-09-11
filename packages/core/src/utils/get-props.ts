import { ComponentInstance } from "../interfaces/component-instance.interface";

export function getProps<T>(context: ComponentInstance): T;
export function getProps<T>(context: ComponentInstance, key?: keyof T): T[keyof T];
export function getProps<T>(context: ComponentInstance, key?: keyof T) {
    if (key) {
        return (context.props as any)[key];
    } else {
        return context.props as any;
    }
}
