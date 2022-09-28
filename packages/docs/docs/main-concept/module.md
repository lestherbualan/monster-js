---
sidebar_position: 1.5
---

# Module

Module is a way to group components, directives, services, pipes and modules of application that are related to each other.
This feature is very helpful in organizing the codes to make the project more maintainable as it grows larger.
Another cool thing for a MonsterJS module is that it is lazy loaded when used in a route.

## Root component

Some module has a root component.
This component is the one being mounted in the dom tree when the module is used in a route.
Root component is the last component to be defined to make sure all the child components are already defined.

Example.

```tsx
import { Module } from '@monster-js/core';
import { app } from './app.component';

export const AppModule: Module = {
    root: app
};
```

In the example above, the `app` is the root component.

## Register components

Components can be registered to a module so that they can interact with each other.

For example, we have a parent component and a child component.
The child component is rendered inside the view of the parent component.
So the parent and child components needs to be registered in the same module.

Example.

```tsx
import { Module } from '@monster-js/core';
import { parent } from './parent.component';
import { child } from './child.component';

export const AppModule: Module = {
    components: [parent, child]
};
```

:::info
Components must be registered to a one module only.
:::

## Export components

Components defined in a module cannot be defined in another module.

For the example above, if the parent and child components are registered in different modules, we need to export the component that will be used in another module and import the module to the module that needs the exported component.

Example.

```tsx title="Child module"
import { Module } from '@monster-js/core';
import { child } from './child.component';

export const ChildModule: Module = {
    exports: {
        components: [child]
    }
};
```

```tsx title="Parent module"
import { Module } from '@monster-js/core';
import { parent } from './parent.component';
import { ChildModule } from './child.module';

export const ChildModule: Module = {
    components: [parent],
    modules: [ChildModule]
};
```

## Register services

Services can be registered to a module so that all components and other classes registered to the module can use the services.
A service can be registered to any number of modules unlike components which can be registered only in one module.

Example.

```tsx
import { Module } from '@monster-js/core';
import { GreetingService } from './greeting.service';

export const AppModule: Module = {
    services: [GreetingService]
};
```

## Export services

A service can also be exported from a module.
Exported services can be used by the components inside the module that imports the module that has the exported services.

Example.

```tsx
import { Module } from '@monster-js/core';
import { GreetingService } from './greeting.service';

export const AppModule: Module = {
    exports: {
        services: [GreetingService]
    }
};
```

## Register directives

Directives can be registered to a module so that all components registered to the module can use the directives.
A directive can be registered to any number of modules unlike components which can be registered only in one module.

Example.

```tsx
import { Module } from '@monster-js/core';
import { highlightDir } from './highlight.directive';

export const AppModule: Module = {
    directives: [highlightDir]
};
```

## Export directives

A directive can also be exported from the module.
Exported directives can be used by the components inside the module that imports the module that has the exported directives.

Example.

```tsx
import { Module } from '@monster-js/core';
import { highlightDir } from './highlight.directive';

export const AppModule: Module = {
    exports: {
        directives: [highlightDir]
    }
};
```

## Register pipes

Pipes can be registered to a module so that all components registered to the module can use the pipes.
A pipe can be registered to any number of modules unlike components which can be registered only in one module.

Example.

```tsx
import { Module } from '@monster-js/core';
import { uppercasePipe } from './uppercase.pipe';

export const AppModule: Module = {
    pipes: [uppercasePipe]
};
```

## Export pipes

A pipe can also be exported from the module.
Exported pipes can be used by the components inside the module that imports the module that has the exported pipes.

```tsx
import { Module } from '@monster-js/core';
import { uppercasePipe } from './uppercase.pipe';

export const AppModule: Module = {
    exports: {
        pipes: [uppercasePipe]
    }
};
```

## Import modules

A module can be imported to another module.
The purpose of this is to make the parent module to be able to use the components, services, pipes and directives that are exported from the child module.

```tsx
import { Module } from '@monster-js/core';
import { ChildModule } from './child.module';

export const AppModule: Module = {
    modules: [ChildModule]
};
```