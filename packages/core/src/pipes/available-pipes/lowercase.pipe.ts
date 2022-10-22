import { Pipe } from "../pipe.decorator";

@Pipe('lowercase')
export class LowercasePipe {
    transform(value: string) {
        return value.toLowerCase();
    }
}