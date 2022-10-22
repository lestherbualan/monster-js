import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentInterface } from "../interfaces/component-interface";
import { Container } from "../dependency-injection/container";

export function viewPipe(context: ComponentInstanceInterface, pipeSelector: string, value: any, params: any[] = []) {
    const component: ComponentInterface = context.constructor as any;
    const pipe = component.pipes[pipeSelector];
    if (!pipe) {
        console.error(`The pipe ${pipeSelector} is not registered in ${component.dataSource.name}.`);
        return;
    } else {
        const di = new Container(component.dataSource!);
        const instance = di.resolve(pipe);
        return instance.transform(value, params);
    }
}
