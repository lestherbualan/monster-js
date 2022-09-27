import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { MonsterWebComponent } from "../component/interfaces/monster-web-component.interface";
import { Constructor } from "../interfaces/constructor.interface";
import { GLOBAL_DI_SOURCE } from "../service/global-data-source";
import { DIDataSource } from "./interfaces/di-data-source.interface";

const construct = (dataSource: DIDataSource, context: ComponentInstance) => {
    const constructorParams: any[] = Reflect.getMetadata('design:paramtypes', dataSource.target) || [];
    const instance = new dataSource.target(...constructorParams.map(param => inject(context, param)));

    if (instance.onReceiveConfig) instance.onReceiveConfig(dataSource.config);

    return instance;
}

export function processDataSource(dataSource: DIDataSource, context: ComponentInstance) {

    if (dataSource.mock) {
        return dataSource.mock;
    }

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

export function inject<T>(context: ComponentInstance, target: Constructor<T>): T {

    /**
     * Get data source
     */
    let dataSource = (context as any).constructor.dataSource.get(target);


    /**
     * If data source is not in component's data source
     * then check if it exists in global
     */
    if (!dataSource) {
        dataSource = GLOBAL_DI_SOURCE.get(target);
    }


    /**
     * If data source is not found
     * then throw an error
     */
    if (!dataSource) {
        console.error(`The service '${(target as any).name}' is not registered in the module or as a global service!`);
        return;
    }

    return processDataSource(dataSource, context);
}