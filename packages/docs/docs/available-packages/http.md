---
sidebar_position: 1
---

# Http

MonsterJS http package helps applications to communicate to a server using http protocol.
This is a wrapper of fetch api built for MonsterJS applications.
This package is using rxjs fromFetch function so we can also use the rxjs operators in this package.

## HttpClient

The http client is a service to send request using http protocol.
To start using this client we should register this in our component or module.

### Register HttpClient to component

To register the HttpClient to a component we just need to pass it to the component's @Services decorator.

Example.

```typescript
import { Component, Services } from '@monster-js/core';
import { HttpClient } from '@monster-js/http';

@Services(HttpClient)
@Component('app-greeting')
export class Greeting {
    ...
}
```

### Register HttpClient to module

To register the HttpClient to a module we just need to pass it to it's services array.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { HttpClient } from '@monster-js/http';

@Module({
    services: [HttpClient]
})
export class AppModule {}
```

## Http verbs

Once `HttpClient` is available in our module or component we can now start sending request using the different http verbs or methods.
Http supports different http verbs like GET, POST, PUT, PATCH, and DELETE.

### Get request

```typescript
import { Service } from '@monster-js/core';
import { HttpClient, CustomResponse } from '@monster-js/http';

interface PostInterface {
    id: number;
    content: string;
}

@Service()
export class PostService {
    constructor(private http: HttpClient) {}

    getAll(): Promise<CustomResponse<PostInterface[]>> {
        return this.http.get<PostInterface[]>('/get-all').toPromise();
    }
}
```

### Post request

```typescript
import { Service } from '@monster-js/core';
import { HttpClient, CustomResponse } from '@monster-js/http';

interface PostInterface {
    id: number;
    content: string;
}

@Service()
export class PostService {
    constructor(private http: HttpClient) {}

    create(post: PostInterface): Promise<CustomResponse<PostInterface>> {
        return this.http.post<PostInterface>('/create', post).toPromise();
    }
}
```

### Put request

```typescript
import { Service } from '@monster-js/core';
import { HttpClient, CustomResponse } from '@monster-js/http';

interface PostInterface {
    id: number;
    content: string;
}

@Service()
export class PostService {
    constructor(private http: HttpClient) {}

    update(post: PostInterface): Promise<CustomResponse<PostInterface>> {
        return this.http.put<PostInterface>('/update/' + post.id, post).toPromise();
    }
}
```

### Patch request

```typescript
import { Service } from '@monster-js/core';
import { HttpClient, CustomResponse } from '@monster-js/http';

interface PostInterface {
    id: number;
    content: string;
}

@Service()
export class PostService {
    constructor(private http: HttpClient) {}

    update(id: number, content: string): Promise<CustomResponse<PostInterface>> {
        return this.http.patch<PostInterface>('/update/' + id, { content }).toPromise();
    }
}
```

### Delete request

```typescript
import { Service } from '@monster-js/core';
import { HttpClient, CustomResponse } from '@monster-js/http';

@Service()
export class PostService {
    constructor(private http: HttpClient) {}

    delete(id: number): Promise<CustomResponse<void>> {
        return this.http.delete<void>('/delete/' + id).toPromise();
    }
}
```

## Http interceptor

Http interceptor is a way to intercept and modify the request config of every http request.

The following code is an example of a working http interceptor codes but without functions yet.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttpInterceptor } from '@monster-js/http';

@Service()
export class HttpInterceptor extends BaseHttpInterceptor {
}
```

### Set request base url

Setting a base url is helpful for us not to type again the base url of the server each time we make a request in the service.
It can also make our code cleaner since we do not need to type long urls on our services.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttpInterceptor } from '@monster-js/http';

@Service()
export class HttpInterceptor extends BaseHttpInterceptor {
    override baseUrl = 'http://localhost:4001/api/v1';
}
```

### Modify request config

We can also modify the request config of fetch api before being sent to the server.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttpInterceptor } from '@monster-js/http';

@Service()
export class HttpInterceptor extends BaseHttpInterceptor {
    override modifyConfig(config: RequestInit): RequestInit {
        config.body = {
            greeting: 'Hello World!'
        };
        return config;
    }
}
```

### Modify response

Same as the request config we can also modify the response of all the request.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttpInterceptor } from '@monster-js/http';

@Service()
export class HttpInterceptor extends BaseHttpInterceptor {
    override modifyResponse(response: Observable<Response>): any {
        // modify response here
        return response;
    }
}
```

Response is an rxjs observable, so we can use all rxjs operators to modify it.

### Set request header

We can use the `setHeader` method provided by `BaseHttpInterceptor` to set a request header in http interceptor.

Example.

```typescript
import { Service } from '@monster-js/core';
import { BaseHttpInterceptor } from '@monster-js/http';

@Service()
export class HttpInterceptor extends BaseHttpInterceptor {
    override modifyConfig(config: RequestInit): RequestInit {
        this.setHeader(config, 'Authorization', `Bearer some-token`);
        return config;
    }
}
```

## Http interceptor module

After we build the Http interceptor we need to create a module that we can import to a module that needs the http interceptor.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { HttpClient } from '@monster-js/http';
import { HttpInterceptor } from './http-interceptor.service';

@Module({
    exports: {
        services: [
            HttpInterceptor,
            { service: HttpClient, config: HttpInterceptor }
        ]
    }
})
export class HttpModule {}
```

Notice that we exported the `HttpInterceptor` and `HttpClient` as a service and pass the HttpInterceptor as a config for HttpClient.

It is recommended that we name this module as `HttpModule`.
