import { RouteInterface } from "../interfaces/route.interface";
import { matchPathSegments } from "./match-path-segments";

export function evaluateRoutePath(route: RouteInterface) {
    const windowUrl = location.pathname;
    const path = route.path;
    const routePathArr: string[] = path.split('/').filter(item => !!item);
    const windowUrlArr: string[] = windowUrl.split('/').filter(item => !!item);

    // route url should not exceed window url length or auto inactive
    if (routePathArr.length > windowUrlArr.length) {
        return false;
    }

    // check if exact
    if (route.exact || route.redirectTo) {
        // check if the length are not equal, if yes, then auto inactive
        if (routePathArr.length !== windowUrlArr.length) {
            return false;
        }
    }

    if (!matchPathSegments(routePathArr, windowUrlArr)) {
        return false;
    }

    return true;
}