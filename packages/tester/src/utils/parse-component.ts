import { ComponentParser } from "../component/component-parser";

export function parseComponent<T = any>(element: HTMLElement | Element) {
    return new ComponentParser<T>(element as any);
}