---
sidebar_position: 5
---

# Event handling

Event handling is a way to handle the user interaction with the UI.
It uses the directive `on:<event_name>={<handler>}` or `on-prevent:<event_name>={<handler>}`.
This allows the component to respond to user action on the UI like button clicks, text inputs, drag elements and other actions.

## Syntax

The syntax of event handling directive is `on:<event_name>={<handler>}`.
The `handler` must be a function declaration and not a function call expression.

Example.

```tsx
function app() {
    const clickMe = () => {
        console.log('Hello World!');
    }
    return <button on:click={clickMe}>Greet</button>
}
```

## Event handler params

Since event handling directive accepts a function as directive value.
We need to pass an unnamed function or fat arrow function and return the call expression of the component method in order for us to be able to pass some parameters to it.

Example.

```tsx
function app() {
    const clickMe = (name: string) => {
        console.log(`Hello ${name}!`);
    }
    return <button on:click={() => clickMe('Jay')}>Greet</button>
}
```

## Event variable

We can also get the event variable that holds the data of the event.

```tsx
function app() {
    const clickMe = (event) => {
        console.log(event);
    }
    return <button on:click={(event) => clickMe(event)}>Greet</button>
}
```

or just simply

```tsx
function app() {
    const clickMe = (event) => {
        console.log(event);
    }
    return <button on:click={clickMe}>Greet</button>
}
```

will also work.
