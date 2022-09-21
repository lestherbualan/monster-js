---
sidebar_position: 10
---

# State

A state is a data that describes a state of a component.
Updating a state will update the components that are using the specific state.
There are two types of state in MonsterJS, the component state(useState), and the shared state.

## Component state

The component state is a state that only affects the component where it is being used.
It uses the `useState(<context>, <initial_value>)` hook to create a getter and setter of the state.

### Parameters

| Parameters | Type | Description | 
| --- | --- | --- |
| context | required | The `this` context of the component. |
| initial_value | optional | Initial value is the value of the state. |

Example.

```tsx
import { useState } from '@monster-js/core';
function app() {
    const [ counter, setCounter ] = useState(this, 100);
    return <h1>{counter()}</h1>
}
```

### Setting a state value

Setting a value of a state will trigger the change detection of the components.

Example.

```tsx
function app() {
    const [ counter, setCounter ] = useState(this, 100);

    setInterval(() => setCounter(counter() + 1), 1000);

    return <h1>{counter()}</h1>
}
```

The example above will update the counter every second and update the view.
This will only affect the current component.

## Shared state

Shared state is a state that is shared by different components.
Changing a value of the state will trigger the change detection of all components using this state.

### Create a shared state

We can create a shared state using the `createSharedState(<state_name>, <initial_value>)` function.
This function will return a function that we can use inside our components.

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| state_name | required | State name is used to identify the state in the global state object. It is also being used in devtools. |
| initial_value | optional | Initial value is the value of the state when created in the global state object and also in devtools. |

Example.

```tsx
import { createSharedState } from '@monster-js/core';

export const counterState = createSharedState('counter', 100);
```

Now, we can import the `counterState` function inside our component.
This function accepts one argument which is the component `this` context and returns a getter and setter of the shared state.

Example.

```tsx
import { counterState } from './counter.state';

function app() {
    const [ counter, setCounter ] = counterState(this);
    return <h1>{counter()}</h1>
}
```

### Setting a shared state value

Setting a value of a state will trigger the change detection of all the components that are using the state.

Example.

```tsx
function app() {
    const [ counter, setCounter ] = counterState(this);

    setInterval(() => setCounter(counter() + 1), 1000);

    return <h1>{counter()}</h1>
}
```

### DevTools

We can also use the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to inspect the shared state of our application.
Using this DevTool will also enable us to use time travel debugging of our application.

DevTools is enabled by default in development mode.
Building the application for production will automatically remove the DevTools.
