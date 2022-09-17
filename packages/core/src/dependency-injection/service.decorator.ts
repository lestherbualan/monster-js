import { ServiceConfig } from "../interfaces/service-config.interface";
import { ServiceInterface } from "../interfaces/service.interface";

export function Service(config?: ServiceConfig) {
    return function(target: ServiceInterface) {
        target.singleton = config?.singleton;
    }
}