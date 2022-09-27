import { Subscription } from "../interfaces/subscription.interface";

export class Observable<T> {

    private value: T;
    private runWhenSubscribe: boolean;

    private subscribers: ((...args: any[]) => void)[] = [];

    constructor(initialValue?: T, runWhenSubscribe: boolean = false) {
        this.value = initialValue;
        this.runWhenSubscribe = runWhenSubscribe;
    }

    subscribe(callback: (value?: T) => void): Subscription {
        this.subscribers.push(callback);
        if (this.runWhenSubscribe) {
            callback(this.value);
        }
        return {
            unsubscribe: () => {
                this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
            }
        }
    }

    next(value?: any) {
        this.value = value;
        this.subscribers.forEach(subscriber => subscriber(this.value));
    }

}