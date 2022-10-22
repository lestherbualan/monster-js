import { ComponentInterface } from "../../interfaces/component-interface";
import { Services } from "../../service/services.decorator";
import { ClassModuleInterface } from "../interfaces/class-module.interface";

export function applyServices(component: ComponentInterface, module: ClassModuleInterface) {
    const services = module.config.services || [];
    const exportedServices = module.childrenExports.services;
    Services(...(exportedServices || []), ...services)(component);
}