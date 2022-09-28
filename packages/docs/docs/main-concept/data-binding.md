---
sidebar_position: 4
---

# Data bindings

Data binding is a way to synchronize the data of logic and view.
This means that when a value is changed in logic, view gets updated, and when the user change some data in the view, variables in logic will be updated.

:::info
To automatically update bindings we should use [states](/docs/main-concept/states) to get and update data.
:::

## Attribute binding

Attribute binding is a way to bind data from logic to a DOM element attribute.

Example.

```tsx
function app() {
    let bindingId = 'hello-world';
    return <h1 id={bindingId}>App</h1>
}
```

In the example above, the `id` of the `h1` element will be updated every time the `bindingId` variable is updated and change detection is triggered.
This is an example of one-way binding.

## Text binding

Text binding is a way to bind data from logic to a DOM text node element.

Example.

```tsx
function app() {
    let greeting = 'hello-world';
    return <h1>{greeting}</h1>
}
```

In the example above, the text `hello-world` will be displayed in the view inside the `h1` tag.
When the value of `greeting` is updated and change detection is triggered, the view will also be updated.
This is another example of one-way binding.

## Two-way binding

Two-way binding is a way to sync data from view and logic.
An example of this is the `view:model` directive.
Every time the model is changed from the view, the value in logic will be updated and the same thing will happen in the view when the model is updated from the logic.

Example.

```tsx
function app() {

    const [ message, setMessage ] = useState(this, 'hello world');

    const clearMessage = () => {
        setMessage('');
    }

    return <div>
        <h1>{message()}</h1>
        <button on:click={clearMessage}>Clear message</button>
        <input view:model={[message, setMessage]} type="text" />
    </div>
}
```