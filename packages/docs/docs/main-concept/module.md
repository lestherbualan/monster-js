---
sidebar_position: 3
---

# Module

Module is a way to group components, directives, services, pipes and modules of application that are related to each other.
This feature is very helpful in organizing the codes to make the project more maintainable as it grows in scale.
Another cool thing for a MonsterJS module is that it is lazy loaded when used in a route.

## Root component

Some module has a root component.
This component is the one being mounted in the dom tree when the module is used in a route.
Root component is the last component to be defined to make sure all the child components are already defined.

Example.

```typescript
import { Module } from "@monster-js/core";
import { App } from "./app.component";

@Module({
    root: App
})
export class AppModule {}
```

In this example, `App` is the root component.

## Register components

Components can be registered to a module so that they can interact with each other.

For example, we have a parent component and a child component.
The child component is rendered inside the view of the parent component.
So the parent and child components needs to be registered in the module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { Parent } from './parent.component';
import { Child } from './child.component';

@Module({
    components: [Parent, Child]
})
export class AppModule { }
```

:::note
Components must be registered to a one module only.
:::

## Export components

Components defined in a module cannot be defined in another module.

For the example above,
if the parent and child components are registered in different modules,
we need to export the component that will be used in another module and import the module to the module that needs the exported component.

Example.
#### Child module
```typescript
import { Module } from '@monster-js/core/module';
import { Child } from './child.component';

@Module({
    exports: {
        components: [Child]
    }
})
export class ChildModule { }
```

#### Parent module
```typescript
import { Module } from '@monster-js/core/module';
import { Parent } from './parent.component';
import { ChildModule } from './child.module';

@Module({
    components: [Parent],
    modules: [ChildModule]
})
export class ParentModule { }
```

## Register services

Services can be registered to a module so that all components and other classes registered to the module can use the services.
A service can be registered to any number of modules unlike components which can be registered only in one module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { GreetingService } from './greeting.service';

@Module({
    services: [GreetingService]
})
export class AppModule { }
```

## Export services

A service can also be exported from the module.
Exported services can be used by the components inside the module that imports the module that has the exported services.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { GreetingService } from './greeting.service';

@Module({
    exports: {
        services: [GreetingService]
    }
})
export class AppModule { }
```

## Register directives

Directives can be registered to a module so that all components registered to the module can use the directives.
A directive can be registered to any number of modules unlike components which can be registered only in one module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { HighlightDirective } from './highlight.directive';

@Module({
    directives: [HighlightDirective]
})
export class AppModule { }
```

## Export directives

A directive can also be exported from the module.
Exported directives can be used by the components inside the module that imports the module that has the exported directives.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { HighlightDirective } from './highlight.directive';

@Module({
    exports: {
        directives: [HighlightDirective]
    }
})
export class AppModule { }
```

## Register pipes

Pipes can be registered to a module so that all components registered to the module can use the pipes.
A pipe can be registered to any number of modules unlike components which can be registered only in one module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { UppercasePipe } from './uppercase.pipe';

@Module({
    pipes: [UppercasePipe]
})
export class AppModule { }
```

## Export pipes

A pipe can also be exported from the module.
Exported pipes can be used by the components inside the module that imports the module that has the exported pipes.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { UppercasePipe } from './uppercase.pipe';

@Module({
    exports: {
        pipes: [UppercasePipe]
    }
})
export class AppModule { }
```

## Import modules

A module can be imported to another module.
The purpose of this is to make the parent module to be able to use the components, services, pipes and directives that are exported from the child module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { ChildModule } from './child.module';

@Module({
    modules: [ChildModule]
})
export class AppModule { }
```
