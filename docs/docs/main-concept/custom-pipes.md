---
sidebar_position: 9
---

# Custom pipes

Custom pipes allow us to create reusable transformers that can be used directly in the template or in logic of our components.

## Create a pipe

To create a custom pipe, we can use the [cli](/docs/category/cli) to automatically generate a pipe file with boilerplate codes or we can manually create a file and write the code from scratch.

The following code is an example of a working pipe codes but without functions yet.

```tsx
import { pipe } from "@monster-js/core";

function datePipe(value: any, args: any[]) {
    return value;
}

export default pipe(datePipe, 'date');
```

In the example above, the `datePipe(value, args)` function will do the transformation and what ever this function returns will be the transformed data.

Example.

```tsx
function datePipe(value: any, args: any[]) {
    return new Date(value).toDateString();
}
```

### Params

| Params | Type | Description |
| --- | --- | --- |
| value | required | The value to be transformed. |
| args | optional | An array or parameters when used in the template or logic. |
