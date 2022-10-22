import { ComponentInterface, getSelector } from "@monster-js/core";
import { ComponentParser } from "../component/component-parser";
import { parseComponent } from "./parse-component";

/**
 * render a component that is already defined into view
 * 
 * @param component the component to be rendered
 * 
 * @returns the rendered element of the component
 */
export function render<T = any>(component: ComponentInterface): ComponentParser<T> {
    const element = document.createElement(getSelector(component));
    document.body.appendChild(element);
    return parseComponent<T>(element);
}
