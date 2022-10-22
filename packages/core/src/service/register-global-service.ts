import { Container } from "../dependency-injection/container";
import { registerService } from "../service/utils/register-service";
import { ServiceInterface } from "../interfaces/service.interface";

export function registerGlobalService(service: ServiceInterface, config?: any) {
    const container = new Container(globalThis.GlobalDataSource);
    registerService(service, container, config);
}