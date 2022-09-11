import { RawAction } from "./raw-action.interface";

export interface StoreState<T> {
    state: T;
    actions?: { [key in keyof T]: ((data?: any) => RawAction)[] };
}