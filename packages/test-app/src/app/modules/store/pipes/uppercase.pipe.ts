import { pipe } from "@monster-js/core";

export function uppercasePipe(value: string, args: any[]) {
    return value.toUpperCase();
}

pipe(uppercasePipe, 'uppercase');