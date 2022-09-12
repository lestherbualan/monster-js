import { defineComponent } from "@monster-js/core";
import { Route } from "../interfaces/route.interface";

export async function getSelector(route: Route) {
    let selector = ''
    if (route.component) {
        selector = route.component.selector;
    } else if (route.lazyComponent) {
        const lazyComponent = await route.lazyComponent();
        if (!lazyComponent.defined) {
            defineComponent(lazyComponent);
            lazyComponent.defined = true;
        }
        selector = lazyComponent.selector;
    }
    return selector;
}