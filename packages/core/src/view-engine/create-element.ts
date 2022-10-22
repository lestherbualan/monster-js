export const createElement = (name: string, isAttribute: string) => {
    const options: ElementCreationOptions = {};
    if (isAttribute) options.is = isAttribute;
    return document.createElement(name, options);
}