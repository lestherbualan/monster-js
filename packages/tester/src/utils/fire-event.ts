export function fireEvent(element: Element, eventType: string) {
        const mouseEvents = [
        'click',
        'contextmenu',
        'dblclick',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup'
    ];
    const event = mouseEvents.indexOf(eventType) > -1
        ? new MouseEvent(eventType, { bubbles: true })
        : new Event(eventType, { bubbles: true });
    element.dispatchEvent(event);
}
