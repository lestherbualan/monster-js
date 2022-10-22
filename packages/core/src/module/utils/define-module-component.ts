import { ComponentInterface } from "../../interfaces/component-interface";
import { getSelector } from "../../utils/get-selector";
import { ObjectInterface } from "../../interfaces/object.interface";
import { defineComponent } from "../../component/define-component";
import { applyDirectives } from "./apply-directives";
import { applyPipes } from "./apply-pipes";
import { applyServices } from "./apply-services";
import { ClassModuleInterface } from "../interfaces/class-module.interface";

export function defineModuleComponent(component: ComponentInterface, module: ClassModuleInterface) {
    const selector = getSelector(component);
    const componentObj: ObjectInterface = module.definedComponents.components;
    componentObj[selector] = true;
    component.dataSource = module.dataSource;
    component.definedComponents = module.definedComponents;
    applyPipes(component, module);
    applyServices(component, module);
    applyDirectives(component, module);
    defineComponent(component);
}