import { ComponentInterface, getSelector } from "@monster-js/core";

export class Component<T> {
    protected _host: HTMLElement;

    constructor(component: ComponentInterface) {

        if (component.extendsLocalName) {
            this._host = document.createElement(component.extendsLocalName, { is: getSelector(component) });
        } else {
            this._host = document.createElement(getSelector(component));
        }

        document.body.appendChild(this._host);
    }
}
