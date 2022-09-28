---
sidebar_position: 3
---

# Lifecycle hooks

Lifecycle hooks are functions that lets you run a block of codes when your component triggers a lifecycle event.

## Component available hooks

| Hooks | Description |
| --- | --- |
| onPropsChange | Called when there are changes to component's props. If there are component props, this hook will run before `afterInit` runs. |
| afterInit | This hook is triggered when the component is finish initializing and the view is already connected in the dom tree. |
| onChangeDetection | This is called every time the component's change detection runs. |
| onViewChange | This will be called every time there are changes in view caused by change detection. |
| onDestroy | This will be called when a component is destroyed. This is used for cleanup like unsubscribing all subscriptions. |

### onPropsChange

* `onPropsChange(<context>, <handler>, <is_active>)`

```tsx
function app() {
    onPropsChange(this, (props) => {
        console.log(props);
    });
    return <h1>App</h1>
}
```

### afterInit

* `afterInit(<context>, <handler>, <is_active>)`

```tsx
function app() {
    afterInit(this, () => {
        console.log('afterInit');
    });
    return <h1>App</h1>
}
```

### onChangeDetection

* `onChangeDetection(<context>, <handler>, <is_active>)`

```tsx
function app() {
    onChangeDetection(this, () => {
        console.log('onChangeDetection');
    });
    return <h1>App</h1>
}
```

### onViewChange

* `onViewChange(<context>, <handler>, <is_active>)`

```tsx
function app() {
    onViewChange(this, () => {
        console.log('onViewChange');
    });
    return <h1>App</h1>
}
```

### onDestroy

* `onDestroy(<context>, <handler>, <is_active>)`

```tsx
function app() {
    onDestroy(this, () => {
        console.log('onDestroy');
    });
    return <h1>App</h1>
}
```

## Directive available hooks

| Hooks | Description |
| --- | --- |
| dirOnPropsChange | Called when there are changes to component's props. If there are component props, this hook will run before `afterInit` runs. |
| dirAfterInit | This hook is triggered when the component is finish initializing and the view is already connected in the dom tree. |
| dirOnChangeDetection | This is called every time the component's change detection runs. |
| dirOnViewChange | This will be called every time there are changes in view caused by change detection. |
| dirOnDestroy | This will be called when a component is destroyed. This is used for cleanup like unsubscribing all subscriptions. |

Directive hooks are just wrapper of component hooks.
Component hooks can also be used inside a directive.
Using the directive hooks will automatically remove the hooks once the element is disconnected from the DOM tree.

Example.

```tsx
function sampleDirective(param: DirectiveParam) {
    dirAfterInit(param, () => {
        console.log('dirAfterInit');
    });
}
```

`dirAfterInit` function call expression above is equivalent to the below codes.

```tsx
afterInit(params.context, () => {
    console.log('dirAfterInit');
}, () => params.element.isConnected);
```

### dirOnPropsChange

* `dirOnPropsChange(<params>, <handler>)`

```tsx
function sampleDirective(param: DirectiveParam) {
    dirOnPropsChange(param, (props) => {
        console.log(props);
    });
}
```

### dirAfterInit

* `dirAfterInit(<params>, <handler>)`

```tsx
function sampleDirective(param: DirectiveParam) {
    dirAfterInit(param, () => {
        console.log('dirAfterInit');
    });
}
```

### dirOnChangeDetection

* `dirOnChangeDetection(<params>, <handler>)`

```tsx
function sampleDirective(param: DirectiveParam) {
    dirOnChangeDetection(param, () => {
        console.log('dirOnChangeDetection');
    });
}
```

### dirOnViewChange

* `dirOnViewChange(<params>, <handler>)`

```tsx
function sampleDirective(param: DirectiveParam) {
    dirOnViewChange(param, () => {
        console.log('dirOnViewChange');
    });
}
```

### dirOnDestroy

* `dirOnDestroy(<params>, <handler>)`

```tsx
function sampleDirective(param: DirectiveParam) {
    dirOnDestroy(param, () => {
        console.log('dirOnDestroy');
    });
}
```

## Service available hooks

| Hooks | Description |
| --- | --- |
| onReceiveConfig | This hook will receive the configuration durring initialization of the service. |

### onReceiveConfig

* `onReceiveConfig(<config>)`

```tsx
@Service()
export class GreetingService {
    message: string;
    onReceiveConfig(config) {
        this.message = config.message;
    }
}
```
