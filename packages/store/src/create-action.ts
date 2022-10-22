import { RawActionInterface } from "./interfaces/raw-action.interface"

type ReducerFunction<T, T2> = ((state: T, payload: T2) => T);

export function createAction<T, T2 = any>(
    type: string,
    reducer: ReducerFunction<T, T2>
): (data?: T2) => RawActionInterface {
    return function(data?: T2) {
        return {
            type,
            data,
            reducer
        }
    }
}
