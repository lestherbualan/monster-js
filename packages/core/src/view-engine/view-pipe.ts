import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export function viewPipe(context: ComponentInstance, pipeSelector: string, value: any, params: any[] = []) {
    const pipe = context.pipes[pipeSelector];
    if (!pipe) {
        console.error(`The pipe ${pipeSelector} is not registered in module.`);
        return;
    } else {
        return pipe(value, params)
    }
}