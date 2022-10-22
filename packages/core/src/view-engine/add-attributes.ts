export function addAttributes(element: HTMLElement, attributes: { [key: string]: any; }) {
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    return element;
}