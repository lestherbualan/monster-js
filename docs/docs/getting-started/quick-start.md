---
sidebar_position: 2
---

# Quick start

There are two recommended ways to set up a MonsterJS project.
First is to use the [CLI](/docs/category/cli) and second is to clone the [starter app](https://github.com/monster-js/starter-app) from GitHub.

## Create a project using starter app

To create a project using the starter app we need to clone the repository to our local machine using the following command:

```bash
git clone https://github.com/monster-js/starter-app.git monster-app
```

After cloning the repository, we need to change the directory into the starter project's root directory.

```bash
cd monster-app
```

then install all the dependencies by running the following command:

```bash
npm install
```

Once the installation of dependencies is done we can now start a local development server by running the following command.

```bash
npm start
```

Now we can view our app by pointing our browsers to [http://localhost:4000](http://localhost:4000).

## Create a project using CLI

To create a project using the MonsterJS CLI we can check the [CLI documentation](/docs/category/cli) on how to create a new project.

## Project structure

After the setup is complete, you can see the file structure of the project in the current directory.

```bash
.monster
    └── rollup.config.js
node_modules
src
    └── app
        ├── app.tsx
    ├── assets
    └── environments
        ├── dev.js
        └── prod.js
    ├── index.html
    ├── index.ts
    ├── styles.scss
    └── types.d.ts
package.json
tsconfig.json
```

* `.monster` Contains the configurations needed for the MonsterJS project.
* `.monster/rollup.config.js` The rollup configuration of the project.
* `node_modules/` This is where the installed node packages are located.
* `src/` A directory that contains the source code and assets of your application.
* `src/app/` This is where the codes related to the application are located.
* `src/app/app.tsx` Contains the ts codes of the root component. Any other components must be a child of this component.
* `src/assets/` This is the recommended directory to put all of the asset files.
* `src/environments/` Contains the different environment files for the project.
* `src/environments/environment.ts` The development environment variables of the project.
* `src/environments/environment.prod.ts` The production environment variables of the project.
* `src/index.html` This is the main HTML page that is served when someone visits your application.
* `src/index.ts` The main entry point of your application. It bootstraps the root module of the entire project.
* `src/styles.scss` The global styles of the project.
* `package.json` All the dependencies and configurations of your project.
* `tsconfig.json` The typescript configuration file.
