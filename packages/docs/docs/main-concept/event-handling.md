---
sidebar_position: 6
---

# Event handling

Event handling is a directive that allows the component to respond to user action on the UI like button clicks, text inputs, drag elements and other actions.
It uses a directive with namespace of `on` to bind the component methods to an element as an event listener.

## Syntax

The syntax of event handling directive is `on:<event_name>={<function_call_expression>}`.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    clickMe() {
        console.log('Hello World!');
    }

    render() {
        return <button on:click={this.clickMe()}>Greet</button>
    }
}
```

## Method parameters

Since the directive value for event handling is a function call expression, we can easily pass some arguments to the function like the following example.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    clickMe(name: string) {
        console.log(`Hello ${name}!`);
    }

    render() {
        return <button on:click={this.clickMe('Johnny')}>Greet</button>
    }
}
```

## Event variable

We can also get the event variable that holds the data of the event.
Just pass the `$event` variable as an argument to the function call expression.

Example.

```typescript
import { Component } from '@monster-js/core';

declare const $event: Event;

@Component('app-greeting')
export class Greeting {
    clickMe(event) {
        console.log(event);
    }

    render() {
        return <button on:click={this.clickMe($event)}>Greet</button>
    }
}
```
