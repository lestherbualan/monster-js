import { PipeInterface } from '../../interfaces/pipe.interface';
import { ServiceInterface } from '../../interfaces/service.interface';
import { ServiceWithConfigInterface } from '../../interfaces/service-with-config.interface';
import { DirectiveInterface } from '../../interfaces/directive.interface';
import { ComponentInterface } from '../../interfaces/component-interface';

export interface ModuleExportsInterface {
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    components?: ComponentInterface[];
}