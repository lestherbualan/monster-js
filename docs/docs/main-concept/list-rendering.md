---
sidebar_position: 12
---

# List rendering

List rendering directive allows developers to render a list of element based on the given array of data.

## Syntax

The syntax of list rendering directive is `view:for={<array>}`.

## Using list rendering

Example.

```tsx
function app() {
    const array = [1, 2, 3];
    return <p view:for={array}>Hello World!</p>
}
```

The example code above will generate a list of elements that looks like the following:

```tsx
<p>Hello World!</p>
<p>Hello World!</p>
<p>Hello World!</p>
```

There are three `<p>` tags since there are three elements in the provided array.

List item name

`view:for-item="<item_name>"`

It allows developers to set the variable name of the list item and display it in view.
If no list item directive is provided, it is `$item` by default.

Example.

```tsx
declare const listItem: string;
function app() {
    const array = ['foo', 'bar', 'bazz'];
    return <p view:for={array} view:for-item="listItem">Hello {listItem}!</p>
}
```

:::caution
The codes above might throw a typescript linter error `Cannot find name 'listItem'` since `listItem` is not defined.
A temporary fix for this is to declare the list item above our component and below the import statement list the following:
`declare const listItem: string;`
:::

The example code above will generate a list of elements that looks like the following:

```tsx
<p>Hello foo!</p>
<p>Hello bar!</p>
<p>Hello bazz!</p>
```

## List index

`view:for-index="<index_name>"`

It allows developers to set the variable name of the list item index.
If no list index directive is provided, it is `$index` by default.

Example.

```tsx
declare const listIndex: number;
function app() {
    const array = ['foo', 'bar', 'bazz'];
    return <p view:for={array} view:for-index="listIndex">Index {listIndex}!</p>
}
```


:::caution
The codes above might throw a typescript linter error `Cannot find name 'listIndex'` since `listIndex` is not defined.
A temporary fix for this is to declare the list item above our component and below the import statement list the following:
`declare const listIndex: string;`
:::

The example code above will generate a list of elements that looks like the following:

```tsx
<p>Index 0!</p>
<p>Index 1!</p>
<p>Index 2!</p>
```
