import { ComponentInstance } from "../interfaces/component-instance.interface";

export function useState<T>(context: ComponentInstance, value?: T): [() => T, (value: T) => void] {
    let state = value;

    const getter = () => state;
    const setter = (value: T) => {
        if (value !== state) {
            state = value;
            context.detectChanges();
        }
    }

    return [getter, setter];
}