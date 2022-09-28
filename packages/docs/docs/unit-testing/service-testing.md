---
sidebar_position: 3
---

# Testing services

We can also write tests to check if our services are working properly.
Services that are injected to other services or components can be mocked.
This feature is what makes services very helpful in unit testing.

## Mocking a service

Mocking a service to provide a fake service that works like the real service.
Mock services are usually an object or an instance of a class but we can provide any type of data we want.

### Mocking a global service

To mock a global service we can use the `provideMock(<service>, <mock_data>, <component>)` function without the last argument(`<component>`).

Example.

```tsx title="Service"
@Service()
export class GreetingService {
    message = 'Hello World';
    getMessage() {
        return this.message;
    }
}
```

```tsx title="Test"
import { provideMock } from '@monster-js/tester';
import { GreetingService } from './greeting.service';

describe('test greeting service', function() {
    provideMock(GreetingService, {
        getMessage: () => 'Hi World'
    });
});
```

### Mocking a component service

To mock a service registered in a component we can use the `provideMock(<service>, <mock_data>, <component>)` function with the component as the last argument.

Example.

```tsx title="Service"
@Service()
export class GreetingService {
    message = 'Hello World';
    getMessage() {
        return this.message;
    }
}
```

```tsx title="Test"
import { provideMock } from '@monster-js/tester';
import { GreetingService } from './greeting.service';
import greetingComponent from './greeting';

describe('test greeting service', function() {
    provideMock(GreetingService, {
        getMessage: () => 'Hi World'
    }, greetingComponent);
});
```