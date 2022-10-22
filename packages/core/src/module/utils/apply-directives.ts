import { ComponentInterface } from "../../interfaces/component-interface";
import { Directives } from "../../directives/directives.decorator";
import { ClassModuleInterface } from "../interfaces/class-module.interface";

export function applyDirectives(component: ComponentInterface, module: ClassModuleInterface) {
    const directives = module.config.directives || [];
    const exportedDirectives = module.childrenExports.directives;
    Directives(...(exportedDirectives || []), ...directives)(component);
}