---
sidebar_position: 2
---

# Props

The component properties are [directives](/docs/main-concept/directives) that has a namespace of `prop`.
When the component is rendered, the props are combined into a single object and passed as an argument of the component.
Every time a prop will change from the parent component, it will trigger the change detection of the child component with props.

### Syntax

```tsx
prop:<prop_name>=<value>
```

The `prop_name` will be the property name and the `value` will be the property value when the props is passed down to the child component.

Example.

```tsx title="Parent component"
function parent() {
    let name: string = 'Jay';
    return <app-greeting prop:name={name} prop:message="Hello" ></app-greeting>
}
```

```tsx title="Child component"
function greeting(props) {
    return <div>{props.message} {props.name}!</div>
}
export default component(greeting, 'app-greeting');
```

:::info
Component props properties must be consumed while retaining the reference to the props object or change detection will not behave as expected.
:::

We can also destructure our props to make it more cleaner like the following.

```tsx
function greeting({ message, name }) {
    return <div>{message} {name}!</div>
}
```

The child component will produce an element that looks like the following.

```tsx
<div>Hello Jay!</div>
```

Destructuring the props inside the component will remove the reference to the props and therefore will cause the change detection to break.

Example.

```tsx
function greeting(props) {
    const { message, name } = props;
    return <div>{message} {name}!</div>
}
```

The text binding of the example above will not be updated during change detection.

## Getting the props

Another way to get the props is to use `getProps(<context>, <prop_name>)` function.
The second parameter is optional.
If second parameter is provided it will return the specific property and it will return the whole props object if no second parameter.

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| context | required | The `this` context of the function component. |
| prop_name | optional | The property name of the props we wish to retrieve. |

Example.

```tsx
function app() {
    return <h1>Hello {getProps(this, 'name')}<h1>
}
```

## Props change hook

We can also use a hook called `onPropsChange(<context>, <handler>, <is_active>)` that will run every time there is a change in the props.
Please also check the [lifecycle hooks](/docs/main-concept/lifecycle-hooks) for more information.

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| context | required | The `this` context of the function component. |
| handler | required | This is the function that will run every time there is a change in props. |
| is_active | optional | This is a function that will return a boolean that will indicate if the hook is still active. Inactive hooks are removed from the component's list of hooks. |

Example.

```tsx
function app() {
    const [ name, setName ] = useState(this);

    onPropsChange(this, (props) => {
        setName(props.name);
    });

    return <h1>Hello {name()}<h1>
}
```

## Using setProps method

Props can also be set using the `setProps` method.
This is useful when we use our components outside the MonsterJS framework.

Example.

```tsx
function parent() {
    let childRef: ComponentInstance;
    let counter = 0;

    setInterval(() => {
        counter++;
        childRef.setProps({ count: counter });
    }, 1000);

    return <app-child view:ref={childRef}></app-child>
}
```
