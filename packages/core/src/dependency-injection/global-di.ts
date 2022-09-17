import { DIDataSource } from "../interfaces/di-data-source.interface";

export const globalDi = {
    dataSource: new Map<any, DIDataSource>()
};