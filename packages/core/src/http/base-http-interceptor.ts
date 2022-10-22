import { Observable } from "rxjs";

export class BaseHttpInterceptor {

    public baseUrl: string | null = null;

    public setHeader(config: RequestInit, header: string, value: string): RequestInit {
        if (!config.headers) {
            config.headers = {};
        }
        (config.headers as any)[header] = value;
        return config;
    }

    public modifyConfig(config: RequestInit): RequestInit {
        return config;
    }

    public modifyResponse(response: Observable<Response>): any {
        return response;
    }
}
