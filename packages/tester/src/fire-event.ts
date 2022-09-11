export function fireEvent(element: HTMLElement, event: string) {
    const newEvent = new Event(event);
    element.dispatchEvent(newEvent);
}