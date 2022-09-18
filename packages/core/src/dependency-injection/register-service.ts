import { DIDataSource } from "../interfaces/di-data-source.interface";
import { ServiceInterface } from "../interfaces/service.interface";

export const registerService = (dataSource: Map<any, DIDataSource>, service: ServiceInterface) => dataSource.set(service, {
    config: service.config,
    singleton: service.singleton,
    target: service
});