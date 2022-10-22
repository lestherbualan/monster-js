import { ServiceInterface } from '../../interfaces/service.interface';
import { ServiceWithConfigInterface } from '../../interfaces/service-with-config.interface';
import { DirectiveInterface } from '../../interfaces/directive.interface';
import { PipeInterface } from '../../interfaces/pipe.interface';
import { ComponentInterface } from '../../interfaces/component-interface';
import { BaseModule } from '../base-module';
import { ModuleExportsInterface } from './module-exports.interface';

export interface ModuleConfigInterface {
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    components?: ComponentInterface[];
    modules?: typeof BaseModule[];
    root?: ComponentInterface;
    exports?: ModuleExportsInterface;
}
