import { ComponentInterface, getSelector } from "@monster-js/core";
import { HostHelper } from "./host-helper";

export class Component<T> extends HostHelper<T> {
    protected _host: HTMLElement;

    constructor(component: ComponentInterface) {
        super();

        if (component.extendsLocalName) {
            this._host = document.createElement(component.extendsLocalName, { is: getSelector(component) });
        } else {
            this._host = document.createElement(getSelector(component));
        }

        document.body.appendChild(this._host);
    }
}
