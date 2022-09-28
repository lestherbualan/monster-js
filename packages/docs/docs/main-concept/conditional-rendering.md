---
sidebar_position: 13
---

# Conditional rendering

Conditional rendering is used to conditionally render an element to the DOM tree.
It uses the `view:if` directive which removes an element from the dom if the value is a falsy and append the element if otherwise.

## Syntax

The syntax of conditional rendering directive is `view:if={<boolean>}`.

## Using conditional rendering

Example.

```tsx
function app() {
    const [ toggle ] = useState(this, true);
    return <h1 view:if={toggle()}>Hello World!</h1>
}
```
