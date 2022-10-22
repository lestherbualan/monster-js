import { elementToWrapper } from "@monster-js/core";

export class HostHelper<T> {
    protected _host: HTMLElement = null!;

    public get host(): HTMLElement {
        return this._host;
    }

    public get element(): Element {
        return elementToWrapper(this._host).getElement();
    }

    public get component(): T {
        return elementToWrapper(this._host).componentInstance as any;
    }

    public get shadowRoot(): ShadowRoot {
        return elementToWrapper(this._host).getShadowRoot();
    }
}