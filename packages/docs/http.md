# Http

MonsterJS http package helps applications to communicate to a server using http protocol.
This package is a wrapper of fetch api that provides an easy way to intercept requests.

## Installation

We can install the http package by running the following command in the root directory of our project.

```bash
npm install @monster-js/http
```

## Http

The `Http` is a base class that contains the methods and properties that manipulates the request.
It also has the http verb methods for sending requests.
To use this class, we need to create a new http client class that extends the `Http` class.

Example.

```tsx
import { Http } from '@monster-js/core';

export class HttpClient extends Http {

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

}
```

The class name `HttpClient` can be anything we want but it is recommended to use `HttpClient` name as best practice in MonsterJS so other developers can easily recognize the use of this class.

After creating a class that extends the `Http` class.
We can now use this class inside our component or services to send requests.

?> It is recommended to put all http request codes in a service than inside a component.

## Using the http client

We can use the http client inside our component and services to send a request.

Example.

```tsx
function app() {
    const httpClient = new HttpClient();
    const [ user, setUser ] = useState(this);

    afterInit(this, async () => {
        const user = await httpClient.get('/api/v1/user');
        setUser(user);
    });

    return <h1>User : {user().name}</h1>
}
```

## Http verbs

Once `HttpClient` class is configured we can now start sending requests using the different http verbs.
Http supports different http verbs like GET, POST, PUT, PATCH, and DELETE.

### GET request

#### Syntax

`get(<url>, <url_params>, <config>)`

Example.

```tsx
export class SampleService {
    http = new HttpClient();

    async getAll() {
        return await this.http.get('/get-all');
    }
}
```

#### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| url | required | The url where we want to send the request. |
| url_params | optional | This is an object that will be converted as a url search query. |
| config | optional | This is will override the default configuration of the fetch api request. |

### DELETE request

#### Syntax

`delete(<url>, <url_params>, <config>)`

Example.

```tsx
export class SampleService {
    http = new HttpClient();

    async deleteOne(id: number) {
        return await this.http.delete(`/delete-item/${id}`);
    }
}
```

#### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| url | required | The url where we want to send the request. |
| url_params | optional | This is an object that will be converted as a url search query. |
| config | optional | This is will override the default configuration of the fetch api request. |

### POST request

#### Syntax

`post(<url>, <body>, <config>, <url_params>)`

Example.

```tsx
export class SampleService {
    http = new HttpClient();

    async create(body: CustomObject) {
        return await this.http.post(`/create-item`, body);
    }
}
```

#### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| url | required | The url where we want to send the request. |
| body | optional | This will be the request body. |
| config | optional | This is will override the default configuration of the fetch api request. |
| url_params | optional | This is an object that will be converted as a url search query. |

### PUT request

#### Syntax

`put(<url>, <body>, <config>, <url_params>)`

Example.

```tsx
export class SampleService {
    http = new HttpClient();

    async update(id: number, body: CustomObject) {
        return await this.http.put(`/update-item/${id}`, body);
    }
}
```

#### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| url | required | The url where we want to send the request. |
| body | optional | This will be the request body. |
| config | optional | This is will override the default configuration of the fetch api request. |
| url_params | optional | This is an object that will be converted as a url search query. |

### PATCH request

#### Syntax

`patch(<url>, <body>, <config>, <url_params>)`

Example.

```tsx
export class SampleService {
    http = new HttpClient();

    async update(id: number, body: CustomObject) {
        return await this.http.patch(`/update-item/${id}`, body);
    }
}
```

#### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| url | required | The url where we want to send the request. |
| body | optional | This will be the request body. |
| config | optional | This is will override the default configuration of the fetch api request. |
| url_params | optional | This is an object that will be converted as a url search query. |


## Http interceptor
### Set base url
### Modify url
### Modify response
### Modify request body
### Modify request params
### Modify headers
### Modify config
