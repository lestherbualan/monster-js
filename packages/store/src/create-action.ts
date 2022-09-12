import { RawAction } from "./interfaces/raw-action.interface";

type ReducerFunction<T, T2> = ((state: T, payload: T2) => T);

export function createAction<T, T2>(
    type: string,
    reducer: ReducerFunction<T, T2>
): (data?: T2) => RawAction{
    return function(data?: T2) {
        return {
            type,
            data,
            reducer
        }
    }
}