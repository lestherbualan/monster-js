import { FunctionComponent } from "../../component/interfaces/function-component.interface";
import { DIDataSource } from "../../dependency-injection/interfaces/di-data-source.interface";
import { FunctionDirective } from "../../directives/function-directive.interface";
import { Constructor } from "../../interfaces/constructor.interface";
import { FunctionPipe } from "../../pipes/interfaces/function-pipe.interface";
import { ServiceConstructor } from "../../service/interfaces/service-constructor.interface";

export interface Module {
    components?: FunctionComponent[];
    directives?: FunctionDirective[];
    pipes?: FunctionPipe[];
    root?: FunctionComponent;
    services?: (ServiceConstructor | [ServiceConstructor, any])[];
    diSource?: Map<Constructor, DIDataSource>;
    init?: boolean;
}