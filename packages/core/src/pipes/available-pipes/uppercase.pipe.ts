import { Pipe } from "../pipe.decorator";

@Pipe('uppercase')
export class UppercasePipe {
    transform(value: string) {
        return value.toUpperCase();
    }
}