import { ComponentInterface, defineComponent, getSelector, GlobalComponents } from "@monster-js/core";
import { Component } from "./component";
import { ComponentTesterConfigInterface } from "../utils/create-tester";

export class ComponentTester<T = any> {
    private component: ComponentInterface;

    constructor(component: ComponentInterface, config: ComponentTesterConfigInterface = {}) {
        this.component = component;

        this.defineChildren(config.components);
        this.defineExternalComponents(config.externalComponents);

        defineComponent(component);
    }

    public createComponent() {
        return new Component<T>(this.component);
    }

    private defineExternalComponents(selectors: string[] = []) {
        const gc = new GlobalComponents();
        selectors.forEach(selector => {
            gc.add(selector);
        });
    }

    private defineChildren(children: ComponentInterface[] = []) {
        const gc = new GlobalComponents();
        children.forEach(child => {
            defineComponent(child);
            gc.add(getSelector(child));
        });
    }
}
