import { ComponentInstance } from "../interfaces/component-instance.interface";
import { getDataSource } from "./get-data-source";
import { globalDi } from "./global-di";
import { processDataSource } from "./process-data-source";

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