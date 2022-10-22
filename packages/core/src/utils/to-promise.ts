import { lastValueFrom, Observable, take } from "rxjs";

export function toPromise<T>(observable: Observable<T>) {
    return lastValueFrom(observable.pipe(take(1)));
}