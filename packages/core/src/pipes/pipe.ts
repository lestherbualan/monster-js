import { FunctionPipe } from "../interfaces/function-pipe.interface";

export function pipe(fnPipe: FunctionPipe, selector: string) {
    fnPipe.selector = selector;
    return fnPipe;
}