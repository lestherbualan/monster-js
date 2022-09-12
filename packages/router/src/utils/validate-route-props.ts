import { Route } from "../interfaces/route.interface";

export function validateRouteProps(route: Route) {
    if (!route.component && !route.redirectTo && !route.lazyComponent) {
        throw 'Component or redirect-to prop is required in a route.'
    }

    if (route.component && !route.component.selector) {
        throw 'The component cannot be used in route because it has no selector.';
    }

    if (!route.path) {
        throw 'Route path is required.';
    }
}
