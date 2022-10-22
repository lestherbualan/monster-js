import { ComponentInterface, getSelector, ComponentInstanceInterface } from "@monster-js/core";

export function fakeDefineComponent(target: ComponentInstanceInterface, component: ComponentInterface) {
    if (!(target as any).$definedComponents) {
        (target as any).$definedComponents = {
            components: []
        };
    }
    (target as any).$definedComponents.components[getSelector(component)] = true;
}