import { FunctionComponent } from "../interfaces/function-component.interface";
import { FunctionPipe } from "../interfaces/function-pipe.interface";

export function pipes(component: FunctionComponent, pipes: FunctionPipe[]) {
    if (!component.pipes) {
        component.pipes = {};
    }
    pipes.forEach(pipe => component.pipes[pipe.selector] = pipe);
}