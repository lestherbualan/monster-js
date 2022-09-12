import { MonsterWebComponent, defineComponent, getSelector } from "@monster-js/core";
import { render } from "./render";

export function createComponentTester(component: MonsterWebComponent) {
    defineComponent(component);
    return {
        render: () => render(component, document.body),
        selector: getSelector(component)
    }
}