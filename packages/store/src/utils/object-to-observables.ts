import { BehaviorSubject } from "rxjs";

/**
 * Convert object properties into observables and event emitters
 */
export function objectToObservables<T>(obj: any) {
    const observable: { [key in keyof T]: BehaviorSubject<T[key]> } = {} as any;

    for (const key in obj) {
        observable[key as keyof T] = new BehaviorSubject(obj[key]);
    }

    return observable
}
