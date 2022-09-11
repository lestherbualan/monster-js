import { pipe } from "./pipe";

function lowercase(text: string) {
    return text.toLowerCase();
}

export const lowercasePipe = pipe(lowercase, 'lowercase');