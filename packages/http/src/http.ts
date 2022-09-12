import { CustomObject } from "./custom-object.interface";
import { CustomResponse } from "./custom-response.interface";

export class Http {

    private defaultConfig: RequestInit = {}

    baseUrl: string = '';

    modifyUrl(url: string): string {
        return url;
    }

    modifyResponse(response: Promise<Response>): any {
        return response;
    }

    modifyBody(body: any): any {
        return body;
    }

    modifyParams(params: CustomObject): CustomObject {
        return params;
    }

    modifyHeaders(headers: HeadersInit): HeadersInit {
        return headers;
    }

    modifyConfig(config: RequestInit): RequestInit {
        return config;
    }

    async get<T>(url: string, params: CustomObject = {}, config: RequestInit = {}) {
        return await this.send<T>(url, 'GET', undefined, params, config);
    }
    async delete<T>(url: string, params: CustomObject = {}, config: RequestInit = {}) {
        return await this.send<T>(url, 'DELETE', undefined, params, config);
    }

    async post<T>(url: string, body?: any, config: RequestInit = {}, params: CustomObject = {}) {
        return await this.send<T>(url, 'POST', body, params, config);
    }
    async patch<T>(url: string, body?: any, config: RequestInit = {}, params: CustomObject = {}) {
        return await this.send<T>(url, 'PATCH', body, params, config);
    }
    async put<T>(url: string, body?: any, config: RequestInit = {}, params: CustomObject = {}) {
        return await this.send<T>(url, 'PUT', body, params, config);
    }

    request<T>(url: string, params: CustomObject = {}, config: RequestInit = {}): Promise<CustomResponse<T>> {
        const urlWithParams = this.joinBaseUrl(this.addParam(url, params));
        const newUrl = this.modifyUrl(urlWithParams);
        const newBody = this.modifyBody(config.body);
        const newHeaders = this.modifyHeaders(config.headers);

        return fetch(newUrl, this.modifyConfig({
            ...this.defaultConfig,
            ...config,
            body: newBody,
            headers: newHeaders
        }));
    }

    send<T>(url: string, method: string, body: any, params: CustomObject, config: RequestInit): Promise<CustomResponse<T>> {
        const urlWithParams = this.joinBaseUrl(this.addParam(url, params));
        const newUrl = this.modifyUrl(urlWithParams);
        const newBody = this.modifyBody(body);
        const newHeaders = this.modifyHeaders(config.headers);

        return fetch(newUrl, this.modifyConfig({
            ...this.defaultConfig,
            method,
            body: newBody,
            headers: newHeaders
        }));
    }

    private joinBaseUrl(url: string): string {
        const lastBaseUrl = this.baseUrl[this.baseUrl.length - 1];
        if (lastBaseUrl !== '/' && url[0] !== '/') {
            return `${this.baseUrl}/${url}`;
        } else if (lastBaseUrl === '/' && url[0] !== '/') {
            return `${this.baseUrl}${url}`;
        } else if (lastBaseUrl !== '/' && url[0] === '/') {
            return `${this.baseUrl}${url}`;
        } else if (lastBaseUrl === '/' && url[0] === '/') {
            return `${this.baseUrl}${url.substring(1)}`;
        }
    }

    private addParam(url: string, params: CustomObject): string {
        const hasOrigin = url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
        const dummyUrl = !hasOrigin ? 'http://dummyurl.com' : '';
        const urlInstance = new URL(`${dummyUrl}${url}`);
        for (const [key, value] of Object.entries(params)) {
            urlInstance.searchParams.append(key, value);
        }
        return urlInstance.href.replace(dummyUrl, '');
    }
}
