---
sidebar_position: 1
---

# Available pipes

MonsterJS provides a set of pipes.
These pipes are not available in components by default so we still need to register these pipes in our module or component.
Please check the [pipes](/docs/main-concept/pipes) documentation for more information about pipes.

## LowercasePipe

This pipe is used to transform string to lowercase.

Example.

#### In template

```typescript
import { Component, Pipes, LowercasePipe } from '@monster-js/core';

@Pipes(LowercasePipe)
@Component('app-greeting')
export class Greeting {
    render() {
        return <h1>{ 'Hello World' | lowercase }</h1>
    }
}
```

#### In logic

```typescript
import { Component, Pipes, LowercasePipe } from '@monster-js/core';

@Pipes(LowercasePipe)
@Component('app-greeting')
export class Greeting {
    message = 'Hello World!';

    constructor(private lowercasePipe: LowercasePipe) {}

    onInit() {
        this.message = this.lowercasePipe.transform(this.message);
    }

    render() {
        return <h1>{this.message}</h1>
    }
}
```

## UppercasePipe

This pipe is used to transform string to uppercase.

Example.

#### In template

```typescript
import { Component, Pipes, UppercasePipe } from '@monster-js/core';

@Pipes(UppercasePipe)
@Component('app-greeting')
export class Greeting {
    render() {
        return <h1>{ 'Hello World' | uppercase }</h1>
    }
}
```

#### In logic

```typescript
import { Component, Pipes, UppercasePipe } from '@monster-js/core';

@Pipes(UppercasePipe)
@Component('app-greeting')
export class Greeting {
    message = 'Hello World!';

    constructor(private uppercasePipe: UppercasePipe) {}

    onInit() {
        this.message = this.uppercasePipe.transform(this.message);
    }

    render() {
        return <h1>{this.message}</h1>
    }
}
```