import { ComponentInstance } from "../interfaces/component-instance.interface";
import { DIDataSource } from "../interfaces/di-data-source.interface";
import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";
import { getDataSource } from "./get-data-source";
import { globalDi } from "./global-di";

function construct(dataSource: DIDataSource, context: ComponentInstance) {
    const constructorParams: any[] = Reflect.getMetadata('design:paramtypes', dataSource.target) || [];
    const instance = new dataSource.target(...constructorParams.map(param => inject(context, param)));
    if (instance.onReceiveConfig) {
        instance.onReceiveConfig(dataSource.config);
    }
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

export function inject<T = any>(context: ComponentInstance, target: T): T {


    /**
     * Get data source from private data source
     */
    let dataSource = getDataSource(context, 'dataSource').get(target);


    /**
     * Get data source from parent data source
     * data source from parent is passed down to the child components from the module component
     */
    if (!dataSource) {
        dataSource = getDataSource(context, 'parentDataSource').get(target);
    }


    /**
     * Get data source from global data source
     */
    if (!dataSource) {
        dataSource = globalDi.dataSource.get(target);
    }

    /**
     * If data source is not found in the three sources
     * then throw an error
     */
    if (!dataSource) {
        console.error(`The service '${(target as any).name}' is not registered in the component!`);
    }

    return processDataSource(dataSource, context);
}