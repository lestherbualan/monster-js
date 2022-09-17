import { FunctionComponent } from "../interfaces/function-component.interface";
import { MonsterWebComponent } from "../interfaces/monster-web-component.interface";

export const childComponents = (component: FunctionComponent, webComponents: MonsterWebComponent[]) => component.children = webComponents;
