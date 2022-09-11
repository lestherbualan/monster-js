import { ComponentInstance, MonsterWebComponent, getSelector } from "@monster-js/core";

export function render(webComponent: MonsterWebComponent, parent: HTMLElement) {
    const defined = customElements.get(getSelector(webComponent));
    const component = new defined();
    parent.appendChild(component);
    return {
        element: component,
        component: component as ComponentInstance,
        detectChanges: () => (component as ComponentInstance).detectChanges(),
        setProps: (props: { [key: string]: any; }) => (component as ComponentInstance).setProps(props)
    };
}