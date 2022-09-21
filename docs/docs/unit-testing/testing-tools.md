---
sidebar_position: 1
---

# Testing tools

* [createComponentTester](/docs/unit-testing/testing-tools#create-component-tester-tool)

## Create component tester tool

The `createComponentTester(<component>)` function is used to create component testing tools.

### Parameters

| Parameters | Type | Description |
| --- | --- | --- |
| component | required | The component that we want to test. |

### Returns

| Property | Description |
| --- | --- |
| render | This is used to render the component for testing. |
| selector | This is the component selector. |

#### The render function

This is used to render the component and return some testing tools and variables about the component.

##### Returns

| Property | Description |
| --- | --- |
| element | The DOM version of the component view. |
| component | The instance of the component. |
| detectChanges | This is used to run the change detection of the component. |
| setProps | This is used to set the properties of the component. |

Example.

```tsx
import app from './app';
describe('test app component', function() {
    const { selector, render } = createComponentTester(app);
    it('should create a component', function() {
        const { element, component, detectChanges, setProps } = render();
        ...
    });
});
```
