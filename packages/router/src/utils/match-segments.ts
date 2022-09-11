export function matchSegments(pathArr: string[], browserPathArr: string[]): boolean {
    const min = Math.min(pathArr.length, browserPathArr.length);

    let hasUnmatched = false;
    for (let i = 0; i < min; i++) {
        if (pathArr[i].indexOf(':') === 0) {
            continue;
        }
        if (pathArr[i] !== browserPathArr[i]) {
            hasUnmatched = true;
        }
    }

    return !hasUnmatched;
}