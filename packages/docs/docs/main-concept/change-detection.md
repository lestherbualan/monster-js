---
sidebar_position: 5
---

# Change detection

Change detection is a way to synchronize the data between component's logic and view.
It triggers when a component property is changed.
Change detection is not applied recursively so it will only trigger when changing the value of the property of `this` context.

:::info
Triggers only when setting the property of component's `this` context.
:::

The following is an example assignment expression that will trigger change detection.

```typescript
this.user = {
    firstName: 'John',
    lastName: 'Doe'
};
```

The following is an example assignment expression that will `NOT` trigger change detection.

```typescript
this.user.firstName = 'John';
this.user.lastName = 'Doe';
```

## Manually trigger change detection

In some cases, you may need to manually trigger change detection of a component.

To manually trigger change detection we just need to call the `detectChanges` function and pass the `this` context as argument.

Example.

```typescript
import { Component, detectChanges } from '@monster-js/core';

@Component('app-counter')
export class Counter {
    onInit() {
        setInterval(() => detectChanges(this), 1000);
    }

    render() {
        return <h1>{new Date()}</h1>
    }
}
```
