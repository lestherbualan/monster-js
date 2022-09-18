import { FunctionComponent } from "../interfaces/function-component.interface";
import { ServiceInterface } from "../interfaces/service.interface";
import { registerService } from "./register-service";

export function services(fnComponent: FunctionComponent, services: ServiceInterface[]) {
    if (!fnComponent.dataSource) {
        fnComponent.dataSource = new Map();
    }
    services.map(service => registerService(fnComponent.dataSource, service));
}