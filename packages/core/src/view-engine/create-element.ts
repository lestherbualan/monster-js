export const createElement = (name: string, attributes: { [key: string]: any; } = {}, children: (HTMLElement | Text)[] = []) => {
    const element = document.createElement(name);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    element.append(...children);
    return element;
}