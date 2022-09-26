import { ComponentInstance } from "../../component/interfaces/component-instance.interface";
import { ViewDirective } from "./view-directive.interface";

export interface DirectiveParam {
    context: ComponentInstance;
    element: HTMLElement;
    directives: ViewDirective['directives'];
}