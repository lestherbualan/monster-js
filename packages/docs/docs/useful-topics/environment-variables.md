---
sidebar_position: 1
---

# Environment variables

Environment variables helps us define multiple configurations for our application.
It allows us to configure our project for different deployments without changing the codes inside our application.
We can define environment variables for production, development and even custom environment variables.

Whe we create our application there are two available environment variables provided for us.
If we check the `src/environments` directory, we can see that there is environment.js and environment.prod.js files.

## Custom environment variables

To create a new environment variable, we just need to create a file named environment.<env_name\>.js.
The <env_name\> is the one that is being used in the cli option --env.

Inside the created environment file is an object that contains the configuration of our application.

Example.

```tsx
export const environment = {
    title: 'MonsterJS App'
}
```

## Using environment in project

To use the environment inside our application, we just simply import the default environment.
If we build the application for production, the compiler will replace the default environment variables with the production environment variables.

Example.

```tsx
import { environment } from '../environments/environment';

function app() {
    return <h1>Title : {environment.title}</h1>
}
```

## Using environment in CLI

To use our environment variables in CLI, we just need to pass the environment name to the `--env` option in CLI commands.

Example, if we have environment variables like the following:

```bash
environments
    ├── environment.ts
    ├── environment.sit.ts
    └── environment.prod.ts
```

And we want to build our application using the `sit` environment.
Then we can use the following command:

```bash
mn build --env sit
```
