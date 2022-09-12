import { CustomObject } from "../interfaces/custom-object.interface";

export function createElement(tag: string, attributes: CustomObject = {}, children: (HTMLElement | Text)[] = []): HTMLElement {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    element.append(...children);

    return element;
}