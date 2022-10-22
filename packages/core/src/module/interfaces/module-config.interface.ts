import { ServiceInterface } from '../../interfaces/service.interface';
import { ServiceWithConfigInterface } from '../../interfaces/service-with-config.interface';
import { DirectiveInterface } from '../../interfaces/directive.interface';
import { PipeInterface } from '../../interfaces/pipe.interface';
import { ComponentInterface } from '../../interfaces/component-interface';
import { ModuleExportsInterface } from './module-exports.interface';
import { ClassModuleInterface } from './class-module.interface';

export interface ModuleConfigInterface {
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    components?: ComponentInterface[];
    modules?: ClassModuleInterface[];
    root?: ComponentInterface;
    exports?: ModuleExportsInterface;
}
