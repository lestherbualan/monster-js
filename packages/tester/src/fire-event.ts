export function fireEvent(element: HTMLElement, eventName: string) {
    element.dispatchEvent(new Event(eventName));
}