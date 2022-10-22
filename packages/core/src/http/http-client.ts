import { BaseHttpInterceptor } from "./base-http-interceptor";
import { HttpMethodsEnum } from "./enums/http-methods.enum";
import { fromFetch } from "rxjs/fetch";
import { Observable } from "rxjs";
import { CustomRequestInitInterface } from "./interfaces/custom-request-init.interface";
import { HttpResponse } from "./types/http-response.type";
import { addUrlParams } from "./utils/add-url-params";
import { formatHeaders } from "./utils/format-headers";
import { formatUrl } from "./utils/format-url";
import { Service } from '../service/service.decorator';
import { OnReceiveConfig } from '../interfaces/impls/on-receive-config.impl';
import { ObjectInterface } from '../interfaces/object.interface';
import { Container } from '../dependency-injection/container';

@Service()
export class HttpClient implements OnReceiveConfig {

  private config: BaseHttpInterceptor | null = null;

  get<T = any>(
    url: string,
    params: ObjectInterface<any> = {},
    config: RequestInit = {}
  ): HttpResponse<T> {
    url = addUrlParams(url, params);
    return this.senderMethod(url, HttpMethodsEnum.GET, null, config);
  }

  delete<T = any>(url: string, params: ObjectInterface<any>, config: RequestInit = {}): HttpResponse<T> {
    url = addUrlParams(url, params);
    return this.senderMethod(url, HttpMethodsEnum.DELETE, null, config);
  }

  put<T = any>(
    url: string,
    body: ObjectInterface<any>,
    config: CustomRequestInitInterface = {}
  ): HttpResponse<T> {
    if (config.params) {
      url = addUrlParams(url, config.params);
      delete config.params;
    }
    return this.senderMethod(url, HttpMethodsEnum.PUT, body, config);
  }

  post<T = any>(
    url: string,
    body: ObjectInterface<any>,
    config: CustomRequestInitInterface = {}
  ): HttpResponse<T> {
    if (config.params) {
      url = addUrlParams(url, config.params);
      delete config.params;
    }
    return this.senderMethod(url, HttpMethodsEnum.POST, body, config);
  }

  patch<T = any>(
    url: string,
    body: ObjectInterface<any>,
    config: CustomRequestInitInterface = {}
  ): HttpResponse<T> {
    if (config.params) {
      url = addUrlParams(url, config.params);
      delete config.params;
    }
    return this.senderMethod(url, HttpMethodsEnum.PATCH, body, config);
  }

  public onReceiveConfig(
    config: typeof BaseHttpInterceptor,
    container: Container
  ) {
    this.config = config ? container.resolve(config) : null;
  }

  private modifyConfig(config: RequestInit): RequestInit {
    return this.config?.modifyConfig
      ? this.config!.modifyConfig(config)
      : config;
  }

  private modifyResponse(response: Observable<Response>) {
    return this.config?.modifyResponse
      ? this.config.modifyResponse(response)
      : response;
  }

  private senderMethod(
    url: string,
    method: HttpMethodsEnum,
    body: any,
    config: RequestInit
  ) {
    return this.send(formatUrl(this.config, url), method, body, config);
  }

  private send(
    url: string,
    method: HttpMethodsEnum,
    body: ObjectInterface<any>,
    config: RequestInit = {}
  ) {
    const headers: ObjectInterface<any> = formatHeaders(config);

    let fetchConfig = {
      method: method,
      ...config,
      headers,
    };

    if (!!body) {
      fetchConfig.body = JSON.stringify(body);
    }

    const newConfig = this.modifyConfig(fetchConfig);
    newConfig.headers = new Headers(newConfig.headers);
    return this.modifyResponse(fromFetch(url, newConfig));
  }
}
