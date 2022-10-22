import { ComponentInterface } from "../../interfaces/component-interface";
import { Pipes } from "../../pipes/pipes.decorator";
import { ClassModuleInterface } from "../interfaces/class-module.interface";

export function applyPipes(component: ComponentInterface, module: ClassModuleInterface) {
    const pipes = module.config.pipes || [];
    const exportedPipes = module.childrenExports.pipes;
    Pipes(...(exportedPipes || []), ...pipes)(component);
}
