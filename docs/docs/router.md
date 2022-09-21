---
sidebar_position: 3
---

# Router

Router enables developers to build a single page application with multiple components that acts as different pages of the app.
View changes depending on the activated route.
Activated routes depends on the url of the browser and the path registered in the route component.

## Installation

We can install the router package by running the following command in the root directory of our project.

```bash
npm install @monster-js/router
```

## Define router component

Router is just a component so we need to define it first before we can use it.
We can define the router component like any other component inside `src/index.ts` file.

Example.

```tsx title="src/index.ts"
import { getSelector } from '@monster-js/core';
import { route } from '@monster-js/router';

customElement.define(getSelector(route), route);
```

or

```tsx title="src/index.ts"
import { defineComponent } from '@monster-js/core';
import { route } from '@monster-js/router';

defineComponent(route);
```

## Creating a route

Route is just a component provided by the router package.
Once route component is already defined we can now start using the `app-route` selector inside our components.

Example.

```tsx
import login from './login';
import register from './register';

function app() {
    return <div>
        <app-route prop:path="/login" prop:component={login}></app-route>
        <app-route prop:path="/register" prop:component={register}></app-route>
    </div>
}
```

In the example above, if the user will navigate to `/login` route the `login` component will be displayed in the view.

## Route props

Route props are properties of the route that controls the behavior of the route.

| Props | Type | Description |
| --- | --- | --- |
| path | required | The path that should match in the browser url pathname before the route is activated. |
| component | optional | The component that will be rendered inside the `<app-route />` when route path matches the browser url pathname. |
| lazy-component | optional | A lazy loaded component that will be rendered inside the `<app-route />` when route path matches the browser url pathname. |
| exact | optional | If the value is true, then the Component will only activate if route path is an exact match with the browser url pathname but still respect the dynamic route matching. |
| guards | optional | It is another layer of checking if the component can activate or deactivate. |
| redirect-to | optional | A string url to redirect to if route path matches the browser url pathname. |

## Router directive

Router also has a directive that is very helpful when using a router.

#### Router link

`router:link="<link>"`

Attach to an element to navigate to the link when the element is clicked.
If used in an `<a>` tag, it will automatically add the link as an `href` attribute.

Example.

```tsx
<a router:link="/some/url">I am a link</a>

<button router:link="/some/url/123">I am a button</button>
```

#### Router link active

`router:link-active="<class_name>"`

This directive will add the `<class_name>` to the class list of the element if it's `router:link` directive value matches the browser url pathname using dynamic matching.

Example.

```tsx
<button
    router:link="/some/url/123"
    router:link-active="i-am-active"
>I am a button</button>
```

#### Router link active exact

`router:link-active-exact={<boolean>}`

If the value is true, this directive will enable us to add the class name of `router:link-active` directive only when the `router:link` directive value is an exact match of the browser url pathname but still respect dynamic matching.

Example.

```tsx
<button
    router:link="/some/url/123"
    router:link-active="i-am-active"
    router:link-active-exact={true}
>I am a button</button>
```

## Router guard

Router guard is another way to check if a component can activate or not.
It can also run a block of codes before a route can activate or deactivate.

Example.

```tsx
export function guestGuard(context) {
    return {};
}
```

#### Can activate

The `canActivate` method can help us add additional checking if a component is allowed to activate.

```tsx
export function guestGuard(context) {
    return {
        canActivate: function() {
            return true;
        }
    };
}
```

It returns a boolean or a promise.

#### Can deactivate

The `canDeactivate` method can help us add additional checking if a component is allowed to deactivate.

```tsx
export function guestGuard(context) {
    return {
        canDeactivate: function() {
            return true;
        }
    };
}
```
It returns a boolean or a promise.

### Using the router guard

To use the guard we can just pass it as a property in a route.

Example.

```tsx
<app-route
    prop:path="/path/123"
    prop:component={sampleComponent}
    prop:guards={[guestGuard]}
></app-route>
```

## Navigate

Router offers a functionality to navigate to different routes.
The `navigate(<url>, <state>, <title>, <replace_state>)` method in `RouterService` is used to navigate to a url programmatically.

Example.

```tsx
import { RouterService } from '@monster-js/router';

function app() {

    const service = new RouterService();
    const handler = () => {
        service.navigate('/profile/123');
    }

    return <button on:click={handler}></button>
}
```

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| url | required | The url that we want to navigate to. |
| state | optional | An object, used as the state in history.pushState api. |
| title | optional | A string, used as the title in history.pushState api. |
| replace_state | optional | A boolean, indicates if we use history.replaceState or history.pushState during navigation. |

## Route change event

Router provides us a way to subscribe to route change event using `onRouteChange` method in `RouterService`.

Example.

```tsx
import { RouterService } from '@monster-js/router';

function app() {

    const service = new RouterService();
    service.onRouteChange.subscribe(() => {
        console.log('route has change');
    });

    return <h1>App</h1>
}
```

In the example above, the component will log `route has change` in the console every time the route will change and the component is active.

### Unsubscribe to router event

Since we subscribed to the `onRouteChange` event, we need to unsubscribe our subscription once the component is destroyed to avoid memory leak.

Example.

```tsx
import { RouterService } from '@monster-js/router';

function app() {

    const service = new RouterService();
    const subscription = service.onRouteChange.subscribe(() => {
        console.log('route has change');
    });

    onDestroy(this, () => subscription.unsubscribe());

    return <h1>App</h1>
}
```

## Router params

Router params are parameters we can get using dynamic route matching.
We can get the router parameters in the component props with the key of `routerParams`.
More information about this route params are found in the [dynamic route matching](/docs/router#dynamic-route-matching) section.

Example.

```tsx
function app({ routerParams }) {

    console.log(routerParams);

    return <h1>App</h1>
}
```

## Dynamic route matching

Dynamic route matching is a way to match a route path segment into its matching browser url pathname segment.
A dynamic segment is denoted by a colon `:` followed by the segment name. ex. `/:userId`.
The value of the dynamic segments are call the router parameters.

Here's a table of dynamic routes and its corresponding values as a router parameter:

| Route path | Browser url pathname | Router params |
| --- | --- | --- |
| /:path | /100 | { path: 100 } |
| /user/:userId | /user/123 | { userId: 123 } |
| /post/:postId/:userId | /post/1/123 | { postId: 1, userId: 123 } |

## Lazy loading

To lazy load a component or load a component on demand, we can use the `prop:lazy-component` directive of a route instead of `prop:component`.

:::info
Lazy loaded components does not need to be defined in `src/index.ts`.
:::

Example.

```tsx
<app-route
    prop:path="/path"
    prop:lazy-component={() => import('./login').then(c => c.default)}
></app-route>
```

If the component is exported as named export then the import statement should look like the following:

```tsx
<app-route
    prop:path="/path"
    prop:lazy-component={() => import('./login').then(c => c.login)}
></app-route>
```

Where `login` is the name of the exported item.

The example above will display the component when the route match and is allowed to activate.

## Lazy loading child components

Child components of a lazy loaded components should not be defined in `src/index.ts`.
These child components needs to be defined using `components(<component>, <array_of_children>)` function.

Example.

```tsx
import { components, component } from '@monster-js/core';
import greeting from './greeting';

function app() {
    return <div>
        <h1>App</h1>
        <app-greeting></app-greeting>
    </div>
}

components(app, [ greeting ]);
export default component(app, 'app-root');
```

If the child component needs to be used by other components outside the lazy loaded component,
then it should be defined in the `src/index.ts` file and not using the `components` function.
