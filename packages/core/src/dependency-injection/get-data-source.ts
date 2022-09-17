import { DIDataSource } from "../interfaces/di-data-source.interface";
import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";

export function getDataSource(context: any, key: 'dataSource' | 'parentDataSource'): Map<any, DIDataSource> {
    return (context.constructor as MonsterWebComponent)[key] || new Map();
}
