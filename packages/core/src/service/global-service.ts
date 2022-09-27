import { GLOBAL_DI_SOURCE } from "./global-data-source";
import { ServiceConstructor } from "./interfaces/service-constructor.interface";

export function globalService(service: (ServiceConstructor | [ServiceConstructor, any])) {
    let serviceCls: ServiceConstructor = service as ServiceConstructor;
    let config: any;

    if (Array.isArray(service)) {
        [ serviceCls, config ] = service;
    }

    GLOBAL_DI_SOURCE.set(serviceCls, {
        target: serviceCls,
        config: config,
        singleton: serviceCls.singleton
    });
}