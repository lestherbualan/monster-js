export const createElement = (name: string, attributes: { [key: string]: any; } = {}, children: (HTMLElement | Text)[] = []) => {
    const options: ElementCreationOptions = {};
    if (attributes.is) options.is = attributes.is;
    const element = document.createElement(name, options);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    element.append(...children);
    return element;
}