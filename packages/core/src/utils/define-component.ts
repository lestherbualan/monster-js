import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";

export function defineComponent(component: MonsterWebComponent) {
    customElements.define(component.selector, component);
}
