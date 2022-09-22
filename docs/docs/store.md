---
sidebar_position: 4
---

# Store

Store is a state management built for MonsterJS framework.
Using this store will help developers to centralize and maintain the application state easily.

## Installation

We can install the store in our project using by running the command below.

```bash
npm install @monster-js/store
```

## Initial state

Initial state of the store is the state that is passed to the store as the initial data.
It is recommended to set the initial state of the store inside the `src/index.ts` file.

Example.

### Initial state

```tsx title="src/initial-state.ts"
import { StoreState } from "@monster-js/store";

export interface InitialState {
    count: number;
}

export const initialState: StoreState<InitialState> = {
    state: {
        count: 0
    }
}
```

### Setting initial state

```tsx title="src/index.ts"
import { Store } from '@monster-js/store';
import { initialState } from './initial-state';

const store = new Store();
store.initialState(initialState);
```

## Setter

When we set a new value to state of store.
The change will be reflected to the components that has a subscription to this state.

Example.

```tsx
import { Store } from '@monster-js/store';
import { InitialState } from './initial-state';

function app() {
    const store = new Store<InitialState>();

    const buttonClick = () => {
        store.set('count', 100);
    }

    ...
}
```

## Getter

To get a value from store we can call the `get` method that returns a specific state value.

Example.

```tsx
import { Store } from '@monster-js/store';
import { InitialState } from './initial-state';

function app() {
    const store = new Store<InitialState>();

    const buttonClick = () => {
        console.log(store.get('count'));
    }

    ...
}
```

## Subscribe to changes

Store also offers a way to subscribe for changes of each item of the state.

Example.

```tsx
import { Store } from '@monster-js/store';
import { InitialState } from './initial-state';

function app() {
    const store = new Store<InitialState>();

    const buttonClick = () => {
        store.select('count').subscribe(count => {
            console.log(count);
        });
    }

    ...
}
```

### Unsubscribe to store

All subscriptions must be unsubscribe when the component is destroyed or it will cause a memory leak.

Example.

```tsx
import { onDestroy } from '@monster-js/core';
import { Store, Subscription } from '@monster-js/store';
import { InitialState } from './initial-state';

function app() {
    let subscription: Subscription;
    const store = new Store<InitialState>();

    const buttonClick = () => {
        subscription = store.select('count').subscribe(count => {
            console.log(count);
        });
    }

    onDestroy(this, () => {
        subscription.unsubscribe();
    });

    ...
}
```

## Actions

Actions can also be used to update the state.
Using this can make your codes much cleaner and easy to manage.

### Create action

We can create an action using `createAction` function from the store package.

Example.

```tsx title="src/count.actions.ts"
import { createAction } from '@monster-js/store';

export const setCount = createAction<number, number>('[count] set', (state, payload) => {
    return payload;
});
```

In the `createAction` function, there are two generic types.
First is the type of data that `setCount` action will accept.
The second type is the type of the count state inside the store.

There are two parameters for the `createAction` function.
First is a string that describes the action.
Second is the reducer function that returns the new state of the selected store.

The reducer function has two arguments.
First is the state which holds the current state of the store.
Second is the payload which holds the value that is passed to the `setCount` action when called.

## Register action

In the initial state we created above, we just need to add an `actions` property where we can register our actions.

Example.

```tsx title="src/initial-state.ts"
import { StoreState } from "@monster-js/store";

export interface InitialState {
    count: number;
}

export const initialState: StoreState<InitialState> = {
    state: {
        count: 0
    },
    actions: {}
}
```

After creating the actions property, we can now register the action by creating a property inside the actions object using the property name of the state we want this action to be used and then pass the action as an element of an array.

Example.

```tsx title="src/initial-state.ts"
import { StoreState } from "@monster-js/store";
import { setCount } from "./count.actions";

export interface InitialState {
    count: number;
}

export const initialState: StoreState<InitialState> = {
    state: {
        count: 0
    },
    actions: {
        count: [ setCount ]
    }
}
```

In the example above, the `setCount` action will be used to update the `count` inside our state.

### Dispatch action

Dispatch action is a way to set the state of the store using an action.

Example.

```tsx
import { Store } from '@monster-js/store';
import { InitialState } from './initial-state';
import { setCount } from './count.actions';

function app() {
    const store = new Store<InitialState>();

    const buttonClick = () => {
        store.action(setCount(100));
    }

    ...
}
```
