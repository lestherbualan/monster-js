---
sidebar_position: 14
---

# Dependency injection

Dependency injection is also available in this framework.
It is recommended to use services and dependency injection every time we need some external logic in our component.

## Inject service in component

Services can be injected inside a component using `inject(<context>, <service>)` function.

Example.

```tsx
import { inject } from '@monster-js/core';

function app() {
    const greeting = inject(this, GreetingService);
    return <h1>{greeting.getMessage()}</h1>
}
```

## Inject service in another service

When a service needs an instance of a dependency, we can supply the dependency through the class constructor.

Example.

```tsx
import { MessageService } from './message.service';

@Service()
export class GreetingService {
    constructor(private messageService: MessageService) {}
}
```

Now we can use `this.messageService` as an instance of `MessageService` service.

## Inject service in directive

Since we can get an instance of component inside a directive function we can inject the services that are registered in that component.

Example.

```tsx
import { DirectiveParam, inject } from '@monster-js/core';
import { GreetingService } from './greeting.service';

function highlight(param: DirectiveParam) {
    const { context } = param;
    const greeting = inject(context, GreetingService);
}
```
