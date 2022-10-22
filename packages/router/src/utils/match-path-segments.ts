export function matchPathSegments(routePathArr: string[], windowUrlArr: string[]): boolean {
    let match = true;

    routePathArr.forEach((path, index) => {
        if (path.indexOf(':') === 0) {
            return;
        }
        if (path !== windowUrlArr[index]) {
            match = false;
        }
    })

    return match;
}