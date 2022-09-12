import { ComponentInstance } from "../interfaces/component-instance.interface";
import { CustomObject } from "../interfaces/custom-object.interface";
import { createElement } from "./create-element";
import { renderChild } from "./render-child";

export function unknownElementTag(
    tag: string,
    attributes: CustomObject,
    children: (HTMLElement | Text)[],
    context: ComponentInstance,
    props: CustomObject<() => any>
) {
    if (tag.indexOf('-') > 0) {
        return renderChild(tag, attributes, children, context, props);
    } else {
        return createElement(tag, attributes, children);
    }
}