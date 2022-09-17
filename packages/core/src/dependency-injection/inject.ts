import { ComponentInstance } from "../interfaces/component-instance.interface";
import { getDataSource } from "./get-data-source";
import { processDataSource } from "./process-data-source";

export function inject<T = any>(context: ComponentInstance, target: T): T {

    let dataSource = getDataSource(context, 'dataSource').get(target);
    if (!dataSource) {
        dataSource = getDataSource(context, 'parentDataSource').get(target);
    }

    if (!dataSource) {
        console.error(`The service '${(target as any).name}' is not registered in the component!`);
    }

    return processDataSource(dataSource, context);
}