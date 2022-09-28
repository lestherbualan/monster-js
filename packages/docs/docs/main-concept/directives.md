---
sidebar_position: 6
---

# Directives

Directive is another way to change the appearance and add additional behavior to an element.

## Syntax

The syntax of a directive is `<namespace>:<name>="<value>"`.
The value can be a string or jsx expression container `{}` or you can also omit the value because it is optional.

Example.

```tsx
<p highlight:color="red">Hell World</p>

<p highlight:red>Hell World</p>

<p highlight:color={color}>Hell World</p>
```

## Available directives

The following are the list of available built-in directives we can use.

#### View model directive

`view:model={[<state_getter>, <state_setter>]}`

View model directive is used for two-way binding of data.
Every time the model is changed from the view, the value in logic will be updated and the same thing will happen in the view when the model is updated from the logic.

Example.

```tsx
function app() {
    const [ message, setMessage ] = useState(this, 'Hello World');
    return <input view:model={[ message, setMessage ]} type="text" />
}
```

View model directive accepts an array which holds the getter and setter of the state as a directive value.

#### View reference directive

`view:ref={<reference_holder>}`

This directive is used to create a reference of an element to a variable.

Example.

```tsx
function app() {
    let elem = null;
    return <h1 v:ref={elem}>Hello world!</h1>
}
```

#### Props directive

`prop:<property_name>={<property_value>}`

Props directive is a directive that allows developers to pass any type of data from parent to child.
Check [props](/docs/main-concept/props) for more information about this directive.

Example.

```tsx
function app() {
    user = {
        fistName: 'John',
        lastName: 'Smith'
    };
    return <app-child prop:user={user} />
}
```
#### Event directive

`on:<event_name>={<event_handler>}`

Event directive is used to attach an event handler into an element.
Check the [event handling](/docs/main-concept/event-handling) for more information about this directive.

Example.

```tsx
function app() {
    const greet = () => {
        console.log('Hello World!');
    }
    return <button on:click={greet}>Greet</button>
}
```

#### Event preventDefault directive

`on-prevent:<event_name>={<event_handler>}`

This directive is the same the as the event directive with `on` namespace but it stops the default action of an element from happening using `event.preventDefault()`.

Example.

```tsx
function app() {
    const submit = () => {
        console.log('Hello World!');
    }
    return <form on-prevent:submit={submit}>
        <input type="text" />
        <button>Submit</button>
    </form>
}
```

The default action when a form is submitted will refresh the page or go to another page.
When using the on-prevent namespace, the default action will not happen so we have a better control of what actions to make after the form is submitted.

#### List rendering directive

`view:for={<array>}`

List rendering directive allows developers to render a list of element based on the given array of data.
Check the [list rendering](/docs/main-concept/list-rendering) for more information.

Example.

```tsx
function app() {
    const array = [1, 2, 3];
    return <p view:for={array}>Hello World!</p>
}
```

#### Conditional rendering directive

`view:if={<condition_parameter>}`

Conditional rendering directive is used to conditionally render an element to the dom.
It will remove the element from the dom if the value of the directive is false and append the element if otherwise.
Check the [conditional rendering](/docs/main-concept/conditional-rendering) for more information.

Example.

```tsx
function app() {
    const toggle = true;
    return <h1 view:if={toggle}>Hello World!</h1>
}
```
