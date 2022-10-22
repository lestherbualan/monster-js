import { ObjectInterface } from "@monster-js/core";

export interface StoreConfigInterface<T> {
    state: T;
    actions: ObjectInterface<(() => any)[]>;
}