import { ServiceInterface } from "../interfaces/service.interface";
import { globalDi } from "./global-di";
import { registerService } from "./register-service";

export const globalService = (service: ServiceInterface) => registerService(globalDi.dataSource, service);
