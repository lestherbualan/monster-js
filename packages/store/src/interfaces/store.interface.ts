import { RawActionInterface } from "./raw-action.interface";

export interface StoreInterface<T> {
    state: T;
    actions?: { [key in keyof T]: ((data?: any) => RawActionInterface)[] };
}