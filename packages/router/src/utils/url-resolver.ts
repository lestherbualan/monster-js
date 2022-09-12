export function urlResolver(newUrl: string) {
    const pathname = location.pathname;
    let checkUrl = `${pathname}/${newUrl}`;
    if (newUrl.indexOf('/') === 0) {
        checkUrl = newUrl;
    }

    const url = checkUrl.split('/').reduce((a: string[], v: string) => {
        if (v === '.') {
            return a;
        } else if (v === '..') {
            a.pop();
        } else {
            a.push(v);
        }
        return a;
    }, []).join('/');
    return url;
}