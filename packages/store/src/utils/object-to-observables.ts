import { CustomObservable } from '@monster-js/core';

/**
 * Convert object properties into observables and event emitters
 */
export function objectToObservables<T>(obj: any) {
    const observables: { [key in keyof T]: CustomObservable<T[key]> } = {} as any;

    for (const key in obj) {
        observables[key as keyof T] = new CustomObservable(obj[key], true);
    }

    return observables;
}
