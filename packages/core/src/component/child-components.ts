import { FunctionComponent } from "../interfaces/function-component.interface";
import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";

export function childComponents(component: FunctionComponent, webComponents: MonsterWebComponent[]) {
    if (!component.children) {
        component.children = webComponents;
    }
}
