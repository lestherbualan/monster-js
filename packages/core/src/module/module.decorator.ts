import { ClassModuleInterface } from "./interfaces/class-module.interface";
import { ModuleConfigInterface } from "./interfaces/module-config.interface";

export function Module(config: ModuleConfigInterface) {
    return function(target: ClassModuleInterface) {
        target.config = config;
    }
}
