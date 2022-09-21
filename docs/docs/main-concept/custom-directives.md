---
sidebar_position: 7
---

# Custom directives

Custom directives are functions we create that manipulates an element in our application.

## Creating a custom directive

To create a custom directive, we can use the [cli](/docs/category/cli) to automatically generate a directive file with boilerplate codes or we can manually create a file and write the code from scratch.

The following code is an example of a working directive codes but without functions yet.

```tsx
import { directive, DirectiveParam } from '@monster-js/core';

function highlight(param: DirectiveParam) {
}

export default directive(highlight, 'highlight');
```

The next step is to handle the directive by checking if the directive exists.

Here is an example on how to handle the directive if we are expecting the directive `highlight:color={colorHolder}`

```tsx
function highlight(param: DirectiveParam) {
    const { directives, element } = param;
    if (directives.color) {
        element.style.backgroundColor = directives.color.get();
    }
}
```

In the example above `directives.color` contains the getter and setter functions of the directive named `get` and `set`.
If the directive value cannot be set to another value then the directive will only contain getter.

Example.

The directive `highlight:color="red"` will only have a getter since `"red"` cannot be set to another value.

## Watch directive changes

To allow directives to react when there is a change in its value, we can use the function `createWatcher(<context>, <element>, <value_caller>, <update_handler>)`.

Example.

```tsx
import { createWatcher } from '@monster-js/core';

function highlight(param: DirectiveParam) {
    const { directives, element, context } = param;
    if (directives.color) {
        element.style.backgroundColor = directives.color.get();

        createWatcher(context, element, () => directives.color.get(), (newValue) => {
            element.style.backgroundColor = newValue;
        });
    }
}
```

We can also use the `dirCreateWatcher(<directive_param>, <directive_name>)` function which is a wrapper of the function `createWatcher`.

Example.

```tsx
import { dirCreateWatcher } from '@monster-js/core';

function highlight(param: DirectiveParam) {
    const { directives, element, context } = param;
    if (directives.color) {
        element.style.backgroundColor = directives.color.get();

        dirCreateWatcher(param, 'color', (newValue) => {
            element.style.backgroundColor = newValue;
        });
    }
}
```

## Register a directive

Before we can use a custom directive we need to register it to a component.

Example.

```tsx
import { component, directives } from '@monster-js/core';
import highlight from './highlight.directive';

function app() {
    return <h1 highlight:color="red">Hello World!</h1>
}

directives(app, [highlight]);
export default component(app, 'app-root');
```