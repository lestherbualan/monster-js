---
sidebar_position: 11
---

# Services

Services are injectable classes that are used to perform reusable logic.
This helps us to have much cleaner and easy to maintain components.
It is recommended that all http requests and business logics are implemented inside a service.

## Create a service

To create a service, we can use the [cli](/docs/category/cli) to automatically generate a service file with boilerplate codes or we can manually create a file and write the code from scratch.

The following code is an example of a working service codes but without functions yet.

```tsx
import { Service } from '@monster-js/core';

@Service()
export class GreetingService {
}
```

## Service decorator

The service decorator allow us to pass configurations to the service.

### Syntax

```tsx
@Service(<config>)
```

The `config` is optional.

### Service config properties

| Property | Data type | Description |
| --- | --- | --- |
| singleton | boolean | This helps us to register our service in the dependency injection container as a singleton class. |

## Singleton service

Services is transient by default.
To create a singleton service, we need to pass an optional config to `@Service()` decorator.
The config is an object that contains a singleton property that is set to true.

Example.

```tsx
import { Service } from '@monster-js/core';

@Service({ singleton: true })
export class GreetingService {
}
```

We can also generate a singleton service using a cli command.

```tsx
mn generate service greeting --singleton
```

## Register service

Before we can use a service we need to register it in our component.

Example.

```tsx
import { services } from '@monster-js/core';
import { GreetingService } from './greeting.service';

function app() {
    return <h1>App component</h1>
}

services(app, [GreetingService]);
```

### Register with config

```tsx
import { services } from '@monster-js/core';
import { GreetingService } from './greeting.service';

function app() {
    return <h1>App component</h1>
}

services(app, [
    {
        service: GreetingService,
        config: { message: 'hello world' }
    }
]);
```

## Register service in global

If we want our service to be available to all our components inside our application, we can also register the service as a global service.

Example.

```tsx title="src/index.ts"
import { globalService } from '@monster-js/core';
import { GreetingService } './greeting.service';

globalService(GreetingService);
```

### Register with config

```tsx title="src/index.ts"
import { globalService } from '@monster-js/core';
import { GreetingService } './greeting.service';

globalService({
    service: GreetingService,
    config: { message: 'hello world' }
});
```

## Service lifecycle hooks

There are lifecycle hooks that we can use in a service.
Please check the [service available hooks](/docs/main-concept/lifecycle-hooks#service-available-hooks) documentation for more info about service lifecycle hooks.
