---
sidebar_position: 8
---

# Pipes

Pipes are used to transform a string, object, number and other values for display.
They are very useful because it can be used directly in template or logic in all of our components.

## Available pipes

Here are some usable pipes included in the core package.

| Pipes | Selector| Description |
| --- | --- | --- |
| uppercasePipe | uppercase | Used to transform string into uppercase. |
| lowercasePipe | lowercase | Used to transform string into lowercase. |

## Register pipe

Unlike directives, pipes provided by the core package are not automatically available in all components by default.
We need to register them to component before we can use it.
To register a pipe, we can use the `pipes(<component>, <array_of_pipes>)` function.

Example.

```tsx
import { component, pipes } from '@monster-js/core';
import uppercasePipe from './uppercase.pipe';

function app() {
    return <h1>App</h1>
}

pipes(app, [uppercasePipe]);
export default component(app, 'app-root');
```

## Pipe in template

After the pipe is registered in the component we can now easily use it inside the component's template.

Example.

```tsx
import { component, pipes } from '@monster-js/core';
import uppercasePipe from './uppercase.pipe';

function app() {
    const greeting = 'Hello World!';
    return <h1>{greeting | uppercase}</h1>
}

pipes(app, [uppercasePipe]);
export default component(app, 'app-root');
```

In the example above, the `uppercase` inside the jsx expression container(`{greeting | uppercase}`) is the selector for the `uppercasePipe`.

## Pipe in logic

Using the pipe inside the logic is just like calling a function.
If a pipe is not used inside the template, then no need to register the pipe in the component.

Example.

```tsx
import { component, pipes } from '@monster-js/core';
import uppercasePipe from './uppercase.pipe';

function app() {
    const greeting = uppercasePipe('Hello World!');
    return <h1>{greeting}</h1>
}

export default component(app, 'app-root');
```

## Pipe with parameters

Pipes can also have one or more parameters to be used during transformation.

```tsx title="In template"
function app() {
    const greeting = 'Hello World!';
    return <h1>{greeting | uppercase('default value', 'invalid string')}</h1>
}
```

```tsx title="In logic"
function app() {
    const greeting = uppercasePipe('Hello World!', ['default value', 'invalid string']);
    return <h1>{greeting}</h1>
}
```
