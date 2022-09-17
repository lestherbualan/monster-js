import { ComponentInstance } from "./component-instance.interface";
import { CustomObject } from "./custom-object.interface";
import { DIDataSource } from "./di-data-source.interface";
import { FunctionDirective } from "./function-directive.interface";
import { FunctionPipe } from "./function-pipe.interface";
import { MonsterWebComponent } from "./monster-web-component.interface";

type FnComponent = (props?: CustomObject, ctx?: ComponentInstance) => HTMLElement;

export interface FunctionComponent extends FnComponent {
    superClass?: CustomElementConstructor;
    selector?: string;
    directives?: CustomObject<FunctionDirective>;
    pipes?: CustomObject<FunctionPipe>;
    children?: MonsterWebComponent[];
    childrenDefined?: boolean;
    styles?: string;
    parentDataSource?: Map<any, DIDataSource>;
    dataSource?: Map<any, DIDataSource>;
}
