---
sidebar_position: 1
---

# Component

Components are the most basic building block of an application.
It is composed of template, logic and styles.
It is used to split the UI into small and reusable pieces of codes.
Components contains JSX elements so the extension should be `.tsx`.

## Structure

Component's logic, view, and styles are inside a single file.
The logic of a component is found inside a function and this function should return the view.
The styles of the component is usually found under the export default declaration of the component.

Example.

```tsx
import { component } from '@monster-js/core';

export function Button() {
    return <button>Click Me</button>
}

export default component(Button, 'custom-button');

<style>{``}</style>
```

## Css preprocessors

Style also support css preprocessors.
Currently it only supports `sass` but will add more in the future.

To use `sass` in style we just need to add the `style-type="sass"` attribute into the `<style>` tag.

Example.

```tsx
<style style-type="sass">
{`
    button {
        color: red;
    }
`}
</style>
```

## The component function

The `component(<component>, <selector>)` function will convert the function component into a web component before exporting it.
This function will accept two parameters, the component, and selector.

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| component | required | The function component that will be converted into web component. |
| selector | required | The selector that will be used to render the component into the view. |

## Define a component

Since our components are web components, before we can use it, we need to define it first using the `customElements.define` function.
It is recommended that we define our components in the `src/index.ts` file.

Example.

```tsx title="src/app.ts"
import { component } from '@monster-js/core';

function app() {
    return <h1>App</h1>
}

export default component(app, 'app-root');
```

```tsx title="src/index.ts"
import { getSelector } from '@monster-js/core';
import app from './app';

customElements.define(getSelector(app), app);
```

In the example above, we can get the component selector using `getSelector(<component>)` function.

After we define the component, we can render it to the view by creating an element using it's selector.

We can also use the `defineComponent(<component>)` function to define a component instead of `customElement.define`.

Example.

```tsx title="src/index.ts"
import { defineComponent } from '@monster-js/core';
import app from './app';

defineComponent(app);
```

## Component selector

The component selector is what we will use in rendering the component into the DOM tree.

Example.

```tsx
function app() {
    return <h1>App</h1>
}

export default component(app, 'app-root');
```

Using the example above, the component selector is the string `app-root`.
We can render the component using this selector like the following.

```tsx
<app-root></app-root>
```

## Child component

Child component is a component rendered inside a component.
To do this, we need to define to define parent and child components first.
After the components are defined we can call the child component's selector inside the parent component.

Example.

```tsx
function Parent() {
    return <div>
        <app-child></app-child>
    </div>
}
```

In the example above the `<app-child></app-child>` element is the child component.
