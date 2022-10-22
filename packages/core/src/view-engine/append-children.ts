export function appendChildren(element: HTMLElement, children: (HTMLElement | Text)[]) {
    element.append(...children);
    return element;
}