import { ComponentInstance } from "../interfaces/component-instance.interface";
import { DIDataSource } from "../interfaces/di-data-source.interface";
import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";
import { inject } from "./inject";

export function processDataSource(dataSource: DIDataSource, context: ComponentInstance) {
    if (dataSource.singleton && dataSource.instance) {
        return dataSource.instance;
    } else if (dataSource.singleton && !dataSource.instance) {

        // resolve this using di
        const constructorParams: any[] = Reflect.getMetadata('design:paramtypes', dataSource.target) || [];
        const instance = new dataSource.target(...constructorParams.map(param => inject(context, param)));

        dataSource.instance = instance;
        (context.constructor as MonsterWebComponent).dataSource.set(dataSource.target, dataSource);
        return dataSource.instance;
    } else {

        // resolve this using di
        const constructorParams: any[] = Reflect.getMetadata('design:paramtypes', dataSource.target) || [];
        return new dataSource.target(...constructorParams.map(param => inject(context, param)));

    }
}

