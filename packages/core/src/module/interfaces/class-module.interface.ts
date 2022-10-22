import { ModuleConfigInterface } from "./module-config.interface";
import { ObjectInterface } from "../../interfaces/object.interface";
import { DataSourceInterface } from "../../interfaces/data-source.interface";
import { ModuleExportsInterface } from "./module-exports.interface";

export interface ClassModuleInterface {
    new(...args: any[]): any;
    defined?: boolean;
    config?: ModuleConfigInterface;
    definedComponents?: {
        name: string;
        components: ObjectInterface<boolean>;
    };
    dataSource?: DataSourceInterface;
    exports?: ModuleExportsInterface;
    childrenExports?: ModuleExportsInterface;
}