---
sidebar_position: 1
---

# Component

Components are the most basic building block of an application.
It is composed of view, logic and styles.
It is used to split the UI into small and reusable pieces of codes.
Components contains JSX elements so the extension should be `.tsx`.

## Structure

Component's logic, and view are inside a single file while the style is in a separate file.
The logic of a component is found inside a function and this function should return the view.
The styles of the component is in a separate file but should have the same filename of the component's logic, and view file but has a `.scss` extension.

Example.

```css title="button.component.scss"
button {
    color: red;
}
```

```tsx title="button.component.tsx"
import './button.component.scss';
import { component } from '@monster-js/core';

export function button() {
    return <button>Click Me</button>
}

component(Button, 'app-button');
```

## The component function

The `component(<component>, <selector>)` function will convert the function component into a web component before exporting it.
This function will accept two parameters, the component, and selector.

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| component | required | The function component that will be converted into web component. |
| selector | required | The selector that will be used to render the component into the view. |

## Register a component

Before we can use the component, we need to register it to a module.

Example.

```tsx
import { Module } from '@monster-js/core';
import { button } from './button.component';

export const ButtonModule: Module = {
    components: [button]
};
```

After we register the component, we can render it to the view by creating an element using it's selector.

## Component selector

The component selector is what we will use in rendering the component into the DOM tree.

Example.

```tsx
export function app() {
    return <h1>App</h1>
}

component(app, 'app-root');
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
export function parent() {
    return <div>
        <app-child></app-child>
    </div>
}
```

In the example above the `<app-child></app-child>` element is the child component.

## External web components

Web components that are not made using MonsterJS will also work inside the project.
We just need to register the external web component's selector as an external web component using `externalComponents` function found in the core package.

Example.

```tsx title="src/index.ts"
import { externalComponents } from '@monster-js/core';

externalComponents(['app-button', 'app-image']);
```