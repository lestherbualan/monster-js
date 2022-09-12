import { matchSegments } from "./match-segments";

export function routeMatcher(path: string, browserPath: string, isExact: boolean) {
    const pathArr = path.split('/').filter(item => !!item);
    const browserPathArr = browserPath.split('/').filter(item => !!item);

    if (isExact && pathArr.length !== browserPathArr.length) {
        return false;
    }

    if (pathArr.length > browserPathArr.length) {
        return false;
    }

    if (!matchSegments(pathArr, browserPathArr)) {
        return false;
    }

    return true;
}