import { DIDataSource } from "../../dependency-injection/interfaces/di-data-source.interface";

export interface MonsterWebComponent extends CustomElementConstructor {
    selector?: string;
    defined?: boolean;
    dataSource?: Map<any, DIDataSource>;
}