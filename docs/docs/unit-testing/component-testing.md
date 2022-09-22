---
sidebar_position: 2
---

# Component testing

Testing our MonsterJS components can help us check that our components are working properly.
MonsterJS provides a testing tools found in `@monster-js/tester` package.
These tools can help us validate that all our components are performing as expected.

## Setup

The first thing we need to do is to create a component tester using `createComponentTester` function.
This tester is what we will use in testing our component.
We can check the documentation for [createComponentTester](/docs/unit-testing/testing-tools#create-component-tester-tool) for more information about this tool.

Example.

```tsx
import { createComponentTester } from '@monster-js/tester';
import app from './app';

describe('test app component', function() {

    const tester = createComponentTester(app);

});
```

Now we can use this `tester` variable to test our components.

## Testing text bindings

In this example, we will learn how to test a text binding of a component.

Suppose we have a component that looks like this.

```tsx
function app() {
    const title = 'Hello World';
    return <h1>{ title }</h1>
}
```

We can test if the `title` is correctly rendered in the `<h1>` tag.

```tsx
describe('test app component', function() {

    const { render } = createComponentTester(app);

    it('should be able to bind text', function() {
        const { element } = render();
        const h1 = element.querySelector('h1');
        expect(h1.textContent).toBe('Hello World');
    });

});
```

## Testing attribute bindings

The same as text binding, we can also test the attribute binding of a component.

Suppose we have a component that looks like this.

```tsx
function app() {
    const id = 'sample-id';
    return <h1 id={id}>Hello World!</h1>
}
```

We can test if `id` is correctly rendered as an `<h1>` tag id attribute.

```tsx
describe('test app component', function() {

    const { render } = createComponentTester(app);

    it('should be able to bind attribute', function() {
        const { element } = render();
        const h1 = element.querySelector('h1');
        expect(h1.getAttribute('id')).toBe('sample-id');
    });

});
```

## Testing props

We might also want to test our component based on given props.
To do this, we can use the `setProps` function returned by the `render` function.

Suppose we have a component that looks like this.

```tsx
function app({ count }) {
    return <h1>Count: {count}</h1>
}
```

We can check if the `count` props is properly rendered inside our component.

```tsx
describe('test app component', function() {

    const { render } = createComponentTester(app);

    it('should set props', function() {
        const { setProps, element } = render();
        setProps({ count: 100 });
        const h1 = element.querySelector('h1');
        expect(h1.textContent).toBe('Count: 100');
        setProps({ count: 200 });
        expect(h1.textContent).toBe('Count: 200');
    });

});
```

## Running change detection

In some cases, we may need to run change detection manually.
To do this, we can use the `detectChanges` function returned by the `render` function.

```tsx
describe('test app component', function() {

    const { render } = createComponentTester(app);

    it('should update the view', function() {
        const { detectChanges, component } = render();

        // do some component changes
        component.sampleChange = 'sample changes';
        ...

        detectChanges();

        // do some assertion
        ...

    });

});
```
