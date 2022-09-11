import { Route } from "../interfaces/route.interface";

export function getRouteParams(route: Route) {
    const params: { [key: string]: string } = {};
    const path: string = route.path;
    const wPath = location.pathname;
    const pathArr = path.split('/').filter(item => !!item);
    const wPathArr = wPath.split('/').filter(item => !!item);
    pathArr.forEach((item, index) => {
        if (item.indexOf(':') === 0) {
            const key = item.substring(1);
            params[key] = wPathArr[index];
        }
    });
    return params;
}