---
sidebar_position: 1
---

# Intro to unit testing

Unit testing is a way to verify that individual units of source code are working as expected.
MonsterJS provides a testing tools found in `@monster-js/tester` package.
Unit testing in MonsterJS uses [karma](https://karma-runner.github.io/latest/index.html) test runner and [jasmine](https://jasmine.github.io/) testing framework.

## Installation

To install this package we just need to run the following command:

```bash
npm install --save-dev @monster-js/tester
```

Now we can import the testing tools in our `.spec.ts` files.

## Test files

The test files in MonsterJS ends with `.spec.ts` extension.
All files that ends with this extension are used during testing and should not contain any production codes.
An example of this test files can be found in a component folder when we generate a component using `mn generate component` command.

```bash
greeting
    ├── greeting.component.tsx
    ├── greeting.component.scss
    └── greeting.spec.ts
```

Here is an example of a working unit test for a component.

```typescript
import { Greeting } from './greeting.component';
import { createTester } from '@monster-js/tester';

const tester = createTester(Greeting);

it('should create a component', function() {
    const { host, element, component, shadowRoot } = tester.createComponent();
    expect(host).toBeTruthy();
    expect(element).toBeTruthy();
    expect(component).toBeTruthy();
    expect(shadowRoot).toBeTruthy();
});
```

## Upcoming features

* Support for testing services
* Support for testing directives
* Support for testing pipes
* Support for testing modules
* Support for testing store
* Support for testing routes