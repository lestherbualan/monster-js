import { ComponentInstance } from "../interfaces/component-instance.interface";
import { DIDataSource } from "../interfaces/di-data-source.interface";
import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";
import { inject } from "./inject";

function construct(dataSource: DIDataSource, context: ComponentInstance) {
    const constructorParams: any[] = Reflect.getMetadata('design:paramtypes', dataSource.target) || [];
    const instance = new dataSource.target(...constructorParams.map(param => inject(context, param)));
    if (instance.onReceiveConfig) {
        instance.onReceiveConfig(dataSource.config);
    }
    return instance;
}

export function processDataSource(dataSource: DIDataSource, context: ComponentInstance) {
    if (dataSource.singleton && dataSource.instance) {
        return dataSource.instance;
    } else if (dataSource.singleton && !dataSource.instance) {
        dataSource.instance = construct(dataSource, context);
        (context.constructor as MonsterWebComponent).dataSource.set(dataSource.target, dataSource);
        return dataSource.instance;
    } else {
        return construct(dataSource, context);
    }
}

