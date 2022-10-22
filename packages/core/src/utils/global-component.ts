import { ComponentInterface } from "../interfaces/component-interface";
import { GlobalComponents } from '../component/global-components';
import { getSelector } from "./get-selector";
import { defineComponent } from "../component/define-component";

export const globalComponent = (component: ComponentInterface) => {
    const globalComponents = new GlobalComponents();
    globalComponents.add(getSelector(component));
    defineComponent(component);
}