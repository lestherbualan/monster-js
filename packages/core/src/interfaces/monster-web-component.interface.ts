import { DIDataSource } from "./di-data-source.interface";

export interface MonsterWebComponent extends CustomElementConstructor {
    selector?: string;
    defined?: boolean;
    parentDataSource?: Map<any, DIDataSource>;
    dataSource?: Map<any, DIDataSource>;
}