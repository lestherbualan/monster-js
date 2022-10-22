import { ObjectInterface } from "../../interfaces/object.interface";

export function addUrlParams(url: string, params: ObjectInterface<any>): string {

    let hasOrigin = false;

    /**
     * TODO : improve if condition
     */
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        hasOrigin = true;
    }

    const dummyUrl = !hasOrigin ? 'http://dummyurl.com' : '';
    const urlInstance = new URL(`${dummyUrl}${url}`);
    Object.keys(params).forEach(key => {
        urlInstance.searchParams.append(key, params[key]);
    });

    return urlInstance.href.replace(dummyUrl, '');
}