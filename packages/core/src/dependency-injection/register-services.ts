import { FunctionComponent } from "../interfaces/function-component.interface";

interface Service {
    new(...args: any[]): any;
    singleton?: boolean;
    config?: any;
    service?: Service;
}

export function registerServices(fnComponent: FunctionComponent, services: Service[]) {
    if (!fnComponent.dataSource) {
        fnComponent.dataSource = new Map();
    }
    services.map(service => {
        fnComponent.dataSource.set(service, {
            config: null,
            instance: null,
            mock: null,
            singleton: service.singleton,
            target: service
        });
    });
}