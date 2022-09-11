export function addEventListener(element: HTMLElement, event: string, handler: () => void, preventDefault: boolean = false): HTMLElement {
    if (preventDefault) {
        element.addEventListener(event, ev => ev.preventDefault());
    }
    element.addEventListener(event, handler);
    return element;
}