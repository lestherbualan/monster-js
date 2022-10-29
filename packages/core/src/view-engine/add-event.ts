export const addEvent = (
    element: HTMLElement,
    name: string,
    handler: (event?: Event) => any,
    preventDefault?: boolean
) => {
    element.addEventListener(name, event => {
        if (preventDefault) event.preventDefault();
        handler(event);
    });
    return element;
}