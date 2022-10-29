import { Component } from "../core";
import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";

export const addEvent = (
    element: HTMLElement,
    name: string,
    handler: (event?: Event) => any,
    context: ComponentInstanceInterface,
    preventDefault?: boolean
) => {
    element.addEventListener(name, event => {
        if (preventDefault) event.preventDefault();
        handler(event);
    });
    return element;
}