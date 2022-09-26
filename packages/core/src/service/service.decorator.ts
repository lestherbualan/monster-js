import { ServiceConfig } from "../dependency-injection/interfaces/service-config.interface";
import { ServiceConstructor } from "./interfaces/service-constructor.interface";

export function Service(config?: ServiceConfig) {
    return function(target: ServiceConstructor) {
        target.singleton = config?.singleton;
        return target;
    }
}