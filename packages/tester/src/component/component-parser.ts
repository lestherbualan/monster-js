import { HostHelper } from "./host-helper";

export class ComponentParser<T> extends HostHelper<T> {
    protected _host: HTMLElement;

    constructor(element: HTMLElement) {
        super();
        this._host = element;
    }
}
