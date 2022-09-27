import { ServiceConfig } from "../dependency-injection/interfaces/service-config.interface";

export function Service(config?: ServiceConfig) {
    return function(target: any) {
        target.singleton = config?.singleton;
        return target;
    }
}