import { BaseHttpInterceptor } from "../base-http-interceptor";

export function formatUrl(config: BaseHttpInterceptor | null, url: string) {
    return config?.baseUrl ? `${config.baseUrl}${url}` : url;
}
