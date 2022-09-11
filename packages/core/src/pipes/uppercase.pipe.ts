import { pipe } from "./pipe";

function uppercase(text: string, params: any[]) {
    return text.toUpperCase();
}

export const uppercasePipe = pipe(uppercase, 'uppercase');
